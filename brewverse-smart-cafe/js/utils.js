/* =========================================================
   BREWVERSE — Utils
   Shared helper functions used across modules.
   ========================================================= */

const Utils = (() => {
  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const formatCurrency = (value) => `₹${Math.round(Number(value)).toLocaleString('en-IN')}`;

  const debounce = (fn, delay = 250) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  const generateOrderId = () => {
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `BV-${rand}`;
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) => /^\d{10}$/.test(phone.replace(/\D/g, ''));

  const isNotEmpty = (value) => value !== null && value !== undefined && String(value).trim().length > 0;

  const storage = {
    get(key, fallback = null) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch (err) {
        console.error(`Utils.storage.get failed for "${key}"`, err);
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.error(`Utils.storage.set failed for "${key}"`, err);
      }
    }
  };

  /** Fetch JSON with a fallback value if fetch fails (e.g. opened via file://) */
  const fetchJSON = async (path, fallback = []) => {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`Utils.fetchJSON: could not load ${path}, using bundled fallback data.`, err.message);
      return fallback;
    }
  };

  const renderStars = (rating) => {
    const full = Math.round(rating);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  };

  return { qs, qsa, formatCurrency, debounce, generateOrderId, validateEmail, validatePhone, isNotEmpty, storage, fetchJSON, renderStars };
})();
