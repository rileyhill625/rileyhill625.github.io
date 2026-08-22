// ============================================================
//  main.js — site interactions
// ============================================================

// Scroll reveal: fade elements in as they scroll into view.
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {   // very old browser: just show everything
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);            // reveal once, then stop watching it
      }
    });
  }, { threshold: 0.12 });                      // fire when ~12% of the element is on screen
  els.forEach(el => io.observe(el));
})();