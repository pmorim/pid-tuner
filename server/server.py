# Flask
from flask import Flask, jsonify
from flask import request
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
from server_funcs import *

# Server initialization
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = os.environ.get('SECRET')
CORS(app)


@app.route('/api/model', methods = ["POST"])
def model():
  """Receives the data about the system's model

  Args:
    data (any): The constants that describe the system.
    format: data = {"k": %f, "tau": %f, "tauD": %f}
  """
  try:
    data = request.get_json()
    print("\nReceived model event")
    print(data)
    return jsonify(model_func(data))

  except:
    print("model didn't work")


@app.route('/api/control', methods = ["POST"])
def control():
  """[summary]

  Args:
    data (any): The constants that describe the system,
                controller type and sintony method.
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
  
  try:
    data = request.get_json()
    print("\nReceived control event")
    print(data)
    return jsonify(control_func(data))

  except:
    print("control didn't work")

if __name__ == "__main__":
  app.run(host='localhost', port=os.environ.get('PORT'))