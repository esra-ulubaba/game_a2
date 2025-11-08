**🧩 English Vocabulary Game A2**

**📖 Overview**

* This is a real-time multiplayer English vocabulary guessing game designed for A2 level students.
* Players join the game with their names, view image and text hints, and try to guess the correct word before others.
* At the end of the game, everyone’s scores are displayed on a live leaderboard.

**🚀 Features**

* ✅ Real-time player scores and leaderboard (Socket.IO)
* ✅ Hint-based question system (three clues per question)
* ✅ Image-based vocabulary questions
* ✅ Instant feedback (Correct / Try Again)
* ✅ Automatic scoring by number of attempts
* ✅ Responsive design for mobile & desktop
* ✅ Hosted on Railway — no local server required


| Layer                   | Technology                      |
| ----------------------- | ------------------------------- |
| Frontend                | HTML, CSS, JavaScript           |
| Backend                 | Python (Flask + Flask-SocketIO) |
| Real-time Communication | Socket.IO                       |
| Hosting                 | Railway                         |
| WebSocket Engine        | Eventlet                        |


**📂 Project Structure**
```

.
├── static/
│ ├── images/
│ ├── script.js
│ └── style.css
├── templates/
│ └── index.html
├── server.py
├── requirements.txt
└── README.md

```

**⚙️ Local Setup (Optional)**

If you want to run the game locally:

git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
pip install -r requirements.txt
python server.py

Then open http://localhost:5000 in your browser.


**☁️ Deployment on Railway**

You can easily deploy this real-time Flask + Socket.IO game using Railway
 — a free and beginner-friendly hosting platform for web apps.

🔧 Step-by-Step Deployment Guide

1️⃣ Create a GitHub repository

Upload your project files to GitHub:
```

.
├── static/
│ ├── images/
│ ├── script.js
│ └── style.css
├── templates/
│ └── index.html
├── server.py
├── requirements.txt
└── README.md

```

Your requirements.txt must include:
* flask
* flask-socketio
* eventlet

2️⃣ Create a Railway account

Go to railway.app
 → Sign up with GitHub → Grant permission to access your repositories.

3️⃣ Deploy from GitHub

Click New Project → Deploy from GitHub Repo

Select your game repository

Choose your branch (usually main)

Railway will automatically detect the Python environment and install dependencies.

4️⃣ Configure your server

In your server.py, make sure the app uses Railway’s provided port:

import os
import eventlet
from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    eventlet.wsgi.server(eventlet.listen(('', port)), app)

5️⃣ Deploy and check logs

Click Deploy → wait until the container starts.

Open the Logs tab to ensure the app is running.

If you see something like Running on http://0.0.0.0:5000, it’s successful.

Then click “Open in Browser” or copy your public URL, e.g.:
👉 https://gamea2-production.up.railway.app/

6️⃣ Share your game 🎉

Now your game is online!
Anyone — from desktop or phone, on any network — can join the same game in real time through your link.

💡 Tips for Better Deployments

Make sure all file paths are relative (e.g., /static/images/... instead of local C:\...).

Keep your images lightweight for faster loading.

Use eventlet for WebSocket stability on free hosting platforms.

**🌐 Live Demo**

👉 **Play Here:** https://gamea2-production.up.railway.app/


**👩‍💻 Author**
**Esranur Ulubaba**
📍 Front-End & UI/UX Enthusiast
💬 “Creating interactive and educational experiences through code.”
