// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !expanded);
      mainNav.classList.toggle('is-open');
    });
  }

  // Language switcher dropdown
  const langBtn = document.querySelector('.lang-current');
  const langDropdown = document.querySelector('.lang-dropdown');

  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', () => {
      const expanded = langBtn.getAttribute('aria-expanded') === 'true';
      langBtn.setAttribute('aria-expanded', !expanded);
      langDropdown.classList.toggle('is-open');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.language-switcher')) {
        langBtn.setAttribute('aria-expanded', 'false');
        langDropdown.classList.remove('is-open');
      }
    });
  }

  // YouTube facade — load iframe on click
  document.querySelectorAll('.youtube-facade').forEach((facade) => {
    facade.addEventListener('click', () => {
      const videoId = facade.dataset.videoId;
      if (!videoId) return;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.title = facade.querySelector('button')?.getAttribute('aria-label') || 'Video';
      facade.innerHTML = '';
      facade.appendChild(iframe);
    });
  });
});
