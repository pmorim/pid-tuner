from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS, cross_origin

import os
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = os.environ.get('SECRET')
socketio = SocketIO(app, cors_allowed_origins="*")#"http://localhost:3000")
CORS(app)

@socketio.on('connect')
@cross_origin()
def handle_connection():
  emit('server-client', 'O server diz que foi ao Brasil buscar ouro')


@socketio.on('client-server')
@cross_origin()
def handle_client_msg(msg):
  print("\n" + str(msg))


if __name__ == '__main__':
  app.run(host="localhost", port=os.environ.get('PORT'))
  socketio.run(app)
