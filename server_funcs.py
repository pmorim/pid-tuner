import numpy as np


def system_model_func(sys_model):
  """Calculate the points of the system model.

  Args:
    sys_model (dict of floats): A dictionary containing the constants that
                                define the system.

  Returns:
    dict of float: The x and y coordinates of the points.
  """

  k = sys_model["k"]
  tau = sys_model["tau"]
  tauD = sys_model["tauD"]
  t_max = sys_model["t_max"] or 50
  res = sys_model["res"] or 0.5
  A = sys_model["A"] or 1

  size = int(t_max/res)
  print(size)

  data = []
  for t in range(size):
    data.append({"x": t*res, "y": k*A*(1-np.e**(-(t-tauD)/tau))})

  return data
    

def controller_type_func(contr_type):
  pass


def sintony_method_func(synt_met):
  pass


def k_consts_func(pid_consts):
  pass
