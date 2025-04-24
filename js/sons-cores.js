// Inicializando a Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Função para gerar um som
function playSound(frequency) {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine'; // Tipo de onda (pode ser 'sine', 'square', 'triangle', 'sawtooth')
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5); // Som dura 0.5 segundos
}

// Mapeando os botões para suas frequências de som
const soundMap = {
  vermelho: 400,   // Frequência para vermelho (tom mais grave)
  azul: 600,      // Frequência para azul
  amarelo: 800,   // Frequência para amarelo
  verde: 1000     // Frequência para verde
};

// Adicionando os eventos de clique aos botões
document.getElementById('vermelho').addEventListener('click', () => playSound(soundMap.vermelho));
document.getElementById('azul').addEventListener('click', () => playSound(soundMap.azul));
document.getElementById('amarelo').addEventListener('click', () => playSound(soundMap.amarelo));
document.getElementById('verde').addEventListener('click', () => playSound(soundMap.verde));

// Sequência do jogo (exemplo simples)
let sequence = [];
let userInput = [];
let isGameActive = false;

// Função para gerar uma nova sequência aleatória
function generateSequence() {
  const colors = ['vermelho', 'azul', 'amarelo', 'verde'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(randomColor);
  userInput = [];
  showSequence();
}

// Função para mostrar a sequência
function showSequence() {
  let index = 0;
  const interval = setInterval(() => {
    const color = sequence[index];
    playSound(soundMap[color]); // Toca o som para a cor
    document.getElementById(color).style.opacity = 1;
    setTimeout(() => {
      document.getElementById(color).style.opacity = 0.7;
    }, 500);
    index++;
    if (index >= sequence.length) {
      clearInterval(interval);
    }
  }, 1000);
}

// Função para verificar a entrada do jogador
function checkUserInput(color) {
  userInput.push(color);
  playSound(soundMap[color]); // Toca o som da cor escolhida
  if (userInput[userInput.length - 1] !== sequence[userInput.length - 1]) {
    alert('Você errou! Tente novamente!');
    sequence = [];
    userInput = [];
    isGameActive = false;
    setTimeout(() => {
      alert('Começando nova sequência...');
      generateSequence();
    }, 1000);
  } else if (userInput.length === sequence.length) {
    alert('Você acertou a sequência!');
    setTimeout(() => {
      generateSequence();
    }, 1000);
  }
}

// Iniciar o jogo ao clicar no botão
if (!isGameActive) {
  setTimeout(() => {
    isGameActive = true;
    generateSequence();
  }, 1000);
}

// Adicionar eventos de clique para o jogador
document.getElementById('vermelho').addEventListener('click', () => checkUserInput('vermelho'));
document.getElementById('azul').addEventListener('click', () => checkUserInput('azul'));
document.getElementById('amarelo').addEventListener('click', () => checkUserInput('amarelo'));
document.getElementById('verde').addEventListener('click', () => checkUserInput('verde'));
