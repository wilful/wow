/* ==========================================================================
   WoW Forever — клиентские «живые» элементы превью.
   Всё построено на прогрессивном улучшении: без JS страница остаётся читаемой.
   ========================================================================== */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Мобильное меню ---------- */
function initNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const links = document.querySelector('[data-nav-links]');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ---------- Появление блоков при скролле ---------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

/* ---------- Частицы-угольки в герое ---------- */
function initEmbers() {
  const canvas = document.getElementById('embers');
  if (!(canvas instanceof HTMLCanvasElement) || reduceMotion) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let particles = [];
  const count = window.innerWidth < 720 ? 34 : 70;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function spawn(initial) {
    return {
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 12,
      r: 0.6 + Math.random() * 1.7,
      vy: 0.18 + Math.random() * 0.55,
      vx: (Math.random() - 0.5) * 0.24,
      alpha: 0.25 + Math.random() * 0.55,
      hue: Math.random() > 0.75 ? '190, 210, 255' : '240, 200, 120',
    };
  }

  function reset() {
    resize();
    particles = Array.from({ length: count }, () => spawn(true));
  }

  let last = performance.now();

  function frame(now) {
    const dt = Math.min((now - last) / 16.67, 3);
    last = now;
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.y -= p.vy * dt;
      p.x += p.vx * dt;
      if (p.y < -14) Object.assign(p, spawn(false));

      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.hue}, ${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(frame);
  }

  reset();
  window.addEventListener('resize', reset);
  requestAnimationFrame(frame);
}

/* ---------- Год в подвале ---------- */
function initYear() {
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

/* ---------- Ленивая загрузка видео (YouTube / ВКонтакте) ---------- */
function initVideos() {
  document.querySelectorAll('[data-video]').forEach((figure) => {
    const button = figure.querySelector('[data-video-play]');
    const src = figure.dataset.src;
    if (!button || !src || button.dataset.bound === '1') return;
    button.dataset.bound = '1';

    button.addEventListener('click', () => {
      const frame = document.createElement('div');
      frame.className = 'video__embed';
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = figure.querySelector('.video__caption')?.textContent || 'Видео';
      iframe.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      frame.appendChild(iframe);
      button.replaceWith(frame);
    });
  });
}

function boot() {
  initNav();
  initReveal();
  initEmbers();
  initYear();
  initVideos();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
