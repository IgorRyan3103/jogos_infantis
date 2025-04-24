const cartas = ['🐶','🐱','🐶','🐱','🐸','🐸','🐵','🐵'];
let cartasEmbaralhadas = [];
let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;

function embaralhar() {
  cartasEmbaralhadas = [...cartas].sort(() => Math.random() - 0.5);
}

function criarTabuleiro() {
  const tabuleiro = document.getElementById('tabuleiro');
  tabuleiro.innerHTML = '';
  embaralhar();
  cartasEmbaralhadas.forEach((simbolo, index) => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.index = index;
    carta.dataset.simbolo = simbolo;
    carta.innerText = '';
    carta.addEventListener('click', virarCarta);
    tabuleiro.appendChild(carta);
  });
}

function virarCarta() {
  if (bloqueado || this.classList.contains('virada')) return;

  this.innerText = this.dataset.simbolo;
  this.classList.add('virada');

  if (!primeiraCarta) {
    primeiraCarta = this;
  } else {
    segundaCarta = this;
    bloqueado = true;

    if (primeiraCarta.dataset.simbolo === segundaCarta.dataset.simbolo) {
      setTimeout(() => {
        primeiraCarta.style.visibility = 'hidden';
        segundaCarta.style.visibility = 'hidden';
        resetar();
      }, 600);
    } else {
      setTimeout(() => {
        primeiraCarta.innerText = '';
        segundaCarta.innerText = '';
        primeiraCarta.classList.remove('virada');
        segundaCarta.classList.remove('virada');
        resetar();
      }, 800);
    }
  }
}

function resetar() {
  primeiraCarta = null;
  segundaCarta = null;
  bloqueado = false;
}

function reiniciarJogo() {
  primeiraCarta = null;
  segundaCarta = null;
  bloqueado = false;
  criarTabuleiro();
}

criarTabuleiro();
