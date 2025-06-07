// Função para filtrar projetos por categoria
function filtrarProjetos(categoria) {
  const projetos = document.querySelectorAll('.projeto');

  projetos.forEach(projeto => {
    projeto.style.display = (categoria === 'todos' || projeto.dataset.categoria === categoria) ? 'block' : 'none';
  });
}

// Função para animar as barras de progresso quando a seção "sobre" estiver visível
function animarBarras() {
  const sectionSobre = document.getElementById('sobre');
  if (!sectionSobre) return; // Proteção caso não exista o elemento

  const rect = sectionSobre.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  if (rect.top <= windowHeight && rect.bottom >= 0) {
    const skills = sectionSobre.querySelectorAll('.progress-bar > div[data-percent]');
    
    skills.forEach(skill => {
      // Evita reanimar barras já animadas
      if (skill.dataset.animated === 'true') return;

      const targetPercent = parseInt(skill.getAttribute('data-percent'), 10);
      let currentPercent = 0;
      const span = skill.querySelector('span');

      const interval = setInterval(() => {
        if (currentPercent >= targetPercent) {
          clearInterval(interval);
          skill.dataset.animated = 'true'; // Marca como animada
        } else {
          currentPercent++;
          skill.style.width = currentPercent + '%';
          if (span) span.textContent = currentPercent + '%';
        }
      }, 15);
    });

    // Remove o listener para evitar repetir animação
    window.removeEventListener('scroll', animarBarras);
  }
}

// Ativa a animação quando o usuário rolar a página
window.addEventListener('scroll', animarBarras);

// Também dispara a animação caso a seção já esteja visível ao carregar a página
window.addEventListener('load', animarBarras);
