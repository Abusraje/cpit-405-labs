/* ============================================================
   OMAR BAKHIDHAR — PORTFOLIO 2026
   script.js — Interactions, Animations, Rain Canvas
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initRain();
  initNav();
  initScrollReveal();
  initActiveNav();
  initTypingEffect();
});

/* ── Cinematic Rain Canvas ── */
function initRain() {
  const canvas = document.getElementById('rain-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let drops = [];
  let animFrame;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops = [];
    for (let i = 0; i < Math.floor(canvas.width / 8); i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 60 + 20,
        speed: Math.random() * 3 + 1.5,
        opacity: Math.random() * 0.25 + 0.05,
        width: Math.random() * 0.8 + 0.2,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drops.forEach(d => {
      const grad = ctx.createLinearGradient(d.x, d.y, d.x - d.length * 0.15, d.y + d.length);
      grad.addColorStop(0, `rgba(64, 130, 109, 0)`);
      grad.addColorStop(0.5, `rgba(64, 130, 109, ${d.opacity})`);
      grad.addColorStop(1, `rgba(64, 130, 109, 0)`);

      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - d.length * 0.15, d.y + d.length);
      ctx.strokeStyle = grad;
      ctx.lineWidth = d.width;
      ctx.stroke();

      d.y += d.speed;
      d.x -= d.speed * 0.08;

      if (d.y > canvas.height + d.length || d.x < -20) {
        d.x = Math.random() * canvas.width + 100;
        d.y = -d.length - Math.random() * 200;
      }
    });

    animFrame = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
}

/* ── Sticky Nav & Scroll State ── */
function initNav() {
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }
}

/* ── Active Nav Link ── */
function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ── Scroll Reveal ── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── Typing Effect (Hero) ── */
function initTypingEffect() {
  const el = document.querySelector('.hero-typing');
  if (!el) return;

  const words = ['IT Professional', 'Creative Mind', 'Film Enthusiast', 'PR Coordinator', 'Problem Solver'];
  let wordIndex = 0, charIndex = 0, deleting = false;

  function type() {
    const current = words[wordIndex];
    if (deleting) {
      el.textContent = current.slice(0, charIndex--);
      if (charIndex < 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 400);
        return;
      }
    } else {
      el.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        setTimeout(() => { deleting = true; type(); }, 2000);
        return;
      }
    }
    setTimeout(type, deleting ? 40 : 80);
  }

  type();
}

/* ── Contact Form Handler ── */
function handleContactForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // FormSubmit handles submission via action attribute
    // If using JS submission:
    setTimeout(() => {
      if (success) success.classList.add('show');
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }, 1500);
  });
}

document.addEventListener('DOMContentLoaded', handleContactForm);

/* ── Smooth Hover Glow on Cards ── */
document.addEventListener('mousemove', (e) => {
  document.querySelectorAll('.lab-card, .glass-card, .quick-link-card, .film-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});

/* ── Cursor Trail (optional, subtle) ── */
(function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip on mobile

  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed; width: 6px; height: 6px;
    background: #40826D; border-radius: 50%;
    pointer-events: none; z-index: 9999;
    transition: opacity 0.3s; opacity: 0;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(dot);

  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    dot.style.opacity = '0.6';
  });

  document.addEventListener('mouseleave', () => dot.style.opacity = '0');
})();
