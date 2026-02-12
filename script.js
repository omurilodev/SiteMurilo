const track = document.getElementById('track');
const cards = document.querySelectorAll('.card');
let currentIndex = 1; // Começa no segundo card

// CONFIGURAÇÕES (Devem bater com o CSS)
const cardWidth = 300; 
const gap = 20; 

function updateCarousel() {
  cards.forEach((card, index) => {
    // Adiciona/Remove classe active
    if (index === currentIndex) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  // LÓGICA MATEMÁTICA DE CENTRALIZAÇÃO:
  // 1. O container tem o ponto zero no meio (left: 50% no CSS).
  // 2. Precisamos mover o trilho para a ESQUERDA (negativo).
  // 3. A quantidade é: (LarguraCard + Gap) * IndiceAtual.
  // 4. + Metade de um card (para centralizar o item e não a borda esquerda dele).
  
  const centerPosition = (cardWidth / 2); // 150px
  const itemPosition = currentIndex * (cardWidth + gap); // Posição do item atual na fila
  
  // O deslocamento total é a soma da posição do item + o ajuste de centro, invertido para negativo
  const finalTransform = -(itemPosition + centerPosition);

  track.style.transform = `translateX(${finalTransform}px)`;
}

function moveSlide(direction) {
  currentIndex += direction;

  // Loop Infinito
  if (currentIndex < 0) {
    currentIndex = cards.length - 1;
  } else if (currentIndex >= cards.length) {
    currentIndex = 0;
  }

  updateCarousel();
}

// Inicia
updateCarousel();





/* SESSÃO DE PASSOS */

document.addEventListener("DOMContentLoaded", () => {
  const observador = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Se a seção entrou na tela
      if (entry.isIntersecting) {
        entry.target.classList.add('ativo');
        // Opcional: Para de observar depois que animou a primeira vez
        observador.unobserve(entry.target); 
      }
    });
  }, {
    threshold: 0.3 // Dispara quando 30% da seção estiver visível
  });

  const sectionProcesso = document.querySelector('#processo');
  if (sectionProcesso) {
    observador.observe(sectionProcesso);
  }
});


/* PROCESSO */

const itens = document.querySelectorAll('.passos li');
  const displayTexto = document.getElementById('texto-descricao');

  itens.forEach(item => {
    item.addEventListener('click', () => {
      const descricao = item.getAttribute('data-description');
      
      // Feedback visual de clique
      displayTexto.style.opacity = '0';
      
      setTimeout(() => {
        displayTexto.innerText = descricao;
        displayTexto.style.opacity = '1';
      }, 200);

      // Estilo de "Selecionado"
      itens.forEach(i => i.style.background = "#1E1E1E");
      item.style.background = "#2a2a2a";
      item.style.borderLeft = "4px solid #D3C5A4";
    });
  });