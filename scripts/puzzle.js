/**
 * Quebra-Cabeças - Script principal
 * Implementação em JavaScript puro para crianças autistas
 * Foco em acessibilidade, feedback claro e experiência previsível
 */

// Configuração do jogo
const puzzleConfig = {
  // Número de peças por nível
  piecesCount: {
    easy: 6,    // 3x2
    medium: 12, // 4x3
    hard: 20    // 5x4
  },
  // Imagens disponíveis para o quebra-cabeças
  puzzleImages: [
    { id: 'animals', src: '../assets/images/puzzles/animals.jpg', alt: 'Animais' },
    { id: 'landscape', src: '../assets/images/puzzles/landscape.jpg', alt: 'Paisagem' },
    { id: 'space', src: '../assets/images/puzzles/space.jpg', alt: 'Espaço' },
    { id: 'underwater', src: '../assets/images/puzzles/underwater.jpg', alt: 'Fundo do Mar' },
    { id: 'dinosaurs', src: '../assets/images/puzzles/dinosaurs.jpg', alt: 'Dinossauros' },
    { id: 'farm', src: '../assets/images/puzzles/farm.jpg', alt: 'Fazenda' }
  ],
  // Sons ativados por padrão
  soundEnabled: true
};

// Estado do jogo
let puzzleState = {
  selectedImage: null,
  selectedLevel: null,
  pieces: [],
  placedPieces: [],
  draggedPiece: null,
  gameStarted: false,
  gameCompleted: false
};

// Elementos do DOM
const elements = {
  puzzleSelection: document.getElementById('puzzle-selection'),
  puzzleBoard: document.getElementById('puzzle-board'),
  imageOptions: document.querySelector('.image-options'),
  puzzlePieces: document.getElementById('puzzle-pieces'),
  puzzleBoardGrid: document.getElementById('puzzle-board-grid'),
  completionScreen: document.getElementById('completion-screen'),
  referenceImageContainer: document.getElementById('reference-image-container'),
  referenceImage: document.getElementById('reference-image'),
  completedImage: document.getElementById('completed-image'),
  feedbackMessage: document.getElementById('feedback-message'),
  soundToggle: document.getElementById('sound-toggle'),
  
  // Botões
  easyButton: document.getElementById('easy-button'),
  mediumButton: document.getElementById('medium-button'),
  hardButton: document.getElementById('hard-button'),
  startPuzzleButton: document.getElementById('start-puzzle-button'),
  showImageButton: document.getElementById('show-image-button'),
  hintButton: document.getElementById('hint-button'),
  restartButton: document.getElementById('restart-button'),
  newPuzzleButton: document.getElementById('new-puzzle-button'),
  closeReferenceButton: document.getElementById('close-reference-button'),
  playAgainButton: document.getElementById('play-again-button'),
  choosePuzzleButton: document.getElementById('choose-puzzle-button'),
  
  // Sons
  pickSound: document.getElementById('pick-sound'),
  placeSound: document.getElementById('place-sound'),
  successSound: document.getElementById('success-sound'),
  hintSound: document.getElementById('hint-sound')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Carregar imagens do quebra-cabeças
  loadPuzzleImages();
  
  // Configurar eventos dos botões de nível
  elements.easyButton.addEventListener('click', () => selectLevel('easy'));
  elements.mediumButton.addEventListener('click', () => selectLevel('medium'));
  elements.hardButton.addEventListener('click', () => selectLevel('hard'));
  
  // Configurar eventos dos botões de controle
  elements.startPuzzleButton.addEventListener('click', startPuzzle);
  elements.showImageButton.addEventListener('click', showReferenceImage);
  elements.hintButton.addEventListener('click', showHint);
  elements.restartButton.addEventListener('click', restartPuzzle);
  elements.newPuzzleButton.addEventListener('click', showPuzzleSelection);
  elements.closeReferenceButton.addEventListener('click', hideReferenceImage);
  elements.playAgainButton.addEventListener('click', restartPuzzle);
  elements.choosePuzzleButton.addEventListener('click', showPuzzleSelection);
  
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
  testImage.src = puzzleConfig.puzzleImages[0].src;
  
  testImage.onerror = () => {
    console.log('Criando imagens temporárias para desenvolvimento');
    
    // Criar canvas para cada imagem
    puzzleConfig.puzzleImages.forEach(image => {
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
  canvas.width = 400;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  
  // Definir cores baseadas no ID para diferenciar as imagens
  const colors = {
    animals: '#4CAF50',
    landscape: '#2196F3',
    space: '#673AB7',
    underwater: '#00BCD4',
    dinosaurs: '#FF5722',
    farm: '#FFC107'
  };
  
  // Desenhar fundo
  ctx.fillStyle = colors[id] || '#CCCCCC';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Desenhar padrão para tornar a imagem mais interessante
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = 30 + Math.random() * 70;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Desenhar texto
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
  // Converter para URL de dados
  const dataUrl = canvas.toDataURL('image/jpeg');
  
  // Substituir URL da imagem
  const imageIndex = puzzleConfig.puzzleImages.findIndex(img => img.id === id);
  if (imageIndex !== -1) {
    puzzleConfig.puzzleImages[imageIndex].src = dataUrl;
  }
}

/**
 * Carrega as imagens do quebra-cabeças na interface
 */
function loadPuzzleImages() {
  // Limpar container de imagens
  elements.imageOptions.innerHTML = '';
  
  // Adicionar cada imagem como opção
  puzzleConfig.puzzleImages.forEach(image => {
    const imageOption = document.createElement('div');
    imageOption.className = 'image-option';
    imageOption.dataset.imageId = image.id;
    imageOption.tabIndex = 0; // Torna a opção focável para acessibilidade
    imageOption.setAttribute('role', 'button');
    imageOption.setAttribute('aria-label', `Escolher imagem: ${image.alt}`);
    
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    
    imageOption.appendChild(img);
    elements.imageOptions.appendChild(imageOption);
    
    // Adicionar evento de clique
    imageOption.addEventListener('click', () => selectImage(image.id));
    
    // Adicionar evento de teclado para acessibilidade
    imageOption.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectImage(image.id);
      }
    });
  });
}

/**
 * Seleciona uma imagem para o quebra-cabeças
 * @param {string} imageId - ID da imagem selecionada
 */
function selectImage(imageId) {
  // Remover seleção anterior
  const previousSelected = document.querySelector('.image-option.selected');
  if (previousSelected) {
    previousSelected.classList.remove('selected');
    previousSelected.setAttribute('aria-selected', 'false');
  }
  
  // Selecionar nova imagem
  const selectedOption = document.querySelector(`.image-option[data-image-id="${imageId}"]`);
  if (selectedOption) {
    selectedOption.classList.add('selected');
    selectedOption.setAttribute('aria-selected', 'true');
  }
  
  // Atualizar estado
  puzzleState.selectedImage = puzzleConfig.puzzleImages.find(img => img.id === imageId);
  
  // Verificar se pode habilitar o botão de início
  checkStartButton();
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Imagem selecionada: ${puzzleState.selectedImage.alt}`);
}

/**
 * Seleciona um nível para o quebra-cabeças
 * @param {string} level - Nível selecionado (easy, medium, hard)
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
  puzzleState.selectedLevel = level;
  
  // Verificar se pode habilitar o botão de início
  checkStartButton();
  
  // Anunciar para leitores de tela
  const levelNames = { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' };
  announceToScreenReader(`Nível selecionado: ${levelNames[level]}`);
}

/**
 * Verifica se o botão de início pode ser habilitado
 */
function checkStartButton() {
  const canStart = puzzleState.selectedImage && puzzleState.selectedLevel;
  elements.startPuzzleButton.disabled = !canStart;
  
  if (canStart) {
    elements.startPuzzleButton.classList.add('pulse');
    setTimeout(() => {
      elements.startPuzzleButton.classList.remove('pulse');
    }, 500);
  }
}

/**
 * Inicia o jogo de quebra-cabeças
 */
function startPuzzle() {
  if (!puzzleState.selectedImage || !puzzleState.selectedLevel) return;
  
  // Configurar estado do jogo
  puzzleState.pieces = [];
  puzzleState.placedPieces = [];
  puzzleState.draggedPiece = null;
  puzzleState.gameStarted = true;
  puzzleState.gameCompleted = false;
  
  // Criar peças do quebra-cabeças
  createPuzzlePieces();
  
  // Criar grade do quebra-cabeças
  createPuzzleGrid();
  
  // Mostrar tela do jogo
  elements.puzzleSelection.classList.add('hidden');
  elements.completionScreen.classList.add('hidden');
  elements.puzzleBoard.classList.remove('hidden');
  
  // Configurar imagem de referência
  elements.referenceImage.src = puzzleState.selectedImage.src;
  elements.referenceImage.alt = puzzleState.selectedImage.alt;
  elements.completedImage.src = puzzleState.selectedImage.src;
  elements.completedImage.alt = puzzleState.selectedImage.alt;
  
  // Limpar feedback
  elements.feedbackMessage.textContent = '';
  
  // Anunciar início do jogo para leitores de tela
  const levelNames = { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' };
  announceToScreenReader(`Quebra-cabeças iniciado. Nível ${levelNames[puzzleState.selectedLevel]} com a imagem ${puzzleState.selectedImage.alt}. Arraste as peças para montar a imagem.`);
}

/**
 * Cria as peças do quebra-cabeças
 */
function createPuzzlePieces() {
  // Limpar container de peças
  elements.puzzlePieces.innerHTML = '';
  
  // Determinar número de peças com base no nível
  const totalPieces = puzzleConfig.piecesCount[puzzleState.selectedLevel];
  
  // Determinar número de colunas e linhas
  let columns, rows;
  switch (puzzleState.selectedLevel) {
    case 'easy':
      columns = 3;
      rows = 2;
      break;
    case 'medium':
      columns = 4;
      rows = 3;
      break;
    case 'hard':
      columns = 5;
      rows = 4;
      break;
    default:
      columns = 3;
      rows = 2;
  }
  
  // Criar peças
  for (let i = 0; i < totalPieces; i++) {
    // Calcular posição da peça na imagem original
    const row = Math.floor(i / columns);
    const col = i % columns;
    
    // Criar elemento de peça
    const piece = document.createElement('div');
    piece.className = 'puzzle-piece';
    piece.dataset.index = i;
    piece.dataset.row = row;
    piece.dataset.col = col;
    piece.tabIndex = 0; // Torna a peça focável para acessibilidade
    piece.setAttribute('role', 'button');
    piece.setAttribute('aria-label', `Peça ${i + 1} do quebra-cabeças`);
    
    // Definir tamanho da peça com base no nível
    const pieceWidth = 100 / columns;
    const pieceHeight = 100 / rows;
    
    // Criar imagem dentro da peça
    const img = document.createElement('img');
    img.src = puzzleState.selectedImage.src;
    img.alt = '';
    img.style.width = `${columns * 100}%`;
    img.style.height = `${rows * 100}%`;
    img.style.objectFit = 'cover';
    img.style.position = 'absolute';
    img.style.left = `${-col * 100}%`;
    img.style.top = `${-row * 100}%`;
    
    piece.appendChild(img);
    elements.puzzlePieces.appendChild(piece);
    
    // Adicionar à lista de peças
    puzzleState.pieces.push({
      element: piece,
      index: i,
      row,
      col,
      placed: false
    });
    
    // Configurar eventos de drag and drop
    setupDragEvents(piece, i);
  }
  
  // Embaralhar peças visualmente
  shufflePieces();
}

/**
 * Configura eventos de drag and drop para uma peça
 * @param {HTMLElement} pieceElement - Elemento da peça
 * @param {number} index - Índice da peça
 */
function setupDragEvents(pieceElement, index) {
  // Variáveis para controlar o drag
  let isDragging = false;
  let startX, startY;
  let offsetX, offsetY;
  let originalPosition;
  
  // Função para iniciar o drag
  const startDrag = (clientX, clientY) => {
    if (puzzleState.pieces[index].placed) return;
    
    isDragging = true;
    puzzleState.draggedPiece = index;
    
    // Salvar posição original
    originalPosition = {
      left: pieceElement.offsetLeft,
      top: pieceElement.offsetTop
    };
    
    // Calcular offset do mouse dentro da peça
    const rect = pieceElement.getBoundingClientRect();
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
    
    // Salvar posição inicial do mouse
    startX = clientX;
    startY = clientY;
    
    // Adicionar classe de arrastar
    pieceElement.classList.add('dragging');
    
    // Trazer para frente
    pieceElement.style.zIndex = '100';
    
    // Reproduzir som de pegar peça
    playSound(elements.pickSound);
    
    // Anunciar para leitores de tela
    announceToScreenReader(`Peça ${index + 1} selecionada`);
  };
  
  // Função para mover durante o drag
  const moveDrag = (clientX, clientY) => {
    if (!isDragging) return;
    
    // Calcular nova posição
    const containerRect = elements.puzzlePieces.getBoundingClientRect();
    const newLeft = clientX - containerRect.left - offsetX;
    const newTop = clientY - containerRect.top - offsetY;
    
    // Aplicar nova posição
    pieceElement.style.position = 'absolute';
    pieceElement.style.left = `${newLeft}px`;
    pieceElement.style.top = `${newTop}px`;
    
    // Verificar se está sobre a grade
    checkPieceOverGrid(clientX, clientY);
  };
  
  // Função para finalizar o drag
  const endDrag = () => {
    if (!isDragging) return;
    
    isDragging = false;
    
    // Remover classe de arrastar
    pieceElement.classList.remove('dragging');
    
    // Verificar se a peça foi colocada na grade
    const placed = tryPlacePiece(index);
    
    if (!placed) {
      // Retornar à posição original no container de peças
      pieceElement.style.position = 'relative';
      pieceElement.style.left = '0';
      pieceElement.style.top = '0';
      pieceElement.style.zIndex = '';
    }
    
    puzzleState.draggedPiece = null;
  };
  
  // Eventos de mouse
  pieceElement.addEventListener('mousedown', (e) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  });
  
  document.addEventListener('mousemove', (e) => {
    if (puzzleState.draggedPiece === index) {
      moveDrag(e.clientX, e.clientY);
    }
  });
  
  document.addEventListener('mouseup', () => {
    if (puzzleState.draggedPiece === index) {
      endDrag();
    }
  });
  
  // Eventos de touch
  pieceElement.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  });
  
  document.addEventListener('touchmove', (e) => {
    if (puzzleState.draggedPiece === index) {
      const touch = e.touches[0];
      moveDrag(touch.clientX, touch.clientY);
    }
  });
  
  document.addEventListener('touchend', () => {
    if (puzzleState.draggedPiece === index) {
      endDrag();
    }
  });
  
  // Eventos de teclado para acessibilidade
  pieceElement.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      
      // Simular clique para selecionar/soltar peça
      if (puzzleState.draggedPiece === null) {
        // Selecionar peça
        startDrag(
          pieceElement.getBoundingClientRect().left + pieceElement.offsetWidth / 2,
          pieceElement.getBoundingClientRect().top + pieceElement.offsetHeight / 2
        );
      } else if (puzzleState.draggedPiece === index) {
        // Soltar peça
        endDrag();
      }
    } else if (puzzleState.draggedPiece === index) {
      // Mover peça com teclado
      const step = 10;
      let clientX = pieceElement.getBoundingClientRect().left + pieceElement.offsetWidth / 2;
      let clientY = pieceElement.getBoundingClientRect().top + pieceElement.offsetHeight / 2;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          clientX -= step;
          break;
        case 'ArrowRight':
          e.preventDefault();
          clientX += step;
          break;
        case 'ArrowUp':
          e.preventDefault();
          clientY -= step;
          break;
        case 'ArrowDown':
          e.preventDefault();
          clientY += step;
          break;
      }
      
      moveDrag(clientX, clientY);
    }
  });
}

/**
 * Verifica se a peça está sobre a grade do quebra-cabeças
 * @param {number} clientX - Posição X do mouse/touch
 * @param {number} clientY - Posição Y do mouse/touch
 */
function checkPieceOverGrid(clientX, clientY) {
  // Obter retângulo da grade
  const gridRect = elements.puzzleBoardGrid.getBoundingClientRect();
  
  // Verificar se o mouse está sobre a grade
  const isOverGrid = (
    clientX >= gridRect.left &&
    clientX <= gridRect.right &&
    clientY >= gridRect.top &&
    clientY <= gridRect.bottom
  );
  
  if (isOverGrid) {
    // Calcular em qual célula da grade o mouse está
    const relativeX = clientX - gridRect.left;
    const relativeY = clientY - gridRect.top;
    
    const columns = getColumnsForLevel(puzzleState.selectedLevel);
    const rows = getRowsForLevel(puzzleState.selectedLevel);
    
    const cellWidth = gridRect.width / columns;
    const cellHeight = gridRect.height / rows;
    
    const col = Math.floor(relativeX / cellWidth);
    const row = Math.floor(relativeY / cellHeight);
    
    // Destacar a célula correspondente
    highlightCell(row, col);
  } else {
    // Remover destaque de todas as células
    clearCellHighlights();
  }
}

/**
 * Destaca uma célula da grade
 * @param {number} row - Linha da célula
 * @param {number} col - Coluna da célula
 */
function highlightCell(row, col) {
  // Remover destaque anterior
  clearCellHighlights();
  
  // Encontrar a célula correspondente
  const cell = document.querySelector(`.puzzle-cell[data-row="${row}"][data-col="${col}"]`);
  if (cell && !cell.classList.contains('filled')) {
    cell.classList.add('highlight');
  }
}

/**
 * Remove o destaque de todas as células
 */
function clearCellHighlights() {
  const cells = document.querySelectorAll('.puzzle-cell.highlight');
  cells.forEach(cell => {
    cell.classList.remove('highlight');
  });
}

/**
 * Tenta colocar uma peça na grade
 * @param {number} pieceIndex - Índice da peça
 * @returns {boolean} Se a peça foi colocada com sucesso
 */
function tryPlacePiece(pieceIndex) {
  const piece = puzzleState.pieces[pieceIndex];
  const pieceElement = piece.element;
  
  // Obter retângulo da peça
  const pieceRect = pieceElement.getBoundingClientRect();
  const pieceCenterX = pieceRect.left + pieceRect.width / 2;
  const pieceCenterY = pieceRect.top + pieceRect.height / 2;
  
  // Obter retângulo da grade
  const gridRect = elements.puzzleBoardGrid.getBoundingClientRect();
  
  // Verificar se o centro da peça está sobre a grade
  const isOverGrid = (
    pieceCenterX >= gridRect.left &&
    pieceCenterX <= gridRect.right &&
    pieceCenterY >= gridRect.top &&
    pieceCenterY <= gridRect.bottom
  );
  
  if (isOverGrid) {
    // Calcular em qual célula da grade o centro da peça está
    const relativeX = pieceCenterX - gridRect.left;
    const relativeY = pieceCenterY - gridRect.top;
    
    const columns = getColumnsForLevel(puzzleState.selectedLevel);
    const rows = getRowsForLevel(puzzleState.selectedLevel);
    
    const cellWidth = gridRect.width / columns;
    const cellHeight = gridRect.height / rows;
    
    const col = Math.floor(relativeX / cellWidth);
    const row = Math.floor(relativeY / cellHeight);
    
    // Verificar se a célula já está ocupada
    const cell = document.querySelector(`.puzzle-cell[data-row="${row}"][data-col="${col}"]`);
    if (cell && !cell.classList.contains('filled')) {
      // Verificar se a peça está na posição correta
      const isCorrectPosition = (piece.row === row && piece.col === col);
      
      // Colocar a peça na célula
      placePieceInCell(pieceElement, cell, isCorrectPosition);
      
      // Atualizar estado da peça
      piece.placed = true;
      puzzleState.placedPieces.push({
        index: pieceIndex,
        row,
        col,
        isCorrect: isCorrectPosition
      });
      
      // Reproduzir som de colocar peça
      playSound(elements.placeSound);
      
      // Mostrar feedback
      if (isCorrectPosition) {
        showFeedback('Muito bem! Peça na posição correta!');
        pieceElement.classList.add('correct-position');
      }
      
      // Verificar se o quebra-cabeças foi completado
      checkPuzzleCompletion();
      
      return true;
    }
  }
  
  return false;
}

/**
 * Coloca uma peça em uma célula da grade
 * @param {HTMLElement} pieceElement - Elemento da peça
 * @param {HTMLElement} cellElement - Elemento da célula
 * @param {boolean} isCorrect - Se a peça está na posição correta
 */
function placePieceInCell(pieceElement, cellElement, isCorrect) {
  // Marcar célula como preenchida
  cellElement.classList.add('filled');
  cellElement.classList.remove('highlight');
  
  // Mover peça para a célula
  pieceElement.style.position = 'absolute';
  pieceElement.style.left = '0';
  pieceElement.style.top = '0';
  pieceElement.style.width = '100%';
  pieceElement.style.height = '100%';
  pieceElement.style.margin = '0';
  pieceElement.style.zIndex = isCorrect ? '1' : '2';
  
  // Adicionar peça à célula
  cellElement.appendChild(pieceElement);
  
  // Anunciar para leitores de tela
  const message = isCorrect ? 
    'Peça colocada na posição correta!' : 
    'Peça colocada na grade.';
  announceToScreenReader(message);
}

/**
 * Verifica se o quebra-cabeças foi completado
 */
function checkPuzzleCompletion() {
  // Verificar se todas as peças foram colocadas
  const allPiecesPlaced = puzzleState.pieces.every(piece => piece.placed);
  
  if (allPiecesPlaced) {
    // Verificar se todas as peças estão nas posições corretas
    const allCorrect = puzzleState.placedPieces.every(placed => {
      const piece = puzzleState.pieces[placed.index];
      return piece.row === placed.row && piece.col === placed.col;
    });
    
    if (allCorrect) {
      // Quebra-cabeças completado corretamente
      puzzleState.gameCompleted = true;
      
      // Mostrar tela de conclusão após um breve delay
      setTimeout(showCompletion, 1000);
    } else {
      // Todas as peças colocadas, mas algumas estão em posições erradas
      showFeedback('Quase lá! Algumas peças estão em posições erradas.');
    }
  }
}

/**
 * Mostra a tela de conclusão
 */
function showCompletion() {
  // Reproduzir som de sucesso
  playSound(elements.successSound);
  
  // Mostrar tela de conclusão
  elements.puzzleBoard.classList.add('hidden');
  elements.completionScreen.classList.remove('hidden');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Parabéns! Você completou o quebra-cabeças!');
}

/**
 * Mostra a imagem de referência
 */
function showReferenceImage() {
  elements.referenceImageContainer.classList.remove('hidden');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Mostrando imagem de referência. Pressione Esc para fechar.');
  
  // Adicionar evento de teclado para fechar com Esc
  document.addEventListener('keydown', handleReferenceImageKeydown);
}

/**
 * Manipula eventos de teclado para a imagem de referência
 * @param {KeyboardEvent} e - Evento de teclado
 */
function handleReferenceImageKeydown(e) {
  if (e.key === 'Escape') {
    hideReferenceImage();
  }
}

/**
 * Esconde a imagem de referência
 */
function hideReferenceImage() {
  elements.referenceImageContainer.classList.add('hidden');
  
  // Remover evento de teclado
  document.removeEventListener('keydown', handleReferenceImageKeydown);
  
  // Anunciar para leitores de tela
  announceToScreenReader('Imagem de referência fechada.');
}

/**
 * Mostra uma dica destacando uma peça que está na posição errada
 */
function showHint() {
  // Verificar se há peças colocadas em posições erradas
  const incorrectPieces = puzzleState.placedPieces.filter(placed => {
    const piece = puzzleState.pieces[placed.index];
    return piece.row !== placed.row || piece.col !== placed.col;
  });
  
  if (incorrectPieces.length > 0) {
    // Escolher uma peça aleatória entre as incorretas
    const randomIndex = Math.floor(Math.random() * incorrectPieces.length);
    const incorrectPiece = incorrectPieces[randomIndex];
    const pieceElement = puzzleState.pieces[incorrectPiece.index].element;
    
    // Destacar a peça
    pieceElement.classList.add('hint');
    
    // Reproduzir som de dica
    playSound(elements.hintSound);
    
    // Remover destaque após alguns segundos
    setTimeout(() => {
      pieceElement.classList.remove('hint');
    }, 3000);
    
    // Mostrar feedback
    showFeedback('Esta peça está na posição errada!');
    
    // Anunciar para leitores de tela
    announceToScreenReader('Dica: Uma peça incorreta foi destacada.');
  } else if (puzzleState.pieces.some(piece => !piece.placed)) {
    // Há peças que ainda não foram colocadas
    // Escolher uma peça aleatória entre as não colocadas
    const unplacedPieces = puzzleState.pieces.filter(piece => !piece.placed);
    const randomIndex = Math.floor(Math.random() * unplacedPieces.length);
    const unplacedPiece = unplacedPieces[randomIndex];
    
    // Destacar a peça
    unplacedPiece.element.classList.add('hint');
    
    // Reproduzir som de dica
    playSound(elements.hintSound);
    
    // Remover destaque após alguns segundos
    setTimeout(() => {
      unplacedPiece.element.classList.remove('hint');
    }, 3000);
    
    // Mostrar feedback
    showFeedback('Tente colocar esta peça na grade!');
    
    // Anunciar para leitores de tela
    announceToScreenReader('Dica: Uma peça não colocada foi destacada.');
  } else {
    // Todas as peças estão colocadas corretamente
    showFeedback('Todas as peças estão nas posições corretas!');
    
    // Anunciar para leitores de tela
    announceToScreenReader('Todas as peças estão nas posições corretas!');
  }
}

/**
 * Reinicia o quebra-cabeças com a mesma imagem e nível
 */
function restartPuzzle() {
  startPuzzle();
}

/**
 * Mostra a seleção de quebra-cabeças
 */
function showPuzzleSelection() {
  elements.puzzleBoard.classList.add('hidden');
  elements.completionScreen.classList.add('hidden');
  elements.puzzleSelection.classList.remove('hidden');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Escolha uma imagem e nível para o quebra-cabeças.');
}

/**
 * Cria a grade do quebra-cabeças
 */
function createPuzzleGrid() {
  // Limpar grade
  elements.puzzleBoardGrid.innerHTML = '';
  
  // Adicionar classe de nível
  elements.puzzleBoardGrid.className = `puzzle-board-grid ${puzzleState.selectedLevel}`;
  
  // Determinar número de colunas e linhas
  const columns = getColumnsForLevel(puzzleState.selectedLevel);
  const rows = getRowsForLevel(puzzleState.selectedLevel);
  
  // Configurar grade CSS
  elements.puzzleBoardGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  elements.puzzleBoardGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  
  // Criar células
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const cell = document.createElement('div');
      cell.className = 'puzzle-cell';
      cell.dataset.row = row;
      cell.dataset.col = col;
      
      elements.puzzleBoardGrid.appendChild(cell);
    }
  }
}

/**
 * Obtém o número de colunas para o nível selecionado
 * @param {string} level - Nível do jogo
 * @returns {number} Número de colunas
 */
function getColumnsForLevel(level) {
  switch (level) {
    case 'easy': return 3;
    case 'medium': return 4;
    case 'hard': return 5;
    default: return 3;
  }
}

/**
 * Obtém o número de linhas para o nível selecionado
 * @param {string} level - Nível do jogo
 * @returns {number} Número de linhas
 */
function getRowsForLevel(level) {
  switch (level) {
    case 'easy': return 2;
    case 'medium': return 3;
    case 'hard': return 4;
    default: return 2;
  }
}

/**
 * Embaralha as peças visualmente
 */
function shufflePieces() {
  // Obter todas as peças
  const pieceElements = Array.from(document.querySelectorAll('.puzzle-piece'));
  
  // Embaralhar ordem no DOM
  pieceElements.forEach(piece => {
    elements.puzzlePieces.appendChild(piece);
  });
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
 * Ativa ou desativa os sons do jogo
 */
function toggleSound() {
  puzzleConfig.soundEnabled = !puzzleConfig.soundEnabled;
  
  // Atualizar ícone e classe
  if (puzzleConfig.soundEnabled) {
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
  const message = puzzleConfig.soundEnabled ? 'Sons ativados' : 'Sons desativados';
  announceToScreenReader(message);
}

/**
 * Reproduz um som se os sons estiverem ativados
 * @param {HTMLAudioElement} audioElement - Elemento de áudio
 */
function playSound(audioElement) {
  if (puzzleConfig.soundEnabled && audioElement) {
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
  // Usar a função utilitária do script principal
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
console.log('Quebra-Cabeças inicializado');
