/* =========================================================
   BREWVERSE — Toast Notifications
   ========================================================= */

const Toast = (() => {
  const container = () => document.getElementById('toastContainer');

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ'
  };

  const show = (message, type = 'success', duration = 3200) => {
    const root = container();
    if (!root) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <span class="toast-msg">${message}</span>
    `;
    root.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }, duration);
  };

  return { show };
})();
