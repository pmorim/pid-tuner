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
  print("\ndebugg model")
  k = float(sys_model["k"])
  tau = float(sys_model["tau"])
  tauD = float(sys_model["tauD"])
  t_max = float(8*tau + tauD)
  res_eq = float(sys_model.get("res") or t_max/200)

  # Find best resolution
  best_dif = [5, 0]
  for i in range(-3, 3):
    dif1 = abs(res_eq - 1*10**i), 1*10**i
    dif2 = abs(res_eq - 2*10**i), 2*10**i 
    dif3 = abs(res_eq - 2.5*10**i), 2.5*10**i
    dif4 = abs(res_eq - 5*10**i), 5*10**i 
    dif = min(dif1, dif2, dif3, dif4)

    if dif[0] < best_dif[0]:
      best_dif = dif
      
  res = best_dif[1]

  print(f"{res = }")
  print(f"{res_eq = }")

  a = float(sys_model.get("a") or 1)
  y0 = float(sys_model.get("y0") or 0)
  
  size = int(t_max/res)

  model_graf = []
  for t in range(size):
    y = k*a*(1-np.e**(-(t-tauD)/tau))
    if y < 0:
      model_graf.append({"t": t*res, "y": 0 + y0})
    else:
      model_graf.append({"t": t*res, "y": y + y0})

  return model_graf
"""
    Returns:
  {
    "graph":
    [
      {"t": 0, "y": 0},
      // ...
    ] 
  }
""" 

def control_func(control):
  """
Receives:
{
  "system":
  {
    "k": 2.5,
    "tau": 100,
    "tauD": 10,
    "a": 50,
    "y0": 22.5
  },
  "control": "PI",
  "method":"ZN",
  "antiWindup": false,
  "simulation":
  {
    "start": 22.5,
    "target": 50,
    "mean": 0,
    "sd": 2
  }
} 
"""
# Decide method
  method = control["method"]
  result = {}

  if not ( ("IMC" in method) or ("ITAE" in method) or (method == "Ziegler-Nichols") or (method == "Cohen-Coon") ):
    raise Exception("Choose a valid method!")
  elif "IMC" in method:
    result.update(imc_func(control))
  elif control["system"]["tauD"] == 0 :
    raise Exception(f"{method} tuning method can only tune First-Order Plus Dead Time systems. The system must have dead time different from zero!")
  elif method == "Ziegler-Nichols":
    result.update(ziegler_nichols_func(control))
  elif method == "Cohen-Coon":
    result.update(cohen_coon_func(control))
  elif "ITAE" in method:
    result.update(itae_func(control))
  else:
    raise Exception(f"Impossible to get here! method: {method} result: {result} (just for debugging)")

  #get graf simulation
  result = (simulate(control, result))

  """
  Return
  {
    "meta": {
      "control": "PI",
      "tuning": "IMC Moderate",
      "antiWindup": false
    },
    "gains": {
      "Kp": 10,
      "Ti": 20,
      "Td": null,
      "Tt": null
    },
    "points": [
      {"t": 0, "u": 100, "y": 20},
      ...
    ]
  }
  """
  return result

# Methods Functions
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
    raise Exception("Ziegler-Nichols tuning method doesn't support PD control! Only accepts P, PI and PID.")


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
    raise Exception("Choose a valid control!")
  
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

  if "Aggressive" in data["method"]:
    tauC = max(0.1*tau, 0.8*tauD)
  elif "Moderate" in data["method"]:
    tauC = max(1.0*tau, 8.0*tauD)
  elif "Conservative" in data["method"]:
    tauC = max(10.0*tau, 80.0*tauD)
  else:
    raise Exception("Choose a valid IMC method! (Aggressive, Moderate or Conservative)")

  if data["control"] == "PI":
    Kp = float( (1/k) * tau/(tauC+tauD) )
    Ti = float(tau)
  elif data["control"] == "PID":
    Kp = float( (1/k) * (tau+0.5*tauD)/(tauC+0.5*tauD) )
    Ti = float(tau + 0.5*tauD)
    Td = float(tau*tauD/(2*tau + tauD))
  else:
    raise Exception("IMC tuning method doesn't support P or PD control! Only accepts PI and PID.")

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
  if "Reference Entry" in data["method"]:
    if data["control"] == "P":
      Kp = float( (0.2 / k) * ( (tau/tauD) ** 1.22) )
    elif data["control"] == "PI":
      Kp = float( (0.586 / k) * ( (tauD/tau) ** -0.916) )
      Ti = float( tau / (1.03 - 0.165 * (tauD/tau)) )
    else:
      raise Exception("ITAE Reference Entry tuning method doesn't support PD or PID control! Only accepts P and PI.")

  # Rejeição a Perturbações #
  elif "Perturbation Rejection" in data["method"]:
    if data["control"] == "P":
      Kp = float( (0.5 / k) * ( (tau/tauD) ** 1.08) )
    elif data["control"] == "PI":
      Kp = float( (0.859 / k) * ( (tauD/tau) ** -0.977) )
      Ti = float( (tau / 0.674) * ( (tauD/tau)  ** 0.68) )
    else:
      raise Exception("ITAE Perturbation Rejection tuning method doesn't support PD or PID control! Only accepts P and PI.")
      
  else:
      raise Exception("Choose valid ITAE method! (Reference Entry or Perturbation Rejection)")
  
  ganhos = {"params": {"Kp": Kp, "Ti": Ti, "Td": Td}}
  return ganhos
  
# Proces for Simulation
def process(y,t,u,Kp,tau):
    dydt = (-y + (Kp * u))/tau
    return dydt

# Simulation
def simulate(data, params):
  control = data["control"]
  method = data["method"]
  anti_wind = data["antiWindup"]
  meta = {"meta": {"control": control, "tuning": method,"antiwindup": anti_wind}}
  
  k = float(data["system"]["k"])
  tau = float(data["system"]["tau"])
  tauD = float(data["system"]["tauD"])
  t_max = float(8*tau + tauD)
  res_eq = float(data["system"].get("res") or t_max/200)

  # Find best resolution
  best_dif = [5, 0]
  for i in range(-3, 3):
    dif1 = abs(res_eq - 1*10**i), 1*10**i
    dif2 = abs(res_eq - 2*10**i), 2*10**i 
    dif3 = abs(res_eq - 2.5*10**i), 2.5*10**i
    dif4 = abs(res_eq - 5*10**i), 5*10**i 
    dif = min(dif1, dif2, dif3, dif4)

    if dif[0] < best_dif[0]:
      best_dif = dif
      
  res = best_dif[1]

  print(f"{res = }")
  print(f"{res_eq = }")
  
  start = float(data["simulation"]["start"])
  target = float(data["simulation"]["target"])
  mean = float(data["simulation"]["mean"])
  sd = float(data["simulation"]["sd"])
  
  
  Kp = float(params["params"]["Kp"])
  
  try:
    Ti = float(params["params"]["Ti"])
    Ki = Kp / Ti
  except:
    Ki = 0
    Ti = None      
    
  try:
    Td = float(params["params"]["Td"])
    Kd = float(Kp*Td)
  except:
    Kd = 0
    Td = None
  
  # Check if Anti-windup is selected
  if anti_wind:
      if control == "PI":
          Tt = float(0.5 * Ti)
      elif control == "PID":
          Tt = float( (Ti * Td)**(0.5))
      else:
          Tt = None
          raise Exception("Can't add anti-windup to control without integral component!")
      Ka = float(1/Tt) if Tt is not None else 0
  else:
      Tt = None
      Ka = 0 
  
  size = int((t_max/res))
  
  setpoint = np.full(size, target - start, dtype=float)

  T = res
  
  e = target - start
  e_ant = e
  
  P, I, D = 0, 0, 0
  
  graph = {"points":[]}
  dp = 3 #decimal places
  
  for i in range(0, size):
    
    if i*T <= tauD: # Atraso
        u = 0
        temp = 0

    e = setpoint[i] - temp
        
    P = Kp * e
    D = float((Kd / T) * (e - e_ant))
    v = P + I + D

    # saturate u
    u = np.clip(v, 0.0, 100.0)
    
    I += float(Ki * T * e + Ka * T * (u - v))
    
    e_ant = e
        
    if i*T > tauD:
        y = odeint(process, temp, [0, T], args=(u, k, tau))
        noise = float(np.random.normal(loc=mean, scale=sd))
        temp = float(y[-1]) + noise

    graph["points"].append({"t": round(i*T, dp),
                            "u": round(u,dp),
                            "u_p": round(P,dp),
                            "u_i": round(I,dp),
                            "u_d": round(D,dp),
                            "y": round(temp + start,dp) })

  gains = {"gains": {
            "Kp": round(Kp, dp) if Kp != None else None,
            "Ti": round(Ti, dp) if Ti != None else None,
            "Td": round(Td, dp) if Td != None else None,
            "Tt": round(Tt, dp) if Tt != None else None}
          }
  graph.update(gains)
  graph.update(meta)
  
  return graph