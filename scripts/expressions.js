/**
 * Jogo de Expressões Faciais - Script principal
 * Implementação em JavaScript puro para crianças autistas
 * Foco em acessibilidade, feedback claro e experiência previsível
 */

// Configuração do jogo
const expressionsConfig = {
  // Sons ativados por padrão
  soundEnabled: true,
  // Modo atual
  currentMode: null,
  // Nível atual
  currentLevel: null,
  // Índice da emoção atual no modo aprender
  currentEmotionIndex: 0,
  // Índice da pergunta atual no modo praticar
  currentQuestionIndex: 0,
  // Pontuação atual
  score: 0,
  // Total de perguntas
  totalQuestions: 0,
  // Resposta já dada para a pergunta atual
  answerGiven: false,
  // Dados do jogo
  gameData: {
    // Emoções para o modo aprender
    emotions: [
      {
        name: "Feliz",
        description: "Quando estamos felizes, nosso rosto mostra um sorriso. Os cantos da boca sobem e os olhos podem ficar um pouco fechados.",
        examples: [
          "Quando ganhamos um presente",
          "Quando brincamos com amigos",
          "Quando comemos algo gostoso"
        ],
        image: "feliz.svg"
      },
      {
        name: "Triste",
        description: "Quando estamos tristes, os cantos da boca descem. Às vezes, podemos chorar e os olhos podem ficar mais fechados.",
        examples: [
          "Quando perdemos um brinquedo",
          "Quando um amigo vai embora",
          "Quando machucamos o joelho"
        ],
        image: "triste.svg"
      },
      {
        name: "Bravo",
        description: "Quando estamos bravos, as sobrancelhas descem e se juntam. A boca pode ficar apertada ou mostrando os dentes.",
        examples: [
          "Quando alguém quebra nosso brinquedo",
          "Quando não conseguimos fazer algo",
          "Quando alguém nos empurra"
        ],
        image: "bravo.svg"
      },
      {
        name: "Surpreso",
        description: "Quando estamos surpresos, as sobrancelhas sobem, os olhos abrem bem e a boca pode ficar aberta em forma de 'O'.",
        examples: [
          "Quando recebemos um presente inesperado",
          "Quando algo acontece de repente",
          "Quando vemos algo novo e diferente"
        ],
        image: "surpreso.svg"
      },
      {
        name: "Assustado",
        description: "Quando estamos assustados, os olhos ficam bem abertos, as sobrancelhas sobem e a boca pode ficar aberta ou tensa.",
        examples: [
          "Quando ouvimos um barulho forte",
          "Quando vemos algo que nos dá medo",
          "Quando alguém nos surpreende"
        ],
        image: "assustado.svg"
      },
      {
        name: "Confuso",
        description: "Quando estamos confusos, as sobrancelhas podem se juntar, a testa fica enrugada e a boca pode ficar torta ou mordendo os lábios.",
        examples: [
          "Quando não entendemos uma instrução",
          "Quando algo é muito difícil",
          "Quando não sabemos o que fazer"
        ],
        image: "confuso.svg"
      },
      {
        name: "Orgulhoso",
        description: "Quando estamos orgulhosos, ficamos com o peito estufado, a cabeça erguida e um sorriso no rosto.",
        examples: [
          "Quando conseguimos fazer algo difícil",
          "Quando ganhamos um jogo",
          "Quando ajudamos alguém"
        ],
        image: "orgulhoso.svg"
      },
      {
        name: "Envergonhado",
        description: "Quando estamos envergonhados, o rosto pode ficar vermelho, os olhos olham para baixo e podemos cobrir o rosto com as mãos.",
        examples: [
          "Quando cometemos um erro na frente de outras pessoas",
          "Quando recebemos um elogio",
          "Quando somos o centro das atenções"
        ],
        image: "envergonhado.svg"
      }
    ],
    // Perguntas para o modo praticar
    questions: {
      easy: [
        {
          image: "feliz_1.svg",
          options: ["Feliz", "Triste", "Bravo"],
          answer: "Feliz"
        },
        {
          image: "triste_1.svg",
          options: ["Feliz", "Triste", "Bravo"],
          answer: "Triste"
        },
        {
          image: "bravo_1.svg",
          options: ["Feliz", "Triste", "Bravo"],
          answer: "Bravo"
        }
      ],
      medium: [
        {
          image: "feliz_2.svg",
          options: ["Feliz", "Surpreso", "Confuso", "Triste"],
          answer: "Feliz"
        },
        {
          image: "surpreso_1.svg",
          options: ["Feliz", "Surpreso", "Confuso", "Triste"],
          answer: "Surpreso"
        },
        {
          image: "confuso_1.svg",
          options: ["Feliz", "Surpreso", "Confuso", "Triste"],
          answer: "Confuso"
        },
        {
          image: "assustado_1.svg",
          options: ["Bravo", "Assustado", "Confuso", "Triste"],
          answer: "Assustado"
        }
      ],
      hard: [
        {
          image: "orgulhoso_1.svg",
          options: ["Feliz", "Orgulhoso", "Surpreso", "Confuso", "Envergonhado"],
          answer: "Orgulhoso"
        },
        {
          image: "envergonhado_1.svg",
          options: ["Triste", "Confuso", "Envergonhado", "Assustado", "Bravo"],
          answer: "Envergonhado"
        },
        {
          image: "confuso_2.svg",
          options: ["Feliz", "Orgulhoso", "Surpreso", "Confuso", "Envergonhado"],
          answer: "Confuso"
        },
        {
          image: "assustado_2.svg",
          options: ["Triste", "Confuso", "Envergonhado", "Assustado", "Bravo"],
          answer: "Assustado"
        },
        {
          image: "bravo_2.svg",
          options: ["Triste", "Confuso", "Envergonhado", "Assustado", "Bravo"],
          answer: "Bravo"
        }
      ]
    }
  }
};

// Elementos do DOM
const elements = {
  // Telas
  modeSelection: document.getElementById('mode-selection'),
  learnScreen: document.getElementById('learn-screen'),
  levelSelection: document.getElementById('level-selection'),
  practiceScreen: document.getElementById('practice-screen'),
  completionScreen: document.getElementById('completion-screen'),
  
  // Botões de navegação
  backButton: document.getElementById('back-button'),
  backToModes: document.getElementById('back-to-modes'),
  backToModesFromLevel: document.getElementById('back-to-modes-from-level'),
  backToLevel: document.getElementById('back-to-level'),
  
  // Botões de modo
  modeButtons: document.querySelectorAll('.mode-button'),
  
  // Elementos do modo aprender
  emotionCard: document.getElementById('emotion-card'),
  emotionImage: document.getElementById('emotion-image'),
  emotionName: document.getElementById('emotion-name'),
  emotionDescription: document.getElementById('emotion-description'),
  emotionExamples: document.getElementById('emotion-examples'),
  prevEmotion: document.getElementById('prev-emotion'),
  nextEmotion: document.getElementById('next-emotion'),
  
  // Botões de nível
  levelButtons: document.querySelectorAll('.level-button'),
  
  // Elementos do modo praticar
  practiceExpressionImage: document.getElementById('practice-expression-image'),
  optionsContainer: document.getElementById('options-container'),
  statusMessage: document.getElementById('status-message'),
  scoreCount: document.getElementById('score-count'),
  totalQuestions: document.getElementById('total-questions'),
  
  // Botões de controle do jogo
  hintButton: document.getElementById('hint-button'),
  nextQuestionButton: document.getElementById('next-question-button'),
  
  // Elementos da tela de conclusão
  finalScore: document.getElementById('final-score'),
  finalTotal: document.getElementById('final-total'),
  nextLevelButton: document.getElementById('next-level-button'),
  replayLevelButton: document.getElementById('replay-level-button'),
  backToLevelsButton: document.getElementById('back-to-levels-button'),
  
  // Controle de som
  soundToggle: document.getElementById('sound-toggle'),
  
  // Sons
  successSound: document.getElementById('success-sound'),
  errorSound: document.getElementById('error-sound'),
  hintSound: document.getElementById('hint-sound'),
  completionSound: document.getElementById('completion-sound')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Configurar eventos dos botões de navegação
  elements.backButton.addEventListener('click', goToMainMenu);
  elements.backToModes.addEventListener('click', showModeSelection);
  elements.backToModesFromLevel.addEventListener('click', showModeSelection);
  elements.backToLevel.addEventListener('click', showLevelSelection);
  
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
  
  // Configurar eventos dos botões de navegação do carrossel
  elements.prevEmotion.addEventListener('click', showPreviousEmotion);
  elements.nextEmotion.addEventListener('click', showNextEmotion);
  
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
  elements.nextQuestionButton.addEventListener('click', showNextQuestion);
  
  // Configurar eventos dos botões da tela de conclusão
  elements.nextLevelButton.addEventListener('click', goToNextLevel);
  elements.replayLevelButton.addEventListener('click', restartLevel);
  elements.backToLevelsButton.addEventListener('click', showLevelSelection);
  
  // Configurar controle de som
  if (window.gameUtils) {
    // Usar configuração global de som
    expressionsConfig.soundEnabled = window.gameUtils.soundEnabled;
  } else {
    // Configurar controle de som local
    elements.soundToggle.addEventListener('click', toggleSound);
  }
  
  // Criar imagens temporárias para pré-carregamento
  createTemporaryImages();
  
  // Mostrar tela inicial
  showModeSelection();
  
  // Anunciar para leitores de tela
  announceToScreenReader('Jogo de Expressões Faciais carregado. Escolha um modo para começar.');
});

/**
 * Cria imagens temporárias para os itens do jogo
 * Isso será substituído por imagens reais em produção
 */
function createTemporaryImages() {
  // Verificar se as imagens existem
  const testImage = new Image();
  testImage.src = '../assets/images/feliz.svg';
  
  testImage.onerror = () => {
    console.log('Criando imagens temporárias para desenvolvimento');
    
    // Criar SVGs temporários para cada emoção
    createTemporaryEmotionSVGs();
  };
}

/**
 * Cria SVGs temporários para as emoções
 */
function createTemporaryEmotionSVGs() {
  // Percorrer todas as emoções
  expressionsConfig.gameData.emotions.forEach(emotion => {
    // Substituir caminhos de imagem por funções que geram SVGs temporários
    emotion.getEmotionSVG = () => createEmotionSVG(emotion.name);
  });
  
  // Percorrer todas as perguntas
  Object.keys(expressionsConfig.gameData.questions).forEach(level => {
    expressionsConfig.gameData.questions[level].forEach(question => {
      // Substituir caminhos de imagem por funções que geram SVGs temporários
      question.getQuestionSVG = () => createEmotionSVG(question.answer);
    });
  });
}

/**
 * Cria um SVG temporário para uma emoção
 * @param {string} emotion - Nome da emoção
 * @returns {string} SVG em formato de string
 */
function createEmotionSVG(emotion) {
  // Definir características do rosto baseadas na emoção
  let eyes = '';
  let mouth = '';
  let eyebrows = '';
  
  switch(emotion) {
    case 'Feliz':
      eyes = '<circle cx="35" cy="45" r="5" fill="#000" /><circle cx="65" cy="45" r="5" fill="#000" />';
      eyebrows = '<path d="M25 35 Q35 30 45 35" stroke="#000" stroke-width="2" fill="none" /><path d="M55 35 Q65 30 75 35" stroke="#000" stroke-width="2" fill="none" />';
      mouth = '<path d="M30 70 Q50 85 70 70" stroke="#000" stroke-width="3" fill="none" />';
      break;
    case 'Triste':
      eyes = '<circle cx="35" cy="45" r="5" fill="#000" /><circle cx="65" cy="45" r="5" fill="#000" />';
      eyebrows = '<path d="M25 30 Q35 35 45 30" stroke="#000" stroke-width="2" fill="none" /><path d="M55 30 Q65 35 75 30" stroke="#000" stroke-width="2" fill="none" />';
      mouth = '<path d="M30 75 Q50 60 70 75" stroke="#000" stroke-width="3" fill="none" />';
      break;
    case 'Bravo':
      eyes = '<circle cx="35" cy="45" r="5" fill="#000" /><circle cx="65" cy="45" r="5" fill="#000" />';
      eyebrows = '<path d="M25 35 Q35 25 45 35" stroke="#000" stroke-width="3" fill="none" /><path d="M55 35 Q65 25 75 35" stroke="#000" stroke-width="3" fill="none" />';
      mouth = '<line x1="30" y1="70" x2="70" y2="70" stroke="#000" stroke-width="3" />';
      break;
    case 'Surpreso':
      eyes = '<circle cx="35" cy="45" r="7" fill="#000" /><circle cx="65" cy="45" r="7" fill="#000" />';
      eyebrows = '<path d="M25 25 Q35 20 45 25" stroke="#000" stroke-width="2" fill="none" /><path d="M55 25 Q65 20 75 25" stroke="#000" stroke-width="2" fill="none" />';
      mouth = '<circle cx="50" cy="75" r="10" stroke="#000" stroke-width="3" fill="none" />';
      break;
    case 'Assustado':
      eyes = '<circle cx="35" cy="45" r="8" fill="#000" /><circle cx="65" cy="45" r="8" fill="#000" />';
      eyebrows = '<path d="M25 25 Q35 15 45 25" stroke="#000" stroke-width="2" fill="none" /><path d="M55 25 Q65 15 75 25" stroke="#000" stroke-width="2" fill="none" />';
      mouth = '<path d="M30 75 Q50 85 70 75" stroke="#000" stroke-width="3" fill="none" />';
      break;
    case 'Confuso':
      eyes = '<circle cx="35" cy="45" r="5" fill="#000" /><circle cx="65" cy="45" r="5" fill="#000" />';
      eyebrows = '<path d="M25 30 Q35 25 45 35" stroke="#000" stroke-width="2" fill="none" /><path d="M55 30 Q65 35 75 30" stroke="#000" stroke-width="2" fill="none" />';
      mouth = '<path d="M30 70 Q40 75 50 70 Q60 65 70 70" stroke="#000" stroke-width="3" fill="none" />';
      break;
    case 'Orgulhoso':
      eyes = '<circle cx="35" cy="45" r="5" fill="#000" /><circle cx="65" cy="45" r="5" fill="#000" />';
      eyebrows = '<path d="M25 30 Q35 25 45 30" stroke="#000" stroke-width="2" fill="none" /><path d="M55 30 Q65 25 75 30" stroke="#000" stroke-width="2" fill="none" />';
      mouth = '<path d="M30 70 Q50 80 70 70" stroke="#000" stroke-width="3" fill="none" />';
      break;
    case 'Envergonhado':
      eyes = '<path d="M30 45 Q35 40 40 45" stroke="#000" stroke-width="2" fill="none" /><path d="M60 45 Q65 40 70 45" stroke="#000" stroke-width="2" fill="none" />';
      eyebrows = '<path d="M25 35 Q35 30 45 35" stroke="#000" stroke-width="2" fill="none" /><path d="M55 35 Q65 30 75 35" stroke="#000" stroke-width="2" fill="none" />';
      mouth = '<path d="M40 70 Q50 75 60 70" stroke="#000" stroke-width="2" fill="none" />';
      break;
    default:
      eyes = '<circle cx="35" cy="45" r="5" fill="#000" /><circle cx="65" cy="45" r="5" fill="#000" />';
      eyebrows = '<path d="M25 35 Q35 30 45 35" stroke="#000" stroke-width="2" fill="none" /><path d="M55 35 Q65 30 75 35" stroke="#000" stroke-width="2" fill="none" />';
      mouth = '<line x1="30" y1="70" x2="70" y2="70" stroke="#000" stroke-width="3" />';
  }
  
  // Gerar cor baseada na emoção
  const colors = {
    'Feliz': '#FFD700',
    'Triste': '#87CEFA',
    'Bravo': '#FF6347',
    'Surpreso': '#9370DB',
    'Assustado': '#98FB98',
    'Confuso': '#F4A460',
    'Orgulhoso': '#FF69B4',
    'Envergonhado': '#FFA07A'
  };
  
  const color = colors[emotion] || '#FFEB3B';
  
  // Retornar SVG completo
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="${color}" />
      ${eyebrows}
      ${eyes}
      ${mouth}
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
 * Mostra a tela de seleção de modo
 */
function showModeSelection() {
  // Ocultar todas as telas
  elements.modeSelection.classList.remove('hidden');
  elements.learnScreen.classList.add('hidden');
  elements.levelSelection.classList.add('hidden');
  elements.practiceScreen.classList.add('hidden');
  elements.completionScreen.classList.add('hidden');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Escolha um modo para jogar: Aprender ou Praticar.');
}

/**
 * Seleciona um modo
 * @param {string} mode - Nome do modo
 */
function selectMode(mode) {
  // Atualizar modo atual
  expressionsConfig.currentMode = mode;
  
  // Mostrar tela correspondente ao modo
  if (mode === 'learn') {
    showLearnScreen();
  } else if (mode === 'practice') {
    showLevelSelection();
  }
  
  // Anunciar para leitores de tela
  const modeNames = {
    learn: 'Aprender',
    practice: 'Praticar'
  };
  
  announceToScreenReader(`Modo ${modeNames[mode]} selecionado.`);
}

/**
 * Mostra a tela de aprendizado
 */
function showLearnScreen() {
  // Ocultar todas as telas
  elements.modeSelection.classList.add('hidden');
  elements.learnScreen.classList.remove('hidden');
  elements.levelSelection.classList.add('hidden');
  elements.practiceScreen.classList.add('hidden');
  elements.completionScreen.classList.add('hidden');
  
  // Reiniciar índice da emoção
  expressionsConfig.currentEmotionIndex = 0;
  
  // Mostrar primeira emoção
  showEmotion(expressionsConfig.currentEmotionIndex);
  
  // Anunciar para leitores de tela
  announceToScreenReader('Modo Aprender. Você pode navegar entre diferentes expressões faciais para conhecê-las melhor.');
}

/**
 * Mostra uma emoção específica
 * @param {number} index - Índice da emoção
 */
function showEmotion(index) {
  // Verificar se o índice é válido
  if (index < 0 || index >= expressionsConfig.gameData.emotions.length) {
    return;
  }
  
  // Atualizar índice atual
  expressionsConfig.currentEmotionIndex = index;
  
  // Obter dados da emoção
  const emotion = expressionsConfig.gameData.emotions[index];
  
  // Atualizar elementos da interface
  elements.emotionName.textContent = emotion.name;
  elements.emotionDescription.textContent = emotion.description;
  
  // Limpar e atualizar exemplos
  elements.emotionExamples.innerHTML = '';
  emotion.examples.forEach(example => {
    const li = document.createElement('li');
    li.textContent = example;
    elements.emotionExamples.appendChild(li);
  });
  
  // Atualizar imagem
  if (emotion.getEmotionSVG) {
    // Usar SVG temporário
    elements.emotionImage.innerHTML = emotion.getEmotionSVG();
  } else {
    // Usar imagem real
    elements.emotionImage.innerHTML = '';
    elements.emotionImage.style.backgroundImage = `url('../assets/images/${emotion.image}')`;
  }
  
  // Atualizar estado dos botões de navegação
  elements.prevEmotion.disabled = index === 0;
  elements.nextEmotion.disabled = index === expressionsConfig.gameData.emotions.length - 1;
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Emoção: ${emotion.name}. ${emotion.description}`);
}

/**
 * Mostra a emoção anterior
 */
function showPreviousEmotion() {
  showEmotion(expressionsConfig.currentEmotionIndex - 1);
}

/**
 * Mostra a próxima emoção
 */
function showNextEmotion() {
  showEmotion(expressionsConfig.currentEmotionIndex + 1);
}

/**
 * Mostra a tela de seleção de nível
 */
function showLevelSelection() {
  // Ocultar todas as telas
  elements.modeSelection.classList.add('hidden');
  elements.learnScreen.classList.add('hidden');
  elements.levelSelection.classList.remove('hidden');
  elements.practiceScreen.classList.add('hidden');
  elements.completionScreen.classList.add('hidden');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Escolha um nível de dificuldade para praticar.');
}

/**
 * Seleciona um nível
 * @param {string} level - Nome do nível
 */
function selectLevel(level) {
  // Verificar se o nível existe
  if (!expressionsConfig.gameData.questions[level]) {
    console.error(`Nível ${level} não encontrado`);
    return;
  }
  
  // Atualizar nível atual
  expressionsConfig.currentLevel = level;
  
  // Iniciar jogo
  startPracticeGame();
  
  // Anunciar para leitores de tela
  const levelNames = {
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil'
  };
  
  announceToScreenReader(`Nível ${levelNames[level]} selecionado. O jogo vai começar.`);
}

/**
 * Inicia o jogo no modo praticar
 */
function startPracticeGame() {
  // Ocultar todas as telas
  elements.modeSelection.classList.add('hidden');
  elements.learnScreen.classList.add('hidden');
  elements.levelSelection.classList.add('hidden');
  elements.practiceScreen.classList.remove('hidden');
  elements.completionScreen.classList.add('hidden');
  
  // Reiniciar contadores
  expressionsConfig.score = 0;
  expressionsConfig.currentQuestionIndex = 0;
  
  // Obter perguntas do nível atual
  const questions = expressionsConfig.gameData.questions[expressionsConfig.currentLevel];
  
  // Atualizar total de perguntas
  expressionsConfig.totalQuestions = questions.length;
  
  // Atualizar contadores na interface
  elements.scoreCount.textContent = expressionsConfig.score;
  elements.totalQuestions.textContent = expressionsConfig.totalQuestions;
  
  // Embaralhar perguntas
  const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  expressionsConfig.gameData.questions[expressionsConfig.currentLevel] = shuffledQuestions;
  
  // Mostrar primeira pergunta
  showQuestion(0);
  
  // Anunciar para leitores de tela
  announceToScreenReader('Modo Praticar. Identifique qual emoção a expressão facial representa.');
}

/**
 * Mostra uma pergunta específica
 * @param {number} index - Índice da pergunta
 */
function showQuestion(index) {
  // Verificar se o índice é válido
  if (index < 0 || index >= expressionsConfig.totalQuestions) {
    return;
  }
  
  // Atualizar índice atual
  expressionsConfig.currentQuestionIndex = index;
  
  // Reiniciar estado da resposta
  expressionsConfig.answerGiven = false;
  
  // Obter dados da pergunta
  const question = expressionsConfig.gameData.questions[expressionsConfig.currentLevel][index];
  
  // Atualizar imagem
  if (question.getQuestionSVG) {
    // Usar SVG temporário
    elements.practiceExpressionImage.innerHTML = question.getQuestionSVG();
  } else {
    // Usar imagem real
    elements.practiceExpressionImage.innerHTML = '';
    elements.practiceExpressionImage.style.backgroundImage = `url('../assets/images/${question.image}')`;
  }
  
  // Limpar opções anteriores
  elements.optionsContainer.innerHTML = '';
  
  // Embaralhar opções
  const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
  
  // Criar botões de opção
  shuffledOptions.forEach(option => {
    const button = document.createElement('button');
    button.className = 'option-button';
    button.textContent = option;
    button.setAttribute('aria-label', `Opção: ${option}`);
    
    // Adicionar evento de clique
    button.addEventListener('click', () => {
      // Verificar se já respondeu
      if (expressionsConfig.answerGiven) {
        return;
      }
      
      // Marcar que já respondeu
      expressionsConfig.answerGiven = true;
      
      // Verificar se a resposta está correta
      if (option === question.answer) {
        handleCorrectAnswer(button);
      } else {
        handleIncorrectAnswer(button, question.answer);
      }
    });
    
    // Adicionar navegação por teclado
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
    
    // Adicionar ao container
    elements.optionsContainer.appendChild(button);
  });
  
  // Desabilitar botão de próxima pergunta
  elements.nextQuestionButton.disabled = true;
  
  // Atualizar mensagem de status
  updateStatusMessage('Qual emoção esta expressão representa?');
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Pergunta ${index + 1} de ${expressionsConfig.totalQuestions}. Qual emoção esta expressão representa?`);
}

/**
 * Manipula uma resposta correta
 * @param {HTMLElement} button - Botão da opção selecionada
 */
function handleCorrectAnswer(button) {
  // Adicionar classe de resposta correta
  button.classList.add('correct');
  
  // Reproduzir som de acerto
  playSound(elements.successSound);
  
  // Incrementar pontuação
  expressionsConfig.score++;
  
  // Atualizar pontuação na interface
  elements.scoreCount.textContent = expressionsConfig.score;
  
  // Habilitar botão de próxima pergunta
  elements.nextQuestionButton.disabled = false;
  
  // Atualizar mensagem de status
  updateStatusMessage('Correto! Clique em "Próxima" para continuar.');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Resposta correta! Clique em Próxima para continuar.');
  
  // Desabilitar todas as opções
  const optionButtons = document.querySelectorAll('.option-button');
  optionButtons.forEach(btn => {
    if (btn !== button) {
      btn.disabled = true;
    }
  });
}

/**
 * Manipula uma resposta incorreta
 * @param {HTMLElement} button - Botão da opção selecionada
 * @param {string} correctAnswer - Resposta correta
 */
function handleIncorrectAnswer(button, correctAnswer) {
  // Adicionar classe de resposta incorreta
  button.classList.add('incorrect');
  
  // Reproduzir som de erro
  playSound(elements.errorSound);
  
  // Mostrar resposta correta
  const optionButtons = document.querySelectorAll('.option-button');
  optionButtons.forEach(btn => {
    if (btn.textContent === correctAnswer) {
      btn.classList.add('correct');
    }
  });
  
  // Habilitar botão de próxima pergunta
  elements.nextQuestionButton.disabled = false;
  
  // Atualizar mensagem de status
  updateStatusMessage(`Incorreto. A resposta correta é: ${correctAnswer}`);
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Resposta incorreta. A resposta correta é: ${correctAnswer}. Clique em Próxima para continuar.`);
  
  // Desabilitar todas as opções
  optionButtons.forEach(btn => {
    if (btn !== button) {
      btn.disabled = true;
    }
  });
}

/**
 * Mostra a próxima pergunta
 */
function showNextQuestion() {
  // Verificar se já respondeu à pergunta atual
  if (!expressionsConfig.answerGiven) {
    return;
  }
  
  // Verificar se é a última pergunta
  if (expressionsConfig.currentQuestionIndex >= expressionsConfig.totalQuestions - 1) {
    // Mostrar tela de conclusão
    showCompletionScreen();
  } else {
    // Mostrar próxima pergunta
    showQuestion(expressionsConfig.currentQuestionIndex + 1);
  }
}

/**
 * Mostra a tela de conclusão
 */
function showCompletionScreen() {
  // Ocultar todas as telas
  elements.modeSelection.classList.add('hidden');
  elements.learnScreen.classList.add('hidden');
  elements.levelSelection.classList.add('hidden');
  elements.practiceScreen.classList.add('hidden');
  elements.completionScreen.classList.remove('hidden');
  
  // Atualizar pontuação final
  elements.finalScore.textContent = expressionsConfig.score;
  elements.finalTotal.textContent = expressionsConfig.totalQuestions;
  
  // Reproduzir som de conclusão
  playSound(elements.completionSound);
  
  // Verificar se há próximo nível
  const levels = ['easy', 'medium', 'hard'];
  const currentLevelIndex = levels.indexOf(expressionsConfig.currentLevel);
  
  if (currentLevelIndex < levels.length - 1) {
    // Há próximo nível
    elements.nextLevelButton.disabled = false;
  } else {
    // Não há próximo nível
    elements.nextLevelButton.disabled = true;
  }
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Parabéns! Você completou todas as perguntas. Sua pontuação é ${expressionsConfig.score} de ${expressionsConfig.totalQuestions}.`);
}

/**
 * Vai para o próximo nível
 */
function goToNextLevel() {
  // Obter próximo nível
  const levels = ['easy', 'medium', 'hard'];
  const currentLevelIndex = levels.indexOf(expressionsConfig.currentLevel);
  
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
  startPracticeGame();
  
  // Anunciar para leitores de tela
  announceToScreenReader('Nível reiniciado.');
}

/**
 * Mostra uma dica
 */
function showHint() {
  // Verificar se já respondeu
  if (expressionsConfig.answerGiven) {
    return;
  }
  
  // Obter pergunta atual
  const question = expressionsConfig.gameData.questions[expressionsConfig.currentLevel][expressionsConfig.currentQuestionIndex];
  
  // Obter botão da resposta correta
  const optionButtons = document.querySelectorAll('.option-button');
  let correctButton = null;
  
  optionButtons.forEach(button => {
    if (button.textContent === question.answer) {
      correctButton = button;
    }
  });
  
  // Verificar se encontrou o botão
  if (!correctButton) {
    return;
  }
  
  // Destacar o botão correto
  correctButton.classList.add('hint');
  
  // Reproduzir som de dica
  playSound(elements.hintSound);
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Dica: A resposta correta é ${question.answer}`);
  
  // Remover destaque após um tempo
  setTimeout(() => {
    correctButton.classList.remove('hint');
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
  expressionsConfig.soundEnabled = !expressionsConfig.soundEnabled;
  
  // Atualizar ícone e classe
  if (expressionsConfig.soundEnabled) {
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
  const message = expressionsConfig.soundEnabled ? 'Sons ativados' : 'Sons desativados';
  announceToScreenReader(message);
}

/**
 * Reproduz um som se os sons estiverem ativados
 * @param {HTMLAudioElement} audioElement - Elemento de áudio
 */
function playSound(audioElement) {
  // Verificar se os sons estão ativados
  if (!expressionsConfig.soundEnabled) {
    return;
  }
  
  // Usar a função utilitária do script principal se disponível
  if (window.gameUtils && window.gameUtils.playSound) {
    window.gameUtils.playSound(audioElement, expressionsConfig.soundEnabled);
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
