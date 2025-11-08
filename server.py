from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
import eventlet
import eventlet.wsgi
import os

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')

players = []

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def connect():
    player_id = request.sid
    players.append({'id': player_id, 'name': f'Player-{len(players)+1}', 'score': 0})
    emit('updateLeaderboard', players, broadcast=True)

@socketio.on('submitScore')
def handle_score(data):
    # data = { "name": "Esra", "score": 50 }
    player_id = request.sid
    for p in players:
        if p['id'] == player_id:
            p['name'] = data["name"]
            p['score'] = data["score"]
    players.sort(key=lambda x: x['score'], reverse=True)
    emit('updateLeaderboard', players, broadcast=True)

@socketio.on('disconnect')
def disconnect():
    global players
    players = [p for p in players if p['id'] != request.sid]
    emit('updateLeaderboard', players, broadcast=True)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    eventlet.wsgi.server(eventlet.listen(('', port)), app)

