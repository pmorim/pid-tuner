# Flask
from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS

# Eventlet server
import eventlet
eventlet.monkey_patch()

# .env
import os
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

# Utilities
import numpy as np
#import json

# User Libraries
import server_funcs as servf

# Server initialization
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = os.environ.get('SECRET')
socketio = SocketIO(app, cors_allowed_origins='*')
CORS(app)

@socketio.event
def connect():
  print('\nConnection established with client')
  emit('server_client', "le test message")


@socketio.event
def client_server(data):
  print("Received client_server event")
  print(data)


@socketio.event
def system_model(data):
  print("\nReceived system_model event")
  print(data)
  global sys_model
  sys_model.update(data)
  emit('system_model_response', servf.system_model_func(sys_model))


@socketio.event
def controller_type(data):
  print("\nReceived controller_type")
  print(data)
  global contr_type
  contr_type.update(data)
  controller_type_func()


@socketio.event
def sintony_method(data):
  print("\nReceived sintony_method event")
  print(data)
  global synt_met
  synt_met.update(data)
  sintony_method_func()


@socketio.event
def k_consts(data):
  print("\nReceived k_consts event (pid_consts)")
  print(data)
  global pid_consts
  pid_consts.update(data)
  k_consts_func()


# Server functions # will go to seperate fille later

# def system_model_func(sys_model): Already in server_funcs.py
#   pass

def controller_type_func():
  global contr_type

def sintony_method_func():
  global synt_met

def k_consts_func():
  global pid_consts
  print(pid_consts)


# Global variables by default
sys_model = {"k": 1, "tau": 1, "tauD": 0, "A": 1, "t_max": 50, "res": 0.5}
contr_type = {"type": "P"}
synt_met = {"method": "name in string or val"}
pid_consts = {"kp": 0, "kd": 0, "ki": 0}

if __name__ == '__main__':
  socketio.run(app, host='0.0.0.0', port=os.environ.get('PORT'))