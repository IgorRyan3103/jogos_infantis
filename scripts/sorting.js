/**
 * Jogo de Ordenar - Script principal
 * Implementação em JavaScript puro para crianças autistas
 * Foco em acessibilidade, feedback claro e experiência previsível
 */

// Configuração do jogo
const sortingConfig = {
  // Número de itens por nível
  itemsCount: {
    easy: 3,
    medium: 5,
    hard: 7
  },
  // Categorias disponíveis
  categories: {
    size: {
      name: 'Tamanho',
      items: [
        { value: 1, display: '10%', style: 'transform: scale(0.3);' },
        { value: 2, display: '20%', style: 'transform: scale(0.4);' },
        { value: 3, display: '30%', style: 'transform: scale(0.5);' },
        { value: 4, display: '40%', style: 'transform: scale(0.6);' },
        { value: 5, display: '50%', style: 'transform: scale(0.7);' },
        { value: 6, display: '60%', style: 'transform: scale(0.8);' },
        { value: 7, display: '70%', style: 'transform: scale(0.9);' },
        { value: 8, display: '80%', style: 'transform: scale(1.0);' },
        { value: 9, display: '90%', style: 'transform: scale(1.1);' }
      ]
    },
    color: {
      name: 'Cor',
      items: [
        { value: 1, display: '', style: 'background-color: #E6E6FA;' }, // Lavanda claro
        { value: 2, display: '', style: 'background-color: #ADD8E6;' }, // Azul claro
        { value: 3, display: '', style: 'background-color: #90EE90;' }, // Verde claro
        { value: 4, display: '', style: 'background-color: #FFFFE0;' }, // Amarelo claro
        { value: 5, display: '', style: 'background-color: #FFB6C1;' }, // Rosa claro
        { value: 6, display: '', style: 'background-color: #FFA07A;' }, // Salmão claro
        { value: 7, display: '', style: 'background-color: #D3D3D3;' }, // Cinza claro
        { value: 8, display: '', style: 'background-color: #F5DEB3;' }, // Trigo
        { value: 9, display: '', style: 'background-color: #E0FFFF;' }  // Ciano claro
      ]
    },
    number: {
      name: 'Número',
      items: [
        { value: 1, display: '1', style: '' },
        { value: 2, display: '2', style: '' },
        { value: 3, display: '3', style: '' },
        { value: 4, display: '4', style: '' },
        { value: 5, display: '5', style: '' },
        { value: 6, display: '6', style: '' },
        { value: 7, display: '7', style: '' },
        { value: 8, display: '8', style: '' },
        { value: 9, display: '9', style: '' }
      ]
    },
    shape: {
      name: 'Forma',
      items: [
        { value: 1, display: '●', style: 'font-size: 2.5rem;' }, // Círculo
        { value: 2, display: '■', style: 'font-size: 2.5rem;' }, // Quadrado
        { value: 3, display: '▲', style: 'font-size: 2.5rem;' }, // Triângulo
        { value: 4, display: '◆', style: 'font-size: 2.5rem;' }, // Losango
        { value: 5, display: '★', style: 'font-size: 2.5rem;' }, // Estrela
        { value: 6, display: '✚', style: 'font-size: 2.5rem;' }, // Cruz
        { value: 7, display: '♥', style: 'font-size: 2.5rem;' }, // Coração
        { value: 8, display: '◐', style: 'font-size: 2.5rem;' }, // Meio círculo
        { value: 9, display: '▣', style: 'font-size: 2.5rem;' }  // Quadrado com ponto
      ]
    }
  },
  // Sons ativados por padrão
  soundEnabled: true
};

// Estado do jogo
let gameState = {
  selectedCategory: null,
  selectedLevel: null,
  items: [],
  placedItems: [],
  draggedItem: null,
  gameStarted: false,
  gameCompleted: false,
  checkAttempts: 0
};

// Elementos do DOM
const elements = {
  categorySelection: document.getElementById('category-selection'),
  gameBoard: document.getElementById('game-board'),
  completionScreen: document.getElementById('completion-screen'),
  sortingContainer: document.getElementById('sorting-container'),
  statusMessage: document.getElementById('status-message'),
  soundToggle: document.getElementById('sound-toggle'),
  
  // Botões de categoria
  sizeButton: document.getElementById('size-button'),
  colorButton: document.getElementById('color-button'),
  numberButton: document.getElementById('number-button'),
  shapeButton: document.getElementById('shape-button'),
  
  // Botões de nível
  easyButton: document.getElementById('easy-button'),
  mediumButton: document.getElementById('medium-button'),
  hardButton: document.getElementById('hard-button'),
  
  // Botões de controle
  startGameButton: document.getElementById('start-game-button'),
  checkButton: document.getElementById('check-button'),
  hintButton: document.getElementById('hint-button'),
  restartButton: document.getElementById('restart-button'),
  newGameButton: document.getElementById('new-game-button'),
  playAgainButton: document.getElementById('play-again-button'),
  chooseCategoryButton: document.getElementById('choose-category-button'),
  
  // Sons
  pickSound: document.getElementById('pick-sound'),
  placeSound: document.getElementById('place-sound'),
  successSound: document.getElementById('success-sound'),
  errorSound: document.getElementById('error-sound'),
  hintSound: document.getElementById('hint-sound')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Configurar eventos dos botões de categoria
  elements.sizeButton.addEventListener('click', () => selectCategory('size'));
  elements.colorButton.addEventListener('click', () => selectCategory('color'));
  elements.numberButton.addEventListener('click', () => selectCategory('number'));
  elements.shapeButton.addEventListener('click', () => selectCategory('shape'));
  
  // Configurar eventos dos botões de nível
  elements.easyButton.addEventListener('click', () => selectLevel('easy'));
  elements.mediumButton.addEventListener('click', () => selectLevel('medium'));
  elements.hardButton.addEventListener('click', () => selectLevel('hard'));
  
  // Configurar eventos dos botões de controle
  elements.startGameButton.addEventListener('click', startGame);
  elements.checkButton.addEventListener('click', checkOrder);
  elements.hintButton.addEventListener('click', showHint);
  elements.restartButton.addEventListener('click', restartGame);
  elements.newGameButton.addEventListener('click', showCategorySelection);
  elements.playAgainButton.addEventListener('click', restartGame);
  elements.chooseCategoryButton.addEventListener('click', showCategorySelection);
  
  // Configurar controle de som
  elements.soundToggle.addEventListener('click', toggleSound);
});

/**
 * Seleciona uma categoria para o jogo
 * @param {string} category - Categoria selecionada (size, color, number, shape)
 */
function selectCategory(category) {
  // Verificar se a categoria existe
  if (!sortingConfig.categories[category]) return;
  
  // Remover seleção anterior
  const buttons = [elements.sizeButton, elements.colorButton, elements.numberButton, elements.shapeButton];
  buttons.forEach(button => {
    button.classList.remove('selected');
    button.setAttribute('aria-pressed', 'false');
  });
  
  // Selecionar nova categoria
  const buttonMap = {
    size: elements.sizeButton,
    color: elements.colorButton,
    number: elements.numberButton,
    shape: elements.shapeButton
  };
  
  if (buttonMap[category]) {
    buttonMap[category].classList.add('selected');
    buttonMap[category].setAttribute('aria-pressed', 'true');
  }
  
  // Atualizar estado
  gameState.selectedCategory = category;
  
  // Verificar se pode habilitar o botão de início
  checkStartButton();
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Categoria selecionada: ${sortingConfig.categories[category].name}`);
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
  gameState.selectedLevel = level;
  
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
  const canStart = gameState.selectedCategory && gameState.selectedLevel;
  elements.startGameButton.disabled = !canStart;
  
  if (canStart) {
    elements.startGameButton.classList.add('pulse');
    setTimeout(() => {
      elements.startGameButton.classList.remove('pulse');
    }, 500);
  }
}

/**
 * Inicia o jogo com a categoria e nível selecionados
 */
function startGame() {
  if (!gameState.selectedCategory || !gameState.selectedLevel) return;
  
  // Configurar estado do jogo
  gameState.items = [];
  gameState.placedItems = [];
  gameState.draggedItem = null;
  gameState.gameStarted = true;
  gameState.gameCompleted = false;
  gameState.checkAttempts = 0;
  
  // Criar itens para ordenar
  createSortingItems();
  
  // Mostrar tela do jogo
  elements.categorySelection.classList.add('hidden');
  elements.completionScreen.classList.add('hidden');
  elements.gameBoard.classList.remove('hidden');
  
  // Limpar feedback
  updateStatusMessage('Arraste os itens para ordená-los');
  
  // Anunciar início do jogo para leitores de tela
  const levelNames = { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' };
  const categoryName = sortingConfig.categories[gameState.selectedCategory].name;
  announceToScreenReader(`Jogo de Ordenar iniciado. Categoria: ${categoryName}, Nível: ${levelNames[gameState.selectedLevel]}. Arraste os itens para ordená-los do menor para o maior.`);
}

/**
 * Cria os itens para ordenar
 */
function createSortingItems() {
  // Limpar container de ordenação
  elements.sortingContainer.innerHTML = '';
  
  // Criar container de itens
  const itemsContainer = document.createElement('div');
  itemsContainer.className = 'sorting-items';
  
  // Criar container de destino
  const targetContainer = document.createElement('div');
  targetContainer.className = 'sorting-target';
  
  // Adicionar containers ao DOM
  elements.sortingContainer.appendChild(itemsContainer);
  elements.sortingContainer.appendChild(targetContainer);
  
  // Determinar número de itens com base no nível
  const totalItems = sortingConfig.itemsCount[gameState.selectedLevel];
  
  // Obter itens da categoria selecionada
  const categoryItems = sortingConfig.categories[gameState.selectedCategory].items;
  
  // Selecionar itens aleatórios da categoria
  const selectedItems = [];
  const availableItems = [...categoryItems];
  
  for (let i = 0; i < totalItems; i++) {
    if (availableItems.length === 0) break;
    
    const randomIndex = Math.floor(Math.random() * availableItems.length);
    selectedItems.push(availableItems[randomIndex]);
    availableItems.splice(randomIndex, 1);
  }
  
  // Ordenar itens por valor (para referência interna)
  selectedItems.sort((a, b) => a.value - b.value);
  
  // Criar itens no DOM
  gameState.items = selectedItems.map((item, index) => {
    // Criar elemento de item
    const itemElement = document.createElement('div');
    itemElement.className = `sorting-item ${gameState.selectedCategory}`;
    itemElement.dataset.index = index;
    itemElement.dataset.value = item.value;
    itemElement.tabIndex = 0; // Torna o item focável para acessibilidade
    itemElement.setAttribute('role', 'button');
    itemElement.setAttribute('aria-label', `Item ${index + 1} para ordenar`);
    
    // Adicionar conteúdo com base na categoria
    if (item.display) {
      itemElement.textContent = item.display;
    }
    
    // Aplicar estilo específico
    if (item.style) {
      const styles = item.style.split(';');
      styles.forEach(style => {
        if (style.trim()) {
          const [property, value] = style.split(':');
          itemElement.style[property.trim()] = value.trim();
        }
      });
    }
    
    // Adicionar ao container
    itemsContainer.appendChild(itemElement);
    
    // Configurar eventos de drag and drop
    setupDragEvents(itemElement, index);
    
    return {
      element: itemElement,
      index,
      value: item.value,
      display: item.display,
      style: item.style,
      placed: false
    };
  });
  
  // Criar slots de destino
  for (let i = 0; i < totalItems; i++) {
    const slot = document.createElement('div');
    slot.className = 'target-slot';
    slot.dataset.position = i;
    targetContainer.appendChild(slot);
  }
  
  // Embaralhar itens visualmente
  shuffleItems(itemsContainer);
}

/**
 * Configura eventos de drag and drop para um item
 * @param {HTMLElement} itemElement - Elemento do item
 * @param {number} index - Índice do item
 */
function setupDragEvents(itemElement, index) {
  // Variáveis para controlar o drag
  let isDragging = false;
  let startX, startY;
  let offsetX, offsetY;
  let originalPosition;
  
  // Função para iniciar o drag
  const startDrag = (clientX, clientY) => {
    isDragging = true;
    gameState.draggedItem = index;
    
    // Salvar posição original
    originalPosition = {
      left: itemElement.offsetLeft,
      top: itemElement.offsetTop
    };
    
    // Calcular offset do mouse dentro do item
    const rect = itemElement.getBoundingClientRect();
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
    
    // Salvar posição inicial do mouse
    startX = clientX;
    startY = clientY;
    
    // Adicionar classe de arrastar
    itemElement.classList.add('dragging');
    
    // Trazer para frente
    itemElement.style.zIndex = '100';
    
    // Reproduzir som de pegar item
    playSound(elements.pickSound);
    
    // Anunciar para leitores de tela
    announceToScreenReader(`Item ${index + 1} selecionado`);
  };
  
  // Função para mover durante o drag
  const moveDrag = (clientX, clientY) => {
    if (!isDragging) return;
    
    // Calcular nova posição
    const containerRect = itemElement.parentElement.getBoundingClientRect();
    const newLeft = clientX - containerRect.left - offsetX;
    const newTop = clientY - containerRect.top - offsetY;
    
    // Aplicar nova posição
    itemElement.style.position = 'absolute';
    itemElement.style.left = `${newLeft}px`;
    itemElement.style.top = `${newTop}px`;
    
    // Verificar se está sobre um slot de destino
    checkItemOverSlots(clientX, clientY);
  };
  
  // Função para finalizar o drag
  const endDrag = () => {
    if (!isDragging) return;
    
    isDragging = false;
    
    // Remover classe de arrastar
    itemElement.classList.remove('dragging');
    
    // Verificar se o item foi colocado em um slot
    const placed = tryPlaceItem(index);
    
    if (!placed) {
      // Retornar à posição original no container de itens
      itemElement.style.position = 'relative';
      itemElement.style.left = '0';
      itemElement.style.top = '0';
      itemElement.style.zIndex = '';
    }
    
    gameState.draggedItem = null;
  };
  
  // Eventos de mouse
  itemElement.addEventListener('mousedown', (e) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  });
  
  document.addEventListener('mousemove', (e) => {
    if (gameState.draggedItem === index) {
      moveDrag(e.clientX, e.clientY);
    }
  });
  
  document.addEventListener('mouseup', () => {
    if (gameState.draggedItem === index) {
      endDrag();
    }
  });
  
  // Eventos de touch
  itemElement.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  });
  
  document.addEventListener('touchmove', (e) => {
    if (gameState.draggedItem === index) {
      const touch = e.touches[0];
      moveDrag(touch.clientX, touch.clientY);
    }
  });
  
  document.addEventListener('touchend', () => {
    if (gameState.draggedItem === index) {
      endDrag();
    }
  });
  
  // Eventos de teclado para acessibilidade
  itemElement.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      
      // Simular clique para selecionar/soltar item
      if (gameState.draggedItem === null) {
        // Selecionar item
        startDrag(
          itemElement.getBoundingClientRect().left + itemElement.offsetWidth / 2,
          itemElement.getBoundingClientRect().top + itemElement.offsetHeight / 2
        );
      } else if (gameState.draggedItem === index) {
        // Soltar item
        endDrag();
      }
    } else if (gameState.draggedItem === index) {
      // Mover item com teclado
      const step = 10;
      let clientX = itemElement.getBoundingClientRect().left + itemElement.offsetWidth / 2;
      let clientY = itemElement.getBoundingClientRect().top + itemElement.offsetHeight / 2;
      
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
 * Verifica se o item está sobre slots de destino
 * @param {number} clientX - Posição X do mouse/touch
 * @param {number} clientY - Posição Y do mouse/touch
 */
function checkItemOverSlots(clientX, clientY) {
  // Obter todos os slots
  const slots = document.querySelectorAll('.target-slot');
  
  // Remover destaque de todos os slots
  slots.forEach(slot => {
    slot.classList.remove('highlight');
  });
  
  // Verificar cada slot
  slots.forEach(slot => {
    const rect = slot.getBoundingClientRect();
    
    // Verificar se o mouse está sobre o slot
    const isOverSlot = (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
    
    if (isOverSlot && !slot.classList.contains('filled')) {
      // Destacar o slot
      slot.classList.add('highlight');
    }
  });
}

/**
 * Tenta colocar um item em um slot
 * @param {number} itemIndex - Índice do item
 * @returns {boolean} Se o item foi colocado com sucesso
 */
function tryPlaceItem(itemIndex) {
  const item = gameState.items[itemIndex];
  const itemElement = item.element;
  
  // Obter retângulo do item
  const itemRect = itemElement.getBoundingClientRect();
  const itemCenterX = itemRect.left + itemRect.width / 2;
  const itemCenterY = itemRect.top + itemRect.height / 2;
  
  // Obter todos os slots
  const slots = document.querySelectorAll('.target-slot');
  
  // Verificar cada slot
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const slotRect = slot.getBoundingClientRect();
    
    // Verificar se o centro do item está sobre o slot
    const isOverSlot = (
      itemCenterX >= slotRect.left &&
      itemCenterX <= slotRect.right &&
      itemCenterY >= slotRect.top &&
      itemCenterY <= slotRect.bottom
    );
    
    if (isOverSlot && !slot.classList.contains('filled')) {
      // Colocar o item no slot
      placeItemInSlot(itemElement, slot, parseInt(slot.dataset.position));
      
      // Atualizar estado do item
      item.placed = true;
      
      // Atualizar lista de itens colocados
      const existingPlacedItem = gameState.placedItems.find(placed => placed.position === parseInt(slot.dataset.position));
      if (existingPlacedItem) {
        // Remover item anterior desta posição
        gameState.placedItems = gameState.placedItems.filter(placed => placed.position !== parseInt(slot.dataset.position));
      }
      
      // Adicionar novo item colocado
      gameState.placedItems.push({
        index: itemIndex,
        position: parseInt(slot.dataset.position),
        value: item.value
      });
      
      // Reproduzir som de colocar item
      playSound(elements.placeSound);
      
      // Anunciar para leitores de tela
      announceToScreenReader(`Item colocado na posição ${parseInt(slot.dataset.position) + 1}`);
      
      return true;
    }
  }
  
  return false;
}

/**
 * Coloca um item em um slot
 * @param {HTMLElement} itemElement - Elemento do item
 * @param {HTMLElement} slotElement - Elemento do slot
 * @param {number} position - Posição do slot
 */
function placeItemInSlot(itemElement, slotElement, position) {
  // Marcar slot como preenchido
  slotElement.classList.add('filled');
  slotElement.classList.remove('highlight');
  
  // Mover item para o slot
  itemElement.style.position = 'absolute';
  itemElement.style.left = '50%';
  itemElement.style.top = '50%';
  itemElement.style.transform = 'translate(-50%, -50%)';
  itemElement.style.margin = '0';
  itemElement.style.zIndex = '1';
  
  // Adicionar item ao slot
  slotElement.appendChild(itemElement);
}

/**
 * Embaralha os itens visualmente
 * @param {HTMLElement} container - Container dos itens
 */
function shuffleItems(container) {
  // Obter todos os itens
  const itemElements = Array.from(container.querySelectorAll('.sorting-item'));
  
  // Embaralhar array
  for (let i = itemElements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    container.appendChild(itemElements[j]);
  }
}

/**
 * Verifica se os itens estão na ordem correta
 */
function checkOrder() {
  // Verificar se todos os itens estão colocados
  const allItemsPlaced = gameState.items.every(item => item.placed);
  
  if (!allItemsPlaced) {
    updateStatusMessage('Coloque todos os itens antes de verificar!');
    return;
  }
  
  // Incrementar contador de tentativas
  gameState.checkAttempts++;
  
  // Verificar se os itens estão na ordem correta
  let isCorrect = true;
  let incorrectPositions = [];
  
  // Ordenar itens colocados por posição
  const sortedPlacedItems = [...gameState.placedItems].sort((a, b) => a.position - b.position);
  
  // Verificar se os valores estão em ordem crescente
  for (let i = 0; i < sortedPlacedItems.length - 1; i++) {
    if (sortedPlacedItems[i].value > sortedPlacedItems[i + 1].value) {
      isCorrect = false;
      incorrectPositions.push(i, i + 1);
    }
  }
  
  if (isCorrect) {
    // Ordem correta
    updateStatusMessage('Parabéns! A ordem está correta!');
    
    // Marcar todos os itens como corretos
    sortedPlacedItems.forEach(placed => {
      const itemElement = gameState.items[placed.index].element;
      itemElement.classList.add('correct');
    });
    
    // Reproduzir som de sucesso
    playSound(elements.successSound);
    
    // Anunciar para leitores de tela
    announceToScreenReader('Parabéns! Você ordenou corretamente todos os itens!');
    
    // Mostrar tela de conclusão após um breve delay
    setTimeout(() => {
      showCompletion();
    }, 1500);
  } else {
    // Ordem incorreta
    updateStatusMessage('Ops! A ordem não está correta. Tente novamente!');
    
    // Marcar itens incorretos
    const uniqueIncorrectPositions = [...new Set(incorrectPositions)];
    uniqueIncorrectPositions.forEach(position => {
      const placed = sortedPlacedItems[position];
      const itemElement = gameState.items[placed.index].element;
      itemElement.classList.add('incorrect');
    });
    
    // Reproduzir som de erro
    playSound(elements.errorSound);
    
    // Anunciar para leitores de tela
    announceToScreenReader('A ordem não está correta. Tente novamente!');
    
    // Remover marcação após um tempo
    setTimeout(() => {
      document.querySelectorAll('.sorting-item.incorrect').forEach(item => {
        item.classList.remove('incorrect');
      });
    }, 2000);
    
    // Mostrar dica após várias tentativas
    if (gameState.checkAttempts >= 3) {
      setTimeout(() => {
        showHint();
      }, 2000);
    }
  }
}

/**
 * Mostra uma dica destacando itens fora de ordem
 */
function showHint() {
  // Verificar se todos os itens estão colocados
  const allItemsPlaced = gameState.items.every(item => item.placed);
  
  if (!allItemsPlaced) {
    // Destacar um item não colocado
    const unplacedItems = gameState.items.filter(item => !item.placed);
    if (unplacedItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * unplacedItems.length);
      const unplacedItem = unplacedItems[randomIndex];
      
      // Destacar o item
      unplacedItem.element.classList.add('hint');
      
      // Reproduzir som de dica
      playSound(elements.hintSound);
      
      // Remover destaque após alguns segundos
      setTimeout(() => {
        unplacedItem.element.classList.remove('hint');
      }, 3000);
      
      // Mostrar feedback
      updateStatusMessage('Coloque este item na ordem!');
      
      // Anunciar para leitores de tela
      announceToScreenReader('Dica: Um item não colocado foi destacado.');
    }
    return;
  }
  
  // Ordenar itens colocados por posição
  const sortedPlacedItems = [...gameState.placedItems].sort((a, b) => a.position - b.position);
  
  // Encontrar itens fora de ordem
  let incorrectPairs = [];
  for (let i = 0; i < sortedPlacedItems.length - 1; i++) {
    if (sortedPlacedItems[i].value > sortedPlacedItems[i + 1].value) {
      incorrectPairs.push([i, i + 1]);
    }
  }
  
  if (incorrectPairs.length > 0) {
    // Escolher um par aleatório
    const randomPairIndex = Math.floor(Math.random() * incorrectPairs.length);
    const [pos1, pos2] = incorrectPairs[randomPairIndex];
    
    // Destacar os itens
    const item1 = gameState.items[sortedPlacedItems[pos1].index];
    const item2 = gameState.items[sortedPlacedItems[pos2].index];
    
    item1.element.classList.add('hint');
    item2.element.classList.add('hint');
    
    // Reproduzir som de dica
    playSound(elements.hintSound);
    
    // Remover destaque após alguns segundos
    setTimeout(() => {
      item1.element.classList.remove('hint');
      item2.element.classList.remove('hint');
    }, 3000);
    
    // Mostrar feedback
    updateStatusMessage('Estes itens estão na ordem errada!');
    
    // Anunciar para leitores de tela
    announceToScreenReader('Dica: Dois itens fora de ordem foram destacados.');
  } else {
    // Todos os itens estão na ordem correta
    updateStatusMessage('Todos os itens parecem estar na ordem correta!');
    
    // Anunciar para leitores de tela
    announceToScreenReader('Todos os itens parecem estar na ordem correta!');
  }
}

/**
 * Mostra a tela de conclusão
 */
function showCompletion() {
  // Atualizar estado
  gameState.gameCompleted = true;
  
  // Mostrar tela de conclusão
  elements.gameBoard.classList.add('hidden');
  elements.completionScreen.classList.remove('hidden');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Parabéns! Você completou o jogo de ordenar!');
}

/**
 * Reinicia o jogo com a mesma categoria e nível
 */
function restartGame() {
  startGame();
}

/**
 * Mostra a seleção de categoria
 */
function showCategorySelection() {
  elements.gameBoard.classList.add('hidden');
  elements.completionScreen.classList.add('hidden');
  elements.categorySelection.classList.remove('hidden');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Escolha uma categoria e nível para o jogo.');
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
 * Ativa ou desativa os sons do jogo
 */
function toggleSound() {
  sortingConfig.soundEnabled = !sortingConfig.soundEnabled;
  
  // Atualizar ícone e classe
  if (sortingConfig.soundEnabled) {
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
  const message = sortingConfig.soundEnabled ? 'Sons ativados' : 'Sons desativados';
  announceToScreenReader(message);
}

/**
 * Reproduz um som se os sons estiverem ativados
 * @param {HTMLAudioElement} audioElement - Elemento de áudio
 */
function playSound(audioElement) {
  if (sortingConfig.soundEnabled && audioElement) {
    // Usar a função utilitária do script principal se disponível
    if (window.gameUtils && window.gameUtils.playSound) {
      window.gameUtils.playSound(audioElement, sortingConfig.soundEnabled);
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
console.log('Jogo de Ordenar inicializado');
