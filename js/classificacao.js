// EMBARALHA AS IMAGENS NA TELA
function embaralharImagens() {
    const container = document.querySelector('.images');
    const imgs = Array.from(container.children);
  
    // Algoritmo de Fisher-Yates para embaralhar
    for (let i = imgs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      container.appendChild(imgs[j]);
      imgs.splice(j, 1);
    }
  }
  
  embaralharImagens(); // Chama a função ao carregar
  

const imagens = document.querySelectorAll('.draggable');
const categorias = document.querySelectorAll('.dropzone');
const restartBtn = document.getElementById('restart-btn');

const correspondencias = {
  image1: 'category1', // Banana → Frutas
  image4: 'category1', // Maçã → Frutas
  image2: 'category2', // Carro → Transportes
  image5: 'category2', // Ônibus → Transportes
  image3: 'category3', // Bola → Brinquedos
  image6: 'category3'  // Ursinho → Brinquedos
};

let acertos = 0;

imagens.forEach(img => {
  img.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', e.target.id);
  });
});

categorias.forEach(cat => {
  cat.addEventListener('dragover', e => {
    e.preventDefault();
    cat.style.backgroundColor = '#e0ffff';
  });

  cat.addEventListener('dragleave', () => {
    cat.style.backgroundColor = '#fff';
  });

  cat.addEventListener('drop', e => {
    e.preventDefault();
    cat.style.backgroundColor = '#fff';

    const imagemId = e.dataTransfer.getData('text/plain');
    const imagem = document.getElementById(imagemId);

    if (correspondencias[imagemId] === cat.id && !cat.contains(imagem)) {
      cat.appendChild(imagem);
      imagem.draggable = false;
      imagem.style.cursor = 'default';
      acertos++;

      const titulo = cat.querySelector('h2');
      if (titulo) titulo.style.display = 'none';

      if (acertos === Object.keys(correspondencias).length) {
        restartBtn.style.display = 'inline-block';
      }
    }
  });
});

restartBtn.addEventListener('click', () => {
  location.reload();
});
