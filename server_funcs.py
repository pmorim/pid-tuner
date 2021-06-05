import numpy as np


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

  t_max = float(sys_model.get("t_max")) or 5*tau + tauD
  res = float(sys_model.get("res")) or 0.5
  A = float(sys_model.get("A")) or 1
  

  size = int(t_max/res)
  print(size)

# only appending to data values >= 0, format = [{"x": x, "y", y}, ... ]
  data = []
  for t in range(size):
    y = k*A*(1-np.e**(-(t-tauD)/tau))
    if y < 0:
        data.append({"x": t*res, "y": 0})
    else:
        data.append({"x": t*res, "y": y})

  return data
    

def control_func(control):
  """
  #k = float(control["k"])
  #tau = float(control["tau"])
  #tauD = float(control["tauD"])
  #type = type["method"]
  method = control["method"]

  if method == "ZN":
    ziegler_nichols_func(control)
    pass
  if method == "CC":
    cohen_coon_func(control)
    pass
  if method == "IMC":
    imc_func(control)
    pass
  """
  #return k_gains # format = {"kp": %f, "ki": %f, "kd", %f}
  pass


