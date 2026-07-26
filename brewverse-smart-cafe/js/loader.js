/* =========================================================
   BREWVERSE — Loader
   Coffee cup fill animation, then smooth fade out.
   ========================================================= */

(() => {
  const MIN_DISPLAY_MS = 1400;
  const start = Date.now();

  const hideLoader = () => {
    const loader = document.getElementById('loader');
    if (!loader) return;
    const elapsed = Date.now() - start;
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      setTimeout(() => loader.remove(), 800);
    }, remaining);
  };

  document.body.style.overflow = 'hidden';

  window.addEventListener('load', hideLoader);
  // Safety net in case the load event is delayed by slow external assets
  setTimeout(hideLoader, 4000);
})();
