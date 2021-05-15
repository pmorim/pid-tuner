from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
CORS(app)

@socketio.on('connect')
@cross_origin()
def test_connect():
    emit('server-client', 'O server diz que foi ao Brasil buscar ouro')


@socketio.on('client-server')
@cross_origin()
def test_connect(msg):
    print("\n" + str(msg))


if __name__ == '__main__':
    app.run(host="localhost", port=5000)
    socketio.run(app)
