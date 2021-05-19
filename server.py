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
import json

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
def step_1(data):
  print("\nReceived step_1 event (system model)")
  print(data)
  global sys_model
  sys_model = data
  system_model()


@socketio.event
def step_2(data):
  print("\nReceived step_2 event (syntony method)")
  print(data)
  global synt_met
  synt_met = data
  sintony_method()


@socketio.event
def step_3(data):
  print("\nReceived step_3 event (pid_consts)")
  print(data)
  global pid_consts
  pid_consts = data
  k_consts()


# Server functions
def system_model():
  global sys_model

def sintony_method():
  global synt_met

def k_consts():
  global pid_consts
  print(pid_consts)


# Global variables
sys_model = {"k": 0, "tau":0, "tau_d":0}
synt_met = {"method": "name in string or val"}
pid_consts = {"kp": 0, "kd": 0, "ki": 0}

if __name__ == '__main__':
  socketio.run(app, host='0.0.0.0', port=os.environ.get('PORT'))
