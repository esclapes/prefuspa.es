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

  // Gallery filter
  const filters = document.querySelectorAll('.gallery-filter');
  const items = document.querySelectorAll('.gallery-item');

  if (filters.length && items.length) {
    filters.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filters.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');

        items.forEach((item) => {
          if (filter === 'all' || item.dataset.project === filter) {
            item.classList.remove('is-hidden');
          } else {
            item.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // Lightbox for gallery
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('.lightbox__img');
    const items = [...document.querySelectorAll('.gallery-item__link[data-full]')];
    let current = 0;

    const show = (i) => {
      current = i;
      const btn = items[i];
      lbImg.src = btn.dataset.full;
      lbImg.alt = btn.dataset.alt || '';
    };

    items.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        show(i);
        lightbox.showModal();
      });
    });

    lightbox.querySelector('.lightbox__prev').addEventListener('click', () => {
      const visible = items.filter((b) => !b.closest('.is-hidden'));
      const idx = visible.indexOf(items[current]);
      const prev = idx > 0 ? items.indexOf(visible[idx - 1]) : items.indexOf(visible[visible.length - 1]);
      show(prev);
    });

    lightbox.querySelector('.lightbox__next').addEventListener('click', () => {
      const visible = items.filter((b) => !b.closest('.is-hidden'));
      const idx = visible.indexOf(items[current]);
      const next = idx < visible.length - 1 ? items.indexOf(visible[idx + 1]) : items.indexOf(visible[0]);
      show(next);
    });

    lightbox.querySelector('.lightbox__close').addEventListener('click', () => {
      lightbox.close();
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.close();
    });

    // Keyboard: arrows + escape
    lightbox.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') lightbox.querySelector('.lightbox__prev').click();
      if (e.key === 'ArrowRight') lightbox.querySelector('.lightbox__next').click();
    });

    // Swipe support for mobile
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) lightbox.querySelector('.lightbox__prev').click();
        else lightbox.querySelector('.lightbox__next').click();
      }
    }, { passive: true });
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
