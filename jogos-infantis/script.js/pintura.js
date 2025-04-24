let currentColor = null;

function changeColor(color) {
  currentColor = color;
}

document.querySelectorAll('.block').forEach(block => {
  block.addEventListener('click', () => {
    if (currentColor) {
      block.style.backgroundColor = currentColor;
    }
  });
});

function resetGame() {
  document.querySelectorAll('.block').forEach(block => {
    block.style.backgroundColor = '#ddd';
  });
}
