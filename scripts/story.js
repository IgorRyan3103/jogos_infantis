/**
 * História Interativa - Script principal
 * Implementação em JavaScript puro para crianças autistas
 * Foco em acessibilidade, feedback claro e experiência previsível
 */

// Configuração do jogo
const storyConfig = {
  // Sons ativados por padrão
  soundEnabled: true,
  // História atual
  currentStory: null,
  // Página atual
  currentPage: 0,
  // Caminho escolhido
  chosenPath: [],
  // Escolha atual
  currentChoice: null,
  // Dados das histórias
  stories: {
    // História: Um Dia na Escola
    school: {
      title: "Um Dia na Escola",
      totalPages: 8,
      pages: [
        {
          text: "Miguel está indo para seu primeiro dia em uma escola nova. Ele está um pouco nervoso porque não conhece ninguém.",
          image: "school_1.jpg",
          imageAlt: "Miguel em frente à escola nova, parecendo nervoso",
          emotion: {
            icon: "😟",
            text: "Miguel está nervoso"
          },
          choices: [
            {
              text: "Miguel pode respirar fundo e entrar na escola",
              nextPage: 1
            },
            {
              text: "Miguel pode pedir para sua mãe entrar com ele",
              nextPage: 2
            }
          ]
        },
        {
          text: "Miguel respira fundo e entra na escola sozinho. A professora Ana o recebe com um sorriso e o apresenta para a turma.",
          image: "school_2a.jpg",
          imageAlt: "Professora Ana apresentando Miguel para a turma",
          emotion: {
            icon: "😊",
            text: "Miguel está mais calmo"
          },
          choices: [
            {
              text: "Miguel pode se sentar perto de um colega que sorriu para ele",
              nextPage: 3
            },
            {
              text: "Miguel pode se sentar em uma carteira vazia no fundo da sala",
              nextPage: 4
            }
          ]
        },
        {
          text: "Miguel pede para sua mãe entrar com ele. Ela o acompanha até a sala de aula e conversa com a professora Ana.",
          image: "school_2b.jpg",
          imageAlt: "Mãe de Miguel conversando com a professora Ana",
          emotion: {
            icon: "😌",
            text: "Miguel está se sentindo seguro"
          },
          choices: [
            {
              text: "Miguel pode agradecer sua mãe e se despedir",
              nextPage: 3
            },
            {
              text: "Miguel pode pedir para sua mãe ficar mais um pouco",
              nextPage: 5
            }
          ]
        },
        {
          text: "Miguel se senta perto de um menino chamado Pedro, que sorriu para ele. Pedro pergunta se Miguel gosta de dinossauros.",
          image: "school_3a.jpg",
          imageAlt: "Miguel sentado ao lado de Pedro, que está mostrando um livro de dinossauros",
          emotion: {
            icon: "😃",
            text: "Miguel está animado"
          },
          choices: [
            {
              text: "Miguel pode dizer que adora dinossauros",
              nextPage: 6
            },
            {
              text: "Miguel pode dizer que prefere carros",
              nextPage: 7
            }
          ]
        },
        {
          text: "Miguel se senta em uma carteira vazia no fundo da sala. Ele observa os outros alunos conversando entre si.",
          image: "school_3b.jpg",
          imageAlt: "Miguel sentado sozinho no fundo da sala, observando os colegas",
          emotion: {
            icon: "🤔",
            text: "Miguel está pensativo"
          },
          choices: [
            {
              text: "Miguel pode desenhar enquanto espera a aula começar",
              nextPage: 8
            },
            {
              text: "Miguel pode se aproximar de um grupo de crianças",
              nextPage: 7
            }
          ]
        },
        {
          text: "A mãe de Miguel fica mais um pouco, mas explica que precisa ir trabalhar. Ela promete voltar para buscá-lo no final da aula.",
          image: "school_3c.jpg",
          imageAlt: "Mãe de Miguel se despedindo dele na porta da sala",
          emotion: {
            icon: "😕",
            text: "Miguel está um pouco triste"
          },
          choices: [
            {
              text: "Miguel pode acenar para sua mãe e voltar para a sala",
              nextPage: 3
            },
            {
              text: "Miguel pode pedir para a professora ficar perto dele",
              nextPage: 8
            }
          ]
        },
        {
          text: "Miguel e Pedro descobrem que ambos adoram dinossauros! Eles passam o intervalo conversando sobre seus dinossauros favoritos.",
          image: "school_4a.jpg",
          imageAlt: "Miguel e Pedro brincando juntos com dinossauros de brinquedo",
          emotion: {
            icon: "😄",
            text: "Miguel está feliz"
          },
          ending: {
            text: "Miguel fez um novo amigo em seu primeiro dia de aula! Ele descobriu que compartilhar interesses é uma ótima maneira de fazer amizades.",
            positive: true
          }
        },
        {
          text: "Miguel diz que prefere carros. Pedro mostra que também tem alguns carrinhos na mochila e convida Miguel para brincar no intervalo.",
          image: "school_4b.jpg",
          imageAlt: "Miguel e Pedro brincando com carrinhos no pátio da escola",
          emotion: {
            icon: "😄",
            text: "Miguel está feliz"
          },
          ending: {
            text: "Miguel fez um novo amigo em seu primeiro dia de aula! Ele aprendeu que mesmo com interesses diferentes, as pessoas podem encontrar coisas em comum.",
            positive: true
          }
        },
        {
          text: "A professora Ana nota que Miguel está sozinho e o convida para uma atividade em grupo. Ela o apresenta a alguns colegas que o recebem bem.",
          image: "school_4c.jpg",
          imageAlt: "Professora Ana apresentando Miguel a um grupo de crianças em uma atividade",
          emotion: {
            icon: "🙂",
            text: "Miguel está se sentindo melhor"
          },
          ending: {
            text: "Com a ajuda da professora, Miguel começou a se enturmar. Ele aprendeu que às vezes precisamos de um pouco de ajuda para fazer novos amigos, e isso é normal.",
            positive: true
          }
        }
      ]
    },
    
    // História: Aventura no Parque
    park: {
      title: "Aventura no Parque",
      totalPages: 8,
      pages: [
        {
          text: "Ana está no parque com sua família. Ela vê um escorregador muito legal, mas há outras crianças esperando para brincar.",
          image: "park_1.jpg",
          imageAlt: "Ana olhando para um escorregador com crianças esperando na fila",
          emotion: {
            icon: "😲",
            text: "Ana está ansiosa para brincar"
          },
          choices: [
            {
              text: "Ana pode esperar sua vez na fila",
              nextPage: 1
            },
            {
              text: "Ana pode tentar passar na frente das outras crianças",
              nextPage: 2
            }
          ]
        },
        {
          text: "Ana espera pacientemente na fila. Enquanto espera, ela observa como as outras crianças escorregam e fica ainda mais animada.",
          image: "park_2a.jpg",
          imageAlt: "Ana esperando na fila do escorregador, observando as outras crianças",
          emotion: {
            icon: "😊",
            text: "Ana está aprendendo a ter paciência"
          },
          choices: [
            {
              text: "Ana pode conversar com a criança ao lado dela na fila",
              nextPage: 3
            },
            {
              text: "Ana pode continuar esperando quietinha",
              nextPage: 4
            }
          ]
        },
        {
          text: "Ana tenta passar na frente das outras crianças. Um menino diz: 'Ei, você precisa esperar sua vez como todo mundo!'",
          image: "park_2b.jpg",
          imageAlt: "Um menino falando com Ana, que parece surpresa",
          emotion: {
            icon: "😳",
            text: "Ana está envergonhada"
          },
          choices: [
            {
              text: "Ana pode pedir desculpas e ir para o final da fila",
              nextPage: 5
            },
            {
              text: "Ana pode ficar chateada e sair do escorregador",
              nextPage: 6
            }
          ]
        },
        {
          text: "Ana sorri para a menina ao lado dela e pergunta: 'Você vem sempre neste parque?' Elas começam a conversar sobre seus brinquedos favoritos.",
          image: "park_3a.jpg",
          imageAlt: "Ana conversando com uma menina na fila do escorregador",
          emotion: {
            icon: "😄",
            text: "Ana está feliz por fazer uma nova amiga"
          },
          choices: [
            {
              text: "Ana pode convidar a menina para brincar juntas depois",
              nextPage: 7
            },
            {
              text: "Ana pode se despedir quando chegar sua vez de escorregar",
              nextPage: 8
            }
          ]
        },
        {
          text: "Ana espera quietinha. Logo chega sua vez e ela escorrega, sentindo o vento em seu rosto. É muito divertido!",
          image: "park_3b.jpg",
          imageAlt: "Ana escorregando com um grande sorriso no rosto",
          emotion: {
            icon: "🤩",
            text: "Ana está muito feliz"
          },
          ending: {
            text: "Ana aprendeu que esperar sua vez vale a pena! Ela se divertiu muito no escorregador e sentiu-se orgulhosa por ter sido paciente.",
            positive: true
          }
        },
        {
          text: "Ana pede desculpas e vai para o final da fila. As outras crianças aceitam suas desculpas e uma delas até sorri para ela.",
          image: "park_3c.jpg",
          imageAlt: "Ana no final da fila, com uma criança sorrindo para ela",
          emotion: {
            icon: "😌",
            text: "Ana está aliviada"
          },
          choices: [
            {
              text: "Ana pode sorrir de volta e esperar sua vez",
              nextPage: 4
            },
            {
              text: "Ana pode perguntar o nome da criança que sorriu para ela",
              nextPage: 3
            }
          ]
        },
        {
          text: "Ana fica chateada e sai do escorregador. Ela se senta em um banco, sozinha e triste.",
          image: "park_3d.jpg",
          imageAlt: "Ana sentada sozinha em um banco, parecendo triste",
          emotion: {
            icon: "😢",
            text: "Ana está triste"
          },
          choices: [
            {
              text: "A mãe de Ana pode conversar com ela sobre esperar a vez",
              nextPage: 5
            },
            {
              text: "Ana pode encontrar outro brinquedo sem fila",
              nextPage: 8
            }
          ]
        },
        {
          text: "Ana e sua nova amiga, Júlia, escorregam juntas várias vezes. Depois, elas vão brincar no balanço e na caixa de areia.",
          image: "park_4a.jpg",
          imageAlt: "Ana e Júlia brincando juntas em diferentes brinquedos do parque",
          emotion: {
            icon: "😄",
            text: "Ana está muito feliz com sua nova amiga"
          },
          ending: {
            text: "Ana não só aprendeu a esperar sua vez, como também fez uma nova amiga! Ela descobriu que conversar com outras crianças pode ser o início de uma amizade divertida.",
            positive: true
          }
        },
        {
          text: "Ana se despede da menina quando chega sua vez. Depois de escorregar, ela encontra outros brinquedos divertidos no parque.",
          image: "park_4b.jpg",
          imageAlt: "Ana explorando diferentes brinquedos no parque",
          emotion: {
            icon: "😊",
            text: "Ana está contente explorando o parque"
          },
          ending: {
            text: "Ana aprendeu a esperar sua vez e a ser educada com outras crianças. Ela se divertiu muito explorando todos os brinquedos do parque!",
            positive: true
          }
        }
      ]
    },
    
    // História: Festa de Aniversário
    birthday: {
      title: "Festa de Aniversário",
      totalPages: 8,
      pages: [
        {
          text: "Lucas foi convidado para a festa de aniversário de seu colega Mateus. Quando chega à festa, vê muitas crianças, luzes coloridas e música alta.",
          image: "birthday_1.jpg",
          imageAlt: "Lucas na entrada da festa, olhando para as luzes e crianças",
          emotion: {
            icon: "😨",
            text: "Lucas está sobrecarregado"
          },
          choices: [
            {
              text: "Lucas pode pedir para seu pai ficar com ele por um tempo",
              nextPage: 1
            },
            {
              text: "Lucas pode procurar um lugar mais quieto na festa",
              nextPage: 2
            }
          ]
        },
        {
          text: "O pai de Lucas fica com ele por um tempo. Juntos, eles observam a festa de longe, enquanto Lucas se acostuma com o ambiente.",
          image: "birthday_2a.jpg",
          imageAlt: "Lucas e seu pai observando a festa de um canto mais tranquilo",
          emotion: {
            icon: "😌",
            text: "Lucas está se sentindo mais seguro"
          },
          choices: [
            {
              text: "Lucas pode pedir para seu pai levá-lo até Mateus para entregar o presente",
              nextPage: 3
            },
            {
              text: "Lucas pode ficar mais um pouco com seu pai até se sentir pronto",
              nextPage: 4
            }
          ]
        },
        {
          text: "Lucas encontra um canto mais quieto da casa, longe da música alta. Ele respira fundo e observa as outras crianças brincando.",
          image: "birthday_2b.jpg",
          imageAlt: "Lucas em um canto mais quieto, observando as outras crianças",
          emotion: {
            icon: "😮‍💨",
            text: "Lucas está se acalmando"
          },
          choices: [
            {
              text: "Lucas pode ir entregar o presente para Mateus",
              nextPage: 3
            },
            {
              text: "Lucas pode ficar desenhando em seu caderninho que trouxe",
              nextPage: 5
            }
          ]
        },
        {
          text: "Lucas entrega o presente para Mateus, que fica muito feliz. 'Obrigado por vir à minha festa, Lucas!' diz Mateus com um grande sorriso.",
          image: "birthday_3a.jpg",
          imageAlt: "Lucas entregando um presente para Mateus, que sorri",
          emotion: {
            icon: "🙂",
            text: "Lucas está se sentindo melhor"
          },
          choices: [
            {
              text: "Lucas pode perguntar a Mateus sobre os jogos da festa",
              nextPage: 6
            },
            {
              text: "Lucas pode dizer 'De nada' e voltar para um lugar mais quieto",
              nextPage: 5
            }
          ]
        },
        {
          text: "Depois de um tempo, Lucas se sente mais confortável. Ele vê algumas crianças jogando um jogo de tabuleiro em uma mesa afastada da música.",
          image: "birthday_3b.jpg",
          imageAlt: "Crianças jogando um jogo de tabuleiro em uma mesa afastada",
          emotion: {
            icon: "🤔",
            text: "Lucas está interessado no jogo"
          },
          choices: [
            {
              text: "Lucas pode se aproximar e observar o jogo",
              nextPage: 7
            },
            {
              text: "Lucas pode procurar Mateus para entregar o presente",
              nextPage: 3
            }
          ]
        },
        {
          text: "Lucas fica desenhando em seu caderninho. Uma menina chamada Sofia se aproxima e diz: 'Uau, você desenha muito bem! Posso ver?'",
          image: "birthday_3c.jpg",
          imageAlt: "Sofia olhando para o desenho de Lucas",
          emotion: {
            icon: "😊",
            text: "Lucas está surpreso e contente"
          },
          choices: [
            {
              text: "Lucas pode mostrar seus desenhos para Sofia",
              nextPage: 8
            },
            {
              text: "Lucas pode agradecer e continuar desenhando sozinho",
              nextPage: 7
            }
          ]
        },
        {
          text: "Mateus mostra a Lucas os jogos da festa. Há uma caça ao tesouro que está prestes a começar, e Mateus convida Lucas para ser seu parceiro.",
          image: "birthday_4a.jpg",
          imageAlt: "Mateus explicando a caça ao tesouro para Lucas",
          emotion: {
            icon: "😃",
            text: "Lucas está animado"
          },
          ending: {
            text: "Lucas participou da caça ao tesouro com Mateus e eles encontraram muitos tesouros juntos! Lucas aprendeu que mesmo quando uma situação parece difícil no início, pode se tornar divertida quando damos uma chance.",
            positive: true
          }
        },
        {
          text: "Lucas se aproxima da mesa de jogos. Um menino olha para ele e diz: 'Quer jogar com a gente? Estamos precisando de mais um jogador!'",
          image: "birthday_4b.jpg",
          imageAlt: "Crianças convidando Lucas para jogar",
          emotion: {
            icon: "😄",
            text: "Lucas está feliz pelo convite"
          },
          ending: {
            text: "Lucas se juntou ao jogo e se divertiu muito! Ele descobriu que encontrar uma atividade mais calma em uma festa agitada pode ser uma ótima maneira de se divertir e fazer novos amigos.",
            positive: true
          }
        },
        {
          text: "Lucas mostra seus desenhos para Sofia. Ela fica impressionada e conta que também adora desenhar. Eles começam a desenhar juntos.",
          image: "birthday_4c.jpg",
          imageAlt: "Lucas e Sofia desenhando juntos",
          emotion: {
            icon: "😄",
            text: "Lucas está feliz por compartilhar seu interesse"
          },
          ending: {
            text: "Lucas e Sofia passaram a festa desenhando e conversando sobre seus personagens favoritos. Lucas aprendeu que compartilhar seus interesses pode ser uma ótima maneira de fazer amizades, mesmo em situações desafiadoras.",
            positive: true
          }
        }
      ]
    }
  }
};

// Elementos do DOM
const elements = {
  // Telas
  storySelection: document.getElementById('story-selection'),
  storyScreen: document.getElementById('story-screen'),
  storyCompletion: document.getElementById('story-completion'),
  
  // Botões de navegação
  backButton: document.getElementById('back-button'),
  backToStories: document.getElementById('back-to-stories'),
  
  // Botões de história
  storyButtons: document.querySelectorAll('.story-button'),
  
  // Elementos da história
  storyTitle: document.getElementById('story-title'),
  progressFill: document.getElementById('progress-fill'),
  currentPage: document.getElementById('current-page'),
  totalPages: document.getElementById('total-pages'),
  sceneImage: document.getElementById('scene-image'),
  sceneText: document.getElementById('scene-text'),
  characterEmotion: document.getElementById('character-emotion'),
  storyChoices: document.getElementById('story-choices'),
  storyHintButton: document.getElementById('story-hint-button'),
  storyContinueButton: document.getElementById('story-continue-button'),
  
  // Elementos da tela de conclusão
  completionSummary: document.getElementById('completion-summary'),
  restartStoryButton: document.getElementById('restart-story-button'),
  differentEndingButton: document.getElementById('different-ending-button'),
  backToStoriesButton: document.getElementById('back-to-stories-button'),
  
  // Controle de som
  soundToggle: document.getElementById('sound-toggle'),
  
  // Sons
  successSound: document.getElementById('success-sound'),
  errorSound: document.getElementById('error-sound'),
  hintSound: document.getElementById('hint-sound'),
  completionSound: document.getElementById('completion-sound'),
  clickSound: document.getElementById('click-sound'),
  pageTurnSound: document.getElementById('page-turn-sound')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Configurar eventos dos botões de navegação
  elements.backButton.addEventListener('click', goToMainMenu);
  elements.backToStories.addEventListener('click', showStorySelection);
  
  // Configurar eventos dos botões de história
  elements.storyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const story = button.dataset.story;
      if (story) {
        selectStory(story);
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
  
  // Configurar eventos da tela de história
  elements.storyHintButton.addEventListener('click', showStoryHint);
  elements.storyContinueButton.addEventListener('click', continueStory);
  
  // Configurar eventos da tela de conclusão
  elements.restartStoryButton.addEventListener('click', restartStory);
  elements.differentEndingButton.addEventListener('click', tryDifferentEnding);
  elements.backToStoriesButton.addEventListener('click', showStorySelection);
  
  // Configurar controle de som
  if (window.gameUtils) {
    // Usar configuração global de som
    storyConfig.soundEnabled = window.gameUtils.soundEnabled;
  } else {
    // Configurar controle de som local
    elements.soundToggle.addEventListener('click', toggleSound);
  }
  
  // Mostrar tela inicial
  showStorySelection();
  
  // Anunciar para leitores de tela
  announceToScreenReader('História Interativa carregada. Escolha uma história para começar.');
});

/**
 * Navega para o menu principal
 */
function goToMainMenu() {
  window.location.href = '../index.html';
}

/**
 * Mostra a tela de seleção de história
 */
function showStorySelection() {
  // Ocultar todas as telas
  elements.storySelection.classList.remove('hidden');
  elements.storyScreen.classList.add('hidden');
  elements.storyCompletion.classList.add('hidden');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Escolha uma história para começar.');
}

/**
 * Seleciona uma história
 * @param {string} story - Nome da história
 */
function selectStory(story) {
  // Verificar se a história existe
  if (!storyConfig.stories[story]) {
    console.error(`História ${story} não encontrada`);
    return;
  }
  
  // Atualizar história atual
  storyConfig.currentStory = story;
  
  // Reiniciar estado
  storyConfig.currentPage = 0;
  storyConfig.chosenPath = [];
  storyConfig.currentChoice = null;
  
  // Iniciar história
  startStory();
  
  // Anunciar para leitores de tela
  announceToScreenReader(`História ${storyConfig.stories[story].title} selecionada. A história vai começar.`);
}

/**
 * Inicia a história selecionada
 */
function startStory() {
  // Ocultar todas as telas
  elements.storySelection.classList.add('hidden');
  elements.storyScreen.classList.remove('hidden');
  elements.storyCompletion.classList.add('hidden');
  
  // Obter dados da história
  const storyData = storyConfig.stories[storyConfig.currentStory];
  
  // Atualizar título
  elements.storyTitle.textContent = storyData.title;
  
  // Atualizar total de páginas
  elements.totalPages.textContent = storyData.totalPages;
  
  // Mostrar primeira página
  showStoryPage(0);
}

/**
 * Mostra uma página da história
 * @param {number} pageIndex - Índice da página
 */
function showStoryPage(pageIndex) {
  // Obter dados da história
  const storyData = storyConfig.stories[storyConfig.currentStory];
  
  // Verificar se a página existe
  if (!storyData.pages[pageIndex]) {
    console.error(`Página ${pageIndex} não encontrada na história ${storyConfig.currentStory}`);
    return;
  }
  
  // Atualizar página atual
  storyConfig.currentPage = pageIndex;
  
  // Obter dados da página
  const page = storyData.pages[pageIndex];
  
  // Atualizar texto
  elements.sceneText.textContent = page.text;
  elements.sceneText.classList.add('fade-in');
  
  // Atualizar imagem
  // Na implementação real, usaríamos imagens reais
  // Por enquanto, usamos emojis como placeholder
  const imagePlaceholder = getImagePlaceholder(storyConfig.currentStory, pageIndex);
  elements.sceneImage.textContent = imagePlaceholder;
  elements.sceneImage.style.backgroundImage = `none`;
  elements.sceneImage.setAttribute('aria-label', page.imageAlt || 'Imagem da história');
  
  // Atualizar emoção do personagem
  if (page.emotion) {
    elements.characterEmotion.classList.remove('hidden');
    const emotionIcon = elements.characterEmotion.querySelector('.emotion-icon');
    const emotionText = elements.characterEmotion.querySelector('.emotion-text');
    
    emotionIcon.textContent = page.emotion.icon;
    emotionText.textContent = page.emotion.text;
  } else {
    elements.characterEmotion.classList.add('hidden');
  }
  
  // Atualizar progresso
  const progress = ((pageIndex + 1) / storyData.totalPages) * 100;
  elements.progressFill.style.width = `${progress}%`;
  elements.currentPage.textContent = pageIndex + 1;
  
  // Limpar escolhas anteriores
  elements.storyChoices.innerHTML = '';
  
  // Verificar se é uma página final
  if (page.ending) {
    // Mostrar botão de continuar
    elements.storyContinueButton.classList.remove('hidden');
    
    // Ocultar botão de dica
    elements.storyHintButton.classList.add('hidden');
  } else if (page.choices && page.choices.length > 0) {
    // Criar botões de escolha
    page.choices.forEach((choice, index) => {
      const choiceButton = document.createElement('button');
      choiceButton.className = 'story-choice';
      choiceButton.textContent = choice.text;
      choiceButton.setAttribute('data-choice', index);
      choiceButton.setAttribute('aria-label', `Escolha: ${choice.text}`);
      
      // Adicionar evento de clique
      choiceButton.addEventListener('click', () => {
        selectChoice(index);
      });
      
      // Adicionar navegação por teclado
      choiceButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          choiceButton.click();
        }
      });
      
      // Adicionar ao container
      elements.storyChoices.appendChild(choiceButton);
    });
    
    // Mostrar botão de dica
    elements.storyHintButton.classList.remove('hidden');
    
    // Ocultar botão de continuar
    elements.storyContinueButton.classList.add('hidden');
  }
  
  // Reproduzir som de virar página
  playSound(elements.pageTurnSound);
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Página ${pageIndex + 1} de ${storyData.totalPages}. ${page.text}`);
  
  // Se houver emoção, anunciar após um pequeno delay
  if (page.emotion) {
    setTimeout(() => {
      announceToScreenReader(`${page.emotion.text}`);
    }, 2000);
  }
}

/**
 * Seleciona uma escolha
 * @param {number} choiceIndex - Índice da escolha
 */
function selectChoice(choiceIndex) {
  // Obter dados da página atual
  const storyData = storyConfig.stories[storyConfig.currentStory];
  const page = storyData.pages[storyConfig.currentPage];
  
  // Verificar se a escolha existe
  if (!page.choices || !page.choices[choiceIndex]) {
    console.error(`Escolha ${choiceIndex} não encontrada na página ${storyConfig.currentPage}`);
    return;
  }
  
  // Atualizar escolha atual
  storyConfig.currentChoice = choiceIndex;
  
  // Destacar escolha selecionada
  const choiceButtons = elements.storyChoices.querySelectorAll('.story-choice');
  choiceButtons.forEach((button, index) => {
    if (index === choiceIndex) {
      button.classList.add('selected');
    } else {
      button.classList.remove('selected');
      button.disabled = true;
    }
  });
  
  // Adicionar escolha ao caminho
  storyConfig.chosenPath.push({
    page: storyConfig.currentPage,
    choice: choiceIndex
  });
  
  // Reproduzir som de clique
  playSound(elements.clickSound);
  
  // Mostrar próxima página após um pequeno delay
  setTimeout(() => {
    const nextPage = page.choices[choiceIndex].nextPage;
    showStoryPage(nextPage);
  }, 1000);
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Você escolheu: ${page.choices[choiceIndex].text}`);
}

/**
 * Continua a história após uma página final
 */
function continueStory() {
  // Obter dados da página atual
  const storyData = storyConfig.stories[storyConfig.currentStory];
  const page = storyData.pages[storyConfig.currentPage];
  
  // Verificar se é uma página final
  if (page.ending) {
    // Mostrar tela de conclusão
    showCompletionScreen(page.ending);
  }
}

/**
 * Mostra a tela de conclusão
 * @param {Object} ending - Dados do final da história
 */
function showCompletionScreen(ending) {
  // Ocultar todas as telas
  elements.storySelection.classList.add('hidden');
  elements.storyScreen.classList.add('hidden');
  elements.storyCompletion.classList.remove('hidden');
  
  // Atualizar resumo
  elements.completionSummary.textContent = ending.text;
  
  // Verificar se há caminhos alternativos
  const hasAlternativeEndings = checkForAlternativeEndings();
  
  // Atualizar botão de final diferente
  if (hasAlternativeEndings) {
    elements.differentEndingButton.disabled = false;
  } else {
    elements.differentEndingButton.disabled = true;
  }
  
  // Reproduzir som de conclusão
  playSound(elements.completionSound);
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Parabéns! Você completou a história. ${ending.text}`);
}

/**
 * Verifica se há finais alternativos disponíveis
 * @returns {boolean} - Verdadeiro se houver finais alternativos
 */
function checkForAlternativeEndings() {
  // Obter dados da história
  const storyData = storyConfig.stories[storyConfig.currentStory];
  
  // Contar quantas páginas têm finais
  let endingsCount = 0;
  storyData.pages.forEach(page => {
    if (page.ending) {
      endingsCount++;
    }
  });
  
  // Verificar se há mais de um final
  return endingsCount > 1;
}

/**
 * Reinicia a história atual
 */
function restartStory() {
  // Reiniciar estado
  storyConfig.currentPage = 0;
  storyConfig.chosenPath = [];
  storyConfig.currentChoice = null;
  
  // Iniciar história
  startStory();
  
  // Anunciar para leitores de tela
  announceToScreenReader('História reiniciada.');
}

/**
 * Tenta um final diferente
 */
function tryDifferentEnding() {
  // Verificar se há um caminho escolhido
  if (storyConfig.chosenPath.length === 0) {
    restartStory();
    return;
  }
  
  // Obter última bifurcação
  const lastChoice = storyConfig.chosenPath[storyConfig.chosenPath.length - 1];
  
  // Remover última escolha
  storyConfig.chosenPath.pop();
  
  // Voltar para a página da última escolha
  showStoryPage(lastChoice.page);
  
  // Anunciar para leitores de tela
  announceToScreenReader('Voltando para tentar um caminho diferente.');
}

/**
 * Mostra uma dica para a página atual
 */
function showStoryHint() {
  // Obter dados da página atual
  const storyData = storyConfig.stories[storyConfig.currentStory];
  const page = storyData.pages[storyConfig.currentPage];
  
  // Verificar se há emoção na página
  if (page.emotion) {
    // Destacar emoção
    const emotionContainer = elements.characterEmotion;
    emotionContainer.classList.add('pulse');
    
    // Remover destaque após um tempo
    setTimeout(() => {
      emotionContainer.classList.remove('pulse');
    }, 1000);
    
    // Reproduzir som de dica
    playSound(elements.hintSound);
    
    // Anunciar para leitores de tela
    let hintText = '';
    
    // Gerar dica baseada na emoção
    switch (page.emotion.icon) {
      case '😟':
      case '😨':
      case '😢':
      case '😳':
        hintText = 'O personagem está se sentindo desconfortável. Talvez escolher algo que o ajude a se sentir mais seguro seja uma boa ideia.';
        break;
      case '😊':
      case '🙂':
      case '😌':
        hintText = 'O personagem está se sentindo bem. Talvez escolher algo que mantenha essa sensação positiva seja uma boa ideia.';
        break;
      case '😄':
      case '😃':
      case '🤩':
        hintText = 'O personagem está muito feliz! Talvez escolher algo que continue essa diversão seja uma boa ideia.';
        break;
      case '🤔':
      case '😮‍💨':
      case '😲':
        hintText = 'O personagem está pensativo ou curioso. Talvez escolher algo que explore essa curiosidade seja uma boa ideia.';
        break;
      default:
        hintText = 'Observe como o personagem está se sentindo e pense em como suas escolhas podem afetar essas emoções.';
    }
    
    announceToScreenReader(`Dica: ${hintText}`);
  } else {
    // Se não houver emoção, dar uma dica genérica
    announceToScreenReader('Dica: Pense em como você se sentiria nessa situação e o que seria melhor fazer.');
  }
}

/**
 * Ativa ou desativa os sons do jogo
 */
function toggleSound() {
  // Alternar estado de som
  storyConfig.soundEnabled = !storyConfig.soundEnabled;
  
  // Atualizar ícone e classe
  if (storyConfig.soundEnabled) {
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
  const message = storyConfig.soundEnabled ? 'Sons ativados' : 'Sons desativados';
  announceToScreenReader(message);
}

/**
 * Reproduz um som se os sons estiverem ativados
 * @param {HTMLAudioElement} audioElement - Elemento de áudio
 */
function playSound(audioElement) {
  // Verificar se os sons estão ativados
  if (!storyConfig.soundEnabled) {
    return;
  }
  
  // Usar a função utilitária do script principal se disponível
  if (window.gameUtils && window.gameUtils.playSound) {
    window.gameUtils.playSound(audioElement, storyConfig.soundEnabled);
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

/**
 * Obtém um placeholder para a imagem da história
 * @param {string} story - Nome da história
 * @param {number} pageIndex - Índice da página
 * @returns {string} - Emoji para usar como placeholder
 */
function getImagePlaceholder(story, pageIndex) {
  // Na implementação real, usaríamos imagens reais
  // Por enquanto, usamos emojis como placeholder
  const placeholders = {
    school: ['🏫', '👨‍🏫', '👩‍👦', '👦👦', '👦', '👩‍👦', '🦖', '🚗', '👨‍🏫👦'],
    park: ['🎢', '👧', '👧👦', '👧👧', '👧', '👧', '👧', '👧👧', '👧'],
    birthday: ['🎂', '👦👨', '👦', '👦👦', '👦', '👦👧', '👦👦', '👦👦', '👦👧']
  };
  
  // Verificar se há placeholders para a história
  if (!placeholders[story]) {
    return '📷';
  }
  
  // Verificar se há placeholder para a página
  if (!placeholders[story][pageIndex]) {
    return '📷';
  }
  
  return placeholders[story][pageIndex];
}
