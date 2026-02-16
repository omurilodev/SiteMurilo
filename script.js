const track = document.getElementById('track');
const cards = document.querySelectorAll('.card');
let currentIndex = 1; // Começa no segundo card

function updateCarousel() {
  cards.forEach((card, index) => {
    // Adiciona/Remove classe active
    if (index === currentIndex) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  // LÓGICA DINÂMICA:
  // Lê a largura exata do primeiro card e o gap diretamente do CSS no momento da execução.
  const cardWidth = cards[0].offsetWidth; 
  // Pega o valor do gap definido no CSS (caso não encontre, usa 20 como fallback)
  const gap = parseFloat(getComputedStyle(track).gap) || 20; 

  const centerPosition = (cardWidth / 2);
  const itemPosition = currentIndex * (cardWidth + gap); 
  
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

// Garante que o carrossel se recalcule se o usuário virar o celular de lado ou redimensionar a janela
window.addEventListener('resize', updateCarousel);

// Inicia
updateCarousel();





/* SESSÃO DE PASSOS */

document.addEventListener("DOMContentLoaded", () => {
  const observador = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
     
      if (entry.isIntersecting) {
        entry.target.classList.add('ativo');
        
        observador.unobserve(entry.target); 
      }
    });
  }, {
    threshold: 0.3 
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

  

  /* HAMBÚRGUER */

  const mobileMenu = document.querySelector('.mobile-menu');
const navList = document.querySelector('.nav-list');

mobileMenu.addEventListener('click', () => {
  navList.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Fechar o menu ao clicar em um link
document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});






/** FORM */

const form = document.getElementById('meuFormulario');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede a página de recarregar

    const btn = form.querySelector('.botaoForm');
    btn.innerText = 'Enviando...';
    btn.disabled = true;

    // Captura os dados do formulário
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('https://hook.neowchat.com.br/webhook/contato-site', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Dados enviados com sucesso!');
        form.reset();
      } else {
        alert('Erro ao enviar. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro na conexão com o servidor.');
    } finally {
      btn.innerText = 'enviar';
      btn.disabled = false;
    }
  });