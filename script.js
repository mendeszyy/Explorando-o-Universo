// Inicia o fundo de estrelas animadas via particles.js
particlesJS('particles-js', {
  particles: {
    number: { value: 120 },
    color: { value: '#ffffff' },
    shape: { type: 'circle' },
    opacity: { value: 0.8 },
    size: { value: 2 },
    move: { enable: true, speed: 0.4 },
    line_linked: { enable: false }
  },
  interactivity: {
    events: {
      onhover: { enable: false },
      onclick: { enable: false }
    }
  }
});

// Planetas com cores, nomes e curiosidades
const planets = [
  { name: "Mercúrio", className: "mercurio", info: "Planeta mais próximo do Sol e o menor do sistema solar." },
  { name: "Vênus", className: "venus", info: "Chamado de 'estrela d'alva', tem temperaturas altíssimas." },
  { name: "Terra", className: "terra", info: "Nosso lar, o único planeta conhecido com vida." },
  { name: "Marte", className: "marte", info: "Conhecido como planeta vermelho, pode ter abrigado água." },
  { name: "Júpiter", className: "jupiter", info: "Maior planeta do sistema solar, com uma grande mancha vermelha." },
  { name: "Saturno", className: "saturno", info: "Famoso por seus belos anéis." },
  { name: "Urano", className: "urano", info: "Planeta que gira de lado e tem cor azul-esverdeada." },
  { name: "Netuno", className: "netuno", info: "O mais distante do Sol, com ventos fortíssimos." }
];

// Referências DOM
const container = document.getElementById('planets-container');
const curiosityText = document.getElementById('curiosity-text');

// Criar planetas no container
planets.forEach(planet => {
  const div = document.createElement('div');
  div.classList.add('planet', planet.className);
  div.textContent = planet.name;
  div.title = planet.name; // acessibilidade

  div.addEventListener('click', () => {
    curiosityText.textContent = planet.info;
  });

  container.appendChild(div);
});
