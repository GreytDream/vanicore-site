// Изолированная логика смены режима (чтобы редактор не мешал)
const vModeBtn = document.getElementById('vModeBtn');
const bodyEl = document.body;

if (localStorage.getItem('v_display_state') === 'day') {
  bodyEl.classList.add('v-day-mode');
  vModeBtn.textContent = '🌙';
}

vModeBtn.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation(); // Полный запрет на выход клика к редактору

  bodyEl.classList.toggle('v-day-mode');

  if (bodyEl.classList.contains('v-day-mode')) {
    localStorage.setItem('v_display_state', 'day');
    vModeBtn.textContent = '🌙';
  } else {
    localStorage.setItem('v_display_state', 'night');
    vModeBtn.textContent = '☀️';
  }
});

// Навигация для мобильных устройств
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Эффект скролла для меню
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Копирование IP сервера
function copyIP() {
  navigator.clipboard.writeText('play.vanicore.online').then(() => {
    const el = document.getElementById('serverIp');
    el.classList.add('copied');
    setTimeout(() => el.classList.remove('copied'), 2000);
  });
}

// Аккордеон для правил
function toggleRule(header) {
  const item = header.parentElement;
  const isActive = item.classList.contains('active');
  document.querySelectorAll('.rule-item').forEach(r => r.classList.remove('active'));
  if (!isActive) item.classList.add('active');
}

// Анимации при прокрутке
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Анимация подводных пузырьков
const bubblesContainer = document.getElementById('bubbles');
function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  const size = Math.random() * 20 + 5;
  bubble.style.width = size + 'px';
  bubble.style.height = size + 'px';
  bubble.style.left = Math.random() * 100 + '%';
  bubble.style.animationDuration = (Math.random() * 8 + 6) + 's';
  bubble.style.animationDelay = Math.random() * 2 + 's';
  bubblesContainer.appendChild(bubble);
  setTimeout(() => bubble.remove(), 16000);
}
setInterval(createBubble, 800);