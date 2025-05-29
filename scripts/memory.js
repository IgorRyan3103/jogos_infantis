/**
 * Jogo da Memória - Script principal
 * Implementação em JavaScript puro para crianças autistas
 * Foco em acessibilidade, feedback claro e experiência previsível
 */

// Configuração do jogo
const gameConfig = {
  // Número de pares por nível
  pairsCount: {
    easy: 6,
    medium: 8,
    hard: 12
  },
  // Tempo de espera entre virar cartas (ms)
  flipDelay: 1000,
  // Sons ativados por padrão
  soundEnabled: true,
  // Imagens para as cartas
  cardImages: [
    { id: 'apple', src: '../assets/images/cards/apple.png', alt: 'Maçã' },
    { id: 'banana', src: '../assets/images/cards/banana.png', alt: 'Banana' },
    { id: 'car', src: '../assets/images/cards/car.png', alt: 'Carro' },
    { id: 'cat', src: '../assets/images/cards/cat.png', alt: 'Gato' },
    { id: 'dog', src: '../assets/images/cards/dog.png', alt: 'Cachorro' },
    { id: 'duck', src: '../assets/images/cards/duck.png', alt: 'Pato' },
    { id: 'elephant', src: '../assets/images/cards/elephant.png', alt: 'Elefante' },
    { id: 'fish', src: '../assets/images/cards/fish.png', alt: 'Peixe' },
    { id: 'flower', src: '../assets/images/cards/flower.png', alt: 'Flor' },
    { id: 'house', src: '../assets/images/cards/house.png', alt: 'Casa' },
    { id: 'star', src: '../assets/images/cards/star.png', alt: 'Estrela' },
    { id: 'sun', src: '../assets/images/cards/sun.png', alt: 'Sol' }
  ]
};

// Estado do jogo
let gameState = {
  level: null,
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  totalPairs: 0,
  canFlip: true,
  gameStarted: false
};

// Elementos do DOM
const elements = {
  levelSelection: document.getElementById('level-selection'),
  gameBoard: document.getElementById('game-board'),
  cardsContainer: document.getElementById('cards-container'),
  completionScreen: document.getElementById('completion-screen'),
  pairsFound: document.getElementById('pairs-found'),
  totalPairs: document.getElementById('total-pairs'),
  feedbackMessage: document.getElementById('feedback-message'),
  soundToggle: document.getElementById('sound-toggle'),
  
  // Botões
  easyButton: document.getElementById('easy-button'),
  mediumButton: document.getElementById('medium-button'),
  hardButton: document.getElementById('hard-button'),
  restartButton: document.getElementById('restart-button'),
  newGameButton: document.getElementById('new-game-button'),
  playAgainButton: document.getElementById('play-again-button'),
  chooseLevelButton: document.getElementById('choose-level-button'),
  
  // Sons
  flipSound: document.getElementById('flip-sound'),
  matchSound: document.getElementById('match-sound'),
  successSound: document.getElementById('success-sound')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Configurar eventos dos botões de nível
  elements.easyButton.addEventListener('click', () => startGame('easy'));
  elements.mediumButton.addEventListener('click', () => startGame('medium'));
  elements.hardButton.addEventListener('click', () => startGame('hard'));
  
  // Configurar eventos dos botões de controle
  elements.restartButton.addEventListener('click', restartGame);
  elements.newGameButton.addEventListener('click', showLevelSelection);
  elements.playAgainButton.addEventListener('click', restartGame);
  elements.chooseLevelButton.addEventListener('click', showLevelSelection);
  
  // Configurar controle de som
  elements.soundToggle.addEventListener('click', toggleSound);
  
  // Verificar se há imagens temporárias para desenvolvimento
  createTemporaryImages();
});

/**
 * Cria imagens temporárias para desenvolvimento
 * Isso será substituído por imagens reais em produção
 */
function createTemporaryImages() {
  // Verificar se as imagens existem
  const testImage = new Image();
  testImage.src = gameConfig.cardImages[0].src;
  
  testImage.onerror = () => {
    console.log('Criando imagens temporárias para desenvolvimento');
    
    // Criar canvas para cada imagem
    gameConfig.cardImages.forEach(image => {
      createTemporaryImage(image.id, image.alt);
    });
  };
}

/**
 * Cria uma imagem temporária usando canvas
 * @param {string} id - ID da imagem
 * @param {string} text - Texto alternativo
 */
function createTemporaryImage(id, text) {
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  // Definir cores baseadas no ID para diferenciar as imagens
  const colors = {
    apple: '#FF5252',
    banana: '#FFEB3B',
    car: '#2196F3',
    cat: '#9C27B0',
    dog: '#795548',
    duck: '#FF9800',
    elephant: '#607D8B',
    fish: '#00BCD4',
    flower: '#E91E63',
    house: '#4CAF50',
    star: '#FFC107',
    sun: '#FF5722'
  };
  
  // Desenhar fundo
  ctx.fillStyle = colors[id] || '#CCCCCC';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Desenhar texto
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
  // Converter para URL de dados
  const dataUrl = canvas.toDataURL('image/png');
  
  // Substituir URL da imagem
  const imageIndex = gameConfig.cardImages.findIndex(img => img.id === id);
  if (imageIndex !== -1) {
    gameConfig.cardImages[imageIndex].src = dataUrl;
  }
}

/**
 * Inicia o jogo com o nível selecionado
 * @param {string} level - Nível do jogo (easy, medium, hard)
 */
function startGame(level) {
  // Configurar estado do jogo
  gameState.level = level;
  gameState.matchedPairs = 0;
  gameState.totalPairs = gameConfig.pairsCount[level];
  gameState.flippedCards = [];
  gameState.canFlip = true;
  gameState.gameStarted = true;
  
  // Atualizar interface
  elements.totalPairs.textContent = gameState.totalPairs;
  elements.pairsFound.textContent = gameState.matchedPairs;
  elements.feedbackMessage.textContent = '';
  
  // Configurar classe do container de cartas para o nível
  elements.cardsContainer.className = `cards-container ${level}`;
  
  // Criar e embaralhar cartas
  createCards();
  
  // Mostrar tela do jogo
  elements.levelSelection.classList.add('hidden');
  elements.completionScreen.classList.add('hidden');
  elements.gameBoard.classList.remove('hidden');
  
  // Anunciar início do jogo para leitores de tela
  announceToScreenReader(`Jogo da Memória nível ${level} iniciado. Encontre ${gameState.totalPairs} pares de cartas.`);
}

/**
 * Cria e embaralha as cartas para o jogo atual
 */
function createCards() {
  // Limpar container de cartas
  elements.cardsContainer.innerHTML = '';
  
  // Selecionar imagens para o nível atual
  const selectedImages = gameConfig.cardImages
    .slice(0, gameState.totalPairs)
    .map(img => ({ ...img }));
  
  // Criar pares de cartas
  const cardPairs = [];
  selectedImages.forEach(image => {
    // Criar dois objetos de carta com a mesma imagem
    cardPairs.push(
      { id: `${image.id}-1`, imageId: image.id, src: image.src, alt: image.alt },
      { id: `${image.id}-2`, imageId: image.id, src: image.src, alt: image.alt }
    );
  });
  
  // Embaralhar cartas
  gameState.cards = shuffleArray(cardPairs);
  
  // Criar elementos de carta no DOM
  gameState.cards.forEach((card, index) => {
    const cardElement = createCardElement(card, index);
    elements.cardsContainer.appendChild(cardElement);
  });
}

/**
 * Cria um elemento de carta para o DOM
 * @param {Object} card - Dados da carta
 * @param {number} index - Índice da carta
 * @returns {HTMLElement} Elemento da carta
 */
function createCardElement(card, index) {
  const cardElement = document.createElement('div');
  cardElement.className = 'card';
  cardElement.dataset.index = index;
  cardElement.dataset.imageId = card.imageId;
  cardElement.tabIndex = 0; // Torna a carta focável para acessibilidade
  cardElement.setAttribute('role', 'button');
  cardElement.setAttribute('aria-label', `Carta ${index + 1}`);
  
  // Estrutura interna da carta
  cardElement.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <img src="${card.src}" alt="${card.alt}" class="card-image">
      </div>
      <div class="card-back"></div>
    </div>
  `;
  
  // Adicionar evento de clique
  cardElement.addEventListener('click', () => flipCard(index));
  
  // Adicionar evento de teclado para acessibilidade
  cardElement.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      flipCard(index);
    }
  });
  
  return cardElement;
}

/**
 * Embaralha um array (algoritmo Fisher-Yates)
 * @param {Array} array - Array a ser embaralhado
 * @returns {Array} Array embaralhado
 */
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Vira uma carta
 * @param {number} index - Índice da carta
 */
function flipCard(index) {
  // Verificar se pode virar a carta
  if (!gameState.canFlip) return;
  
  // Obter elemento da carta
  const cardElement = document.querySelector(`.card[data-index="${index}"]`);
  
  // Verificar se a carta já está virada ou já foi encontrada
  if (
    cardElement.classList.contains('flipped') ||
    cardElement.classList.contains('matched')
  ) {
    return;
  }
  
  // Reproduzir som de virar carta
  playSound(elements.flipSound);
  
  // Virar a carta
  cardElement.classList.add('flipped');
  
  // Atualizar estado do jogo
  const cardData = gameState.cards[index];
  gameState.flippedCards.push({ index, imageId: cardData.imageId, element: cardElement });
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Carta virada: ${cardData.alt}`);
  
  // Verificar se há duas cartas viradas
  if (gameState.flippedCards.length === 2) {
    checkMatch();
  }
}

/**
 * Verifica se as duas cartas viradas formam um par
 */
function checkMatch() {
  // Impedir que o jogador vire mais cartas enquanto verifica
  gameState.canFlip = false;
  
  const [card1, card2] = gameState.flippedCards;
  
  // Verificar se as cartas têm a mesma imagem
  if (card1.imageId === card2.imageId) {
    // Par encontrado
    setTimeout(() => {
      // Marcar cartas como encontradas
      card1.element.classList.add('matched');
      card2.element.classList.add('matched');
      
      // Reproduzir som de acerto
      playSound(elements.matchSound);
      
      // Atualizar contador de pares
      gameState.matchedPairs++;
      elements.pairsFound.textContent = gameState.matchedPairs;
      
      // Mostrar feedback
      showFeedback('Muito bem! Par encontrado!');
      
      // Anunciar para leitores de tela
      announceToScreenReader(`Par encontrado! ${gameState.matchedPairs} de ${gameState.totalPairs} pares.`);
      
      // Verificar se o jogo acabou
      if (gameState.matchedPairs === gameState.totalPairs) {
        setTimeout(showCompletion, 1000);
      } else {
        // Resetar cartas viradas
        gameState.flippedCards = [];
        gameState.canFlip = true;
      }
    }, gameConfig.flipDelay);
  } else {
    // Par não encontrado
    setTimeout(() => {
      // Desvirar as cartas
      card1.element.classList.remove('flipped');
      card2.element.classList.remove('flipped');
      
      // Mostrar feedback
      showFeedback('Tente novamente!');
      
      // Anunciar para leitores de tela
      announceToScreenReader('Não é um par. Tente novamente.');
      
      // Resetar cartas viradas
      gameState.flippedCards = [];
      gameState.canFlip = true;
    }, gameConfig.flipDelay);
  }
}

/**
 * Mostra feedback ao jogador
 * @param {string} message - Mensagem de feedback
 */
function showFeedback(message) {
  elements.feedbackMessage.textContent = message;
  elements.feedbackMessage.classList.add('pulse');
  
  // Remover animação após completar
  setTimeout(() => {
    elements.feedbackMessage.classList.remove('pulse');
  }, 500);
}

/**
 * Mostra a tela de conclusão
 */
function showCompletion() {
  // Reproduzir som de sucesso
  playSound(elements.successSound);
  
  // Mostrar tela de conclusão
  elements.gameBoard.classList.add('hidden');
  elements.completionScreen.classList.remove('hidden');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Parabéns! Você encontrou todos os pares!');
}

/**
 * Reinicia o jogo com o mesmo nível
 */
function restartGame() {
  startGame(gameState.level);
}

/**
 * Mostra a seleção de nível
 */
function showLevelSelection() {
  elements.gameBoard.classList.add('hidden');
  elements.completionScreen.classList.add('hidden');
  elements.levelSelection.classList.remove('hidden');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Escolha um nível para jogar.');
}

/**
 * Ativa ou desativa os sons do jogo
 */
function toggleSound() {
  gameConfig.soundEnabled = !gameConfig.soundEnabled;
  
  // Atualizar ícone e classe
  if (gameConfig.soundEnabled) {
    elements.soundToggle.classList.remove('sound-off');
    elements.soundToggle.classList.add('sound-on');
    elements.soundToggle.querySelector('.sound-icon').textContent = '🔊';
    elements.soundToggle.setAttribute('aria-label', 'Desativar sons');
  } else {
    elements.soundToggle.classList.remove('sound-on');
    elements.soundToggle.classList.add('sound-off');
    elements.soundToggle.querySelector('.sound-icon').textContent = '🔈';
    elements.soundToggle.setAttribute('aria-label', 'Ativar sons');
  }
  
  // Anunciar para leitores de tela
  const message = gameConfig.soundEnabled ? 'Sons ativados' : 'Sons desativados';
  announceToScreenReader(message);
}

/**
 * Reproduz um som se os sons estiverem ativados
 * @param {HTMLAudioElement} audioElement - Elemento de áudio
 */
function playSound(audioElement) {
  if (gameConfig.soundEnabled && audioElement) {
    // Reiniciar o som para garantir que ele toque
    audioElement.currentTime = 0;
    
    // Tentar reproduzir o som
    const playPromise = audioElement.play();
    
    // Tratar erros de reprodução (comum em dispositivos móveis)
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Erro ao reproduzir som:', error);
      });
    }
  }
}

/**
 * Anuncia uma mensagem para leitores de tela
 * @param {string} message - Mensagem a ser anunciada
 */
function announceToScreenReader(message) {
  // Verificar se já existe um elemento de anúncio
  let announcer = document.getElementById('screen-reader-announcer');
  
  // Criar elemento se não existir
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'screen-reader-announcer';
    announcer.className = 'visually-hidden';
    announcer.setAttribute('aria-live', 'polite');
    document.body.appendChild(announcer);
  }
  
  // Atualizar mensagem
  announcer.textContent = message;
}

// Função para o script principal
function initMainScript() {
  // Código já executado no DOMContentLoaded
  console.log('Jogo da Memória inicializado');
}

// Inicializar script principal
initMainScript();
