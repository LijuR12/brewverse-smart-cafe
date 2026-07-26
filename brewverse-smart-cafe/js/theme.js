/* =========================================================
   BREWVERSE — Theme (Dark / Light Mode)
   ========================================================= */

const ThemeModule = (() => {
  const STORAGE_KEY = 'brewverse_theme';

  const apply = (theme) => {
    document.body.setAttribute('data-theme', theme);
    Utils.storage.set(STORAGE_KEY, theme);
    const sunIcon = document.getElementById('themeIconSun');
    if (sunIcon) {
      sunIcon.style.transform = theme === 'dark' ? 'rotate(40deg)' : 'rotate(0deg)';
    }
  };

  const toggle = () => {
    const current = document.body.getAttribute('data-theme') || 'light';
    apply(current === 'light' ? 'dark' : 'light');
  };

  const init = () => {
    const saved = Utils.storage.get(STORAGE_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    apply(saved || (prefersDark ? 'dark' : 'light'));

    document.getElementById('themeToggle')?.addEventListener('click', toggle);
    document.getElementById('mobileThemeTrack')?.addEventListener('click', toggle);
  };

  return { init, toggle, apply };
})();

document.addEventListener('DOMContentLoaded', ThemeModule.init);
