document.addEventListener("DOMContentLoaded", function () {
    let draggableItems = document.querySelectorAll('.draggable');
    let dropzones = document.querySelectorAll('.dropzone');
    let restartButton = document.getElementById('restartButton');

    let correctAssociations = 0; // Contador de associações corretas

    draggableItems.forEach(item => {
        item.addEventListener('dragstart', dragStart);
    });

    dropzones.forEach(zone => {
        zone.addEventListener('dragover', dragOver);
        zone.addEventListener('drop', drop);
    });

    restartButton.addEventListener('click', restartGame); // Adiciona o evento de reiniciar o jogo

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData('text/plain');
        const draggedEl = document.getElementById(draggedId);
        const dropzone = e.currentTarget;

        if ((dropzone.id === "category1" && draggedId === "image1") ||
            (dropzone.id === "category2" && draggedId === "image2")) {
            dropzone.appendChild(draggedEl);
            draggedEl.setAttribute('draggable', 'false'); // Impede a imagem de ser movida depois de colocada
            correctAssociations++;

            // Esconde o título da categoria quando a imagem for colocada corretamente
            const title = dropzone.querySelector('h2');
            title.style.display = 'none'; // Esconde o título da categoria

            // Verifica se todas as imagens foram associadas corretamente
            if (correctAssociations === 2) {
                restartButton.style.display = 'inline-block'; // Mostra o botão de reiniciar
                alert("Você completou o jogo! Parabéns!");
            }
        } else {
            alert("Tente novamente!");
        }
    }

    // Função para reiniciar o jogo
    function restartGame() {
        correctAssociations = 0; // Reseta o contador de associações

        // Remove as imagens das categorias
        document.querySelectorAll('.dropzone').forEach(zone => {
            zone.innerHTML = `
                <h2>${zone.id === 'category1' ? 'Pincel e Tinta' : 'Sapato e Pé'}</h2>
            `;
        });

        // Coloca as imagens de volta na posição inicial
        document.querySelector('.images').innerHTML = `
            <img id="image1" class="draggable" draggable="true" src="../imagens/associacao/pincel.png" alt="Pincel"/>
            <img id="image2" class="draggable" draggable="true" src="../imagens/associacao/sapato.png" alt="Sapato"/>
        `;

        // Adiciona novamente os eventos de arrastar nas imagens
        let newDraggableItems = document.querySelectorAll('.draggable');
        newDraggableItems.forEach(item => {
            item.addEventListener('dragstart', dragStart);
        });

        // Impede as imagens de serem soltas até serem associadas corretamente
        newDraggableItems.forEach(item => {
            item.setAttribute('draggable', 'true');
        });

        // Esconde o botão de reiniciar novamente
        restartButton.style.display = 'none';

        alert("Jogo reiniciado! Tente novamente.");
    }
});
