/* =========================================================
   BREWVERSE — Shopping Cart
   ========================================================= */

const CartModule = (() => {
  const STORAGE_KEY = 'brewverse_cart';
  const TAX_RATE = 0.1; // 10% GST-style tax
  const DELIVERY_FEE = 40; // flat delivery fee in ₹

  let items = Utils.storage.get(STORAGE_KEY, []);

  const save = () => Utils.storage.set(STORAGE_KEY, items);

  const findIndex = (id) => items.findIndex((i) => i.id === id);

  const addItem = (product, qty = 1) => {
    const idx = findIndex(product.id);
    if (idx > -1) {
      items[idx].qty += qty;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty
      });
    }
    save();
    render();
    Toast.show(`${product.name} added to cart`, 'success');
  };

  const removeItem = (id) => {
    items = items.filter((i) => i.id !== id);
    save();
    render();
  };

  const changeQty = (id, delta) => {
    const idx = findIndex(id);
    if (idx === -1) return;
    items[idx].qty += delta;
    if (items[idx].qty <= 0) {
      items.splice(idx, 1);
    }
    save();
    render();
  };

  const getCount = () => items.reduce((sum, i) => sum + i.qty, 0);
  const getSubtotal = () => items.reduce((sum, i) => sum + i.qty * i.price, 0);

  const clear = () => {
    items = [];
    save();
    render();
  };

  const render = () => {
    const badge = document.getElementById('cartBadge');
    const wrap = document.getElementById('cartItems');
    if (badge) badge.textContent = getCount();
    if (!wrap) return;

    if (items.length === 0) {
      wrap.innerHTML = `
        <div class="cart-empty">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
          <p>Your cart is empty.<br>Add something delicious!</p>
        </div>`;
    } else {
      wrap.innerHTML = items.map((item) => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <span>${Utils.formatCurrency(item.price)} each</span>
            <div class="qty-control">
              <button data-action="decrease" aria-label="Decrease quantity">−</button>
              <span>${item.qty}</span>
              <button data-action="increase" aria-label="Increase quantity">+</button>
              <button class="cart-item-remove" data-action="remove">Remove</button>
            </div>
          </div>
          <div class="cart-item-total">${Utils.formatCurrency(item.price * item.qty)}</div>
        </div>
      `).join('');
    }

    const subtotal = getSubtotal();
    const tax = subtotal * TAX_RATE;
    const delivery = items.length ? DELIVERY_FEE : 0;
    const total = subtotal + tax + delivery;

    document.getElementById('cartSubtotal').textContent = Utils.formatCurrency(subtotal);
    document.getElementById('cartTax').textContent = Utils.formatCurrency(tax);
    document.getElementById('cartDelivery').textContent = Utils.formatCurrency(delivery);
    document.getElementById('cartTotal').textContent = Utils.formatCurrency(total);

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.disabled = items.length === 0;
  };

  const bindDrawerEvents = () => {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    const openBtn = document.getElementById('cartToggle');
    const closeBtn = document.getElementById('cartClose');
    const itemsWrap = document.getElementById('cartItems');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const modal = document.getElementById('checkoutModal');
    const closeModalBtn = document.getElementById('closeCheckoutModal');

    const open = () => { drawer.classList.add('active'); overlay.classList.add('active'); };
    const close = () => { drawer.classList.remove('active'); overlay.classList.remove('active'); };

    openBtn?.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    overlay?.addEventListener('click', close);

    itemsWrap?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const id = btn.closest('.cart-item').dataset.id;
      const action = btn.dataset.action;
      if (action === 'increase') changeQty(id, 1);
      if (action === 'decrease') changeQty(id, -1);
      if (action === 'remove') removeItem(id);
    });

    checkoutBtn?.addEventListener('click', () => {
      if (items.length === 0) return;
      const orderId = Utils.generateOrderId();
      document.getElementById('orderIdChip').textContent = `#${orderId}`;
      modal.classList.add('active');
      close();
      clear();
    });

    closeModalBtn?.addEventListener('click', () => modal.classList.remove('active'));
    modal?.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
  };

  const init = () => {
    bindDrawerEvents();
    render();
  };

  return { init, addItem, removeItem, changeQty, getCount, render };
})();

document.addEventListener('DOMContentLoaded', CartModule.init);
