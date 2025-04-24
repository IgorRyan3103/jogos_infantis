let currentEmotion = ''; // Emoção atual
let emotions = ['feliz', 'surpresa', 'triste', 'raiva']; // Lista das emoções
let emotionImages = {
    'feliz': '/jogos-infantis/imagens/emocoes/feliz.png',
    'surpresa': '/jogos-infantis/imagens/emocoes/surpresa.jpg',
    'triste': '/jogos-infantis/imagens/emocoes/triste.jpg',
    'raiva': '/jogos-infantis/imagens/emocoes/raiva.jpg'
};

let correctAnswers = 0; // Contador de respostas corretas
let totalEmotions = emotions.length; // Total de emoções para acertar

// Função para verificar a resposta do jogador
function checkAnswer(answer) {
    const feedback = document.getElementById("feedback");
    const emotionImage = document.getElementById("emotionImage");

    if (answer === currentEmotion) {
        correctAnswers++;
        feedback.textContent = 'Parabéns, você acertou!';

        // Se acertou todas as emoções, termina o jogo
        if (correctAnswers === totalEmotions) {
            feedback.textContent = 'Parabéns! Você acertou todas as emoções!';
            showRestartButton(); // Exibe o botão de reiniciar
        } else {
            setNextEmotion(); // Próxima emoção
        }
    } else {
        feedback.textContent = 'Tente novamente!';
    }
}

// Função para escolher uma emoção aleatória e atualizar a imagem
function setNextEmotion() {
    const emotionImage = document.getElementById("emotionImage");

    // Verifica se ainda há emoções disponíveis
    if (emotions.length === 0) {
        return; // Se não houver mais emoções, não faz nada
    }

    // Escolhe uma emoção aleatória e remove da lista
    const randomIndex = Math.floor(Math.random() * emotions.length);
    currentEmotion = emotions[randomIndex];
    emotions.splice(randomIndex, 1); // Remove a emoção selecionada da lista

    // Atualiza a imagem de acordo com a emoção selecionada
    emotionImage.src = emotionImages[currentEmotion];
}

// Função para mostrar o botão de reiniciar
function showRestartButton() {
    // Verifica se já existe o botão de reiniciar, se sim, não cria outro
    const existingButton = document.querySelector('.restart-button');
    if (existingButton) {
        return;
    }

    // Cria o botão de reiniciar
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Reiniciar Jogo';
    restartButton.classList.add('restart-button'); // Adiciona uma classe ao botão para identificá-lo
    restartButton.onclick = restartGame; // Define a ação de reiniciar
    document.body.appendChild(restartButton);
}

// Função para reiniciar o jogo
function restartGame() {
    correctAnswers = 0;
    emotions = ['feliz', 'surpresa', 'triste', 'raiva']; // Recria a lista de emoções
    const feedback = document.getElementById("feedback");
    feedback.textContent = ''; // Limpa o feedback

    // Remove o botão de reiniciar
    const restartButton = document.querySelector('.restart-button');
    if (restartButton) restartButton.remove();

    // Inicia o jogo novamente
    setNextEmotion();
}

// Inicializa o jogo com uma emoção aleatória
window.onload = setNextEmotion;
