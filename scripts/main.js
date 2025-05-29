/**
 * Script principal para todos os jogos
 * Funções utilitárias compartilhadas entre os jogos
 */

// Objeto global para utilitários do jogo
window.gameUtils = {
  // Sons ativados por padrão
  soundEnabled: true,
  
  /**
   * Reproduz um som se os sons estiverem ativados
   * @param {HTMLAudioElement} audioElement - Elemento de áudio
   * @param {boolean} enabled - Se os sons estão ativados
   */
  playSound: function(audioElement, enabled) {
    // Verificar se os sons estão ativados
    if (!enabled) {
      return;
    }
    
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
  },
  
  /**
   * Anuncia uma mensagem para leitores de tela
   * @param {string} message - Mensagem a ser anunciada
   */
  announceToScreenReader: function(message) {
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
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Configurar controle de som global
  const soundToggle = document.getElementById('sound-toggle');
  if (soundToggle) {
    soundToggle.addEventListener('click', toggleSound);
  }
  
  // Configurar navegação para os jogos
  const gameButtons = document.querySelectorAll('.game-button');
  gameButtons.forEach(button => {
    button.addEventListener('click', () => {
      const game = button.dataset.game;
      if (game) {
        navigateToGame(game);
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
  
  // Anunciar para leitores de tela
  gameUtils.announceToScreenReader('Página de jogos educativos para crianças autistas carregada. Escolha um jogo para começar.');
});

/**
 * Ativa ou desativa os sons do jogo
 */
function toggleSound() {
  // Alternar estado de som
  gameUtils.soundEnabled = !gameUtils.soundEnabled;
  
  // Atualizar ícone e classe
  const soundToggle = document.getElementById('sound-toggle');
  if (soundToggle) {
    if (gameUtils.soundEnabled) {
      soundToggle.classList.remove('sound-off');
      soundToggle.classList.add('sound-on');
      soundToggle.querySelector('.sound-icon').textContent = '🔊';
      soundToggle.setAttribute('aria-label', 'Desativar sons');
    } else {
      soundToggle.classList.remove('sound-on');
      soundToggle.classList.add('sound-off');
      soundToggle.querySelector('.sound-icon').textContent = '🔈';
      soundToggle.setAttribute('aria-label', 'Ativar sons');
    }
  }
  
  // Reproduzir som de clique
  const clickSound = document.getElementById('click-sound');
  if (clickSound && gameUtils.soundEnabled) {
    gameUtils.playSound(clickSound, true);
  }
  
  // Anunciar para leitores de tela
  const message = gameUtils.soundEnabled ? 'Sons ativados' : 'Sons desativados';
  gameUtils.announceToScreenReader(message);
}

/**
 * Navega para um jogo específico
 * @param {string} game - Nome do jogo
 */
function navigateToGame(game) {
  // Reproduzir som de clique
  const clickSound = document.getElementById('click-sound');
  if (clickSound) {
    gameUtils.playSound(clickSound, gameUtils.soundEnabled);
  }
  
  // Navegar para o jogo
  window.location.href = `games/${game}.html`;
  
  // Anunciar para leitores de tela
  gameUtils.announceToScreenReader(`Navegando para o jogo ${getGameName(game)}`);
}

/**
 * Obtém o nome amigável de um jogo
 * @param {string} game - Nome do jogo
 * @returns {string} - Nome amigável do jogo
 */
function getGameName(game) {
  const gameNames = {
    memory: 'Jogo da Memória',
    puzzle: 'Quebra-Cabeças',
    colors: 'Sequência de Cores',
    sorting: 'Jogo de Ordenar',
    music: 'Sons e Músicas',
    association: 'Jogo de Associação',
    expressions: 'Expressões Faciais',
    maze: 'Labirinto Simples',
    counting: 'Jogo de Contagem',
    story: 'História Interativa'
  };
  
  return gameNames[game] || game;
}
