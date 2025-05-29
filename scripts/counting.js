/**
 * Jogo de Contagem - Script principal
 * Implementação em JavaScript puro para crianças autistas
 * Foco em acessibilidade, feedback claro e experiência previsível
 */

// Configuração do jogo
const countingConfig = {
  // Sons ativados por padrão
  soundEnabled: true,
  // Modo atual
  currentMode: null,
  // Nível atual
  currentLevel: null,
  // Pontuação atual
  score: 0,
  // Total de perguntas
  totalQuestions: 10,
  // Pergunta atual
  currentQuestion: 0,
  // Resposta já dada para a pergunta atual
  answerGiven: false,
  // Número selecionado no modo contar
  selectedNumber: 0,
  // Número correto da pergunta atual
  correctNumber: 0,
  // Objeto arrastado atualmente
  draggedElement: null,
  // Dados do jogo
  gameData: {
    // Objetos para o modo contar
    countObjects: [
      { name: "maçãs", emoji: "🍎" },
      { name: "bananas", emoji: "🍌" },
      { name: "laranjas", emoji: "🍊" },
      { name: "morangos", emoji: "🍓" },
      { name: "uvas", emoji: "🍇" },
      { name: "cachorros", emoji: "🐶" },
      { name: "gatos", emoji: "🐱" },
      { name: "coelhos", emoji: "🐰" },
      { name: "elefantes", emoji: "🐘" },
      { name: "tartarugas", emoji: "🐢" },
      { name: "estrelas", emoji: "⭐" },
      { name: "corações", emoji: "❤️" },
      { name: "flores", emoji: "🌸" },
      { name: "árvores", emoji: "🌳" },
      { name: "balões", emoji: "🎈" }
    ],
    // Limites de números por nível
    levels: {
      1: { min: 1, max: 5 },
      2: { min: 1, max: 10 },
      3: { min: 1, max: 20 }
    }
  }
};

// Elementos do DOM
const elements = {
  // Telas
  modeSelection: document.getElementById('mode-selection'),
  levelSelection: document.getElementById('level-selection'),
  countScreen: document.getElementById('count-screen'),
  matchScreen: document.getElementById('match-screen'),
  sequenceScreen: document.getElementById('sequence-screen'),
  completionScreen: document.getElementById('completion-screen'),
  
  // Botões de navegação
  backButton: document.getElementById('back-button'),
  backToModes: document.getElementById('back-to-modes'),
  backToLevel: document.getElementById('back-to-level'),
  backToLevelFromMatch: document.getElementById('back-to-level-from-match'),
  backToLevelFromSequence: document.getElementById('back-to-level-from-sequence'),
  
  // Botões de modo
  modeButtons: document.querySelectorAll('.mode-button'),
  
  // Botões de nível
  levelButtons: document.querySelectorAll('.level-button'),
  
  // Elementos do modo contar
  countObjectsContainer: document.getElementById('count-objects-container'),
  countObjectName: document.getElementById('count-object-name'),
  numberDisplay: document.getElementById('number-display'),
  decreaseButton: document.getElementById('decrease-button'),
  increaseButton: document.getElementById('increase-button'),
  countSubmit: document.getElementById('count-submit'),
  countHintButton: document.getElementById('count-hint-button'),
  countNextButton: document.getElementById('count-next-button'),
  countStatusMessage: document.getElementById('count-status-message'),
  countScore: document.getElementById('count-score'),
  
  // Elementos do modo relacionar
  matchNumbers: document.getElementById('match-numbers'),
  matchObjects: document.getElementById('match-objects'),
  matchHintButton: document.getElementById('match-hint-button'),
  matchNextButton: document.getElementById('match-next-button'),
  matchStatusMessage: document.getElementById('match-status-message'),
  matchScore: document.getElementById('match-score'),
  
  // Elementos do modo sequência
  sequenceNumbers: document.getElementById('sequence-numbers'),
  sequenceOptions: document.getElementById('sequence-options'),
  sequenceHintButton: document.getElementById('sequence-hint-button'),
  sequenceNextButton: document.getElementById('sequence-next-button'),
  sequenceStatusMessage: document.getElementById('sequence-status-message'),
  sequenceScore: document.getElementById('sequence-score'),
  
  // Elementos da tela de conclusão
  finalScore: document.getElementById('final-score'),
  finalTotal: document.getElementById('final-total'),
  nextLevelButton: document.getElementById('next-level-button'),
  replayLevelButton: document.getElementById('replay-level-button'),
  backToLevelsButton: document.getElementById('back-to-levels-button'),
  
  // Instruções
  countInstructions: document.getElementById('count-instructions'),
  matchInstructions: document.getElementById('match-instructions'),
  sequenceInstructions: document.getElementById('sequence-instructions'),
  
  // Controle de som
  soundToggle: document.getElementById('sound-toggle'),
  
  // Sons
  successSound: document.getElementById('success-sound'),
  errorSound: document.getElementById('error-sound'),
  hintSound: document.getElementById('hint-sound'),
  completionSound: document.getElementById('completion-sound'),
  clickSound: document.getElementById('click-sound')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Configurar eventos dos botões de navegação
  elements.backButton.addEventListener('click', goToMainMenu);
  elements.backToModes.addEventListener('click', showModeSelection);
  elements.backToLevel.addEventListener('click', showLevelSelection);
  elements.backToLevelFromMatch.addEventListener('click', showLevelSelection);
  elements.backToLevelFromSequence.addEventListener('click', showLevelSelection);
  
  // Configurar eventos dos botões de modo
  elements.modeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const mode = button.dataset.mode;
      if (mode) {
        selectMode(mode);
      }
    });
    
    // Adicionar navegação por teclado
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });
  
  // Configurar eventos dos botões de nível
  elements.levelButtons.forEach(button => {
    button.addEventListener('click', () => {
      const level = button.dataset.level;
      if (level) {
        selectLevel(parseInt(level));
      }
    });
    
    // Adicionar navegação por teclado
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });
  
  // Configurar eventos do modo contar
  elements.decreaseButton.addEventListener('click', decreaseNumber);
  elements.increaseButton.addEventListener('click', increaseNumber);
  elements.countSubmit.addEventListener('click', checkCountAnswer);
  elements.countHintButton.addEventListener('click', showCountHint);
  elements.countNextButton.addEventListener('click', nextCountQuestion);
  
  // Configurar eventos do modo relacionar
  elements.matchHintButton.addEventListener('click', showMatchHint);
  elements.matchNextButton.addEventListener('click', nextMatchQuestion);
  
  // Configurar eventos do modo sequência
  elements.sequenceHintButton.addEventListener('click', showSequenceHint);
  elements.sequenceNextButton.addEventListener('click', nextSequenceQuestion);
  
  // Configurar eventos dos botões da tela de conclusão
  elements.nextLevelButton.addEventListener('click', goToNextLevel);
  elements.replayLevelButton.addEventListener('click', restartLevel);
  elements.backToLevelsButton.addEventListener('click', showLevelSelection);
  
  // Configurar controle de som
  if (window.gameUtils) {
    // Usar configuração global de som
    countingConfig.soundEnabled = window.gameUtils.soundEnabled;
  } else {
    // Configurar controle de som local
    elements.soundToggle.addEventListener('click', toggleSound);
  }
  
  // Mostrar tela inicial
  showModeSelection();
  
  // Anunciar para leitores de tela
  announceToScreenReader('Jogo de Contagem carregado. Escolha um modo para começar.');
});

/**
 * Navega para o menu principal
 */
function goToMainMenu() {
  window.location.href = '../index.html';
}

/**
 * Mostra a tela de seleção de modo
 */
function showModeSelection() {
  // Ocultar todas as telas
  elements.modeSelection.classList.remove('hidden');
  elements.levelSelection.classList.add('hidden');
  elements.countScreen.classList.add('hidden');
  elements.matchScreen.classList.add('hidden');
  elements.sequenceScreen.classList.add('hidden');
  elements.completionScreen.classList.add('hidden');
  
  // Mostrar todas as instruções
  elements.countInstructions.style.display = 'block';
  elements.matchInstructions.style.display = 'block';
  elements.sequenceInstructions.style.display = 'block';
  
  // Anunciar para leitores de tela
  announceToScreenReader('Escolha um modo para jogar: Contar, Relacionar ou Sequência.');
}

/**
 * Seleciona um modo
 * @param {string} mode - Nome do modo
 */
function selectMode(mode) {
  // Atualizar modo atual
  countingConfig.currentMode = mode;
  
  // Mostrar tela de seleção de nível
  showLevelSelection();
  
  // Ocultar instruções não relacionadas ao modo selecionado
  if (mode === 'count') {
    elements.countInstructions.style.display = 'block';
    elements.matchInstructions.style.display = 'none';
    elements.sequenceInstructions.style.display = 'none';
  } else if (mode === 'match') {
    elements.countInstructions.style.display = 'none';
    elements.matchInstructions.style.display = 'block';
    elements.sequenceInstructions.style.display = 'none';
  } else if (mode === 'sequence') {
    elements.countInstructions.style.display = 'none';
    elements.matchInstructions.style.display = 'none';
    elements.sequenceInstructions.style.display = 'block';
  }
  
  // Anunciar para leitores de tela
  const modeNames = {
    count: 'Contar',
    match: 'Relacionar',
    sequence: 'Sequência'
  };
  
  announceToScreenReader(`Modo ${modeNames[mode]} selecionado. Escolha um nível.`);
}

/**
 * Mostra a tela de seleção de nível
 */
function showLevelSelection() {
  // Ocultar todas as telas
  elements.modeSelection.classList.add('hidden');
  elements.levelSelection.classList.remove('hidden');
  elements.countScreen.classList.add('hidden');
  elements.matchScreen.classList.add('hidden');
  elements.sequenceScreen.classList.add('hidden');
  elements.completionScreen.classList.add('hidden');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Escolha um nível de dificuldade.');
}

/**
 * Seleciona um nível
 * @param {number} level - Número do nível
 */
function selectLevel(level) {
  // Verificar se o nível existe
  if (!countingConfig.gameData.levels[level]) {
    console.error(`Nível ${level} não encontrado`);
    return;
  }
  
  // Atualizar nível atual
  countingConfig.currentLevel = level;
  
  // Iniciar jogo no modo selecionado
  if (countingConfig.currentMode === 'count') {
    startCountGame();
  } else if (countingConfig.currentMode === 'match') {
    startMatchGame();
  } else if (countingConfig.currentMode === 'sequence') {
    startSequenceGame();
  }
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Nível ${level} selecionado. O jogo vai começar.`);
}

/**
 * Inicia o jogo no modo contar
 */
function startCountGame() {
  // Ocultar todas as telas
  elements.modeSelection.classList.add('hidden');
  elements.levelSelection.classList.add('hidden');
  elements.countScreen.classList.remove('hidden');
  elements.matchScreen.classList.add('hidden');
  elements.sequenceScreen.classList.add('hidden');
  elements.completionScreen.classList.add('hidden');
  
  // Reiniciar contadores
  countingConfig.score = 0;
  countingConfig.currentQuestion = 0;
  
  // Atualizar pontuação na interface
  elements.countScore.textContent = countingConfig.score;
  
  // Gerar primeira pergunta
  generateCountQuestion();
  
  // Anunciar para leitores de tela
  announceToScreenReader('Modo Contar. Conte quantos objetos aparecem na tela.');
}

/**
 * Gera uma nova pergunta para o modo contar
 */
function generateCountQuestion() {
  // Reiniciar estado da resposta
  countingConfig.answerGiven = false;
  
  // Ocultar botão de próxima pergunta
  elements.countNextButton.classList.add('hidden');
  
  // Mostrar botão de verificar
  elements.countSubmit.classList.remove('hidden');
  
  // Reiniciar número selecionado
  countingConfig.selectedNumber = 0;
  elements.numberDisplay.textContent = countingConfig.selectedNumber;
  
  // Obter limites do nível atual
  const { min, max } = countingConfig.gameData.levels[countingConfig.currentLevel];
  
  // Gerar número aleatório dentro dos limites
  countingConfig.correctNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
  // Selecionar objeto aleatório
  const randomObjectIndex = Math.floor(Math.random() * countingConfig.gameData.countObjects.length);
  const randomObject = countingConfig.gameData.countObjects[randomObjectIndex];
  
  // Atualizar nome do objeto na interface
  elements.countObjectName.textContent = randomObject.name;
  
  // Limpar container de objetos
  elements.countObjectsContainer.innerHTML = '';
  
  // Adicionar objetos ao container
  for (let i = 0; i < countingConfig.correctNumber; i++) {
    const objectElement = document.createElement('div');
    objectElement.className = 'count-object';
    objectElement.textContent = randomObject.emoji;
    objectElement.setAttribute('aria-hidden', 'true');
    elements.countObjectsContainer.appendChild(objectElement);
  }
  
  // Atualizar mensagem de status
  updateStatusMessage(elements.countStatusMessage, `Conte quantos ${randomObject.name} você vê.`);
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Pergunta ${countingConfig.currentQuestion + 1} de ${countingConfig.totalQuestions}. Conte quantos ${randomObject.name} você vê.`);
}

/**
 * Diminui o número selecionado no modo contar
 */
function decreaseNumber() {
  // Verificar se já respondeu
  if (countingConfig.answerGiven) {
    return;
  }
  
  // Verificar se o número já é zero
  if (countingConfig.selectedNumber <= 0) {
    return;
  }
  
  // Diminuir número
  countingConfig.selectedNumber--;
  
  // Atualizar interface
  elements.numberDisplay.textContent = countingConfig.selectedNumber;
  
  // Reproduzir som de clique
  playSound(elements.clickSound);
  
  // Anunciar para leitores de tela
  announceToScreenReader(`${countingConfig.selectedNumber}`);
}

/**
 * Aumenta o número selecionado no modo contar
 */
function increaseNumber() {
  // Verificar se já respondeu
  if (countingConfig.answerGiven) {
    return;
  }
  
  // Verificar se o número já é o máximo do nível
  const { max } = countingConfig.gameData.levels[countingConfig.currentLevel];
  if (countingConfig.selectedNumber >= max) {
    return;
  }
  
  // Aumentar número
  countingConfig.selectedNumber++;
  
  // Atualizar interface
  elements.numberDisplay.textContent = countingConfig.selectedNumber;
  
  // Reproduzir som de clique
  playSound(elements.clickSound);
  
  // Anunciar para leitores de tela
  announceToScreenReader(`${countingConfig.selectedNumber}`);
}

/**
 * Verifica a resposta no modo contar
 */
function checkCountAnswer() {
  // Verificar se já respondeu
  if (countingConfig.answerGiven) {
    return;
  }
  
  // Marcar que já respondeu
  countingConfig.answerGiven = true;
  
  // Verificar se a resposta está correta
  if (countingConfig.selectedNumber === countingConfig.correctNumber) {
    // Resposta correta
    handleCorrectCountAnswer();
  } else {
    // Resposta incorreta
    handleIncorrectCountAnswer();
  }
  
  // Mostrar botão de próxima pergunta
  elements.countNextButton.classList.remove('hidden');
  
  // Ocultar botão de verificar
  elements.countSubmit.classList.add('hidden');
}

/**
 * Manipula uma resposta correta no modo contar
 */
function handleCorrectCountAnswer() {
  // Reproduzir som de acerto
  playSound(elements.successSound);
  
  // Incrementar pontuação
  countingConfig.score++;
  
  // Atualizar pontuação na interface
  elements.countScore.textContent = countingConfig.score;
  
  // Atualizar mensagem de status
  updateStatusMessage(elements.countStatusMessage, `Correto! São ${countingConfig.correctNumber} objetos.`);
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Correto! São ${countingConfig.correctNumber} objetos. Clique em Próxima para continuar.`);
  
  // Destacar objetos
  const objects = elements.countObjectsContainer.querySelectorAll('.count-object');
  objects.forEach(object => {
    object.classList.add('highlight');
  });
}

/**
 * Manipula uma resposta incorreta no modo contar
 */
function handleIncorrectCountAnswer() {
  // Reproduzir som de erro
  playSound(elements.errorSound);
  
  // Atualizar mensagem de status
  updateStatusMessage(elements.countStatusMessage, `Incorreto. São ${countingConfig.correctNumber} objetos.`);
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Incorreto. São ${countingConfig.correctNumber} objetos. Clique em Próxima para continuar.`);
  
  // Destacar objetos
  const objects = elements.countObjectsContainer.querySelectorAll('.count-object');
  objects.forEach(object => {
    object.classList.add('highlight');
  });
}

/**
 * Mostra a próxima pergunta no modo contar
 */
function nextCountQuestion() {
  // Verificar se já respondeu à pergunta atual
  if (!countingConfig.answerGiven) {
    return;
  }
  
  // Incrementar contador de perguntas
  countingConfig.currentQuestion++;
  
  // Verificar se é a última pergunta
  if (countingConfig.currentQuestion >= countingConfig.totalQuestions) {
    // Mostrar tela de conclusão
    showCompletionScreen();
  } else {
    // Gerar próxima pergunta
    generateCountQuestion();
  }
}

/**
 * Mostra uma dica no modo contar
 */
function showCountHint() {
  // Verificar se já respondeu
  if (countingConfig.answerGiven) {
    return;
  }
  
  // Reproduzir som de dica
  playSound(elements.hintSound);
  
  // Destacar objetos temporariamente
  const objects = elements.countObjectsContainer.querySelectorAll('.count-object');
  
  // Destacar cada objeto sequencialmente
  let index = 0;
  const highlightInterval = setInterval(() => {
    // Remover destaque de todos os objetos
    objects.forEach(obj => obj.classList.remove('highlight'));
    
    // Destacar objeto atual
    if (index < objects.length) {
      objects[index].classList.add('highlight');
      index++;
      
      // Anunciar para leitores de tela
      announceToScreenReader(`Objeto ${index} de ${objects.length}`);
    } else {
      // Parar intervalo quando todos os objetos foram destacados
      clearInterval(highlightInterval);
      
      // Remover destaque após um tempo
      setTimeout(() => {
        objects.forEach(obj => obj.classList.remove('highlight'));
      }, 500);
    }
  }, 800);
}

/**
 * Inicia o jogo no modo relacionar
 */
function startMatchGame() {
  // Ocultar todas as telas
  elements.modeSelection.classList.add('hidden');
  elements.levelSelection.classList.add('hidden');
  elements.countScreen.classList.add('hidden');
  elements.matchScreen.classList.remove('hidden');
  elements.sequenceScreen.classList.add('hidden');
  elements.completionScreen.classList.add('hidden');
  
  // Reiniciar contadores
  countingConfig.score = 0;
  countingConfig.currentQuestion = 0;
  
  // Atualizar pontuação na interface
  elements.matchScore.textContent = countingConfig.score;
  
  // Configurar eventos de arrastar e soltar
  setupDragAndDrop();
  
  // Gerar primeira pergunta
  generateMatchQuestion();
  
  // Anunciar para leitores de tela
  announceToScreenReader('Modo Relacionar. Arraste os números até o grupo com a quantidade correta de objetos.');
}

/**
 * Configura eventos de arrastar e soltar para o modo relacionar
 */
function setupDragAndDrop() {
  // Adicionar eventos para arrastar e soltar
  document.addEventListener('dragstart', handleDragStart);
  document.addEventListener('dragover', handleDragOver);
  document.addEventListener('dragenter', handleDragEnter);
  document.addEventListener('dragleave', handleDragLeave);
  document.addEventListener('drop', handleDrop);
  document.addEventListener('dragend', handleDragEnd);
  
  // Adicionar eventos para navegação por teclado
  document.addEventListener('keydown', handleMatchKeyboard);
}

/**
 * Manipula o início do arrasto
 * @param {DragEvent} e - Evento de arrasto
 */
function handleDragStart(e) {
  // Verificar se o elemento é um número arrastável
  if (!e.target.classList.contains('match-number') || e.target.classList.contains('matched')) {
    return;
  }
  
  // Armazenar elemento arrastado
  countingConfig.draggedElement = e.target;
  
  // Adicionar classe de arrasto
  e.target.classList.add('dragging');
  
  // Definir dados de transferência
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', e.target.textContent);
  
  // Reproduzir som de clique
  playSound(elements.clickSound);
}

/**
 * Manipula o evento dragover
 * @param {DragEvent} e - Evento de arrasto
 */
function handleDragOver(e) {
  // Verificar se o elemento é uma zona de soltura
  if (e.target.classList.contains('match-drop-zone') || e.target.closest('.match-drop-zone')) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }
}

/**
 * Manipula o evento dragenter
 * @param {DragEvent} e - Evento de arrasto
 */
function handleDragEnter(e) {
  // Verificar se o elemento é uma zona de soltura
  const dropZone = e.target.classList.contains('match-drop-zone') ? e.target : e.target.closest('.match-drop-zone');
  if (dropZone) {
    dropZone.classList.add('highlight');
    
    // Destacar grupo de objetos
    const objectGroup = dropZone.closest('.match-object-group');
    if (objectGroup) {
      objectGroup.classList.add('highlight');
    }
  }
}

/**
 * Manipula o evento dragleave
 * @param {DragEvent} e - Evento de arrasto
 */
function handleDragLeave(e) {
  // Verificar se o elemento é uma zona de soltura
  const dropZone = e.target.classList.contains('match-drop-zone') ? e.target : e.target.closest('.match-drop-zone');
  if (dropZone) {
    dropZone.classList.remove('highlight');
    
    // Remover destaque do grupo de objetos
    const objectGroup = dropZone.closest('.match-object-group');
    if (objectGroup) {
      objectGroup.classList.remove('highlight');
    }
  }
}

/**
 * Manipula o evento drop
 * @param {DragEvent} e - Evento de arrasto
 */
function handleDrop(e) {
  e.preventDefault();
  
  // Verificar se o elemento é uma zona de soltura
  const dropZone = e.target.classList.contains('match-drop-zone') ? e.target : e.target.closest('.match-drop-zone');
  if (!dropZone || !countingConfig.draggedElement) {
    return;
  }
  
  // Remover destaque
  dropZone.classList.remove('highlight');
  
  // Remover destaque do grupo de objetos
  const objectGroup = dropZone.closest('.match-object-group');
  if (objectGroup) {
    objectGroup.classList.remove('highlight');
  }
  
  // Verificar se a zona já tem um número
  if (dropZone.querySelector('.match-number')) {
    return;
  }
  
  // Obter número arrastado
  const number = parseInt(countingConfig.draggedElement.textContent);
  
  // Obter quantidade de objetos no grupo
  const objectCount = objectGroup.dataset.count;
  
  // Mover número para a zona de soltura
  dropZone.appendChild(countingConfig.draggedElement);
  
  // Verificar se o número corresponde à quantidade
  if (number === parseInt(objectCount)) {
    // Resposta correta
    handleCorrectMatch(countingConfig.draggedElement, objectGroup);
  } else {
    // Resposta incorreta
    handleIncorrectMatch(countingConfig.draggedElement, objectGroup);
  }
  
  // Verificar se todos os números foram relacionados
  checkAllMatched();
}

/**
 * Manipula o fim do arrasto
 */
function handleDragEnd() {
  // Remover classe de arrasto
  if (countingConfig.draggedElement) {
    countingConfig.draggedElement.classList.remove('dragging');
  }
  
  // Limpar elemento arrastado
  countingConfig.draggedElement = null;
  
  // Remover destaque de todas as zonas de soltura
  document.querySelectorAll('.match-drop-zone').forEach(zone => {
    zone.classList.remove('highlight');
  });
  
  // Remover destaque de todos os grupos de objetos
  document.querySelectorAll('.match-object-group').forEach(group => {
    group.classList.remove('highlight');
  });
}

/**
 * Manipula navegação por teclado no modo relacionar
 * @param {KeyboardEvent} e - Evento de teclado
 */
function handleMatchKeyboard(e) {
  // Verificar se o modo relacionar está ativo
  if (elements.matchScreen.classList.contains('hidden')) {
    return;
  }
  
  // Verificar se já respondeu à pergunta atual
  if (elements.matchNextButton.classList.contains('hidden') === false) {
    return;
  }
  
  // Obter todos os números e zonas de soltura
  const numbers = Array.from(document.querySelectorAll('.match-number:not(.matched)'));
  const dropZones = Array.from(document.querySelectorAll('.match-drop-zone'));
  
  // Verificar se há números e zonas de soltura
  if (numbers.length === 0 || dropZones.length === 0) {
    return;
  }
  
  // Verificar se há um elemento focado
  const focusedElement = document.activeElement;
  
  // Verificar tecla pressionada
  switch (e.key) {
    case 'Tab':
      // Deixar o comportamento padrão do Tab
      break;
    
    case 'Enter':
    case ' ':
      e.preventDefault();
      
      // Verificar se o elemento focado é um número
      if (focusedElement && focusedElement.classList.contains('match-number') && !focusedElement.classList.contains('matched')) {
        // Verificar se já há um número selecionado
        const selectedNumber = document.querySelector('.match-number.selected');
        
        if (selectedNumber === focusedElement) {
          // Desselecionar número
          focusedElement.classList.remove('selected');
          announceToScreenReader('Número desselecionado');
        } else {
          // Selecionar número
          if (selectedNumber) {
            selectedNumber.classList.remove('selected');
          }
          
          focusedElement.classList.add('selected');
          announceToScreenReader(`Número ${focusedElement.textContent} selecionado. Use Tab para navegar até uma zona de soltura e pressione Enter para soltar.`);
        }
      }
      
      // Verificar se o elemento focado é uma zona de soltura
      if (focusedElement && (focusedElement.classList.contains('match-drop-zone') || focusedElement.closest('.match-drop-zone'))) {
        const dropZone = focusedElement.classList.contains('match-drop-zone') ? focusedElement : focusedElement.closest('.match-drop-zone');
        
        // Verificar se há um número selecionado
        const selectedNumber = document.querySelector('.match-number.selected');
        
        if (selectedNumber && !dropZone.querySelector('.match-number')) {
          // Mover número para a zona de soltura
          dropZone.appendChild(selectedNumber);
          selectedNumber.classList.remove('selected');
          
          // Obter grupo de objetos
          const objectGroup = dropZone.closest('.match-object-group');
          
          // Obter número e quantidade de objetos
          const number = parseInt(selectedNumber.textContent);
          const objectCount = parseInt(objectGroup.dataset.count);
          
          // Verificar se o número corresponde à quantidade
          if (number === objectCount) {
            // Resposta correta
            handleCorrectMatch(selectedNumber, objectGroup);
          } else {
            // Resposta incorreta
            handleIncorrectMatch(selectedNumber, objectGroup);
          }
          
          // Verificar se todos os números foram relacionados
          checkAllMatched();
        }
      }
      break;
  }
}

/**
 * Manipula uma correspondência correta no modo relacionar
 * @param {HTMLElement} numberElement - Elemento do número
 * @param {HTMLElement} objectGroup - Elemento do grupo de objetos
 */
function handleCorrectMatch(numberElement, objectGroup) {
  // Adicionar classe de correspondência
  numberElement.classList.add('matched');
  objectGroup.classList.add('correct');
  
  // Reproduzir som de acerto
  playSound(elements.successSound);
  
  // Incrementar pontuação
  countingConfig.score++;
  
  // Atualizar pontuação na interface
  elements.matchScore.textContent = countingConfig.score;
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Correto! O número ${numberElement.textContent} corresponde a ${objectGroup.dataset.count} objetos.`);
}

/**
 * Manipula uma correspondência incorreta no modo relacionar
 * @param {HTMLElement} numberElement - Elemento do número
 * @param {HTMLElement} objectGroup - Elemento do grupo de objetos
 */
function handleIncorrectMatch(numberElement, objectGroup) {
  // Reproduzir som de erro
  playSound(elements.errorSound);
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Incorreto. O número ${numberElement.textContent} não corresponde a ${objectGroup.dataset.count} objetos.`);
  
  // Retornar número para a lista após um tempo
  setTimeout(() => {
    // Verificar se o número ainda está na zona de soltura
    if (numberElement.parentElement.classList.contains('match-drop-zone')) {
      // Mover número de volta para a lista
      elements.matchNumbers.appendChild(numberElement);
    }
  }, 1500);
}

/**
 * Verifica se todos os números foram relacionados no modo relacionar
 */
function checkAllMatched() {
  // Verificar se todos os números foram relacionados corretamente
  const matchedNumbers = document.querySelectorAll('.match-number.matched');
  const totalNumbers = document.querySelectorAll('.match-number');
  
  if (matchedNumbers.length === totalNumbers.length) {
    // Todos os números foram relacionados
    
    // Mostrar botão de próxima pergunta
    elements.matchNextButton.classList.remove('hidden');
    
    // Atualizar mensagem de status
    updateStatusMessage(elements.matchStatusMessage, 'Muito bem! Você relacionou todos os números corretamente.');
    
    // Anunciar para leitores de tela
    announceToScreenReader('Muito bem! Você relacionou todos os números corretamente. Clique em Próxima para continuar.');
  }
}

/**
 * Gera uma nova pergunta para o modo relacionar
 */
function generateMatchQuestion() {
  // Ocultar botão de próxima pergunta
  elements.matchNextButton.classList.add('hidden');
  
  // Limpar containers
  elements.matchNumbers.innerHTML = '';
  elements.matchObjects.innerHTML = '';
  
  // Obter limites do nível atual
  const { min, max } = countingConfig.gameData.levels[countingConfig.currentLevel];
  
  // Gerar números aleatórios dentro dos limites
  const numbers = [];
  const usedNumbers = new Set();
  
  // Determinar quantos números gerar (3 a 5 dependendo do nível)
  const count = Math.min(5, Math.max(3, Math.floor(max / 2)));
  
  // Gerar números únicos
  while (numbers.length < count) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!usedNumbers.has(num)) {
      usedNumbers.add(num);
      numbers.push(num);
    }
  }
  
  // Embaralhar números
  numbers.sort(() => Math.random() - 0.5);
  
  // Criar elementos de número
  numbers.forEach(num => {
    const numberElement = document.createElement('div');
    numberElement.className = 'match-number';
    numberElement.textContent = num;
    numberElement.setAttribute('draggable', 'true');
    numberElement.setAttribute('tabindex', '0');
    numberElement.setAttribute('aria-label', `Número ${num}`);
    elements.matchNumbers.appendChild(numberElement);
  });
  
  // Selecionar objetos aleatórios
  const selectedObjects = [];
  const usedObjectIndices = new Set();
  
  // Selecionar objetos únicos
  while (selectedObjects.length < count) {
    const index = Math.floor(Math.random() * countingConfig.gameData.countObjects.length);
    if (!usedObjectIndices.has(index)) {
      usedObjectIndices.add(index);
      selectedObjects.push(countingConfig.gameData.countObjects[index]);
    }
  }
  
  // Criar grupos de objetos
  numbers.forEach((num, index) => {
    const objectGroup = document.createElement('div');
    objectGroup.className = 'match-object-group';
    objectGroup.dataset.count = num;
    
    // Criar container de objetos
    const objectContainer = document.createElement('div');
    objectContainer.className = 'match-object-container';
    
    // Adicionar objetos
    for (let i = 0; i < num; i++) {
      const objectElement = document.createElement('div');
      objectElement.className = 'match-object';
      objectElement.textContent = selectedObjects[index].emoji;
      objectElement.setAttribute('aria-hidden', 'true');
      objectContainer.appendChild(objectElement);
    }
    
    // Criar zona de soltura
    const dropZone = document.createElement('div');
    dropZone.className = 'match-drop-zone';
    dropZone.setAttribute('tabindex', '0');
    dropZone.setAttribute('aria-label', `Zona de soltura para ${num} ${selectedObjects[index].name}`);
    
    // Adicionar elementos ao grupo
    objectGroup.appendChild(objectContainer);
    objectGroup.appendChild(dropZone);
    
    // Adicionar grupo ao container
    elements.matchObjects.appendChild(objectGroup);
  });
  
  // Atualizar mensagem de status
  updateStatusMessage(elements.matchStatusMessage, 'Relacione os números com a quantidade correta de objetos.');
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Pergunta ${countingConfig.currentQuestion + 1} de ${countingConfig.totalQuestions}. Relacione os números com a quantidade correta de objetos.`);
}

/**
 * Mostra a próxima pergunta no modo relacionar
 */
function nextMatchQuestion() {
  // Incrementar contador de perguntas
  countingConfig.currentQuestion++;
  
  // Verificar se é a última pergunta
  if (countingConfig.currentQuestion >= countingConfig.totalQuestions) {
    // Mostrar tela de conclusão
    showCompletionScreen();
  } else {
    // Gerar próxima pergunta
    generateMatchQuestion();
  }
}

/**
 * Mostra uma dica no modo relacionar
 */
function showMatchHint() {
  // Verificar se o botão de próxima pergunta está visível
  if (!elements.matchNextButton.classList.contains('hidden')) {
    return;
  }
  
  // Reproduzir som de dica
  playSound(elements.hintSound);
  
  // Obter todos os grupos de objetos
  const objectGroups = document.querySelectorAll('.match-object-group');
  
  // Destacar cada grupo sequencialmente
  let index = 0;
  const highlightInterval = setInterval(() => {
    // Remover destaque de todos os grupos
    objectGroups.forEach(group => group.classList.remove('highlight'));
    
    // Destacar grupo atual
    if (index < objectGroups.length) {
      const group = objectGroups[index];
      group.classList.add('highlight');
      
      // Anunciar para leitores de tela
      const count = group.dataset.count;
      announceToScreenReader(`Grupo ${index + 1}: ${count} objetos`);
      
      index++;
    } else {
      // Parar intervalo quando todos os grupos foram destacados
      clearInterval(highlightInterval);
      
      // Remover destaque após um tempo
      setTimeout(() => {
        objectGroups.forEach(group => group.classList.remove('highlight'));
      }, 500);
    }
  }, 1500);
}

/**
 * Inicia o jogo no modo sequência
 */
function startSequenceGame() {
  // Ocultar todas as telas
  elements.modeSelection.classList.add('hidden');
  elements.levelSelection.classList.add('hidden');
  elements.countScreen.classList.add('hidden');
  elements.matchScreen.classList.add('hidden');
  elements.sequenceScreen.classList.remove('hidden');
  elements.completionScreen.classList.add('hidden');
  
  // Reiniciar contadores
  countingConfig.score = 0;
  countingConfig.currentQuestion = 0;
  
  // Atualizar pontuação na interface
  elements.sequenceScore.textContent = countingConfig.score;
  
  // Gerar primeira pergunta
  generateSequenceQuestion();
  
  // Anunciar para leitores de tela
  announceToScreenReader('Modo Sequência. Complete a sequência de números.');
}

/**
 * Gera uma nova pergunta para o modo sequência
 */
function generateSequenceQuestion() {
  // Reiniciar estado da resposta
  countingConfig.answerGiven = false;
  
  // Ocultar botão de próxima pergunta
  elements.sequenceNextButton.classList.add('hidden');
  
  // Limpar containers
  elements.sequenceNumbers.innerHTML = '';
  elements.sequenceOptions.innerHTML = '';
  
  // Obter limites do nível atual
  const { min, max } = countingConfig.gameData.levels[countingConfig.currentLevel];
  
  // Gerar tipo de sequência aleatório
  const sequenceTypes = ['linear', 'even', 'odd', 'skip'];
  const sequenceType = sequenceTypes[Math.floor(Math.random() * sequenceTypes.length)];
  
  // Gerar sequência
  let sequence = [];
  let correctAnswer = 0;
  
  switch (sequenceType) {
    case 'linear':
      // Sequência linear (ex: 1, 2, 3, 4, ?)
      const start = Math.floor(Math.random() * (max - min - 4)) + min;
      sequence = [start, start + 1, start + 2, start + 3];
      correctAnswer = start + 4;
      break;
    
    case 'even':
      // Números pares (ex: 2, 4, 6, 8, ?)
      const startEven = Math.floor(Math.random() * ((max - min) / 2 - 4)) + min;
      const evenStart = startEven % 2 === 0 ? startEven : startEven + 1;
      sequence = [evenStart, evenStart + 2, evenStart + 4, evenStart + 6];
      correctAnswer = evenStart + 8;
      break;
    
    case 'odd':
      // Números ímpares (ex: 1, 3, 5, 7, ?)
      const startOdd = Math.floor(Math.random() * ((max - min) / 2 - 4)) + min;
      const oddStart = startOdd % 2 === 0 ? startOdd + 1 : startOdd;
      sequence = [oddStart, oddStart + 2, oddStart + 4, oddStart + 6];
      correctAnswer = oddStart + 8;
      break;
    
    case 'skip':
      // Pular números (ex: 1, 3, 5, 7, ?)
      const skipSize = Math.floor(Math.random() * 3) + 2; // Pular 2, 3 ou 4 números
      const startSkip = Math.floor(Math.random() * (max - min - 4 * skipSize)) + min;
      sequence = [
        startSkip,
        startSkip + skipSize,
        startSkip + 2 * skipSize,
        startSkip + 3 * skipSize
      ];
      correctAnswer = startSkip + 4 * skipSize;
      break;
  }
  
  // Verificar se a resposta está dentro dos limites
  if (correctAnswer > max) {
    // Ajustar sequência para que a resposta esteja dentro dos limites
    const diff = correctAnswer - max;
    sequence = sequence.map(num => num - diff);
    correctAnswer -= diff;
  }
  
  // Armazenar resposta correta
  countingConfig.correctNumber = correctAnswer;
  
  // Criar elementos de sequência
  sequence.forEach(num => {
    const numberElement = document.createElement('div');
    numberElement.className = 'sequence-number';
    numberElement.textContent = num;
    elements.sequenceNumbers.appendChild(numberElement);
  });
  
  // Adicionar elemento para número faltante
  const missingElement = document.createElement('div');
  missingElement.className = 'sequence-number sequence-missing';
  missingElement.textContent = '?';
  elements.sequenceNumbers.appendChild(missingElement);
  
  // Gerar opções
  const options = [correctAnswer];
  
  // Adicionar opções incorretas
  while (options.length < 4) {
    // Gerar opção aleatória dentro dos limites
    const option = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Verificar se a opção já existe
    if (!options.includes(option)) {
      options.push(option);
    }
  }
  
  // Embaralhar opções
  options.sort(() => Math.random() - 0.5);
  
  // Criar elementos de opção
  options.forEach(option => {
    const optionElement = document.createElement('button');
    optionElement.className = 'sequence-option';
    optionElement.textContent = option;
    optionElement.setAttribute('aria-label', `Opção: ${option}`);
    
    // Adicionar evento de clique
    optionElement.addEventListener('click', () => {
      // Verificar se já respondeu
      if (countingConfig.answerGiven) {
        return;
      }
      
      // Marcar que já respondeu
      countingConfig.answerGiven = true;
      
      // Selecionar opção
      optionElement.classList.add('selected');
      
      // Verificar se a resposta está correta
      if (option === correctAnswer) {
        // Resposta correta
        handleCorrectSequenceAnswer(optionElement);
      } else {
        // Resposta incorreta
        handleIncorrectSequenceAnswer(optionElement);
      }
      
      // Mostrar botão de próxima pergunta
      elements.sequenceNextButton.classList.remove('hidden');
    });
    
    // Adicionar navegação por teclado
    optionElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        optionElement.click();
      }
    });
    
    // Adicionar ao container
    elements.sequenceOptions.appendChild(optionElement);
  });
  
  // Atualizar mensagem de status
  updateStatusMessage(elements.sequenceStatusMessage, 'Qual número completa a sequência?');
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Pergunta ${countingConfig.currentQuestion + 1} de ${countingConfig.totalQuestions}. Qual número completa a sequência?`);
}

/**
 * Manipula uma resposta correta no modo sequência
 * @param {HTMLElement} optionElement - Elemento da opção selecionada
 */
function handleCorrectSequenceAnswer(optionElement) {
  // Adicionar classe de resposta correta
  optionElement.classList.add('correct');
  
  // Reproduzir som de acerto
  playSound(elements.successSound);
  
  // Incrementar pontuação
  countingConfig.score++;
  
  // Atualizar pontuação na interface
  elements.sequenceScore.textContent = countingConfig.score;
  
  // Atualizar elemento faltante
  const missingElement = document.querySelector('.sequence-missing');
  missingElement.textContent = optionElement.textContent;
  missingElement.classList.remove('sequence-missing');
  
  // Atualizar mensagem de status
  updateStatusMessage(elements.sequenceStatusMessage, 'Correto! Você completou a sequência.');
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Correto! O número ${optionElement.textContent} completa a sequência. Clique em Próxima para continuar.`);
  
  // Desabilitar todas as opções
  document.querySelectorAll('.sequence-option').forEach(option => {
    if (option !== optionElement) {
      option.disabled = true;
    }
  });
}

/**
 * Manipula uma resposta incorreta no modo sequência
 * @param {HTMLElement} optionElement - Elemento da opção selecionada
 */
function handleIncorrectSequenceAnswer(optionElement) {
  // Adicionar classe de resposta incorreta
  optionElement.classList.add('incorrect');
  
  // Reproduzir som de erro
  playSound(elements.errorSound);
  
  // Mostrar resposta correta
  document.querySelectorAll('.sequence-option').forEach(option => {
    if (parseInt(option.textContent) === countingConfig.correctNumber) {
      option.classList.add('correct');
    }
  });
  
  // Atualizar elemento faltante
  const missingElement = document.querySelector('.sequence-missing');
  missingElement.textContent = countingConfig.correctNumber;
  missingElement.classList.remove('sequence-missing');
  
  // Atualizar mensagem de status
  updateStatusMessage(elements.sequenceStatusMessage, `Incorreto. O número correto é ${countingConfig.correctNumber}.`);
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Incorreto. O número correto é ${countingConfig.correctNumber}. Clique em Próxima para continuar.`);
  
  // Desabilitar todas as opções
  document.querySelectorAll('.sequence-option').forEach(option => {
    if (option !== optionElement) {
      option.disabled = true;
    }
  });
}

/**
 * Mostra a próxima pergunta no modo sequência
 */
function nextSequenceQuestion() {
  // Verificar se já respondeu à pergunta atual
  if (!countingConfig.answerGiven) {
    return;
  }
  
  // Incrementar contador de perguntas
  countingConfig.currentQuestion++;
  
  // Verificar se é a última pergunta
  if (countingConfig.currentQuestion >= countingConfig.totalQuestions) {
    // Mostrar tela de conclusão
    showCompletionScreen();
  } else {
    // Gerar próxima pergunta
    generateSequenceQuestion();
  }
}

/**
 * Mostra uma dica no modo sequência
 */
function showSequenceHint() {
  // Verificar se já respondeu
  if (countingConfig.answerGiven) {
    return;
  }
  
  // Reproduzir som de dica
  playSound(elements.hintSound);
  
  // Obter elementos da sequência
  const sequenceElements = elements.sequenceNumbers.querySelectorAll('.sequence-number:not(.sequence-missing)');
  
  // Destacar elementos sequencialmente
  let index = 0;
  const highlightInterval = setInterval(() => {
    // Remover destaque de todos os elementos
    sequenceElements.forEach(el => el.classList.remove('highlight'));
    
    // Destacar elemento atual
    if (index < sequenceElements.length) {
      sequenceElements[index].classList.add('highlight');
      
      // Anunciar para leitores de tela
      announceToScreenReader(`Número ${index + 1}: ${sequenceElements[index].textContent}`);
      
      index++;
    } else {
      // Parar intervalo quando todos os elementos foram destacados
      clearInterval(highlightInterval);
      
      // Remover destaque após um tempo
      setTimeout(() => {
        sequenceElements.forEach(el => el.classList.remove('highlight'));
        
        // Anunciar padrão da sequência
        const numbers = Array.from(sequenceElements).map(el => parseInt(el.textContent));
        const diff = numbers[1] - numbers[0];
        
        if (numbers.every((num, i) => i === 0 || num - numbers[i - 1] === diff)) {
          announceToScreenReader(`Dica: Cada número aumenta em ${diff}.`);
        } else {
          announceToScreenReader('Dica: Observe o padrão da sequência.');
        }
      }, 500);
    }
  }, 1000);
}

/**
 * Mostra a tela de conclusão
 */
function showCompletionScreen() {
  // Ocultar todas as telas
  elements.modeSelection.classList.add('hidden');
  elements.levelSelection.classList.add('hidden');
  elements.countScreen.classList.add('hidden');
  elements.matchScreen.classList.add('hidden');
  elements.sequenceScreen.classList.add('hidden');
  elements.completionScreen.classList.remove('hidden');
  
  // Atualizar pontuação final
  elements.finalScore.textContent = countingConfig.score;
  elements.finalTotal.textContent = countingConfig.totalQuestions;
  
  // Reproduzir som de conclusão
  playSound(elements.completionSound);
  
  // Verificar se há próximo nível
  const nextLevel = countingConfig.currentLevel + 1;
  if (countingConfig.gameData.levels[nextLevel]) {
    // Há próximo nível
    elements.nextLevelButton.disabled = false;
  } else {
    // Não há próximo nível
    elements.nextLevelButton.disabled = true;
  }
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Parabéns! Você completou o nível. Sua pontuação é ${countingConfig.score} de ${countingConfig.totalQuestions}.`);
}

/**
 * Vai para o próximo nível
 */
function goToNextLevel() {
  // Calcular próximo nível
  const nextLevel = countingConfig.currentLevel + 1;
  
  // Verificar se o próximo nível existe
  if (countingConfig.gameData.levels[nextLevel]) {
    // Selecionar próximo nível
    selectLevel(nextLevel);
  }
}

/**
 * Reinicia o nível atual
 */
function restartLevel() {
  // Reiniciar jogo com o mesmo nível e modo
  if (countingConfig.currentMode === 'count') {
    startCountGame();
  } else if (countingConfig.currentMode === 'match') {
    startMatchGame();
  } else if (countingConfig.currentMode === 'sequence') {
    startSequenceGame();
  }
  
  // Anunciar para leitores de tela
  announceToScreenReader('Nível reiniciado.');
}

/**
 * Atualiza a mensagem de status
 * @param {HTMLElement} element - Elemento da mensagem de status
 * @param {string} message - Mensagem a ser exibida
 */
function updateStatusMessage(element, message) {
  element.textContent = message;
  element.classList.add('pulse');
  
  // Remover animação após completar
  setTimeout(() => {
    element.classList.remove('pulse');
  }, 500);
}

/**
 * Ativa ou desativa os sons do jogo
 */
function toggleSound() {
  // Alternar estado de som
  countingConfig.soundEnabled = !countingConfig.soundEnabled;
  
  // Atualizar ícone e classe
  if (countingConfig.soundEnabled) {
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
  const message = countingConfig.soundEnabled ? 'Sons ativados' : 'Sons desativados';
  announceToScreenReader(message);
}

/**
 * Reproduz um som se os sons estiverem ativados
 * @param {HTMLAudioElement} audioElement - Elemento de áudio
 */
function playSound(audioElement) {
  // Verificar se os sons estão ativados
  if (!countingConfig.soundEnabled) {
    return;
  }
  
  // Usar a função utilitária do script principal se disponível
  if (window.gameUtils && window.gameUtils.playSound) {
    window.gameUtils.playSound(audioElement, countingConfig.soundEnabled);
  } else {
    // Implementação de fallback
    try {
      // Reiniciar o som para garantir que ele toque
      if (audioElement.currentTime) {
        audioElement.currentTime = 0;
      }
      
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
    
    // Limpar o anunciador e adicionar a nova mensagem
    announcer.textContent = '';
    
    // Usar setTimeout para garantir que a mudança seja anunciada
    setTimeout(() => {
      announcer.textContent = message;
    }, 50);
  }
}
