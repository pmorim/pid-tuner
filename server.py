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
  print('Connection established with client')
  emit('server_client', 'Test message')


@socketio.event
def client_server(json_obj):
  print(json_obj)


if __name__ == '__main__':
  socketio.run(app, host='localhost', port=os.environ.get('PORT'))
