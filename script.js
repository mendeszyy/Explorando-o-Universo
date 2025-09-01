// Dados dos planetas com informações reais
const planets = [
  {
    name: "Mercúrio",
    color: "#a9a9a9",
    size: 25,
    orbitRadius: 80,
    info: "Mercúrio é o planeta mais próximo do Sol e o menor do sistema solar."
  },
  {
    name: "Vênus",
    color: "#deb887",
    size: 35,
    orbitRadius: 120,
    info: "Vênus é conhecido como a 'estrela d'alva' e tem temperaturas altíssimas."
  },
  {
    name: "Terra",
    color: "#3b82f6",
    size: 40,
    orbitRadius: 170,
    info: "Terra é o nosso lar, o único planeta conhecido com vida."
  },
  {
    name: "Marte",
    color: "#dc2626",
    size: 30,
    orbitRadius: 220,
    info: "Marte é conhecido como planeta vermelho e pode ter abrigado água."
  },
  {
    name: "Júpiter",
    color: "#f97316",
    size: 55,
    orbitRadius: 280,
    info: "Júpiter é o maior planeta do sistema solar, com uma grande mancha vermelha."
  },
  {
    name: "Saturno",
    color: "#f3e79b",
    size: 50,
    orbitRadius: 360,
    info: "Saturno é famoso por seus belos anéis."
  },
  {
    name: "Urano",
    color: "#7dd3fc",
    size: 45,
    orbitRadius: 430,
    info: "Urano gira de lado e tem uma cor azul-esverdeada."
  },
  {
    name: "Netuno",
    color: "#2563eb",
    size: 45,
    orbitRadius: 500,
    info: "Netuno é o planeta mais distante do Sol, com ventos fortíssimos."
  }
];

const universe = document.getElementById("universe");
const planetInfo = document.getElementById("planet-info");

const gameContainer = document.getElementById("game-container");
const challengeText = document.getElementById("challenge-text");
const planetsGame = document.getElementById("planets-game");
const gameFeedback = document.getElementById("game-feedback");
const gameTimer = document.getElementById("game-timer");
const startGameBtn = document.getElementById("start-game-btn");

let animationAngles = [];
let animationSpeeds = [];

let score = 0;
let currentChallengePlanet = null;
let allowClick = false;
let timerInterval = null;
let timeLeft = 10;

// Cria planetas no universo com animação orbital
function createUniversePlanets() {
  universe.innerHTML = "";
  animationAngles = [];
  animationSpeeds = [];

  planets.forEach((planet, i) => {
    const div = document.createElement("div");
    div.classList.add("planet");
    div.style.width = planet.size + "px";
    div.style.height = planet.size + "px";
    div.style.backgroundColor = planet.color;
    div.title = planet.name;
    universe.appendChild(div);

    // Inicia ângulo e velocidade para a animação orbital
    animationAngles[i] = Math.random() * Math.PI * 2;
    animationSpeeds[i] = 0.002 + Math.random() * 0.002;
  });
}

// Função para animar os planetas em órbita
function animatePlanets() {
  const planetsDivs = universe.querySelectorAll(".planet");
  planetsDivs.forEach((div, i) => {
    animationAngles[i] += animationSpeeds[i];
    const x = universe.clientWidth / 2 + Math.cos(animationAngles[i]) * planets[i].orbitRadius - planets[i].size / 2;
    const y = universe.clientHeight / 2 + Math.sin(animationAngles[i]) * planets[i].orbitRadius - planets[i].size / 2;
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
  });
  requestAnimationFrame(animatePlanets);
}

// Atualiza o painel de curiosidades ao clicar em um planeta
function setupInfoPanel() {
  const planetsDivs = universe.querySelectorAll(".planet");
  planetsDivs.forEach((div, i) => {
    div.addEventListener("click", () => {
      planetInfo.textContent = planets[i].info;
    });
  });
}

// Jogo: cria planetas para o desafio
function createGamePlanets() {
  planetsGame.innerHTML = "";
  planets.forEach(planet => {
    const div = document.createElement("div");
    div.classList.add("planet");
    div.style.backgroundColor = planet.color;
    div.textContent = planet.name;
    planetsGame.appendChild(div);

    div.addEventListener("click", () => {
      if (!allowClick) return;
      if (planet.name === currentChallengePlanet.name) {
        score++;
        gameFeedback.textContent = "✔ Acertou!";
        gameFeedback.style.color = "#4ade80"; // verde
        nextChallenge();
      } else {
        gameFeedback.textContent = "❌ Errou, tente novamente!";
        gameFeedback.style.color = "#f87171"; // vermelho
      }
    });
  });
}

// Inicia o timer do jogo
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = Math.max(3, 10 - Math.floor(score / 3));
  gameTimer.textContent = `Tempo: ${timeLeft}`;
  allowClick = true;

  timerInterval = setInterval(() => {
    timeLeft--;
    gameTimer.textContent = `Tempo: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      allowClick = false;
      gameFeedback.textContent = `⏰ Tempo esgotado! Sua pontuação: ${score}`;
      challengeText.textContent = 'Clique em "Iniciar Jogo" para tentar novamente.';
      score = 0;
    }
  }, 1000);
}

// Próximo desafio do jogo
function nextChallenge() {
  clearInterval(timerInterval);
  allowClick = false;
  gameFeedback.textContent = "";

  // Seleciona planeta aleatório para desafio
  currentChallengePlanet = planets[Math.floor(Math.random() * planets.length)];

  // Apresenta desafio: nome do planeta ou cor
  const askName = Math.random() < 0.5;
  if (askName) {
    challengeText.textContent = `Clique no planeta: ${currentChallengePlanet.name}`;
  } else {
    challengeText.textContent = `Clique no planeta com a cor: ${currentChallengePlanet.color}`;
  }

  startTimer();
}

// Inicia o jogo
function startGame() {
  score = 0;
  gameFeedback.textContent = "";
  challengeText.textContent = "Preparando...";
  createGamePlanets();
  nextChallenge();
}

startGameBtn.addEventListener("click", startGame);

createUniversePlanets();
setupInfoPanel();
animatePlanets();
