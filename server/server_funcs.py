import numpy as np
from scipy.integrate import odeint


def model_func(sys_model):
  """Calculate the points of the system model.

  Args:
    sys_model (dict of floats): A dictionary containing the constants that
                                define the system.

  Returns:
    dict of float: The x and y coordinates of the points.
  """

  k = float(sys_model["k"])
  tau = float(sys_model["tau"])
  tauD = float(sys_model["tauD"])
  t_max = float(sys_model.get("t_max") or 5*tau + tauD)
  res = float(sys_model.get("res") or 0.5)
  a = float(sys_model.get("a") or 1)
  
  size = int(t_max/res)

# only appending to data values >= 0, format = [{"x": x, "y", y}, ... ]
  model_graf = []
  for t in range(size):
    y = k*a*(1-np.e**(-(t-tauD)/tau))
    if y < 0:
        model_graf.append({"x": t*res, "y": 0})
    else:
        model_graf.append({"x": t*res, "y": y})

  return model_graf
"""
    Returns:
  {
    "graph":
    [
      {"x": 0, "y": 0},
      // ...
    ] 
  }
""" 

def control_func(control):
  """
{
  "method": "IMC",
  "control": "PID",
  "windup": true,
  "system": {
    "k": 2.5,
    "tau": 100,
    "tauD": 10,
    "a": 50
  },
  "settings": {
    "start": 20,
    "target": 50
  }
}
"""
# Decide method
  method = control["method"]
  result = {}

  if method == "ZN":
    result.update(ziegler_nichols_func(control))

  elif method == "CC":
    result.update(cohen_coon_func(control))

  elif "IMC" in method:
    result.update(imc_func(control))
 
  elif "ITAE" in method:
    result.update(itae_func(control))
  
  else:
    return "Not compatible", 406

  # get graf simulation
  #result.update(simulate(result))

  """
  Returns:
  {
    "params":
    {
      "Kp": 10,
      "Ti": 20,
      "Td": 30
    },
    "graph":
    [
      {"x": 0, "y": 0},
      // ...
    ] 
  }
  """
  return result

def ziegler_nichols_func(data):
  k = float(data["system"]["k"])
  tau = float(data["system"]["tau"])
  tauD = float(data["system"]["tauD"])

  Kp = None
  Ti = None
  Td = None

  if data["control"] == "P":
    Kp = float(tau / (k*tauD))

  elif data["control"] == "PI":
    Kp = float(0.9 * tau / (k*tauD))
    Ti = float(tauD / 0.3)
  elif data["control"] == "PID":    
    Kp = float(1.2 * tau / (k*tauD))
    Ti = float(2.0 * tauD)
    Td = float(0.5 * tauD)
  else:
      return "Not compatible", 406


  ganhos = {"params": {"Kp": Kp, "Ti": Ti, "Td": Td}}
  return ganhos

def cohen_coon_func(data):
  k = float(data["system"]["k"])
  tau = float(data["system"]["tau"])
  tauD = float(data["system"]["tauD"])

  Kp = None
  Ti = None
  Td = None

  if data["control"] == "P":
    Kp = float( (1.03/ k) * ( (tau/tauD) + 0.34) )

  elif data["control"] == "PI":
    Kp = float( (0.9/ k) * ( (tau/tauD) + 0.092) )
    Ti = float( 3.33*tauD * (tau + 0.092*tauD) / (tau + 2.22*tauD) )

  elif data["control"] == "PD":
    Kp = float( (1.24/ k) * ( (tau/tauD) + 0.129) )
    Td = float( 0.27*tauD * (tau - 0.324*tauD) / (tau + 0.129*tauD) )

  elif data["control"] == "PID":    
    Kp = float( (1.35/ k) * ( (tau/tauD) + 0.185) )
    Ti = float( 2.5*tauD * (tau + 0.185*tauD) / (tau + 0.611*tauD) )
    Td = float( 0.37*tauD * tau / (tau + 0.185*tauD) )
  else:
      return "Not compatible", 406
  
  ganhos = {"params": {"Kp": Kp, "Ti": Ti, "Td": Td}}
  return ganhos

def imc_func(data):
  k = float(data["system"]["k"])
  tau = float(data["system"]["tau"])
  tauD = float(data["system"]["tauD"])
  tauC = 0

  Kp = None
  Ti = None
  Td = None

  if "-A" in data["method"]:
    tauC = max(0.1*tau, 0.8*tauD)
  elif "-M" in data["method"]:
    tauC = max(1.0*tau, 8.0*tauD)
  elif "-C" in data["method"]:
    tauC = max(10.0*tau, 80.0*tauD)
  else:
    return "Not compatible", 406

  if data["control"] == "PI":
    Kp = float( (1/k) * tau/(tauC+tauD) )
    Ti = float(tau)
  elif data["control"] == "PID":
    Kp = float( (1/k) * (tau+0.5*tauD)/(tauC+0.5*tauD) )
    Ti = float(tau + 0.5*tauD)
    Td = float(tau*tauD/(2*tau + tauD))
  
  else:
    return "Not compatible", 406

  ganhos = {"params": {"Kp": Kp, "Ti": Ti, "Td": Td}}
  return ganhos


def itae_func(data):
  k = float(data["system"]["k"])
  tau = float(data["system"]["tau"])
  tauD = float(data["system"]["tauD"])

  Kp = None
  Ti = None
  Td = None

  # Entradas de Referência
  if "RE" in data["method"]:
    if data["control"] == "P":
      Kp = float( (0.2 / k) * ( (tau/tauD) ** 1.22) )

    elif data["control"] == "PI":
      Kp = float( (0.586 / k) * ( (tauD/tau) ** -0.916) )
      Ti = float( tau / (1.03 - 0.165 * (tauD/tau)) )
    else:
      return "Not compatible", 406

  # Rejeição a Perturbações #
  elif "PR" in data["method"]:
    if data["control"] == "P":
      Kp = float( (0.5 / k) * ( (tau/tauD) ** 1.08) )

    elif data["control"] == "PI":
      Kp = float( (0.859 / k) * ( (tauD/tau) ** -0.977) )
      Ti = float( (tau / 0.674) * ( (tauD/tau)  ** 0.68) )
    else:
      return "Not compatible", 406
      
  else:
      return "Not compatible", 406
  
  ganhos = {"params": {"Kp": Kp, "Ti": Ti, "Td": Td}}
  return ganhos
  

def simulate(data):
  #test
  res = [{"x": 0, "y": 0}, {"x": 0.5, "y": 2}]
  graph = {"graph": res}
  return graph
  #pass