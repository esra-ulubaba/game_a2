const socket = io(); // SocketIO bağlantısı

const questions = [
  {
    hints: ["I describe a city with too many cars and people.",
       "The air is not clean here.", 
       "This city is the opposite of quiet."],
    answer: "crowded",
    image: "/static/images/crowded.jpg"
  },
  {
    hints: ["This is a big building where you buy things.",
       "It has many different stores and restaurants.", 
       "You can spend all day shopping here."],
    answer: "shopping centre",
    image: "/static/images/shopping-centre.jpeg"
  },

  {
    hints: ["I describe a person who likes to talk a lot.",
       "This person is not quiet or shy.", 
       "They enjoy being with other people."],
    answer: "talkative",
    image: "/static/images/konuskan.jpg"
  },
 
  {
    hints: ["I describe a person who is not short or medium.",
       "This person has to bend down to go through a small door.", 
       "I am the opposite of short."],
    answer: "tall",
    image: "/static/images/uzun-kisa.jpg"
  },

  {
    hints: ["I describe a person who likes to work a lot.",
       "They finish their tasks and do not like to stop.", 
       "They are always busy and focused."],
    answer: "hardworking",
    image: "/static/images/hardworking.jpg"
  },

  {
    hints: ["This is what you do when you need food and milk.",
       "You take a list and a basket to the supermarket.", 
       "This action fills the fridge."],
    answer: "go shopping",
    image: "/static/images/go-shopping.jpeg"
  },

  {
    hints: ["TThis is what you do first when you wake up in the morning.",
       "You straighten your blanket and pillows.", 
       "This action makes your room tidy."],
    answer: "make the bed",
    image: "/static/images/make-to-bed.jpg"
  },

  {
    hints: ["This is what you do after you finish eating.",
       "You clean the plates and forks with soap and water.", 
       "You can use a machine for this."],
    answer: "wash the dishes",
    image: "/static/images/wash-to-dishes.jpeg"
  },

  {
    hints: ["I am a vehicle that travels on the street.",
       "Many people use me at the same time.", 
       "I stop at stations and follow a route."],
    answer: "bus",
    image: "/static/images/bus.jpeg"
  },

  {
    hints: ["This is what you do on a beach towel under the sun.",
       "You lie down and close your eyes.", 
       "You hope to get a nice dark color on your skin."],
    answer: "sunbathe",
    image: "/static/images/sunbathe.jpeg"
  }
];

let currentQuestion = 0;
let score = 0;
let currentUser = "";
let guessCount = 0;

// HTML elementleri
const startBtn = document.getElementById("start-btn");
const startContainer = document.getElementById("start-container");
const gameContainer = document.getElementById("game-container");
const hint1 = document.getElementById("hint1");
const hint2 = document.getElementById("hint2");
const hint3 = document.getElementById("hint3");
const feedback = document.getElementById("feedback");
const hintImage = document.getElementById("hint-image");
const nextBtn = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score");
const usernameInput = document.getElementById("username");
const guessInput = document.getElementById("guess");
const finalScoreDisplay = document.getElementById("final-score");
const leaderboardContainer = document.getElementById("leaderboard-container");
const leaderboardList = document.getElementById("leaderboard");

// Başlangıç butonuna tıklandığında
startBtn.addEventListener("click", () => {
  const nameInput = usernameInput.value.trim();
  if (nameInput === "") {
    alert("Please enter your name!");
    return;
  }
  currentUser = nameInput;
  score = 0;
  scoreDisplay.textContent = score;

  leaderboardList.innerHTML = "";
  leaderboardContainer.style.display = "none";

  startContainer.style.display = "none";
  gameContainer.style.display = "block";
  loadQuestion();
});

// İpuçlarını sırayla göster
function showHintsSequentially(hints) {
  hint1.textContent = "";
  hint2.textContent = "";
  hint3.textContent = "";
  hints.forEach((hint, index) => {
    setTimeout(() => {
      if (index === 0) hint1.textContent = hint;
      if (index === 1) hint2.textContent = hint;
      if (index === 2) hint3.textContent = hint;
    }, 2000 * index);
  });
}

function loadQuestion() {
  const q = questions[currentQuestion];
  guessCount = 0;
  showHintsSequentially(q.hints);
  guessInput.value = "";
  guessInput.disabled = false;
  feedback.textContent = "";
  nextBtn.style.display = "none";

  hintImage.src = q.image;
  hintImage.classList.add("blur");
  hintImage.style.display = "block";
}

function checkAnswer() {
  const q = questions[currentQuestion];
  const userGuess = guessInput.value.toLowerCase().trim();
  guessCount++;

  if (userGuess === q.answer.toLowerCase()) {
    if (guessCount === 1) score += 20; 
    else if (guessCount === 2) score += 10; 

    feedback.textContent = "✅ Correct!";
    hintImage.classList.remove("blur");
    scoreDisplay.textContent = score;
    nextBtn.style.display = "inline-block";
    guessInput.disabled = true;
  } else {
    if (guessCount === 1) {
      feedback.textContent = "❌ Try again!";
      hintImage.classList.add("blur");
    } else if (guessCount === 2) {
      feedback.textContent = "❌ No points. Moving to next question!";
      hintImage.classList.add("blur");
      nextBtn.style.display = "inline-block";
      guessInput.disabled = true;
    }
  }
}

function nextQuestion() {
  currentQuestion++;
  guessInput.disabled = false;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    hint1.textContent = "🎉 You finished the game!";
    hint2.textContent = "";
    hint3.textContent = "";
    guessInput.style.display = "none";
    nextBtn.style.display = "none";
    hintImage.style.display = "none";

    // Kendi final skorunu göster
    finalScoreDisplay.textContent = `Your Final Score: ${score}`;

    // Sunucuya puan gönder
    socket.emit('submitScore', { name: currentUser, score: score });
  }
}

// SocketIO üzerinden güncel leaderboard
socket.on('updateLeaderboard', (players) => {
  leaderboardList.innerHTML = "";
  players.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.name}: ${p.score} points`;
    leaderboardList.appendChild(li);
  });
  leaderboardContainer.style.display = "block";
});
