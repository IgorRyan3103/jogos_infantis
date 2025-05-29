/**
 * Sequência de Cores - Script principal
 * Implementação em JavaScript puro para crianças autistas
 * Foco em acessibilidade, feedback claro e experiência previsível
 */

// Configuração do jogo
const colorsConfig = {
  // Número de cores na sequência inicial por nível
  initialSequenceLength: {
    easy: 2,
    medium: 3,
    hard: 4
  },
  // Número máximo de cores na sequência por nível
  maxSequenceLength: {
    easy: 8,
    medium: 12,
    hard: 16
  },
  // Velocidade da sequência (ms)
  speed: {
    easy: 1200,
    medium: 1000,
    hard: 800
  },
  // Cores disponíveis
  colors: ['red', 'blue', 'green', 'yellow'],
  // Sons ativados por padrão
  soundEnabled: true
};

// Estado do jogo
let gameState = {
  level: 'easy',
  sequence: [],
  playerSequence: [],
  round: 1,
  score: 0,
  isShowingSequence: false,
  canPlayerClick: false,
  gameStarted: false,
  gameOver: false
};

// Elementos do DOM
const elements = {
  levelSelection: document.getElementById('level-selection'),
  gameBoard: document.getElementById('game-board'),
  gameOverScreen: document.getElementById('game-over-screen'),
  colorButtons: document.getElementById('color-buttons'),
  statusMessage: document.getElementById('status-message'),
  score: document.getElementById('score'),
  round: document.getElementById('round'),
  finalScore: document.getElementById('final-score'),
  finalRound: document.getElementById('final-round'),
  soundToggle: document.getElementById('sound-toggle'),
  
  // Botões
  easyButton: document.getElementById('easy-button'),
  mediumButton: document.getElementById('medium-button'),
  hardButton: document.getElementById('hard-button'),
  startGameButton: document.getElementById('start-game-button'),
  restartButton: document.getElementById('restart-button'),
  newGameButton: document.getElementById('new-game-button'),
  playAgainButton: document.getElementById('play-again-button'),
  chooseLevelButton: document.getElementById('choose-level-button'),
  
  // Botões de cores
  colorRed: document.getElementById('color-red'),
  colorBlue: document.getElementById('color-blue'),
  colorGreen: document.getElementById('color-green'),
  colorYellow: document.getElementById('color-yellow'),
  
  // Sons
  redSound: document.getElementById('red-sound'),
  blueSound: document.getElementById('blue-sound'),
  greenSound: document.getElementById('green-sound'),
  yellowSound: document.getElementById('yellow-sound'),
  successSound: document.getElementById('success-sound'),
  errorSound: document.getElementById('error-sound')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Configurar eventos dos botões de nível
  elements.easyButton.addEventListener('click', () => selectLevel('easy'));
  elements.mediumButton.addEventListener('click', () => selectLevel('medium'));
  elements.hardButton.addEventListener('click', () => selectLevel('hard'));
  
  // Configurar eventos dos botões de controle
  elements.startGameButton.addEventListener('click', startGame);
  elements.restartButton.addEventListener('click', restartGame);
  elements.newGameButton.addEventListener('click', showLevelSelection);
  elements.playAgainButton.addEventListener('click', restartGame);
  elements.chooseLevelButton.addEventListener('click', showLevelSelection);
  
  // Configurar eventos dos botões de cores
  elements.colorRed.addEventListener('click', () => handleColorClick('red'));
  elements.colorBlue.addEventListener('click', () => handleColorClick('blue'));
  elements.colorGreen.addEventListener('click', () => handleColorClick('green'));
  elements.colorYellow.addEventListener('click', () => handleColorClick('yellow'));
  
  // Adicionar eventos de teclado para acessibilidade
  setupKeyboardNavigation();
  
  // Configurar controle de som
  elements.soundToggle.addEventListener('click', toggleSound);
  
  // Criar sons temporários se necessário
  createTemporarySounds();
  
  // Selecionar nível fácil por padrão
  selectLevel('easy');
});

/**
 * Cria sons temporários para desenvolvimento
 * Isso será substituído por sons reais em produção
 */
function createTemporarySounds() {
  // Verificar se os sons existem
  const testSound = new Audio();
  testSound.src = elements.redSound.querySelector('source').src;
  
  testSound.onerror = () => {
    console.log('Criando sons temporários para desenvolvimento');
    
    // Criar sons temporários usando AudioContext
    if (window.AudioContext || window.webkitAudioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      
      // Criar oscilador para cada cor
      createTemporarySound('red', 261.63); // Dó
      createTemporarySound('blue', 293.66); // Ré
      createTemporarySound('green', 329.63); // Mi
      createTemporarySound('yellow', 349.23); // Fá
      
      // Criar sons de sucesso e erro
      createTemporarySuccessSound();
      createTemporaryErrorSound();
    }
  };
}

/**
 * Cria um som temporário para uma cor
 * @param {string} color - Nome da cor
 * @param {number} frequency - Frequência do som em Hz
 */
function createTemporarySound(color, frequency) {
  // Criar um elemento de áudio
  const audioElement = document.createElement('audio');
  audioElement.id = `${color}-sound-temp`;
  
  // Criar um elemento de fonte
  const sourceElement = document.createElement('source');
  sourceElement.type = 'audio/wav';
  
  // Adicionar ao DOM
  audioElement.appendChild(sourceElement);
  document.body.appendChild(audioElement);
  
  // Substituir o elemento original
  elements[`${color}Sound`] = audioElement;
  
  // Função para tocar o som
  elements[`${color}Sound`].play = function() {
    if (window.AudioContext || window.webkitAudioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    }
  };
}

/**
 * Cria um som temporário de sucesso
 */
function createTemporarySuccessSound() {
  // Criar um elemento de áudio
  const audioElement = document.createElement('audio');
  audioElement.id = 'success-sound-temp';
  
  // Criar um elemento de fonte
  const sourceElement = document.createElement('source');
  sourceElement.type = 'audio/wav';
  
  // Adicionar ao DOM
  audioElement.appendChild(sourceElement);
  document.body.appendChild(audioElement);
  
  // Substituir o elemento original
  elements.successSound = audioElement;
  
  // Função para tocar o som
  elements.successSound.play = function() {
    if (window.AudioContext || window.webkitAudioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      
      const frequencies = [523.25, 659.25, 783.99]; // Dó, Mi, Sol (uma oitava acima)
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start(audioContext.currentTime + index * 0.15);
        oscillator.stop(audioContext.currentTime + 0.5 + index * 0.15);
      });
    }
  };
}

/**
 * Cria um som temporário de erro
 */
function createTemporaryErrorSound() {
  // Criar um elemento de áudio
  const audioElement = document.createElement('audio');
  audioElement.id = 'error-sound-temp';
  
  // Criar um elemento de fonte
  const sourceElement = document.createElement('source');
  sourceElement.type = 'audio/wav';
  
  // Adicionar ao DOM
  audioElement.appendChild(sourceElement);
  document.body.appendChild(audioElement);
  
  // Substituir o elemento original
  elements.errorSound = audioElement;
  
  // Função para tocar o som
  elements.errorSound.play = function() {
    if (window.AudioContext || window.webkitAudioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  };
}

/**
 * Configura navegação por teclado para acessibilidade
 */
function setupKeyboardNavigation() {
  // Navegação por teclado para botões de cores
  document.addEventListener('keydown', (e) => {
    if (!gameState.canPlayerClick) return;
    
    switch (e.key) {
      case '1':
      case 'r':
      case 'R':
        handleColorClick('red');
        break;
      case '2':
      case 'b':
      case 'B':
        handleColorClick('blue');
        break;
      case '3':
      case 'g':
      case 'G':
        handleColorClick('green');
        break;
      case '4':
      case 'y':
      case 'Y':
        handleColorClick('yellow');
        break;
    }
  });
  
  // Adicionar eventos de teclado para botões de cores
  elements.colorRed.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleColorClick('red');
    }
  });
  
  elements.colorBlue.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleColorClick('blue');
    }
  });
  
  elements.colorGreen.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleColorClick('green');
    }
  });
  
  elements.colorYellow.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleColorClick('yellow');
    }
  });
}

/**
 * Seleciona um nível para o jogo
 * @param {string} level - Nível do jogo (easy, medium, hard)
 */
function selectLevel(level) {
  // Remover seleção anterior
  const buttons = [elements.easyButton, elements.mediumButton, elements.hardButton];
  buttons.forEach(button => {
    button.classList.remove('selected');
    button.setAttribute('aria-pressed', 'false');
  });
  
  // Selecionar novo nível
  const buttonMap = {
    easy: elements.easyButton,
    medium: elements.mediumButton,
    hard: elements.hardButton
  };
  
  if (buttonMap[level]) {
    buttonMap[level].classList.add('selected');
    buttonMap[level].setAttribute('aria-pressed', 'true');
  }
  
  // Atualizar estado
  gameState.level = level;
  
  // Anunciar para leitores de tela
  const levelNames = { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' };
  announceToScreenReader(`Nível selecionado: ${levelNames[level]}`);
}

/**
 * Inicia o jogo com o nível selecionado
 */
function startGame() {
  // Configurar estado do jogo
  gameState.sequence = [];
  gameState.playerSequence = [];
  gameState.round = 1;
  gameState.score = 0;
  gameState.isShowingSequence = false;
  gameState.canPlayerClick = false;
  gameState.gameStarted = true;
  gameState.gameOver = false;
  
  // Atualizar interface
  elements.score.textContent = gameState.score;
  elements.round.textContent = gameState.round;
  
  // Mostrar tela do jogo
  elements.levelSelection.classList.add('hidden');
  elements.gameOverScreen.classList.add('hidden');
  elements.gameBoard.classList.remove('hidden');
  
  // Anunciar início do jogo para leitores de tela
  const levelNames = { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' };
  announceToScreenReader(`Jogo iniciado no nível ${levelNames[gameState.level]}. Observe a sequência de cores.`);
  
  // Iniciar primeira rodada após um breve delay
  setTimeout(() => {
    startNewRound();
  }, 1500);
}

/**
 * Inicia uma nova rodada
 */
function startNewRound() {
  // Atualizar estado
  gameState.playerSequence = [];
  gameState.isShowingSequence = true;
  gameState.canPlayerClick = false;
  
  // Atualizar interface
  updateStatusMessage('Observe a sequência!');
  disableColorButtons();
  
  // Adicionar uma nova cor à sequência
  addColorToSequence();
  
  // Mostrar a sequência após um breve delay
  setTimeout(() => {
    showSequence();
  }, 1000);
}

/**
 * Adiciona uma nova cor à sequência
 */
function addColorToSequence() {
  // Se é a primeira rodada, criar a sequência inicial
  if (gameState.round === 1) {
    const initialLength = colorsConfig.initialSequenceLength[gameState.level];
    
    for (let i = 0; i < initialLength; i++) {
      const randomColor = getRandomColor();
      gameState.sequence.push(randomColor);
    }
  } else {
    // Adicionar uma nova cor à sequência existente
    const randomColor = getRandomColor();
    gameState.sequence.push(randomColor);
  }
}

/**
 * Retorna uma cor aleatória
 * @returns {string} Cor aleatória
 */
function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colorsConfig.colors.length);
  return colorsConfig.colors[randomIndex];
}

/**
 * Mostra a sequência de cores
 */
function showSequence() {
  let currentIndex = 0;
  const speed = colorsConfig.speed[gameState.level];
  
  // Função para mostrar a próxima cor na sequência
  const showNextColor = () => {
    // Verificar se chegou ao fim da sequência
    if (currentIndex >= gameState.sequence.length) {
      // Sequência completa, permitir que o jogador repita
      setTimeout(() => {
        gameState.isShowingSequence = false;
        gameState.canPlayerClick = true;
        enableColorButtons();
        updateStatusMessage('Sua vez! Repita a sequência.');
        announceToScreenReader('Sua vez! Repita a sequência de cores.');
      }, speed / 2);
      return;
    }
    
    // Obter a cor atual
    const currentColor = gameState.sequence[currentIndex];
    
    // Ativar a cor
    activateColor(currentColor);
    
    // Avançar para a próxima cor após o delay
    currentIndex++;
    setTimeout(showNextColor, speed);
  };
  
  // Iniciar a sequência
  showNextColor();
}

/**
 * Ativa visualmente e sonoramente uma cor
 * @param {string} color - Cor a ser ativada
 */
function activateColor(color) {
  // Obter o elemento do botão
  const buttonElement = elements[`color${color.charAt(0).toUpperCase() + color.slice(1)}`];
  
  // Adicionar classe de ativo
  buttonElement.classList.add('active');
  
  // Reproduzir som
  playColorSound(color);
  
  // Remover classe após um tempo
  setTimeout(() => {
    buttonElement.classList.remove('active');
  }, colorsConfig.speed[gameState.level] / 2);
}

/**
 * Reproduz o som de uma cor
 * @param {string} color - Cor do som
 */
function playColorSound(color) {
  const soundElement = elements[`${color}Sound`];
  playSound(soundElement);
}

/**
 * Manipula o clique em um botão de cor
 * @param {string} color - Cor clicada
 */
function handleColorClick(color) {
  // Verificar se o jogador pode clicar
  if (!gameState.canPlayerClick) return;
  
  // Ativar a cor
  activateColor(color);
  
  // Adicionar à sequência do jogador
  gameState.playerSequence.push(color);
  
  // Verificar se a cor está correta
  const currentIndex = gameState.playerSequence.length - 1;
  
  if (gameState.playerSequence[currentIndex] === gameState.sequence[currentIndex]) {
    // Cor correta
    
    // Verificar se a sequência está completa
    if (gameState.playerSequence.length === gameState.sequence.length) {
      // Sequência completa, avançar para a próxima rodada
      gameState.canPlayerClick = false;
      
      // Atualizar pontuação
      gameState.score += gameState.sequence.length;
      elements.score.textContent = gameState.score;
      
      // Mostrar feedback
      updateStatusMessage('Correto! Preparando próxima rodada...');
      
      // Reproduzir som de sucesso
      setTimeout(() => {
        playSound(elements.successSound);
      }, 300);
      
      // Anunciar para leitores de tela
      announceToScreenReader('Correto! Preparando próxima rodada.');
      
      // Verificar se atingiu o máximo de rodadas
      if (gameState.sequence.length >= colorsConfig.maxSequenceLength[gameState.level]) {
        // Jogo concluído com sucesso
        setTimeout(() => {
          endGame(true);
        }, 1500);
      } else {
        // Avançar para a próxima rodada
        gameState.round++;
        elements.round.textContent = gameState.round;
        
        setTimeout(() => {
          startNewRound();
        }, 1500);
      }
    }
  } else {
    // Cor errada, fim de jogo
    gameState.canPlayerClick = false;
    
    // Mostrar feedback
    updateStatusMessage('Ops! Sequência incorreta.');
    
    // Reproduzir som de erro
    setTimeout(() => {
      playSound(elements.errorSound);
    }, 300);
    
    // Anunciar para leitores de tela
    announceToScreenReader('Sequência incorreta. Fim de jogo.');
    
    // Finalizar o jogo
    setTimeout(() => {
      endGame(false);
    }, 1500);
  }
}

/**
 * Finaliza o jogo
 * @param {boolean} success - Se o jogador concluiu com sucesso
 */
function endGame(success) {
  // Atualizar estado
  gameState.gameOver = true;
  
  // Atualizar interface
  elements.finalScore.textContent = gameState.score;
  elements.finalRound.textContent = gameState.round;
  
  // Mostrar tela de fim de jogo
  elements.gameBoard.classList.add('hidden');
  elements.gameOverScreen.classList.remove('hidden');
  
  // Anunciar para leitores de tela
  if (success) {
    announceToScreenReader(`Parabéns! Você completou todas as ${gameState.round} rodadas com ${gameState.score} pontos.`);
  } else {
    announceToScreenReader(`Fim de jogo. Você chegou até a rodada ${gameState.round} com ${gameState.score} pontos.`);
  }
}

/**
 * Reinicia o jogo com o mesmo nível
 */
function restartGame() {
  startGame();
}

/**
 * Mostra a seleção de nível
 */
function showLevelSelection() {
  elements.gameBoard.classList.add('hidden');
  elements.gameOverScreen.classList.add('hidden');
  elements.levelSelection.classList.remove('hidden');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Escolha um nível para jogar.');
}

/**
 * Atualiza a mensagem de status
 * @param {string} message - Mensagem a ser exibida
 */
function updateStatusMessage(message) {
  elements.statusMessage.textContent = message;
  elements.statusMessage.classList.add('pulse');
  
  // Remover animação após completar
  setTimeout(() => {
    elements.statusMessage.classList.remove('pulse');
  }, 500);
}

/**
 * Desativa os botões de cores
 */
function disableColorButtons() {
  colorsConfig.colors.forEach(color => {
    const buttonElement = elements[`color${color.charAt(0).toUpperCase() + color.slice(1)}`];
    buttonElement.classList.add('disabled');
    buttonElement.setAttribute('aria-disabled', 'true');
  });
}

/**
 * Ativa os botões de cores
 */
function enableColorButtons() {
  colorsConfig.colors.forEach(color => {
    const buttonElement = elements[`color${color.charAt(0).toUpperCase() + color.slice(1)}`];
    buttonElement.classList.remove('disabled');
    buttonElement.setAttribute('aria-disabled', 'false');
  });
}

/**
 * Ativa ou desativa os sons do jogo
 */
function toggleSound() {
  colorsConfig.soundEnabled = !colorsConfig.soundEnabled;
  
  // Atualizar ícone e classe
  if (colorsConfig.soundEnabled) {
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
  const message = colorsConfig.soundEnabled ? 'Sons ativados' : 'Sons desativados';
  announceToScreenReader(message);
}

/**
 * Reproduz um som se os sons estiverem ativados
 * @param {HTMLAudioElement} audioElement - Elemento de áudio
 */
function playSound(audioElement) {
  if (colorsConfig.soundEnabled && audioElement) {
    // Usar a função utilitária do script principal se disponível
    if (window.gameUtils && window.gameUtils.playSound) {
      window.gameUtils.playSound(audioElement, colorsConfig.soundEnabled);
    } else {
      // Implementação de fallback
      try {
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
      } catch (error) {
        console.log('Erro ao reproduzir som:', error);
      }
    }
  }
}

/**
 * Anuncia uma mensagem para leitores de tela
 * @param {string} message - Mensagem a ser anunciada
 */
function announceToScreenReader(message) {
  // Usar a função utilitária do script principal se disponível
  if (window.gameUtils && window.gameUtils.announceToScreenReader) {
    window.gameUtils.announceToScreenReader(message);
  } else {
    // Implementação de fallback
    let announcer = document.getElementById('screen-reader-announcer');
    
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'screen-reader-announcer';
      announcer.className = 'visually-hidden';
      announcer.setAttribute('aria-live', 'polite');
      document.body.appendChild(announcer);
    }
    
    announcer.textContent = message;
  }
}

// Inicializar script
console.log('Sequência de Cores inicializado');
