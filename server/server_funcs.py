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
  A = float(sys_model.get("A") or 1)
  
  size = int(t_max/res)

# only appending to data values >= 0, format = [{"x": x, "y", y}, ... ]
  model_graf = []
  for t in range(size):
    y = k*A*(1-np.e**(-(t-tauD)/tau))
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
  Receives:
  {
    "method": "IMC",
    "control": "PID",
    "system":
    {
      "k": 2.5,
      "tau": 100,
      "tauD": 10
    },
    "settings":
    {
      "start": 20,
      "target": 50
    }
  }
"""
# Decide method
  method = control["method"]
  print("\n\n\t",method)
  result = {}

  if method == "ZN":
    result.update(ziegler_nichols_func(control))

  if method == "CC":
    result.update(cohen_coon_func(control))

  #if method == "IMC":
  #  result.update(imc_func(control))
 
  #if method == "ITAE":  
  #  result.update(itae_func(control))

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

  if data["control"] == "PI":
    Kp = float(0.9 * tau / (k*tauD))
    Ti = float(tauD / 0.3)
  if data["control"] == "PID":    
    Kp = float(1.2 * tau / (k*tauD))
    Ti = float(2.0 * tauD)
    Td = float(0.5 * tauD)

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

  if data["control"] == "PI":
    Kp = float( (0.9/ k) * ( (tau/tauD) + 0.092) )
    Ti = float( 3.33*tauD * (tau + 0.092*tauD) / (tau + 2.22*tauD) )

  if data["control"] == "PD":
    Kp = float( (1.24/ k) * ( (tau/tauD) + 0.129) )
    Td = float( 0.27*tauD * (tau - 0.324*tauD) / (tau + 0.129*tauD) )

  if data["control"] == "PID":    
    Kp = float( (1.35/ k) * ( (tau/tauD) + 0.185) )
    Ti = float( 2.5*tauD * (tau + 0.185*tauD) / (tau + 0.611*tauD) )
    Td = float( 0.37*tauD * tau / (tau + 0.185*tauD) )
  
  ganhos = {"params": {"Kp": Kp, "Ti": Ti, "Td": Td}}
  return ganhos

def imc_func(data):
  pass

def itae_func(data):
  k = float(data["system"]["k"])
  tau = float(data["system"]["tau"])
  tauD = float(data["system"]["tauD"])

  Kp = None
  Ti = None
  Td = None

  # Entradas de Referência # if ITAE1 ?
  if data["control"] == "P":
    Kp = float( (0.2 / k) * ( (tau/tauD) ** 1.22) )

  if data["control"] == "PI":
    Kp = float( (0.586 / k) * ( (tauD/tau) ** -0.916) )
    Ti = float( tau / (1.03 - 0.165 * (tauD/tau)) )

  # Rejeição a Perturbações # if ITAE2 ?
  if data["control"] == "P":
    Kp = float( (0.5 / k) * ( (tau/tauD) ** 1.08) )

  if data["control"] == "PI":
    Kp = float( (0.859 / k) * ( (tauD/tau) ** -0.977) )
    Ti = float( (tau / 0.674) * ( (tauD/tau)  ** 0.68) )
  
  ganhos = {"params": {"Kp": Kp, "Ti": Ti, "Td": Td}}
  return ganhos
  

def simulate(data):
  #test
  res = [{"x": 0, "y": 0}, {"x": 0.5, "y": 2}]
  graph = {"graph": res}
  return graph
  #pass