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

# Custom Modules
import server_funcs as servf

# Server initialization
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = os.environ.get('SECRET')
socketio = SocketIO(app, cors_allowed_origins='*')
CORS(app)


@socketio.event
def connect():
  """Establishes a connection with the client."""

  print('\nConnection established with client')
  emit('server_client', "le test message")


@socketio.event
def model(data):
  """Receives the data about the system's model

  Args:
    data (any): The constants that describe the system.
    format: data = {"k": %f, "tau": %f, "tauD": %f}
  """

  print("\nReceived model event")
  print(data)
  emit('model_response', servf.model_func(data))


@socketio.event
def control(data):
  """[summary]

  Args:
    data (any): The constants that describe the system,
                controller type and sintony method.
    format: data = {"k": %f, "tau": %f, "tauD": %f,
                    "type": %s, "method": %s}
  """

  print("\nReceived control event")
  print(data)
  emit('control_response', servf.control_func(data))


if __name__ == '__main__':
  socketio.run(app, host='0.0.0.0', port=os.environ.get('PORT'))