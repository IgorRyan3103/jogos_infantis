/**
 * Sons e Músicas - Script principal
 * Implementação em JavaScript puro para crianças autistas
 * Foco em acessibilidade, feedback claro e experiência previsível
 */

// Configuração do jogo
const musicConfig = {
  // Sons ativados por padrão
  soundEnabled: true,
  // Atividade atual
  currentActivity: null,
  // Configurações específicas para cada atividade
  activities: {
    listen: {
      sounds: ['dog', 'cat', 'bird', 'cow', 'horse', 'sheep']
    },
    rhythm: {
      levels: [
        [1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0],
        [1, 0, 1, 1, 0],
        [1, 1, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 1, 1],
        [1, 1, 0, 1, 0, 1, 0, 1]
      ],
      currentLevel: 0,
      speed: 600,
      userSequence: []
    },
    create: {
      notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      recording: false,
      recordedNotes: [],
      playbackIndex: 0
    },
    relax: {
      sounds: ['rain', 'ocean', 'forest', 'birds'],
      currentSound: null,
      volume: 0.7
    }
  }
};

// Elementos do DOM
const elements = {
  // Áreas de atividade
  activitySelection: document.getElementById('activity-selection'),
  listenActivity: document.getElementById('listen-activity'),
  rhythmActivity: document.getElementById('rhythm-activity'),
  createActivity: document.getElementById('create-activity'),
  relaxActivity: document.getElementById('relax-activity'),
  
  // Mensagens de status
  listenStatus: document.getElementById('listen-status'),
  rhythmStatus: document.getElementById('rhythm-status'),
  createStatus: document.getElementById('create-status'),
  relaxStatus: document.getElementById('relax-status'),
  
  // Elementos específicos da atividade Ouvir Sons
  soundCards: document.querySelectorAll('.sound-card'),
  
  // Elementos específicos da atividade Seguir Ritmos
  rhythmSequence: document.getElementById('rhythm-sequence'),
  rhythmPlay: document.getElementById('rhythm-play'),
  rhythmRepeat: document.getElementById('rhythm-repeat'),
  drumPads: document.querySelectorAll('.drum-pad'),
  
  // Elementos específicos da atividade Criar Música
  pianoKeys: document.querySelectorAll('.piano-key'),
  recordButton: document.getElementById('record-button'),
  playButton: document.getElementById('play-button'),
  clearButton: document.getElementById('clear-button'),
  
  // Elementos específicos da atividade Sons Relaxantes
  relaxCards: document.querySelectorAll('.relax-card'),
  currentSoundName: document.getElementById('current-sound-name'),
  playSoundButton: document.getElementById('play-sound-button'),
  pauseSoundButton: document.getElementById('pause-sound-button'),
  volumeSlider: document.getElementById('volume-slider'),
  
  // Botões de controle
  activityButtons: document.querySelectorAll('.activity-button'),
  listenBackButton: document.getElementById('listen-back-button'),
  rhythmBackButton: document.getElementById('rhythm-back-button'),
  rhythmNextButton: document.getElementById('rhythm-next-button'),
  createBackButton: document.getElementById('create-back-button'),
  relaxBackButton: document.getElementById('relax-back-button'),
  
  // Controle de som
  soundToggle: document.getElementById('sound-toggle')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Configurar eventos dos botões de atividade
  elements.activityButtons.forEach(button => {
    button.addEventListener('click', () => {
      const activity = button.dataset.activity;
      if (activity) {
        showActivity(activity);
      }
    });
  });
  
  // Configurar eventos dos botões de voltar
  elements.listenBackButton.addEventListener('click', showActivitySelection);
  elements.rhythmBackButton.addEventListener('click', showActivitySelection);
  elements.createBackButton.addEventListener('click', showActivitySelection);
  elements.relaxBackButton.addEventListener('click', showActivitySelection);
  
  // Configurar eventos específicos para cada atividade
  setupListenActivity();
  setupRhythmActivity();
  setupCreateActivity();
  setupRelaxActivity();
  
  // Configurar controle de som
  elements.soundToggle.addEventListener('click', toggleSound);
  
  // Criar sons temporários se necessário
  createTemporarySounds();
  
  // Inicializar acessibilidade
  setupAccessibility();
});

/**
 * Cria sons temporários para desenvolvimento
 * Isso será substituído por sons reais em produção
 */
function createTemporarySounds() {
  // Verificar se os sons existem
  const testSound = new Audio();
  testSound.src = document.getElementById('dog-sound').querySelector('source').src;
  
  testSound.onerror = () => {
    console.log('Criando sons temporários para desenvolvimento');
    
    // Criar sons temporários usando AudioContext
    if (window.AudioContext || window.webkitAudioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      
      // Criar sons de animais
      createTemporaryAnimalSounds();
      
      // Criar sons de tambores
      createTemporaryDrumSounds();
      
      // Criar sons de piano
      createTemporaryPianoSounds();
      
      // Criar sons relaxantes
      createTemporaryRelaxSounds();
    }
  };
}

/**
 * Cria sons temporários de animais
 */
function createTemporaryAnimalSounds() {
  const animals = ['dog', 'cat', 'bird', 'cow', 'horse', 'sheep'];
  const frequencies = [200, 400, 800, 150, 300, 500];
  
  animals.forEach((animal, index) => {
    createTemporarySound(`${animal}-sound`, frequencies[index], 0.8, 'sawtooth');
  });
}

/**
 * Cria sons temporários de tambores
 */
function createTemporaryDrumSounds() {
  const drums = ['drum1', 'drum2', 'drum3', 'drum4'];
  const frequencies = [100, 150, 200, 250];
  
  drums.forEach((drum, index) => {
    createTemporarySound(`${drum}-sound`, frequencies[index], 0.3, 'sine');
  });
}

/**
 * Cria sons temporários de piano
 */
function createTemporaryPianoSounds() {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const baseFrequency = 261.63; // Dó central (C4)
  
  notes.forEach((note, index) => {
    // Calcular frequência usando a fórmula: f = f0 * 2^(n/12)
    const frequency = baseFrequency * Math.pow(2, index / 12);
    createTemporarySound(`${note}-sound`, frequency, 1.0, 'sine');
  });
}

/**
 * Cria sons temporários relaxantes
 */
function createTemporaryRelaxSounds() {
  const relaxSounds = ['rain', 'ocean', 'forest', 'birds'];
  const types = ['noise', 'sine', 'triangle', 'sine'];
  const frequencies = [0, 100, 200, 500];
  
  relaxSounds.forEach((sound, index) => {
    createTemporarySound(`${sound}-sound`, frequencies[index], 0.5, types[index], true);
  });
}

/**
 * Cria um som temporário
 * @param {string} id - ID do elemento de áudio
 * @param {number} frequency - Frequência do som em Hz
 * @param {number} duration - Duração do som em segundos
 * @param {string} type - Tipo de onda (sine, square, sawtooth, triangle)
 * @param {boolean} isLoop - Se o som deve ser reproduzido em loop
 */
function createTemporarySound(id, frequency, duration = 0.5, type = 'sine', isLoop = false) {
  // Obter o elemento de áudio
  const audioElement = document.getElementById(id);
  
  // Substituir a função play
  audioElement.play = function() {
    if (window.AudioContext || window.webkitAudioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      
      // Criar oscilador ou ruído branco
      let oscillator;
      if (type === 'noise') {
        // Criar ruído branco
        const bufferSize = audioContext.sampleRate * duration;
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        
        const noise = audioContext.createBufferSource();
        noise.buffer = buffer;
        
        if (isLoop) {
          noise.loop = true;
        }
        
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        
        noise.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        noise.start();
        if (!isLoop) {
          noise.stop(audioContext.currentTime + duration);
        }
        
        // Salvar referência para poder parar depois
        this._source = noise;
      } else {
        // Criar oscilador normal
        oscillator = audioContext.createOscillator();
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
        
        if (!isLoop) {
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        }
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        if (!isLoop) {
          oscillator.stop(audioContext.currentTime + duration);
        }
        
        // Salvar referência para poder parar depois
        this._source = oscillator;
      }
    }
  };
  
  // Substituir a função pause
  audioElement.pause = function() {
    if (this._source) {
      try {
        this._source.stop();
      } catch (e) {
        console.log('Erro ao parar som:', e);
      }
    }
  };
}

/**
 * Configura acessibilidade para o jogo
 */
function setupAccessibility() {
  // Adicionar elemento para anúncios de leitor de tela
  if (!document.getElementById('screen-reader-announcer')) {
    const announcer = document.createElement('div');
    announcer.id = 'screen-reader-announcer';
    announcer.className = 'visually-hidden';
    announcer.setAttribute('aria-live', 'polite');
    document.body.appendChild(announcer);
  }
  
  // Adicionar navegação por teclado para elementos interativos
  setupKeyboardNavigation();
}

/**
 * Configura navegação por teclado para acessibilidade
 */
function setupKeyboardNavigation() {
  // Navegação por teclado para cartões de som
  elements.soundCards.forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
  
  // Navegação por teclado para pads de bateria
  elements.drumPads.forEach(pad => {
    pad.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        pad.click();
      }
    });
  });
  
  // Navegação por teclado para teclas de piano
  elements.pianoKeys.forEach(key => {
    key.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        key.click();
      }
    });
  });
  
  // Navegação por teclado para cartões de relaxamento
  elements.relaxCards.forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

/**
 * Mostra uma atividade específica
 * @param {string} activity - Nome da atividade a ser mostrada
 */
function showActivity(activity) {
  // Ocultar todas as áreas
  elements.activitySelection.classList.add('hidden');
  elements.listenActivity.classList.add('hidden');
  elements.rhythmActivity.classList.add('hidden');
  elements.createActivity.classList.add('hidden');
  elements.relaxActivity.classList.add('hidden');
  
  // Mostrar a atividade selecionada
  switch (activity) {
    case 'listen':
      elements.listenActivity.classList.remove('hidden');
      break;
    case 'rhythm':
      elements.rhythmActivity.classList.remove('hidden');
      resetRhythmActivity();
      break;
    case 'create':
      elements.createActivity.classList.remove('hidden');
      break;
    case 'relax':
      elements.relaxActivity.classList.remove('hidden');
      break;
    default:
      elements.activitySelection.classList.remove('hidden');
      break;
  }
  
  // Atualizar atividade atual
  musicConfig.currentActivity = activity;
  
  // Anunciar para leitores de tela
  const activityNames = {
    listen: 'Ouvir Sons',
    rhythm: 'Seguir Ritmos',
    create: 'Criar Música',
    relax: 'Sons Relaxantes'
  };
  
  if (activityNames[activity]) {
    announceToScreenReader(`Atividade ${activityNames[activity]} iniciada.`);
  }
}

/**
 * Mostra a seleção de atividade
 */
function showActivitySelection() {
  // Parar qualquer som em reprodução
  stopAllSounds();
  
  // Mostrar a seleção de atividade
  showActivity(null);
  
  // Anunciar para leitores de tela
  announceToScreenReader('Voltou para a seleção de atividades.');
}

/**
 * Para todos os sons em reprodução
 */
function stopAllSounds() {
  // Parar sons de animais
  musicConfig.activities.listen.sounds.forEach(animal => {
    const sound = document.getElementById(`${animal}-sound`);
    if (sound) {
      sound.pause();
      if (sound.currentTime) {
        sound.currentTime = 0;
      }
    }
  });
  
  // Parar sons de tambores
  for (let i = 1; i <= 4; i++) {
    const sound = document.getElementById(`drum${i}-sound`);
    if (sound) {
      sound.pause();
      if (sound.currentTime) {
        sound.currentTime = 0;
      }
    }
  }
  
  // Parar sons de piano
  musicConfig.activities.create.notes.forEach(note => {
    const sound = document.getElementById(`${note}-sound`);
    if (sound) {
      sound.pause();
      if (sound.currentTime) {
        sound.currentTime = 0;
      }
    }
  });
  
  // Parar sons relaxantes
  musicConfig.activities.relax.sounds.forEach(sound => {
    const audioElement = document.getElementById(`${sound}-sound`);
    if (audioElement) {
      audioElement.pause();
      if (audioElement.currentTime) {
        audioElement.currentTime = 0;
      }
    }
  });
}

/**
 * Configura a atividade Ouvir Sons
 */
function setupListenActivity() {
  // Configurar eventos para cartões de som
  elements.soundCards.forEach(card => {
    card.addEventListener('click', () => {
      const sound = card.dataset.sound;
      if (sound) {
        // Remover classe ativa de todos os cartões
        elements.soundCards.forEach(c => c.classList.remove('active'));
        
        // Adicionar classe ativa ao cartão clicado
        card.classList.add('active');
        
        // Reproduzir som
        playAnimalSound(sound);
        
        // Atualizar status
        updateListenStatus(`Ouvindo som de ${getAnimalName(sound)}`);
        
        // Anunciar para leitores de tela
        announceToScreenReader(`Som de ${getAnimalName(sound)}`);
        
        // Remover classe ativa após um tempo
        setTimeout(() => {
          card.classList.remove('active');
        }, 1000);
      }
    });
  });
}

/**
 * Reproduz um som de animal
 * @param {string} animal - Nome do animal
 */
function playAnimalSound(animal) {
  // Parar outros sons de animais
  musicConfig.activities.listen.sounds.forEach(a => {
    if (a !== animal) {
      const sound = document.getElementById(`${a}-sound`);
      if (sound) {
        sound.pause();
        if (sound.currentTime) {
          sound.currentTime = 0;
        }
      }
    }
  });
  
  // Reproduzir som do animal
  const sound = document.getElementById(`${animal}-sound`);
  if (sound) {
    playSound(sound);
  }
}

/**
 * Retorna o nome de um animal em português
 * @param {string} animal - Nome do animal em inglês
 * @returns {string} Nome do animal em português
 */
function getAnimalName(animal) {
  const names = {
    dog: 'cachorro',
    cat: 'gato',
    bird: 'pássaro',
    cow: 'vaca',
    horse: 'cavalo',
    sheep: 'ovelha'
  };
  
  return names[animal] || animal;
}

/**
 * Atualiza o status da atividade Ouvir Sons
 * @param {string} message - Mensagem a ser exibida
 */
function updateListenStatus(message) {
  elements.listenStatus.textContent = message;
  elements.listenStatus.classList.add('pulse');
  
  // Remover animação após completar
  setTimeout(() => {
    elements.listenStatus.classList.remove('pulse');
  }, 500);
}

/**
 * Configura a atividade Seguir Ritmos
 */
function setupRhythmActivity() {
  // Configurar eventos para botões de ritmo
  elements.rhythmPlay.addEventListener('click', playRhythm);
  elements.rhythmRepeat.addEventListener('click', checkRhythm);
  elements.rhythmNextButton.addEventListener('click', nextRhythm);
  
  // Configurar eventos para pads de bateria
  elements.drumPads.forEach((pad, index) => {
    pad.addEventListener('click', () => {
      // Reproduzir som do tambor
      playDrumSound(index + 1);
      
      // Adicionar à sequência do usuário
      musicConfig.activities.rhythm.userSequence.push(index);
      
      // Adicionar classe ativa
      pad.classList.add('active');
      
      // Remover classe ativa após um tempo
      setTimeout(() => {
        pad.classList.remove('active');
      }, 200);
    });
  });
}

/**
 * Reinicia a atividade Seguir Ritmos
 */
function resetRhythmActivity() {
  // Limpar sequência
  elements.rhythmSequence.innerHTML = '';
  
  // Reiniciar nível se necessário
  if (musicConfig.activities.rhythm.currentLevel >= musicConfig.activities.rhythm.levels.length) {
    musicConfig.activities.rhythm.currentLevel = 0;
  }
  
  // Limpar sequência do usuário
  musicConfig.activities.rhythm.userSequence = [];
  
  // Habilitar botão de reprodução
  elements.rhythmPlay.disabled = false;
  
  // Desabilitar botão de repetição
  elements.rhythmRepeat.disabled = true;
  
  // Atualizar status
  updateRhythmStatus('Clique em "Ouvir Ritmo" para começar');
}

/**
 * Reproduz o ritmo atual
 */
function playRhythm() {
  // Obter sequência do nível atual
  const sequence = musicConfig.activities.rhythm.levels[musicConfig.activities.rhythm.currentLevel];
  
  // Limpar sequência visual
  elements.rhythmSequence.innerHTML = '';
  
  // Criar elementos visuais para a sequência
  sequence.forEach(() => {
    const dot = document.createElement('div');
    dot.className = 'rhythm-dot';
    elements.rhythmSequence.appendChild(dot);
  });
  
  // Desabilitar botões durante a reprodução
  elements.rhythmPlay.disabled = true;
  elements.rhythmRepeat.disabled = true;
  
  // Atualizar status
  updateRhythmStatus('Ouça o ritmo...');
  
  // Reproduzir sequência
  let index = 0;
  const dots = elements.rhythmSequence.querySelectorAll('.rhythm-dot');
  
  const playNext = () => {
    if (index < sequence.length) {
      // Destacar o dot atual
      dots[index].classList.add('active');
      
      // Reproduzir som se for 1
      if (sequence[index] === 1) {
        playDrumSound(Math.floor(Math.random() * 4) + 1);
      }
      
      // Avançar para o próximo após um tempo
      setTimeout(() => {
        dots[index].classList.remove('active');
        index++;
        setTimeout(playNext, musicConfig.activities.rhythm.speed / 2);
      }, musicConfig.activities.rhythm.speed / 2);
    } else {
      // Sequência completa
      setTimeout(() => {
        // Habilitar botões
        elements.rhythmPlay.disabled = false;
        elements.rhythmRepeat.disabled = false;
        
        // Limpar sequência do usuário
        musicConfig.activities.rhythm.userSequence = [];
        
        // Atualizar status
        updateRhythmStatus('Agora repita o ritmo usando os tambores');
        
        // Anunciar para leitores de tela
        announceToScreenReader('Agora repita o ritmo usando os tambores');
      }, 500);
    }
  };
  
  // Iniciar reprodução
  setTimeout(playNext, 500);
}

/**
 * Verifica se o ritmo do usuário está correto
 */
function checkRhythm() {
  // Obter sequência do nível atual
  const sequence = musicConfig.activities.rhythm.levels[musicConfig.activities.rhythm.currentLevel];
  const userSequence = musicConfig.activities.rhythm.userSequence;
  
  // Verificar se o usuário reproduziu a quantidade correta de batidas
  let correctCount = 0;
  sequence.forEach((beat, index) => {
    if (beat === 1) {
      correctCount++;
    }
  });
  
  // Contar batidas do usuário
  const userBeats = userSequence.length;
  
  // Verificar se o número de batidas está correto
  if (userBeats !== correctCount) {
    // Número incorreto de batidas
    updateRhythmStatus(`Ops! Você fez ${userBeats} batidas, mas o ritmo tem ${correctCount} batidas.`);
    
    // Anunciar para leitores de tela
    announceToScreenReader(`Você fez ${userBeats} batidas, mas o ritmo tem ${correctCount} batidas. Tente novamente.`);
    
    // Limpar sequência do usuário
    musicConfig.activities.rhythm.userSequence = [];
    
    return;
  }
  
  // Verificar se o ritmo está correto
  let isCorrect = true;
  let beatIndex = 0;
  
  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] === 1) {
      // Verificar se o usuário bateu no momento certo
      if (beatIndex >= userSequence.length) {
        isCorrect = false;
        break;
      }
      
      beatIndex++;
    }
  }
  
  if (isCorrect) {
    // Ritmo correto
    updateRhythmStatus('Parabéns! Você repetiu o ritmo corretamente!');
    
    // Reproduzir som de sucesso
    playSound(document.getElementById('success-sound'));
    
    // Anunciar para leitores de tela
    announceToScreenReader('Parabéns! Você repetiu o ritmo corretamente!');
    
    // Habilitar botão de próximo nível
    elements.rhythmNextButton.disabled = false;
  } else {
    // Ritmo incorreto
    updateRhythmStatus('Ops! O ritmo não está correto. Tente novamente.');
    
    // Anunciar para leitores de tela
    announceToScreenReader('O ritmo não está correto. Tente novamente.');
    
    // Limpar sequência do usuário
    musicConfig.activities.rhythm.userSequence = [];
  }
}

/**
 * Avança para o próximo ritmo
 */
function nextRhythm() {
  // Avançar para o próximo nível
  musicConfig.activities.rhythm.currentLevel++;
  
  // Verificar se chegou ao fim dos níveis
  if (musicConfig.activities.rhythm.currentLevel >= musicConfig.activities.rhythm.levels.length) {
    // Voltar ao primeiro nível
    musicConfig.activities.rhythm.currentLevel = 0;
    
    // Atualizar status
    updateRhythmStatus('Você completou todos os ritmos! Vamos começar novamente.');
    
    // Anunciar para leitores de tela
    announceToScreenReader('Você completou todos os ritmos! Vamos começar novamente.');
  } else {
    // Atualizar status
    updateRhythmStatus('Próximo ritmo! Clique em "Ouvir Ritmo" para começar.');
    
    // Anunciar para leitores de tela
    announceToScreenReader('Próximo ritmo! Clique em Ouvir Ritmo para começar.');
  }
  
  // Reiniciar atividade
  resetRhythmActivity();
}

/**
 * Reproduz um som de tambor
 * @param {number} drum - Número do tambor (1-4)
 */
function playDrumSound(drum) {
  // Reproduzir som do tambor
  const sound = document.getElementById(`drum${drum}-sound`);
  if (sound) {
    playSound(sound);
  }
}

/**
 * Atualiza o status da atividade Seguir Ritmos
 * @param {string} message - Mensagem a ser exibida
 */
function updateRhythmStatus(message) {
  elements.rhythmStatus.textContent = message;
  elements.rhythmStatus.classList.add('pulse');
  
  // Remover animação após completar
  setTimeout(() => {
    elements.rhythmStatus.classList.remove('pulse');
  }, 500);
}

/**
 * Configura a atividade Criar Música
 */
function setupCreateActivity() {
  // Configurar eventos para teclas de piano
  elements.pianoKeys.forEach(key => {
    key.addEventListener('mousedown', () => {
      const note = key.dataset.note;
      if (note) {
        // Adicionar classe ativa
        key.classList.add('active');
        
        // Reproduzir nota
        playPianoNote(note);
        
        // Gravar nota se estiver gravando
        if (musicConfig.activities.create.recording) {
          musicConfig.activities.create.recordedNotes.push({
            note: note,
            time: Date.now()
          });
        }
      }
    });
    
    key.addEventListener('mouseup', () => {
      key.classList.remove('active');
    });
    
    key.addEventListener('mouseleave', () => {
      key.classList.remove('active');
    });
    
    // Eventos de toque para dispositivos móveis
    key.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const note = key.dataset.note;
      if (note) {
        // Adicionar classe ativa
        key.classList.add('active');
        
        // Reproduzir nota
        playPianoNote(note);
        
        // Gravar nota se estiver gravando
        if (musicConfig.activities.create.recording) {
          musicConfig.activities.create.recordedNotes.push({
            note: note,
            time: Date.now()
          });
        }
      }
    });
    
    key.addEventListener('touchend', () => {
      key.classList.remove('active');
    });
  });
  
  // Configurar eventos para botões de controle
  elements.recordButton.addEventListener('click', toggleRecording);
  elements.playButton.addEventListener('click', playRecording);
  elements.clearButton.addEventListener('click', clearRecording);
}

/**
 * Reproduz uma nota de piano
 * @param {string} note - Nome da nota
 */
function playPianoNote(note) {
  // Reproduzir som da nota
  const sound = document.getElementById(`${note}-sound`);
  if (sound) {
    playSound(sound);
  }
}

/**
 * Alterna o estado de gravação
 */
function toggleRecording() {
  // Alternar estado de gravação
  musicConfig.activities.create.recording = !musicConfig.activities.create.recording;
  
  if (musicConfig.activities.create.recording) {
    // Iniciar gravação
    musicConfig.activities.create.recordedNotes = [];
    elements.recordButton.textContent = 'Parar';
    elements.recordButton.classList.add('active');
    
    // Desabilitar outros botões
    elements.playButton.disabled = true;
    elements.clearButton.disabled = true;
    
    // Atualizar status
    updateCreateStatus('Gravando... Toque as teclas para criar sua música');
    
    // Anunciar para leitores de tela
    announceToScreenReader('Gravando. Toque as teclas para criar sua música.');
  } else {
    // Parar gravação
    elements.recordButton.textContent = 'Gravar';
    elements.recordButton.classList.remove('active');
    
    // Habilitar outros botões se houver notas gravadas
    if (musicConfig.activities.create.recordedNotes.length > 0) {
      elements.playButton.disabled = false;
      elements.clearButton.disabled = false;
    }
    
    // Atualizar status
    updateCreateStatus(`Gravação concluída com ${musicConfig.activities.create.recordedNotes.length} notas`);
    
    // Anunciar para leitores de tela
    announceToScreenReader(`Gravação concluída com ${musicConfig.activities.create.recordedNotes.length} notas.`);
  }
}

/**
 * Reproduz a gravação
 */
function playRecording() {
  // Verificar se há notas gravadas
  if (musicConfig.activities.create.recordedNotes.length === 0) {
    updateCreateStatus('Nenhuma nota gravada');
    return;
  }
  
  // Desabilitar botões durante a reprodução
  elements.recordButton.disabled = true;
  elements.playButton.disabled = true;
  elements.clearButton.disabled = true;
  
  // Atualizar status
  updateCreateStatus('Reproduzindo...');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Reproduzindo sua música.');
  
  // Calcular tempos relativos
  const startTime = musicConfig.activities.create.recordedNotes[0].time;
  
  // Reproduzir cada nota no tempo correto
  musicConfig.activities.create.recordedNotes.forEach((noteData, index) => {
    const delay = noteData.time - startTime;
    
    setTimeout(() => {
      // Reproduzir nota
      playPianoNote(noteData.note);
      
      // Destacar tecla
      const key = Array.from(elements.pianoKeys).find(k => k.dataset.note === noteData.note);
      if (key) {
        key.classList.add('active');
        setTimeout(() => {
          key.classList.remove('active');
        }, 200);
      }
      
      // Verificar se é a última nota
      if (index === musicConfig.activities.create.recordedNotes.length - 1) {
        // Habilitar botões após a reprodução
        setTimeout(() => {
          elements.recordButton.disabled = false;
          elements.playButton.disabled = false;
          elements.clearButton.disabled = false;
          
          // Atualizar status
          updateCreateStatus('Reprodução concluída');
          
          // Anunciar para leitores de tela
          announceToScreenReader('Reprodução concluída.');
        }, 500);
      }
    }, delay);
  });
}

/**
 * Limpa a gravação
 */
function clearRecording() {
  // Limpar notas gravadas
  musicConfig.activities.create.recordedNotes = [];
  
  // Desabilitar botões
  elements.playButton.disabled = true;
  elements.clearButton.disabled = true;
  
  // Atualizar status
  updateCreateStatus('Gravação limpa');
  
  // Anunciar para leitores de tela
  announceToScreenReader('Gravação limpa.');
}

/**
 * Atualiza o status da atividade Criar Música
 * @param {string} message - Mensagem a ser exibida
 */
function updateCreateStatus(message) {
  elements.createStatus.textContent = message;
  elements.createStatus.classList.add('pulse');
  
  // Remover animação após completar
  setTimeout(() => {
    elements.createStatus.classList.remove('pulse');
  }, 500);
}

/**
 * Configura a atividade Sons Relaxantes
 */
function setupRelaxActivity() {
  // Configurar eventos para cartões de relaxamento
  elements.relaxCards.forEach(card => {
    card.addEventListener('click', () => {
      const sound = card.dataset.sound;
      if (sound) {
        // Remover classe ativa de todos os cartões
        elements.relaxCards.forEach(c => c.classList.remove('active'));
        
        // Adicionar classe ativa ao cartão clicado
        card.classList.add('active');
        
        // Selecionar som
        selectRelaxSound(sound);
      }
    });
  });
  
  // Configurar eventos para botões de controle
  elements.playSoundButton.addEventListener('click', playRelaxSound);
  elements.pauseSoundButton.addEventListener('click', pauseRelaxSound);
  
  // Configurar controle de volume
  elements.volumeSlider.addEventListener('input', updateVolume);
}

/**
 * Seleciona um som relaxante
 * @param {string} sound - Nome do som
 */
function selectRelaxSound(sound) {
  // Parar som atual se estiver tocando
  pauseRelaxSound();
  
  // Atualizar som atual
  musicConfig.activities.relax.currentSound = sound;
  
  // Atualizar nome do som
  elements.currentSoundName.textContent = getRelaxSoundName(sound);
  
  // Habilitar botões
  elements.playSoundButton.disabled = false;
  elements.pauseSoundButton.disabled = true;
  
  // Atualizar status
  updateRelaxStatus(`Som de ${getRelaxSoundName(sound)} selecionado`);
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Som de ${getRelaxSoundName(sound)} selecionado.`);
}

/**
 * Reproduz o som relaxante selecionado
 */
function playRelaxSound() {
  // Verificar se há um som selecionado
  if (!musicConfig.activities.relax.currentSound) {
    updateRelaxStatus('Nenhum som selecionado');
    return;
  }
  
  // Obter elemento de áudio
  const sound = document.getElementById(`${musicConfig.activities.relax.currentSound}-sound`);
  if (sound) {
    // Definir volume
    sound.volume = musicConfig.activities.relax.volume;
    
    // Reproduzir som
    playSound(sound, true);
    
    // Habilitar/desabilitar botões
    elements.playSoundButton.disabled = true;
    elements.pauseSoundButton.disabled = false;
    
    // Atualizar status
    updateRelaxStatus(`Reproduzindo som de ${getRelaxSoundName(musicConfig.activities.relax.currentSound)}`);
    
    // Anunciar para leitores de tela
    announceToScreenReader(`Reproduzindo som de ${getRelaxSoundName(musicConfig.activities.relax.currentSound)}.`);
  }
}

/**
 * Pausa o som relaxante atual
 */
function pauseRelaxSound() {
  // Verificar se há um som selecionado
  if (!musicConfig.activities.relax.currentSound) return;
  
  // Obter elemento de áudio
  const sound = document.getElementById(`${musicConfig.activities.relax.currentSound}-sound`);
  if (sound) {
    // Pausar som
    sound.pause();
    
    // Habilitar/desabilitar botões
    elements.playSoundButton.disabled = false;
    elements.pauseSoundButton.disabled = true;
    
    // Atualizar status
    updateRelaxStatus(`Som de ${getRelaxSoundName(musicConfig.activities.relax.currentSound)} pausado`);
    
    // Anunciar para leitores de tela
    announceToScreenReader(`Som de ${getRelaxSoundName(musicConfig.activities.relax.currentSound)} pausado.`);
  }
}

/**
 * Atualiza o volume do som relaxante
 */
function updateVolume() {
  // Obter valor do controle deslizante
  const volume = elements.volumeSlider.value / 100;
  
  // Atualizar volume
  musicConfig.activities.relax.volume = volume;
  
  // Atualizar volume do som atual se estiver tocando
  if (musicConfig.activities.relax.currentSound) {
    const sound = document.getElementById(`${musicConfig.activities.relax.currentSound}-sound`);
    if (sound) {
      sound.volume = volume;
    }
  }
  
  // Anunciar para leitores de tela
  announceToScreenReader(`Volume ajustado para ${Math.round(volume * 100)}%.`);
}

/**
 * Retorna o nome de um som relaxante em português
 * @param {string} sound - Nome do som em inglês
 * @returns {string} Nome do som em português
 */
function getRelaxSoundName(sound) {
  const names = {
    rain: 'chuva',
    ocean: 'oceano',
    forest: 'floresta',
    birds: 'pássaros'
  };
  
  return names[sound] || sound;
}

/**
 * Atualiza o status da atividade Sons Relaxantes
 * @param {string} message - Mensagem a ser exibida
 */
function updateRelaxStatus(message) {
  elements.relaxStatus.textContent = message;
  elements.relaxStatus.classList.add('pulse');
  
  // Remover animação após completar
  setTimeout(() => {
    elements.relaxStatus.classList.remove('pulse');
  }, 500);
}

/**
 * Ativa ou desativa os sons do jogo
 */
function toggleSound() {
  musicConfig.soundEnabled = !musicConfig.soundEnabled;
  
  // Atualizar ícone e classe
  if (musicConfig.soundEnabled) {
    elements.soundToggle.classList.remove('sound-off');
    elements.soundToggle.classList.add('sound-on');
    elements.soundToggle.querySelector('.sound-icon').textContent = '🔊';
    elements.soundToggle.setAttribute('aria-label', 'Desativar sons');
  } else {
    elements.soundToggle.classList.remove('sound-on');
    elements.soundToggle.classList.add('sound-off');
    elements.soundToggle.querySelector('.sound-icon').textContent = '🔈';
    elements.soundToggle.setAttribute('aria-label', 'Ativar sons');
    
    // Parar todos os sons
    stopAllSounds();
  }
  
  // Anunciar para leitores de tela
  const message = musicConfig.soundEnabled ? 'Sons ativados' : 'Sons desativados';
  announceToScreenReader(message);
}

/**
 * Reproduz um som se os sons estiverem ativados
 * @param {HTMLAudioElement} audioElement - Elemento de áudio
 * @param {boolean} loop - Se o som deve ser reproduzido em loop
 */
function playSound(audioElement, loop = false) {
  if (musicConfig.soundEnabled && audioElement) {
    // Usar a função utilitária do script principal se disponível
    if (window.gameUtils && window.gameUtils.playSound) {
      window.gameUtils.playSound(audioElement, musicConfig.soundEnabled);
    } else {
      // Implementação de fallback
      try {
        // Configurar loop
        audioElement.loop = loop;
        
        // Reiniciar o som para garantir que ele toque
        if (!loop && audioElement.currentTime) {
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
console.log('Sons e Músicas inicializado');
