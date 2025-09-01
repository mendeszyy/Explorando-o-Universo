const planets = [
  { name: "Mercúrio", color: "gray" },
  { name: "Vênus", color: "goldenrod" },
  { name: "Terra", color: "blue" },
  { name: "Marte", color: "red" },
  { name: "Júpiter", color: "orange" },
  { name: "Saturno", color: "khaki" },
  { name: "Urano", color: "lightblue" },
  { name: "Netuno", color: "darkblue" }
];

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const planetsContainer = document.getElementById('planets-container');
const challengeEl = document.getElementById('challenge');
const scoreEl = document.getElementById('score');
const feedbackEl = document.getElementById('feedback');
const timerEl = document.getElementById('timer');
const finalScoreEl = document.getElementById('final-score');

let score = 0;
let currentPlanet = null;
let allowClick = false;
let timeLeft = 10;
let timerId = null;
let level = 1;

function createPlanets() {
  planetsContainer.innerHTML = '';
  planets.forEach(planet => {
    const div = document.createElement('div');
    div.classList.add('planet');
    div.dataset.name = planet.name;
    div.textContent = planet.name;
    div.style.backgroundColor = planet.color;
    planetsContainer.appendChild(div);

    div.addEventListener('click', () => {
      if (!allowClick) return;
      if (div.dataset.name === currentPlanet.name) {
        score++;
        feedbackEl.textContent = '✔ Acertou!';
        feedbackEl.style.color = '#00ff00';
        scoreEl.textContent = score;
        nextChallenge();
      } else {
        feedbackEl.textContent = '❌ Errou! Tente novamente.';
        feedbackEl.style.color = '#ff4444';
      }
    });
  });
}

function startTimer() {
  timeLeft = Math.max(3, 10 - Math.floor(score / 5)); // tempo diminui conforme pontuação (mínimo 3s)
  timerEl.textContent = timeLeft;
  allowClick = true;

  timerId = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      endGame();
    }
  }, 1000);
}

function nextChallenge() {
  clearInterval(timerId);
  allowClick = false;
  feedbackEl.textContent = '';

  const randomIndex = Math.floor(Math.random() * planets.length);
  currentPlanet = planets[randomIndex];

  const showByName = Math.random() > 0.5;

  if (showByName) {
    challengeEl.textContent = `Clique no planeta: ${currentPlanet.name}`;
  } else {
    challengeEl.textContent = `Clique no planeta com a cor: ${currentPlanet.color}`;
  }

  startTimer();
}

function startGame() {
  score = 0;
  scoreEl.textContent = score;
  feedbackEl.textContent = '';
  startScreen.classList.remove('active');
  endScreen.classList.remove('active');
  gameScreen.classList.add('active');
  createPlanets();
  nextChallenge();
}

function endGame() {
  allowClick = false;
  feedbackEl.textContent = '⏰ Tempo esgotado!';
  finalScoreEl.textContent = score;
  gameScreen.classList.remove('active');
  endScreen.classList.add('active');
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

// Optional: Press spacebar to start/restart game
document.body.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    if (startScreen.classList.contains('active') || endScreen.classList.contains('active')) {
      startGame();
    }
  }
});
