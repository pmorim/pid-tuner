import numpy as np


def system_model_func(sys_model):
    
    t_max = sys_model["t_max"]
    res = sys_model["res"]
    k = sys_model["k"]
    tau = sys_model["tau"]
    tauD = sys_model["tauD"]
    A = sys_model["A"]
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