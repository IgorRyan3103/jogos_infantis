/**
 * Jogo de Associação - Script principal
 * Implementação em JavaScript puro para crianças autistas
 * Foco em acessibilidade, feedback claro e experiência previsível
 */

// Configuração do jogo
const associationConfig = {
  // Sons ativados por padrão
  soundEnabled: true,
  // Categoria atual
  currentCategory: null,
  // Nível atual
  currentLevel: null,
  // Contador de associações corretas
  matchCount: 0,
  // Total de associações necessárias
  totalMatches: 0,
  // Item sendo arrastado atualmente
  draggedItem: null,
  // Dados do jogo por categoria e nível
  gameData: {
    // Objetos Relacionados
    objects: {
      easy: [
        { source: "escova", target: "dentes", image: "escova.svg", targetImage: "dentes.svg", alt: "Escova de dentes" },
        { source: "sapato", target: "pé", image: "sapato.svg", targetImage: "pe.svg", alt: "Sapato" },
        { source: "garfo", target: "prato", image: "garfo.svg", targetImage: "prato.svg", alt: "Garfo" }
      ],
      medium: [
        { source: "martelo", target: "prego", image: "martelo.svg", targetImage: "prego.svg", alt: "Martelo" },
        { source: "chave", target: "fechadura", image: "chave.svg", targetImage: "fechadura.svg", alt: "Chave" },
        { source: "lápis", target: "papel", image: "lapis.svg", targetImage: "papel.svg", alt: "Lápis" },
        { source: "tesoura", target: "tecido", image: "tesoura.svg", targetImage: "tecido.svg", alt: "Tesoura" }
      ],
      hard: [
        { source: "nuvem", target: "chuva", image: "nuvem.svg", targetImage: "chuva.svg", alt: "Nuvem" },
        { source: "semente", target: "planta", image: "semente.svg", targetImage: "planta.svg", alt: "Semente" },
        { source: "ovo", target: "galinha", image: "ovo.svg", targetImage: "galinha.svg", alt: "Ovo" },
        { source: "sol", target: "flor", image: "sol.svg", targetImage: "flor.svg", alt: "Sol" },
        { source: "livro", target: "conhecimento", image: "livro.svg", targetImage: "conhecimento.svg", alt: "Livro" }
      ]
    },
    // Formas e Cores
    shapes: {
      easy: [
        { source: "circulo-azul", target: "circulo-azul", image: "circulo-azul.svg", targetImage: "circulo-azul.svg", alt: "Círculo azul" },
        { source: "quadrado-vermelho", target: "quadrado-vermelho", image: "quadrado-vermelho.svg", targetImage: "quadrado-vermelho.svg", alt: "Quadrado vermelho" },
        { source: "triangulo-verde", target: "triangulo-verde", image: "triangulo-verde.svg", targetImage: "triangulo-verde.svg", alt: "Triângulo verde" }
      ],
      medium: [
        { source: "circulo-amarelo", target: "circulo-amarelo", image: "circulo-amarelo.svg", targetImage: "circulo-amarelo.svg", alt: "Círculo amarelo" },
        { source: "quadrado-azul", target: "quadrado-azul", image: "quadrado-azul.svg", targetImage: "quadrado-azul.svg", alt: "Quadrado azul" },
        { source: "triangulo-vermelho", target: "triangulo-vermelho", image: "triangulo-vermelho.svg", targetImage: "triangulo-vermelho.svg", alt: "Triângulo vermelho" },
        { source: "estrela-verde", target: "estrela-verde", image: "estrela-verde.svg", targetImage: "estrela-verde.svg", alt: "Estrela verde" }
      ],
      hard: [
        { source: "circulo-vermelho", target: "quadrado-vermelho", image: "circulo-vermelho.svg", targetImage: "quadrado-vermelho.svg", alt: "Círculo vermelho" },
        { source: "quadrado-verde", target: "triangulo-verde", image: "quadrado-verde.svg", targetImage: "triangulo-verde.svg", alt: "Quadrado verde" },
        { source: "triangulo-azul", target: "circulo-azul", image: "triangulo-azul.svg", targetImage: "circulo-azul.svg", alt: "Triângulo azul" },
        { source: "estrela-amarela", target: "hexagono-amarelo", image: "estrela-amarela.svg", targetImage: "hexagono-amarelo.svg", alt: "Estrela amarela" },
        { source: "oval-roxo", target: "losango-roxo", image: "oval-roxo.svg", targetImage: "losango-roxo.svg", alt: "Oval roxo" }
      ]
    },
    // Causa e Efeito
    cause: {
      easy: [
        { source: "interruptor", target: "luz", image: "interruptor.svg", targetImage: "luz.svg", alt: "Interruptor" },
        { source: "botao", target: "campainha", image: "botao.svg", targetImage: "campainha.svg", alt: "Botão" },
        { source: "torneira", target: "agua", image: "torneira.svg", targetImage: "agua.svg", alt: "Torneira" }
      ],
      medium: [
        { source: "chuva", target: "planta-crescendo", image: "chuva.svg", targetImage: "planta-crescendo.svg", alt: "Chuva" },
        { source: "sol", target: "roupa-secando", image: "sol.svg", targetImage: "roupa-secando.svg", alt: "Sol" },
        { source: "vento", target: "folhas-voando", image: "vento.svg", targetImage: "folhas-voando.svg", alt: "Vento" },
        { source: "fogo", target: "agua-fervendo", image: "fogo.svg", targetImage: "agua-fervendo.svg", alt: "Fogo" }
      ],
      hard: [
        { source: "farinha", target: "bolo", image: "farinha.svg", targetImage: "bolo.svg", alt: "Farinha" },
        { source: "madeira", target: "cadeira", image: "madeira.svg", targetImage: "cadeira.svg", alt: "Madeira" },
        { source: "la", target: "sueter", image: "la.svg", targetImage: "sueter.svg", alt: "Lã" },
        { source: "algodao", target: "camiseta", image: "algodao.svg", targetImage: "camiseta.svg", alt: "Algodão" },
        { source: "argila", target: "vaso", image: "argila.svg", targetImage: "vaso.svg", alt: "Argila" }
      ]
    }
  }
};

// Elementos do DOM
const elements = {
  // Telas
  categorySelection: document.getElementById('category-selection'),
  levelSelection: document.getElementById('level-selection'),
  gameScreen: document.getElementById('game-screen'),
  completionScreen: document.getElementById('completion-screen'),
  
  // Botões de navegação
  backButton: document.getElementById('back-button'),
  backToCategory: document.getElementById('back-to-category'),
  backToLevel: document.getElementById('back-to-level'),
  
  // Botões de categoria
  categoryButtons: document.querySelectorAll('.category-button'),
  
  // Botões de nível
  levelButtons: document.querySelectorAll('.level-button'),
  
  // Elementos do jogo
  sourceContainer: document.getElementById('source-container'),
  targetContainer: document.getElementById('target-container'),
  statusMessage: document.getElementById('status-message'),
  matchCount: document.getElementById('match-count'),
  totalMatches: document.getElementById('total-matches'),
  
  // Botões de controle do jogo
  hintButton: document.getElementById('hint-button'),
  restartButton: document.getElementById('restart-button'),
  
  // Elementos da tela de conclusão
  nextLevelButton: document.getElementById('next-level-button'),
  replayLevelButton: document.getElementById('replay-level-button'),
  backToLevelsButton: document.getElementById('back-to-levels-button'),
  
  // Controle de som
  soundToggle: document.getElementById('sound-toggle'),
  
  // Sons
  successSound: document.getElementById('success-sound'),
  matchSound: document.getElementById('match-sound'),
  errorSound: document.getElementById('error-sound'),
  hintSound: document.getElementById('hint-sound'),
  completionSound: document.getElementById('completion-sound')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Configurar eventos dos botões de navegação
  elements.backButton.addEventListener('click', goToMainMenu);
  elements.backToCategory.addEventListener('click', showCategorySelection);
  elements.backToLevel.addEventListener('click', showLevelSelection);
  
  // Configurar eventos dos botões de categoria
  elements.categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      if (category) {
        selectCategory(category);
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
        selectLevel(level);
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
  
  // Configurar eventos dos botões de controle do jogo
  elements.hintButton.addEventListener('click', showHint);
  elements.restartButton.addEventListener('click', restartLevel);
  
  // Configurar eventos dos botões da tela de conclusão
  elements.nextLevelButton.addEventListener('click', goToNextLevel);
  elements.replayLevelButton.addEventListener('click', restartLevel);
  elements.backToLevelsButton.addEventListener('click', showLevelSelection);
  
  // Configurar controle de som
  if (window.gameUtils) {
    // Usar configuração global de som
    associationConfig.soundEnabled = window.gameUtils.soundEnabled;
  } else {
    // Configurar controle de som local
    elements.soundToggle.addEventListener('click', toggleSound);
  }
  
  // Criar imagens temporárias para pré-carregamento
  createTemporaryImages();
  
  // Mostrar tela inicial
  showCategorySelection();
  
  // Anunciar para leitores de tela
  announceToScreenReader('Jogo de Associação carregado. Escolha uma categoria para começar.');
});

/**
 * Cria imagens temporárias para os itens do jogo
 * Isso será substituído por imagens reais em produção
 */
function createTemporaryImages() {
  // Verificar se as imagens existem
  const testImage = new Image();
  testImage.src = '../assets/images/escova.svg';
  
  testImage.onerror = () => {
    console.log('Criando imagens temporárias para desenvolvimento');
    
    // Criar SVGs temporários para cada categoria
    createTemporarySVGs();
  };
}

/**
 * Cria SVGs temporários para os itens do jogo
 */
function createTemporarySVGs() {
  // Percorrer todas as categorias e níveis
  Object.keys(associationConfig.gameData).forEach(category => {
    Object.keys(associationConfig.gameData[category]).forEach(level => {
      // Percorrer todos os itens do nível
      associationConfig.gameData[category][level].forEach(item => {
        // Substituir caminhos de imagem por funções que geram SVGs temporários
        item.getSourceSVG = () => createTempSVG(item.source, category);
        item.getTargetSVG = () => createTempSVG(item.target, category);
      });
    });
  });
}

/**
 * Cria um SVG temporário para um item
 * @param {string} name - Nome do item
 * @param {string} category - Categoria do item
 * @returns {string} SVG em formato de string
 */
function createTempSVG(name, category) {
  // Gerar cor baseada no nome
  const colors = ['#3498DB', '#E74C3C', '#2ECC71', '#F1C40F', '#9B59B6', '#1ABC9C'];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const color = colors[hash % colors.length];
  
  // Gerar forma baseada na categoria
  let svgContent = '';
  
  if (category === 'shapes') {
    // Para categoria de formas, usar o nome para determinar a forma
    if (name.includes('circulo')) {
      svgContent = `<circle cx="50" cy="50" r="40" fill="${color}" />`;
    } else if (name.includes('quadrado')) {
      svgContent = `<rect x="10" y="10" width="80" height="80" fill="${color}" />`;
    } else if (name.includes('triangulo')) {
      svgContent = `<polygon points="50,10 90,90 10,90" fill="${color}" />`;
    } else if (name.includes('estrela')) {
      svgContent = `<polygon points="50,10 61,40 95,40 67,60 79,90 50,70 21,90 33,60 5,40 39,40" fill="${color}" />`;
    } else if (name.includes('hexagono')) {
      svgContent = `<polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="${color}" />`;
    } else if (name.includes('losango')) {
      svgContent = `<polygon points="50,10 90,50 50,90 10,50" fill="${color}" />`;
    } else if (name.includes('oval')) {
      svgContent = `<ellipse cx="50" cy="50" rx="40" ry="30" fill="${color}" />`;
    }
  } else {
    // Para outras categorias, usar texto e ícone genérico
    const firstLetter = name.charAt(0).toUpperCase();
    svgContent = `
      <rect x="10" y="10" width="80" height="80" rx="10" fill="${color}" />
      <text x="50" y="60" font-family="Arial" font-size="40" text-anchor="middle" fill="white">${firstLetter}</text>
    `;
  }
  
  // Retornar SVG completo
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      ${svgContent}
    </svg>
  `;
}

/**
 * Navega para o menu principal
 */
function goToMainMenu() {
  window.location.href = '../index.html';
}

/**
 * Mostra a tela de seleção de categoria
 */
function showCategorySelection() {
  // Ocultar todas as telas
  elements.categorySelection.classList.remove('hidden');
  elements.levelSelection.classList.add('hidden');
  elements.gameScreen.classList.add('hidden');
  elements.completionScreen.classList.add('hidden');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Escolha uma categoria para jogar.');
}

/**
 * Seleciona uma categoria
 * @param {string} category - Nome da categoria
 */
function selectCategory(category) {
  // Verificar se a categoria existe
  if (!associationConfig.gameData[category]) {
    console.error(`Categoria ${category} não encontrada`);
    return;
  }
  
  // Atualizar categoria atual
  associationConfig.currentCategory = category;
  
  // Mostrar tela de seleção de nível
  showLevelSelection();
  
  // Anunciar para leitores de tela
  const categoryNames = {
    objects: 'Objetos Relacionados',
    shapes: 'Formas e Cores',
    cause: 'Causa e Efeito'
  };
  
  announceToScreenReader(`Categoria ${categoryNames[category]} selecionada. Escolha um nível de dificuldade.`);
}

/**
 * Mostra a tela de seleção de nível
 */
function showLevelSelection() {
  // Ocultar todas as telas
  elements.categorySelection.classList.add('hidden');
  elements.levelSelection.classList.remove('hidden');
  elements.gameScreen.classList.add('hidden');
  elements.completionScreen.classList.add('hidden');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Escolha um nível de dificuldade.');
}

/**
 * Seleciona um nível
 * @param {string} level - Nome do nível
 */
function selectLevel(level) {
  // Verificar se o nível existe para a categoria atual
  if (!associationConfig.gameData[associationConfig.currentCategory][level]) {
    console.error(`Nível ${level} não encontrado para categoria ${associationConfig.currentCategory}`);
    return;
  }
  
  // Atualizar nível atual
  associationConfig.currentLevel = level;
  
  // Iniciar jogo
  startGame();
  
  // Anunciar para leitores de tela
  const levelNames = {
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil'
  };
  
  announceToScreenReader(`Nível ${levelNames[level]} selecionado. O jogo vai começar.`);
}

/**
 * Inicia o jogo com a categoria e nível selecionados
 */
function startGame() {
  // Ocultar todas as telas
  elements.categorySelection.classList.add('hidden');
  elements.levelSelection.classList.add('hidden');
  elements.gameScreen.classList.remove('hidden');
  elements.completionScreen.classList.add('hidden');
  
  // Reiniciar contadores
  associationConfig.matchCount = 0;
  
  // Obter dados do jogo
  const gameItems = associationConfig.gameData[associationConfig.currentCategory][associationConfig.currentLevel];
  
  // Atualizar total de associações
  associationConfig.totalMatches = gameItems.length;
  
  // Atualizar contadores na interface
  elements.matchCount.textContent = associationConfig.matchCount;
  elements.totalMatches.textContent = associationConfig.totalMatches;
  
  // Limpar containers
  elements.sourceContainer.innerHTML = '';
  elements.targetContainer.innerHTML = '';
  
  // Embaralhar itens
  const shuffledItems = [...gameItems].sort(() => Math.random() - 0.5);
  const shuffledTargets = [...gameItems].sort(() => Math.random() - 0.5);
  
  // Criar itens de origem
  shuffledItems.forEach(item => {
    const draggableItem = createDraggableItem(item);
    elements.sourceContainer.appendChild(draggableItem);
  });
  
  // Criar áreas de destino
  shuffledTargets.forEach(item => {
    const targetItem = createTargetItem(item);
    elements.targetContainer.appendChild(targetItem);
  });
  
  // Configurar eventos de arrastar e soltar
  setupDragAndDrop();
  
  // Atualizar mensagem de status
  updateStatusMessage('Arraste os itens para fazer as associações corretas');
}

/**
 * Cria um item arrastável
 * @param {Object} item - Dados do item
 * @returns {HTMLElement} Elemento do item arrastável
 */
function createDraggableItem(item) {
  const draggableItem = document.createElement('div');
  draggableItem.className = 'draggable-item';
  draggableItem.setAttribute('draggable', 'true');
  draggableItem.setAttribute('tabindex', '0');
  draggableItem.setAttribute('role', 'button');
  draggableItem.setAttribute('aria-label', `Item: ${item.alt}. Pressione Enter para selecionar e usar as setas para mover.`);
  draggableItem.dataset.source = item.source;
  draggableItem.dataset.target = item.target;
  
  // Adicionar imagem ou SVG temporário
  if (item.getSourceSVG) {
    // Usar SVG temporário
    draggableItem.innerHTML = item.getSourceSVG();
  } else {
    // Usar imagem real
    const img = document.createElement('img');
    img.src = `../assets/images/${item.image}`;
    img.alt = item.alt;
    draggableItem.appendChild(img);
  }
  
  return draggableItem;
}

/**
 * Cria uma área de destino
 * @param {Object} item - Dados do item
 * @returns {HTMLElement} Elemento da área de destino
 */
function createTargetItem(item) {
  const targetItem = document.createElement('div');
  targetItem.className = 'target-item';
  targetItem.setAttribute('tabindex', '0');
  targetItem.setAttribute('role', 'button');
  targetItem.setAttribute('aria-label', `Área para: ${item.alt}`);
  targetItem.dataset.target = item.target;
  
  // Adicionar imagem ou SVG temporário
  if (item.getTargetSVG) {
    // Usar SVG temporário
    targetItem.innerHTML = item.getTargetSVG();
  } else {
    // Usar imagem real
    const img = document.createElement('img');
    img.src = `../assets/images/${item.targetImage}`;
    img.alt = item.alt;
    targetItem.appendChild(img);
  }
  
  return targetItem;
}

/**
 * Configura eventos de arrastar e soltar
 */
function setupDragAndDrop() {
  // Obter todos os itens arrastáveis
  const draggableItems = document.querySelectorAll('.draggable-item');
  
  // Obter todas as áreas de destino
  const targetItems = document.querySelectorAll('.target-item');
  
  // Configurar eventos para itens arrastáveis
  draggableItems.forEach(item => {
    // Eventos de arrastar
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
    
    // Eventos de toque para dispositivos móveis
    item.addEventListener('touchstart', handleTouchStart, { passive: false });
    item.addEventListener('touchmove', handleTouchMove, { passive: false });
    item.addEventListener('touchend', handleTouchEnd);
    
    // Eventos de teclado para acessibilidade
    item.addEventListener('keydown', handleKeyDown);
  });
  
  // Configurar eventos para áreas de destino
  targetItems.forEach(target => {
    // Eventos de arrastar
    target.addEventListener('dragover', handleDragOver);
    target.addEventListener('dragenter', handleDragEnter);
    target.addEventListener('dragleave', handleDragLeave);
    target.addEventListener('drop', handleDrop);
    
    // Eventos de teclado para acessibilidade
    target.addEventListener('keydown', handleTargetKeyDown);
  });
}

/**
 * Manipula o início do arrasto
 * @param {Event} e - Evento de arrasto
 */
function handleDragStart(e) {
  // Verificar se o item já foi associado
  if (this.classList.contains('matched')) {
    e.preventDefault();
    return;
  }
  
  // Adicionar classe de arrasto
  this.classList.add('dragging');
  
  // Armazenar referência ao item arrastado
  associationConfig.draggedItem = this;
  
  // Configurar dados de transferência
  e.dataTransfer.setData('text/plain', this.dataset.source);
  e.dataTransfer.effectAllowed = 'move';
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Item selecionado: ${this.getAttribute('aria-label').split('.')[0]}`);
}

/**
 * Manipula o fim do arrasto
 */
function handleDragEnd() {
  // Remover classe de arrasto
  this.classList.remove('dragging');
  
  // Limpar referência ao item arrastado
  associationConfig.draggedItem = null;
}

/**
 * Manipula o evento dragover
 * @param {Event} e - Evento dragover
 */
function handleDragOver(e) {
  // Prevenir comportamento padrão para permitir soltar
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

/**
 * Manipula o evento dragenter
 * @param {Event} e - Evento dragenter
 */
function handleDragEnter(e) {
  // Prevenir comportamento padrão
  e.preventDefault();
  
  // Adicionar classe de destaque
  this.classList.add('highlight');
}

/**
 * Manipula o evento dragleave
 */
function handleDragLeave() {
  // Remover classe de destaque
  this.classList.remove('highlight');
}

/**
 * Manipula o evento drop
 * @param {Event} e - Evento drop
 */
function handleDrop(e) {
  // Prevenir comportamento padrão
  e.preventDefault();
  
  // Remover classe de destaque
  this.classList.remove('highlight');
  
  // Verificar se o item já foi associado
  if (this.classList.contains('matched')) {
    return;
  }
  
  // Obter dados do item arrastado
  const sourceId = e.dataTransfer.getData('text/plain');
  const targetId = this.dataset.target;
  
  // Verificar se a associação está correta
  checkMatch(associationConfig.draggedItem, this);
}

/**
 * Manipula o início do toque
 * @param {Event} e - Evento touchstart
 */
function handleTouchStart(e) {
  // Verificar se o item já foi associado
  if (this.classList.contains('matched')) {
    return;
  }
  
  // Prevenir comportamento padrão para evitar scroll
  e.preventDefault();
  
  // Adicionar classe de arrasto
  this.classList.add('dragging');
  
  // Armazenar referência ao item arrastado
  associationConfig.draggedItem = this;
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Item selecionado: ${this.getAttribute('aria-label').split('.')[0]}`);
}

/**
 * Manipula o movimento do toque
 * @param {Event} e - Evento touchmove
 */
function handleTouchMove(e) {
  // Prevenir comportamento padrão para evitar scroll
  e.preventDefault();
  
  // Verificar se há um item sendo arrastado
  if (!associationConfig.draggedItem) {
    return;
  }
  
  // Obter posição do toque
  const touch = e.touches[0];
  const x = touch.clientX;
  const y = touch.clientY;
  
  // Mover o item visualmente
  associationConfig.draggedItem.style.position = 'fixed';
  associationConfig.draggedItem.style.left = `${x - associationConfig.draggedItem.offsetWidth / 2}px`;
  associationConfig.draggedItem.style.top = `${y - associationConfig.draggedItem.offsetHeight / 2}px`;
  
  // Verificar se está sobre uma área de destino
  const targetItems = document.querySelectorAll('.target-item:not(.matched)');
  targetItems.forEach(target => {
    // Remover classe de destaque de todos
    target.classList.remove('highlight');
    
    // Verificar se o toque está sobre este alvo
    const rect = target.getBoundingClientRect();
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      // Adicionar classe de destaque
      target.classList.add('highlight');
    }
  });
}

/**
 * Manipula o fim do toque
 * @param {Event} e - Evento touchend
 */
function handleTouchEnd(e) {
  // Verificar se há um item sendo arrastado
  if (!associationConfig.draggedItem) {
    return;
  }
  
  // Obter posição do último toque
  const touch = e.changedTouches[0];
  const x = touch.clientX;
  const y = touch.clientY;
  
  // Restaurar estilo do item
  associationConfig.draggedItem.style.position = '';
  associationConfig.draggedItem.style.left = '';
  associationConfig.draggedItem.style.top = '';
  
  // Remover classe de arrasto
  associationConfig.draggedItem.classList.remove('dragging');
  
  // Verificar se está sobre uma área de destino
  const targetItems = document.querySelectorAll('.target-item:not(.matched)');
  let matchFound = false;
  
  targetItems.forEach(target => {
    // Verificar se o toque está sobre este alvo
    const rect = target.getBoundingClientRect();
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      // Verificar se a associação está correta
      checkMatch(associationConfig.draggedItem, target);
      matchFound = true;
    }
    
    // Remover classe de destaque
    target.classList.remove('highlight');
  });
  
  // Se não encontrou nenhum alvo, anunciar para leitores de tela
  if (!matchFound) {
    announceToScreenReader('Item solto fora de uma área válida. Tente novamente.');
  }
  
  // Limpar referência ao item arrastado
  associationConfig.draggedItem = null;
}

/**
 * Manipula eventos de teclado para itens arrastáveis
 * @param {Event} e - Evento keydown
 */
function handleKeyDown(e) {
  // Verificar se o item já foi associado
  if (this.classList.contains('matched')) {
    return;
  }
  
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    
    // Verificar se já há um item selecionado
    if (associationConfig.draggedItem) {
      // Desselecionar o item atual
      associationConfig.draggedItem.classList.remove('dragging');
      associationConfig.draggedItem = null;
      
      // Anunciar para leitores de tela
      announceToScreenReader('Item deselecionado. Selecione outro item ou área de destino.');
    } else {
      // Selecionar este item
      this.classList.add('dragging');
      associationConfig.draggedItem = this;
      
      // Anunciar para leitores de tela
      announceToScreenReader(`Item selecionado: ${this.getAttribute('aria-label').split('.')[0]}. Use Tab para navegar até uma área de destino e pressione Enter para soltar.`);
    }
  }
}

/**
 * Manipula eventos de teclado para áreas de destino
 * @param {Event} e - Evento keydown
 */
function handleTargetKeyDown(e) {
  // Verificar se a área já foi associada
  if (this.classList.contains('matched')) {
    return;
  }
  
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    
    // Verificar se há um item selecionado
    if (associationConfig.draggedItem) {
      // Verificar se a associação está correta
      checkMatch(associationConfig.draggedItem, this);
    } else {
      // Anunciar para leitores de tela
      announceToScreenReader('Selecione primeiro um item para associar a esta área.');
    }
  }
}

/**
 * Verifica se a associação está correta
 * @param {HTMLElement} sourceItem - Item de origem
 * @param {HTMLElement} targetItem - Área de destino
 */
function checkMatch(sourceItem, targetItem) {
  // Verificar se os itens existem
  if (!sourceItem || !targetItem) {
    return;
  }
  
  // Obter dados dos itens
  const sourceId = sourceItem.dataset.source;
  const sourceTarget = sourceItem.dataset.target;
  const targetId = targetItem.dataset.target;
  
  // Verificar se a associação está correta
  if (sourceTarget === targetId) {
    // Associação correta
    handleCorrectMatch(sourceItem, targetItem);
  } else {
    // Associação incorreta
    handleIncorrectMatch(sourceItem, targetItem);
  }
}

/**
 * Manipula uma associação correta
 * @param {HTMLElement} sourceItem - Item de origem
 * @param {HTMLElement} targetItem - Área de destino
 */
function handleCorrectMatch(sourceItem, targetItem) {
  // Adicionar classes de associação
  sourceItem.classList.add('matched');
  targetItem.classList.add('matched');
  
  // Desabilitar arrasto para o item
  sourceItem.setAttribute('draggable', 'false');
  
  // Atualizar atributos ARIA
  sourceItem.setAttribute('aria-grabbed', 'false');
  targetItem.setAttribute('aria-dropeffect', 'none');
  
  // Mover o item para a área de destino
  targetItem.appendChild(sourceItem);
  
  // Reproduzir som de acerto
  playSound(elements.matchSound);
  
  // Incrementar contador de associações
  associationConfig.matchCount++;
  
  // Atualizar contador na interface
  elements.matchCount.textContent = associationConfig.matchCount;
  
  // Anunciar para leitores de tela
  announceToScreenReader('Associação correta!');
  
  // Atualizar mensagem de status
  updateStatusMessage('Associação correta! Continue com os outros itens.');
  
  // Verificar se todas as associações foram feitas
  if (associationConfig.matchCount >= associationConfig.totalMatches) {
    // Aguardar um pouco para mostrar a tela de conclusão
    setTimeout(showCompletionScreen, 1000);
  }
}

/**
 * Manipula uma associação incorreta
 * @param {HTMLElement} sourceItem - Item de origem
 * @param {HTMLElement} targetItem - Área de destino
 */
function handleIncorrectMatch(sourceItem, targetItem) {
  // Adicionar classe de erro temporariamente
  sourceItem.classList.add('error');
  targetItem.classList.add('error');
  
  // Reproduzir som de erro
  playSound(elements.errorSound);
  
  // Anunciar para leitores de tela
  announceToScreenReader('Associação incorreta. Tente novamente.');
  
  // Atualizar mensagem de status
  updateStatusMessage('Associação incorreta. Tente novamente.');
  
  // Remover classe de erro após um tempo
  setTimeout(() => {
    sourceItem.classList.remove('error');
    targetItem.classList.remove('error');
  }, 1000);
}

/**
 * Mostra a tela de conclusão
 */
function showCompletionScreen() {
  // Ocultar todas as telas
  elements.categorySelection.classList.add('hidden');
  elements.levelSelection.classList.add('hidden');
  elements.gameScreen.classList.add('hidden');
  elements.completionScreen.classList.remove('hidden');
  
  // Reproduzir som de conclusão
  playSound(elements.completionSound);
  
  // Verificar se há próximo nível
  const levels = ['easy', 'medium', 'hard'];
  const currentLevelIndex = levels.indexOf(associationConfig.currentLevel);
  
  if (currentLevelIndex < levels.length - 1) {
    // Há próximo nível
    elements.nextLevelButton.disabled = false;
  } else {
    // Não há próximo nível
    elements.nextLevelButton.disabled = true;
  }
  
  // Anunciar para leitores de tela
  announceToScreenReader('Parabéns! Você completou todas as associações corretamente!');
}

/**
 * Vai para o próximo nível
 */
function goToNextLevel() {
  // Obter próximo nível
  const levels = ['easy', 'medium', 'hard'];
  const currentLevelIndex = levels.indexOf(associationConfig.currentLevel);
  
  if (currentLevelIndex < levels.length - 1) {
    // Selecionar próximo nível
    selectLevel(levels[currentLevelIndex + 1]);
  }
}

/**
 * Reinicia o nível atual
 */
function restartLevel() {
  // Reiniciar jogo com o mesmo nível
  startGame();
  
  // Anunciar para leitores de tela
  announceToScreenReader('Nível reiniciado.');
}

/**
 * Mostra uma dica
 */
function showHint() {
  // Obter todos os itens arrastáveis não associados
  const draggableItems = document.querySelectorAll('.draggable-item:not(.matched)');
  
  // Obter todas as áreas de destino não associadas
  const targetItems = document.querySelectorAll('.target-item:not(.matched)');
  
  // Verificar se há itens para mostrar dica
  if (draggableItems.length === 0 || targetItems.length === 0) {
    return;
  }
  
  // Selecionar um item aleatório
  const randomIndex = Math.floor(Math.random() * draggableItems.length);
  const sourceItem = draggableItems[randomIndex];
  
  // Encontrar a área de destino correspondente
  const sourceTarget = sourceItem.dataset.target;
  let targetItem = null;
  
  targetItems.forEach(target => {
    if (target.dataset.target === sourceTarget) {
      targetItem = target;
    }
  });
  
  // Verificar se encontrou a área de destino
  if (!targetItem) {
    return;
  }
  
  // Destacar o item e a área de destino
  sourceItem.classList.add('hint');
  targetItem.classList.add('hint');
  
  // Reproduzir som de dica
  playSound(elements.hintSound);
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Dica: associe ${sourceItem.getAttribute('aria-label').split('.')[0]} com ${targetItem.getAttribute('aria-label')}`);
  
  // Remover destaque após um tempo
  setTimeout(() => {
    sourceItem.classList.remove('hint');
    targetItem.classList.remove('hint');
  }, 2000);
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
  // Alternar estado de som
  associationConfig.soundEnabled = !associationConfig.soundEnabled;
  
  // Atualizar ícone e classe
  if (associationConfig.soundEnabled) {
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
  const message = associationConfig.soundEnabled ? 'Sons ativados' : 'Sons desativados';
  announceToScreenReader(message);
}

/**
 * Reproduz um som se os sons estiverem ativados
 * @param {HTMLAudioElement} audioElement - Elemento de áudio
 */
function playSound(audioElement) {
  // Verificar se os sons estão ativados
  if (!associationConfig.soundEnabled) {
    return;
  }
  
  // Usar a função utilitária do script principal se disponível
  if (window.gameUtils && window.gameUtils.playSound) {
    window.gameUtils.playSound(audioElement, associationConfig.soundEnabled);
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
