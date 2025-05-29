/**
 * Labirinto Simples - Script principal
 * Implementação em JavaScript puro para crianças autistas
 * Foco em acessibilidade, feedback claro e experiência previsível
 */

// Configuração do jogo
const mazeConfig = {
  // Sons ativados por padrão
  soundEnabled: true,
  // Tema atual
  currentTheme: null,
  // Nível atual
  currentLevel: null,
  // Posição atual do jogador
  playerPosition: { row: 0, col: 0 },
  // Posição inicial do jogador
  startPosition: { row: 0, col: 0 },
  // Posição final (objetivo)
  endPosition: { row: 0, col: 0 },
  // Contador de movimentos
  moveCount: 0,
  // Caminho da dica
  hintPath: [],
  // Mostrando dica atualmente
  showingHint: false,
  // Labirinto atual
  currentMaze: [],
  // Dados do jogo por tema e nível
  gameData: {
    // Tema Floresta Encantada
    forest: {
      // Personagem e objetivo
      character: "🦊",
      goal: "🌳",
      // Labirintos por nível
      levels: {
        1: {
          grid: [
            [0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0],
            [0, 0, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0]
          ],
          start: { row: 1, col: 1 },
          end: { row: 3, col: 1 }
        },
        2: {
          grid: [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 1, 0, 1, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0]
          ],
          start: { row: 1, col: 1 },
          end: { row: 4, col: 3 }
        },
        3: {
          grid: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 1, 0],
            [0, 0, 0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0, 0, 0],
            [0, 1, 0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0]
          ],
          start: { row: 1, col: 1 },
          end: { row: 5, col: 5 }
        },
        4: {
          grid: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 1, 1, 0, 1, 0],
            [0, 1, 0, 1, 1, 0, 1, 0],
            [0, 1, 0, 0, 1, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
          ],
          start: { row: 1, col: 1 },
          end: { row: 6, col: 6 }
        },
        5: {
          grid: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 1, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
          ],
          start: { row: 1, col: 1 },
          end: { row: 7, col: 7 }
        }
      }
    },
    // Tema Fundo do Mar
    ocean: {
      // Personagem e objetivo
      character: "🐠",
      goal: "🧿",
      // Labirintos por nível
      levels: {
        1: {
          grid: [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0]
          ],
          start: { row: 1, col: 1 },
          end: { row: 3, col: 3 }
        },
        2: {
          grid: [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0]
          ],
          start: { row: 1, col: 1 },
          end: { row: 5, col: 3 }
        },
        3: {
          grid: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 1, 0],
            [0, 1, 0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0]
          ],
          start: { row: 1, col: 1 },
          end: { row: 5, col: 4 }
        },
        4: {
          grid: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 1, 0],
            [0, 1, 1, 1, 0, 1, 0, 0],
            [0, 1, 0, 0, 0, 1, 1, 0],
            [0, 1, 0, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
          ],
          start: { row: 1, col: 1 },
          end: { row: 6, col: 6 }
        },
        5: {
          grid: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 0, 0],
            [0, 1, 0, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 0, 1, 0],
            [0, 0, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
          ],
          start: { row: 1, col: 1 },
          end: { row: 7, col: 7 }
        }
      }
    },
    // Tema Espaço Sideral
    space: {
      // Personagem e objetivo
      character: "👨‍🚀",
      goal: "🚀",
      // Labirintos por nível
      levels: {
        1: {
          grid: [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0]
          ],
          start: { row: 1, col: 1 },
          end: { row: 3, col: 1 }
        },
        2: {
          grid: [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 1, 0],
            [0, 1, 0, 1, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0]
          ],
          start: { row: 1, col: 1 },
          end: { row: 5, col: 3 }
        },
        3: {
          grid: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0]
          ],
          start: { row: 1, col: 1 },
          end: { row: 5, col: 5 }
        },
        4: {
          grid: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 1, 1, 0, 1, 0],
            [0, 1, 0, 1, 1, 0, 1, 0],
            [0, 1, 0, 0, 1, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
          ],
          start: { row: 1, col: 1 },
          end: { row: 6, col: 6 }
        },
        5: {
          grid: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
          ],
          start: { row: 1, col: 1 },
          end: { row: 7, col: 7 }
        }
      }
    }
  }
};

// Elementos do DOM
const elements = {
  // Telas
  themeSelection: document.getElementById('theme-selection'),
  levelSelection: document.getElementById('level-selection'),
  gameScreen: document.getElementById('game-screen'),
  completionScreen: document.getElementById('completion-screen'),
  
  // Botões de navegação
  backButton: document.getElementById('back-button'),
  backToThemes: document.getElementById('back-to-themes'),
  backToLevel: document.getElementById('back-to-level'),
  
  // Botões de tema
  themeButtons: document.querySelectorAll('.theme-button'),
  
  // Botões de nível
  levelButtons: document.querySelectorAll('.level-button'),
  
  // Elementos do jogo
  mazeBoard: document.getElementById('maze-board'),
  statusMessage: document.getElementById('status-message'),
  movesCount: document.getElementById('moves-count'),
  
  // Controles de toque
  touchControls: document.getElementById('touch-controls'),
  upButton: document.getElementById('up-button'),
  downButton: document.getElementById('down-button'),
  leftButton: document.getElementById('left-button'),
  rightButton: document.getElementById('right-button'),
  
  // Botões de controle do jogo
  hintButton: document.getElementById('hint-button'),
  restartButton: document.getElementById('restart-button'),
  
  // Elementos da tela de conclusão
  finalMoves: document.getElementById('final-moves'),
  nextLevelButton: document.getElementById('next-level-button'),
  replayLevelButton: document.getElementById('replay-level-button'),
  backToLevelsButton: document.getElementById('back-to-levels-button'),
  
  // Controle de som
  soundToggle: document.getElementById('sound-toggle'),
  
  // Sons
  moveSound: document.getElementById('move-sound'),
  wallSound: document.getElementById('wall-sound'),
  successSound: document.getElementById('success-sound'),
  hintSound: document.getElementById('hint-sound'),
  completionSound: document.getElementById('completion-sound')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Configurar eventos dos botões de navegação
  elements.backButton.addEventListener('click', goToMainMenu);
  elements.backToThemes.addEventListener('click', showThemeSelection);
  elements.backToLevel.addEventListener('click', showLevelSelection);
  
  // Configurar eventos dos botões de tema
  elements.themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const theme = button.dataset.theme;
      if (theme) {
        selectTheme(theme);
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
  
  // Configurar eventos dos botões de controle do jogo
  elements.hintButton.addEventListener('click', showHint);
  elements.restartButton.addEventListener('click', restartLevel);
  
  // Configurar eventos dos botões da tela de conclusão
  elements.nextLevelButton.addEventListener('click', goToNextLevel);
  elements.replayLevelButton.addEventListener('click', restartLevel);
  elements.backToLevelsButton.addEventListener('click', showLevelSelection);
  
  // Configurar controles de toque
  elements.upButton.addEventListener('click', () => movePlayer('up'));
  elements.downButton.addEventListener('click', () => movePlayer('down'));
  elements.leftButton.addEventListener('click', () => movePlayer('left'));
  elements.rightButton.addEventListener('click', () => movePlayer('right'));
  
  // Configurar controle de teclado
  document.addEventListener('keydown', handleKeyDown);
  
  // Configurar controle de som
  if (window.gameUtils) {
    // Usar configuração global de som
    mazeConfig.soundEnabled = window.gameUtils.soundEnabled;
  } else {
    // Configurar controle de som local
    elements.soundToggle.addEventListener('click', toggleSound);
  }
  
  // Gerar miniaturas de labirinto para seleção de nível
  generateLevelPreviews();
  
  // Mostrar tela inicial
  showThemeSelection();
  
  // Anunciar para leitores de tela
  announceToScreenReader('Labirinto Simples carregado. Escolha um tema para começar.');
});

/**
 * Gera miniaturas de labirinto para a seleção de nível
 */
function generateLevelPreviews() {
  // Para cada nível, gerar uma miniatura
  for (let i = 1; i <= 5; i++) {
    const previewElement = document.getElementById(`preview-${i}`);
    if (previewElement) {
      // Adicionar ícone de nível
      previewElement.textContent = `${i}`;
    }
  }
}

/**
 * Navega para o menu principal
 */
function goToMainMenu() {
  window.location.href = '../index.html';
}

/**
 * Mostra a tela de seleção de tema
 */
function showThemeSelection() {
  // Ocultar todas as telas
  elements.themeSelection.classList.remove('hidden');
  elements.levelSelection.classList.add('hidden');
  elements.gameScreen.classList.add('hidden');
  elements.completionScreen.classList.add('hidden');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Escolha um tema para o labirinto.');
}

/**
 * Seleciona um tema
 * @param {string} theme - Nome do tema
 */
function selectTheme(theme) {
  // Verificar se o tema existe
  if (!mazeConfig.gameData[theme]) {
    console.error(`Tema ${theme} não encontrado`);
    return;
  }
  
  // Atualizar tema atual
  mazeConfig.currentTheme = theme;
  
  // Mostrar tela de seleção de nível
  showLevelSelection();
  
  // Anunciar para leitores de tela
  const themeNames = {
    forest: 'Floresta Encantada',
    ocean: 'Fundo do Mar',
    space: 'Espaço Sideral'
  };
  
  announceToScreenReader(`Tema ${themeNames[theme]} selecionado. Escolha um nível.`);
}

/**
 * Mostra a tela de seleção de nível
 */
function showLevelSelection() {
  // Ocultar todas as telas
  elements.themeSelection.classList.add('hidden');
  elements.levelSelection.classList.remove('hidden');
  elements.gameScreen.classList.add('hidden');
  elements.completionScreen.classList.add('hidden');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Escolha um nível de dificuldade.');
}

/**
 * Seleciona um nível
 * @param {number} level - Número do nível
 */
function selectLevel(level) {
  // Verificar se o nível existe para o tema atual
  if (!mazeConfig.gameData[mazeConfig.currentTheme].levels[level]) {
    console.error(`Nível ${level} não encontrado para tema ${mazeConfig.currentTheme}`);
    return;
  }
  
  // Atualizar nível atual
  mazeConfig.currentLevel = level;
  
  // Iniciar jogo
  startGame();
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Nível ${level} selecionado. O jogo vai começar.`);
}

/**
 * Inicia o jogo com o tema e nível selecionados
 */
function startGame() {
  // Ocultar todas as telas
  elements.themeSelection.classList.add('hidden');
  elements.levelSelection.classList.add('hidden');
  elements.gameScreen.classList.remove('hidden');
  elements.completionScreen.classList.add('hidden');
  
  // Reiniciar contador de movimentos
  mazeConfig.moveCount = 0;
  
  // Atualizar contador na interface
  elements.movesCount.textContent = mazeConfig.moveCount;
  
  // Obter dados do labirinto
  const levelData = mazeConfig.gameData[mazeConfig.currentTheme].levels[mazeConfig.currentLevel];
  
  // Armazenar labirinto atual
  mazeConfig.currentMaze = JSON.parse(JSON.stringify(levelData.grid));
  
  // Armazenar posições inicial e final
  mazeConfig.startPosition = { ...levelData.start };
  mazeConfig.endPosition = { ...levelData.end };
  
  // Definir posição inicial do jogador
  mazeConfig.playerPosition = { ...levelData.start };
  
  // Gerar labirinto
  generateMaze();
  
  // Calcular caminho da dica
  calculateHintPath();
  
  // Atualizar mensagem de status
  updateStatusMessage('Use as setas para mover o personagem até o objetivo');
  
  // Adicionar classe de tema ao tabuleiro
  elements.mazeBoard.className = 'maze-board';
  elements.mazeBoard.classList.add(`${mazeConfig.currentTheme}-theme`);
  
  // Anunciar para leitores de tela
  announceToScreenReader('Labirinto gerado. Use as setas do teclado ou os botões na tela para mover o personagem até o objetivo.');
}

/**
 * Gera o labirinto na interface
 */
function generateMaze() {
  // Limpar tabuleiro
  elements.mazeBoard.innerHTML = '';
  
  // Obter dados do labirinto
  const maze = mazeConfig.currentMaze;
  const rows = maze.length;
  const cols = maze[0].length;
  
  // Configurar grade do tabuleiro
  elements.mazeBoard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  elements.mazeBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  
  // Obter personagem e objetivo do tema atual
  const character = mazeConfig.gameData[mazeConfig.currentTheme].character;
  const goal = mazeConfig.gameData[mazeConfig.currentTheme].goal;
  
  // Criar células do labirinto
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement('div');
      cell.className = 'maze-cell';
      
      // Definir tipo de célula
      if (maze[row][col] === 0) {
        // Parede
        cell.classList.add('maze-wall');
        cell.setAttribute('aria-label', 'Parede');
      } else {
        // Caminho
        cell.classList.add('maze-path');
        cell.setAttribute('aria-label', 'Caminho');
        
        // Verificar se é a posição inicial
        if (row === mazeConfig.startPosition.row && col === mazeConfig.startPosition.col) {
          cell.classList.add('maze-start');
          cell.setAttribute('aria-label', 'Início do labirinto');
        }
        
        // Verificar se é a posição final
        if (row === mazeConfig.endPosition.row && col === mazeConfig.endPosition.col) {
          cell.classList.add('maze-end');
          cell.textContent = goal;
          cell.setAttribute('aria-label', 'Fim do labirinto');
        }
        
        // Verificar se é a posição atual do jogador
        if (row === mazeConfig.playerPosition.row && col === mazeConfig.playerPosition.col) {
          const player = document.createElement('div');
          player.className = 'maze-player';
          player.textContent = character;
          player.setAttribute('aria-label', 'Jogador');
          cell.appendChild(player);
        }
      }
      
      // Adicionar célula ao tabuleiro
      elements.mazeBoard.appendChild(cell);
    }
  }
}

/**
 * Calcula o caminho da dica usando o algoritmo A*
 */
function calculateHintPath() {
  // Implementação do algoritmo A* para encontrar o caminho mais curto
  const start = mazeConfig.playerPosition;
  const end = mazeConfig.endPosition;
  const maze = mazeConfig.currentMaze;
  
  // Definir heurística (distância de Manhattan)
  const heuristic = (a, b) => Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
  
  // Definir movimentos possíveis (cima, direita, baixo, esquerda)
  const directions = [
    { row: -1, col: 0 }, // cima
    { row: 0, col: 1 },  // direita
    { row: 1, col: 0 },  // baixo
    { row: 0, col: -1 }  // esquerda
  ];
  
  // Inicializar listas aberta e fechada
  const openList = [];
  const closedList = [];
  
  // Adicionar nó inicial à lista aberta
  openList.push({
    position: start,
    g: 0,
    h: heuristic(start, end),
    f: heuristic(start, end),
    parent: null
  });
  
  // Enquanto houver nós na lista aberta
  while (openList.length > 0) {
    // Encontrar nó com menor f na lista aberta
    let currentIndex = 0;
    for (let i = 1; i < openList.length; i++) {
      if (openList[i].f < openList[currentIndex].f) {
        currentIndex = i;
      }
    }
    
    // Obter nó atual
    const current = openList[currentIndex];
    
    // Remover nó atual da lista aberta
    openList.splice(currentIndex, 1);
    
    // Adicionar nó atual à lista fechada
    closedList.push(current);
    
    // Verificar se chegou ao destino
    if (current.position.row === end.row && current.position.col === end.col) {
      // Reconstruir caminho
      const path = [];
      let currentNode = current;
      
      while (currentNode !== null) {
        path.unshift(currentNode.position);
        currentNode = currentNode.parent;
      }
      
      // Armazenar caminho da dica
      mazeConfig.hintPath = path;
      return;
    }
    
    // Explorar vizinhos
    for (const direction of directions) {
      // Calcular posição do vizinho
      const neighbor = {
        row: current.position.row + direction.row,
        col: current.position.col + direction.col
      };
      
      // Verificar se o vizinho está dentro dos limites do labirinto
      if (neighbor.row < 0 || neighbor.row >= maze.length || 
          neighbor.col < 0 || neighbor.col >= maze[0].length) {
        continue;
      }
      
      // Verificar se o vizinho é uma parede
      if (maze[neighbor.row][neighbor.col] === 0) {
        continue;
      }
      
      // Verificar se o vizinho já está na lista fechada
      if (closedList.some(node => node.position.row === neighbor.row && node.position.col === neighbor.col)) {
        continue;
      }
      
      // Calcular g, h e f do vizinho
      const g = current.g + 1;
      const h = heuristic(neighbor, end);
      const f = g + h;
      
      // Verificar se o vizinho já está na lista aberta com um g menor
      const openNode = openList.find(node => node.position.row === neighbor.row && node.position.col === neighbor.col);
      if (openNode && g >= openNode.g) {
        continue;
      }
      
      // Adicionar vizinho à lista aberta
      openList.push({
        position: neighbor,
        g,
        h,
        f,
        parent: current
      });
    }
  }
  
  // Se não encontrou caminho, armazenar caminho vazio
  mazeConfig.hintPath = [];
}

/**
 * Manipula eventos de teclado
 * @param {KeyboardEvent} e - Evento de teclado
 */
function handleKeyDown(e) {
  // Verificar se o jogo está ativo
  if (elements.gameScreen.classList.contains('hidden')) {
    return;
  }
  
  // Verificar tecla pressionada
  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault();
      movePlayer('up');
      break;
    case 'ArrowDown':
      e.preventDefault();
      movePlayer('down');
      break;
    case 'ArrowLeft':
      e.preventDefault();
      movePlayer('left');
      break;
    case 'ArrowRight':
      e.preventDefault();
      movePlayer('right');
      break;
  }
}

/**
 * Move o jogador na direção especificada
 * @param {string} direction - Direção do movimento (up, down, left, right)
 */
function movePlayer(direction) {
  // Obter posição atual do jogador
  const { row, col } = mazeConfig.playerPosition;
  
  // Calcular nova posição
  let newRow = row;
  let newCol = col;
  
  switch (direction) {
    case 'up':
      newRow--;
      break;
    case 'down':
      newRow++;
      break;
    case 'left':
      newCol--;
      break;
    case 'right':
      newCol++;
      break;
  }
  
  // Verificar se a nova posição é válida
  if (isValidMove(newRow, newCol)) {
    // Atualizar posição do jogador
    mazeConfig.playerPosition = { row: newRow, col: newCol };
    
    // Incrementar contador de movimentos
    mazeConfig.moveCount++;
    
    // Atualizar contador na interface
    elements.movesCount.textContent = mazeConfig.moveCount;
    
    // Reproduzir som de movimento
    playSound(elements.moveSound);
    
    // Limpar dicas
    clearHint();
    
    // Regenerar labirinto
    generateMaze();
    
    // Verificar se chegou ao objetivo
    if (newRow === mazeConfig.endPosition.row && newCol === mazeConfig.endPosition.col) {
      // Aguardar um pouco para mostrar a tela de conclusão
      setTimeout(showCompletionScreen, 500);
    }
    
    // Anunciar para leitores de tela
    announceToScreenReader(`Moveu para ${getDirectionName(direction)}. Movimentos: ${mazeConfig.moveCount}.`);
  } else {
    // Reproduzir som de parede
    playSound(elements.wallSound);
    
    // Anunciar para leitores de tela
    announceToScreenReader(`Não é possível mover para ${getDirectionName(direction)}. Há uma parede.`);
  }
}

/**
 * Verifica se um movimento é válido
 * @param {number} row - Linha da nova posição
 * @param {number} col - Coluna da nova posição
 * @returns {boolean} Verdadeiro se o movimento for válido
 */
function isValidMove(row, col) {
  // Verificar se a posição está dentro dos limites do labirinto
  if (row < 0 || row >= mazeConfig.currentMaze.length || 
      col < 0 || col >= mazeConfig.currentMaze[0].length) {
    return false;
  }
  
  // Verificar se a posição é uma parede
  if (mazeConfig.currentMaze[row][col] === 0) {
    return false;
  }
  
  return true;
}

/**
 * Obtém o nome da direção
 * @param {string} direction - Direção (up, down, left, right)
 * @returns {string} Nome da direção em português
 */
function getDirectionName(direction) {
  switch (direction) {
    case 'up':
      return 'cima';
    case 'down':
      return 'baixo';
    case 'left':
      return 'esquerda';
    case 'right':
      return 'direita';
    default:
      return direction;
  }
}

/**
 * Mostra uma dica
 */
function showHint() {
  // Verificar se há um caminho de dica
  if (mazeConfig.hintPath.length === 0) {
    // Calcular caminho da dica
    calculateHintPath();
    
    // Verificar novamente
    if (mazeConfig.hintPath.length === 0) {
      return;
    }
  }
  
  // Marcar que está mostrando dica
  mazeConfig.showingHint = true;
  
  // Reproduzir som de dica
  playSound(elements.hintSound);
  
  // Obter células do labirinto
  const cells = elements.mazeBoard.querySelectorAll('.maze-cell');
  const rows = mazeConfig.currentMaze.length;
  const cols = mazeConfig.currentMaze[0].length;
  
  // Adicionar classe de dica às células do caminho
  for (let i = 1; i < mazeConfig.hintPath.length; i++) {
    const { row, col } = mazeConfig.hintPath[i];
    const index = row * cols + col;
    cells[index].classList.add('maze-hint');
  }
  
  // Anunciar para leitores de tela
  announceToScreenReader('Dica: o caminho mais curto até o objetivo está destacado.');
  
  // Remover dica após um tempo
  setTimeout(clearHint, 3000);
}

/**
 * Limpa a dica
 */
function clearHint() {
  // Verificar se está mostrando dica
  if (!mazeConfig.showingHint) {
    return;
  }
  
  // Marcar que não está mais mostrando dica
  mazeConfig.showingHint = false;
  
  // Obter células do labirinto
  const cells = elements.mazeBoard.querySelectorAll('.maze-cell');
  
  // Remover classe de dica de todas as células
  cells.forEach(cell => {
    cell.classList.remove('maze-hint');
  });
}

/**
 * Mostra a tela de conclusão
 */
function showCompletionScreen() {
  // Ocultar todas as telas
  elements.themeSelection.classList.add('hidden');
  elements.levelSelection.classList.add('hidden');
  elements.gameScreen.classList.add('hidden');
  elements.completionScreen.classList.remove('hidden');
  
  // Atualizar contador de movimentos
  elements.finalMoves.textContent = mazeConfig.moveCount;
  
  // Reproduzir som de conclusão
  playSound(elements.completionSound);
  
  // Verificar se há próximo nível
  const nextLevel = mazeConfig.currentLevel + 1;
  if (mazeConfig.gameData[mazeConfig.currentTheme].levels[nextLevel]) {
    // Há próximo nível
    elements.nextLevelButton.disabled = false;
  } else {
    // Não há próximo nível
    elements.nextLevelButton.disabled = true;
  }
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Parabéns! Você encontrou o caminho em ${mazeConfig.moveCount} movimentos.`);
}

/**
 * Vai para o próximo nível
 */
function goToNextLevel() {
  // Calcular próximo nível
  const nextLevel = mazeConfig.currentLevel + 1;
  
  // Verificar se o próximo nível existe
  if (mazeConfig.gameData[mazeConfig.currentTheme].levels[nextLevel]) {
    // Selecionar próximo nível
    selectLevel(nextLevel);
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
  mazeConfig.soundEnabled = !mazeConfig.soundEnabled;
  
  // Atualizar ícone e classe
  if (mazeConfig.soundEnabled) {
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
  const message = mazeConfig.soundEnabled ? 'Sons ativados' : 'Sons desativados';
  announceToScreenReader(message);
}

/**
 * Reproduz um som se os sons estiverem ativados
 * @param {HTMLAudioElement} audioElement - Elemento de áudio
 */
function playSound(audioElement) {
  // Verificar se os sons estão ativados
  if (!mazeConfig.soundEnabled) {
    return;
  }
  
  // Usar a função utilitária do script principal se disponível
  if (window.gameUtils && window.gameUtils.playSound) {
    window.gameUtils.playSound(audioElement, mazeConfig.soundEnabled);
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
