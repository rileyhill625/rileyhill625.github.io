// ============================================================
//  main.js — site interactions
// ============================================================

// 1) Scroll reveal — fade elements in as they enter the viewport
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('is-visible')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

// 2) Mobile nav toggle
(function () {
  const toggle = document.querySelector('.nav__toggle');
  const links  = document.getElementById('nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
})();

// 3) Active nav link on scroll (index page only; no-ops elsewhere)
(function () {
  const map = new Map();
  document.querySelectorAll('.nav__links a[href^="#"]').forEach(a => {
    const sec = document.getElementById(a.getAttribute('href').slice(1));
    if (sec) map.set(sec, a);
  });
  if (!map.size || !('IntersectionObserver' in window)) return;
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        map.forEach(link => link.classList.remove('is-active'));
        const active = map.get(e.target);
        if (active) active.classList.add('is-active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((_, sec) => spy.observe(sec));
})();