/* ================================================================
   GAMEVA CENTER — app.js v2.0
   Microinterações, animações e lógica de UI
================================================================ */

'use strict';

// ── NAVBAR ────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const s = window.scrollY;
  if (s > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  lastScroll = s;
}, { passive: true });

// ── MOBILE MENU ───────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');
let menuOpen = false;

function setMenu(open) {
  menuOpen = open;
  navMenu.classList.toggle('open', open);
  const [s1, s2, s3] = navToggle.querySelectorAll('span');
  if (open) {
    s1.style.transform = 'rotate(45deg) translate(5px, 5px)';
    s2.style.opacity   = '0';
    s3.style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    s1.style.transform = s2.style.opacity = s3.style.transform = '';
  }
  document.body.style.overflow = open ? 'hidden' : '';
}

navToggle?.addEventListener('click', () => setMenu(!menuOpen));
navMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', e => {
  if (menuOpen && !navbar?.contains(e.target)) setMenu(false);
});

// ── PARTICLES ─────────────────────────────────────────────────
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const COUNT = window.innerWidth < 768 ? 22 : 48;
  const COLORS = [
    'rgba(0,200,83,',
    'rgba(255,214,0,',
    'rgba(255,255,255,',
    'rgba(244,67,54,',
  ];

  const frag = document.createDocumentFragment();

  for (let i = 0; i < COUNT; i++) {
    const el = document.createElement('div');
    el.className = 'particle';
    const size  = Math.random() * 3 + 1;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const alpha = (Math.random() * 0.15 + 0.03).toFixed(2);
    const dur   = (Math.random() * 25 + 18).toFixed(1);
    const delay = (Math.random() * 20).toFixed(1);

    el.style.cssText = `
      left:${(Math.random() * 100).toFixed(1)}%;
      width:${size.toFixed(1)}px;
      height:${size.toFixed(1)}px;
      background:${color}${alpha});
      animation-duration:${dur}s;
      animation-delay:-${delay}s;
    `;
    frag.appendChild(el);
  }
  container.appendChild(frag);
})();

// ── SCROLL REVEAL (AOS) ────────────────────────────────────────
(function initAOS() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = +(entry.target.dataset.aosDelay || 0);
      setTimeout(() => entry.target.classList.add('aos-animate'), delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
})();

// ── COUNTER ANIMATION ─────────────────────────────────────────
(function initCounters() {
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animateNum(el) {
    const target = +el.dataset.count;
    const dur    = 1800;
    const t0     = performance.now();

    function tick(now) {
      const pct     = Math.min((now - t0) / dur, 1);
      const val     = Math.round(easeOut(pct) * target);
      el.textContent = target >= 100 ? val.toLocaleString() + '+' : val + (target > 3 ? '+' : '');
      if (pct < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      animateNum(e.target);
      observer.unobserve(e.target);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
})();

// ── CURSOR GLOW on SERVICE CARDS ──────────────────────────────
document.querySelectorAll('.srv-card, .mvv-card, .why-card, .ben-item').forEach(card => {
  const glow = card.querySelector('.srv-card-glow');

  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width)  * 100;
    const y = ((e.clientY - r.top)  / r.height) * 100;
    if (glow) {
      glow.style.left = e.clientX - r.left + 'px';
      glow.style.top  = e.clientY - r.top  + 'px';
      glow.style.opacity = '1';
    }
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });

  card.addEventListener('mouseleave', () => {
    if (glow) glow.style.opacity = '0';
  });
});

// ── CONTACT FORM → WhatsApp ────────────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = document.getElementById('name')?.value.trim();
    const phone   = document.getElementById('phone')?.value.trim();
    const email   = document.getElementById('email')?.value.trim();
    const service = document.getElementById('service')?.value;
    const message = document.getElementById('message')?.value.trim();

    if (!name || !message) {
      toast('Por favor, preencha o nome e a mensagem.', 'error');
      return;
    }

    const labels = {
      ps3:'PC em PS3', ps4:'PC em PS4',
      jogos:'Instalação de Jogos', cpu:'Compra de CPU',
      comando:'Compra de Comando', suporte:'Suporte Técnico', outro:'Outro'
    };

    let msg  = `Olá! Mensagem enviada pelo site da *Gameva Center*.\n\n`;
    msg     += `*Nome:* ${name}\n`;
    if (phone) msg += `*Telefone:* ${phone}\n`;
    if (email) msg += `*Email:* ${email}\n`;
    if (service) msg += `*Serviço:* ${labels[service] || service}\n`;
    msg     += `\n*Mensagem:*\n${message}`;

    const btn = form.querySelector('.form-submit');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A redirecionar...';
    btn.disabled = true;

    toast('A redirecionar para o WhatsApp...', 'success');

    setTimeout(() => {
      window.open(`https://wa.me/244931889628?text=${encodeURIComponent(msg)}`, '_blank');
      btn.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar via WhatsApp';
      btn.disabled = false;
      form.reset();
    }, 900);
  });
}

// ── TOAST NOTIFICATION ────────────────────────────────────────
function toast(msg, type = 'success') {
  document.querySelector('.gc-toast')?.remove();

  const el = document.createElement('div');
  el.className = 'gc-toast';

  const isSuccess = type === 'success';
  const bg        = isSuccess ? '#00c853' : '#f44336';
  const fg        = isSuccess ? '#000'    : '#fff';
  const icon      = isSuccess ? 'fa-check-circle' : 'fa-exclamation-circle';

  el.innerHTML = `<i class="fas ${icon}"></i><span>${msg}</span>`;
  el.style.cssText = `
    position:fixed; bottom:28px; left:50%;
    transform:translateX(-50%) translateY(60px);
    background:${bg}; color:${fg};
    padding:13px 22px;
    border-radius:12px;
    font-family:'Rajdhani',sans-serif;
    font-size:15px; font-weight:700;
    display:flex; align-items:center; gap:9px;
    box-shadow:0 8px 32px rgba(0,0,0,.6);
    z-index:9999; white-space:nowrap;
    opacity:0;
    transition:transform .4s cubic-bezier(.34,1.56,.64,1), opacity .3s ease;
  `;

  document.body.appendChild(el);

  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.transform = 'translateX(-50%) translateY(0)';
    el.style.opacity   = '1';
  }));

  setTimeout(() => {
    el.style.transform = 'translateX(-50%) translateY(60px)';
    el.style.opacity   = '0';
    setTimeout(() => el.remove(), 320);
  }, 3600);
}

// ── SMOOTH SCROLL ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76;
    window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - offset, behavior: 'smooth' });
  });
});

// ── PAGE FADE IN ──────────────────────────────────────────────
document.body.style.opacity = '0';
document.body.style.transition = 'opacity .35s ease';
window.addEventListener('load', () => {
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});

// ── CONSOLE SIGNATURE ─────────────────────────────────────────
console.log('%c  GAMEVA CENTER  ', 'background:#00c853;color:#000;font-family:monospace;font-size:18px;font-weight:900;padding:10px 20px;border-radius:6px;');
console.log('%c  Tecnologia Gamer em Angola  ', 'color:#00c853;font-family:monospace;font-size:13px;font-style:italic;');
