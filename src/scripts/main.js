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

/* ---------- Таймер до ближайшего события (сб 20:00 МСК) ---------- */
function initCountdown() {
  const root = document.querySelector('[data-countdown]');
  if (!root) return;

  const cells = {
    days: root.querySelector('[data-cd="days"]'),
    hours: root.querySelector('[data-cd="hours"]'),
    minutes: root.querySelector('[data-cd="minutes"]'),
    seconds: root.querySelector('[data-cd="seconds"]'),
  };

  const pad = (value) => String(value).padStart(2, '0');

  function nextEventStart() {
    // 20:00 по Москве = 17:00 UTC
    const now = new Date();
    const target = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 17, 0, 0)
    );
    // 6 = суббота
    const shift = (6 - target.getUTCDay() + 7) % 7;
    target.setUTCDate(target.getUTCDate() + shift);
    if (target.getTime() <= now.getTime()) target.setUTCDate(target.getUTCDate() + 7);
    return target;
  }

  let target = nextEventStart();

  function tick() {
    let diff = Math.floor((target.getTime() - Date.now()) / 1000);
    if (diff <= 0) {
      target = nextEventStart();
      diff = Math.floor((target.getTime() - Date.now()) / 1000);
    }

    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;

    if (cells.days) cells.days.textContent = pad(days);
    if (cells.hours) cells.hours.textContent = pad(hours);
    if (cells.minutes) cells.minutes.textContent = pad(minutes);
    if (cells.seconds) cells.seconds.textContent = pad(seconds);
  }

  tick();
  setInterval(tick, 1000);
}

/* ---------- Выбор класса ---------- */
function initClasses() {
  const picks = Array.from(document.querySelectorAll('[data-class-pick]'));
  const detail = document.querySelector('[data-class-detail]');
  if (!picks.length || !detail) return;

  const title = detail.querySelector('[data-class-title]');
  const tagline = detail.querySelector('[data-class-tagline]');
  const roles = detail.querySelector('[data-class-roles]');
  const text = detail.querySelector('[data-class-text]');
  const meters = Array.from(detail.querySelectorAll('[data-meter]'));

  function select(button) {
    picks.forEach((pick) => pick.setAttribute('aria-selected', String(pick === button)));

    if (title) title.textContent = button.dataset.name || '';
    if (tagline) tagline.textContent = button.dataset.tagline || '';
    if (text) text.textContent = button.dataset.text || '';

    if (roles) {
      roles.innerHTML = '';
      (button.dataset.roles || '').split(',').forEach((role) => {
        const label = role.trim();
        if (!label) return;
        const chip = document.createElement('span');
        chip.className = 'chip';
        chip.textContent = label;
        roles.append(chip);
      });
    }

    meters.forEach((meter) => {
      const key = meter.dataset.meter;
      const value = button.dataset[key] || '50';
      meter.style.setProperty('--v', value);
      const label = meter.querySelector('[data-meter-value]');
      if (label) label.textContent = value;
    });
  }

  picks.forEach((pick) => pick.addEventListener('click', () => select(pick)));
  select(picks[0]);
}

/* ---------- Новости из JSON ---------- */
async function initNews() {
  const list = document.querySelector('[data-news-list]');
  if (!list) return;
  const url = list.dataset.newsList;
  if (!url) return;

  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
  ];

  const formatDate = (iso) => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
  };

  try {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const items = await response.json();
    if (!Array.isArray(items) || !items.length) throw new Error('empty');

    list.innerHTML = '';
    items.slice(0, 4).forEach((item) => {
      const article = document.createElement('article');
      article.className = 'panel news-item reveal is-visible';
      article.innerHTML = `
        <time datetime="${item.date}">${formatDate(item.date)}</time>
        <div>
          <span class="chip">${item.tag}</span>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </div>`;
      list.append(article);
    });
  } catch {
    list.innerHTML =
      '<p class="panel news__skeleton">Не удалось загрузить новости. Обновите страницу или загляните в Discord — там всё самое свежее.</p>';
  }
}

/* ---------- «Живые» цифры реалмов (демо-заглушка до подключения API) ---------- */
function initRealms() {
  document.querySelectorAll('[data-realm-online]').forEach((node) => {
    const base = Number(node.dataset.realmOnline || 0);
    if (!base) return;
    const jitter = () => {
      const value = Math.max(0, base + Math.round((Math.random() - 0.45) * 24));
      node.textContent = value.toLocaleString('ru-RU');
    };
    jitter();
    if (!reduceMotion) setInterval(jitter, 6000);
  });
}

/* ---------- Год в подвале ---------- */
function initYear() {
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

function boot() {
  initNav();
  initReveal();
  initEmbers();
  initCountdown();
  initClasses();
  initNews();
  initRealms();
  initYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
