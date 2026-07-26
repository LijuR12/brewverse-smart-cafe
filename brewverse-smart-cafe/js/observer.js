/* =========================================================
   BREWVERSE — Observer
   Handles scroll-reveal animations and animated counters.
   ========================================================= */

const ObserverModule = (() => {

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  const observeReveals = (root = document) => {
    Utils.qsa('.reveal, .product-card, .gallery-item', root).forEach((el) => revealObserver.observe(el));
  };

  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1600;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString() + '+';
      }
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const observeCounters = () => {
    Utils.qsa('.stat-number').forEach((el) => counterObserver.observe(el));
  };

  const init = () => {
    observeReveals();
    observeCounters();
  };

  return { init, observeReveals };
})();

document.addEventListener('DOMContentLoaded', ObserverModule.init);
