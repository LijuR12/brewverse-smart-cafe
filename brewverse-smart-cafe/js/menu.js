/* =========================================================
   BREWVERSE — Menu
   Loads menu data, renders Today's Special + full Menu grid,
   and handles category filtering.
   ========================================================= */

const MenuModule = (() => {
  // Bundled fallback so the site still works when opened directly via file://
  // (some browsers block fetch() of local JSON without a server).
  const FALLBACK_MENU = [
    { id: 'm01', name: 'Caramel Latte', category: 'coffee', price: 180, currency: 'INR', rating: 4.8, calories: 190, description: 'Rich espresso with steamed milk and a swirl of caramel.', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&q=80', badge: 'Bestseller' },
    { id: 'm02', name: 'Classic Cappuccino', category: 'coffee', price: 160, currency: 'INR', rating: 4.6, calories: 120, description: 'Equal parts espresso, steamed milk, and velvety foam.', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80', badge: '' },
    { id: 'm03', name: 'Double Mocha', category: 'coffee', price: 200, currency: 'INR', rating: 4.7, calories: 260, description: 'Espresso, chocolate sauce, and steamed milk, topped with cream.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80', badge: 'New' },
    { id: 'm04', name: 'Espresso Shot', category: 'coffee', price: 120, currency: 'INR', rating: 4.5, calories: 5, description: 'A concentrated shot of our signature dark roast blend.', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&q=80', badge: '' },
    { id: 'm05', name: 'Chocolate Truffle Cake', category: 'dessert', price: 220, currency: 'INR', rating: 4.9, calories: 420, description: 'Dense chocolate cake layered with silky ganache.', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80', badge: 'Bestseller' },
    { id: 'm06', name: 'New York Cheesecake', category: 'dessert', price: 240, currency: 'INR', rating: 4.7, calories: 380, description: 'Creamy baked cheesecake on a buttery biscuit base.', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80', badge: '' },
    { id: 'm07', name: 'Almond Croissant', category: 'snacks', price: 150, currency: 'INR', rating: 4.6, calories: 340, description: 'Flaky, buttery croissant filled with almond cream.', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80', badge: '' },
    { id: 'm08', name: 'Avocado Toast', category: 'snacks', price: 280, currency: 'INR', rating: 4.4, calories: 310, description: 'Sourdough toast topped with smashed avocado and chili flakes.', image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=600&q=80', badge: 'New' },
    { id: 'm09', name: 'Iced Vanilla Latte', category: 'cold', price: 220, currency: 'INR', rating: 4.8, calories: 210, description: 'Chilled espresso, milk, and a touch of vanilla over ice.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80', badge: 'Bestseller' },
    { id: 'm10', name: 'Cold Brew', category: 'cold', price: 250, currency: 'INR', rating: 4.5, calories: 15, description: 'Slow-steeped 18 hours for a smooth, low-acid finish.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80', badge: '' },
    { id: 'm11', name: 'Iced Matcha Latte', category: 'cold', price: 280, currency: 'INR', rating: 4.6, calories: 180, description: 'Ceremonial-grade matcha whisked with cold milk over ice.', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&q=80', badge: 'New' },
    { id: 'm12', name: 'Blueberry Muffin', category: 'snacks', price: 140, currency: 'INR', rating: 4.3, calories: 290, description: 'Soft-baked muffin bursting with fresh blueberries.', image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=80', badge: '' }
  ];

  let menuData = [];
  let activeCategory = 'all';
  let activeSearch = '';

  const cardTemplate = (item) => `
    <article class="product-card" data-id="${item.id}">
      <div class="product-media">
        ${item.badge ? `<span class="product-badge">${item.badge}</span>` : ''}
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </div>
      <div class="product-body">
        <div class="product-top">
          <h3>${item.name}</h3>
          <span class="product-rating">★ ${item.rating}</span>
        </div>
        <p class="product-desc">${item.description}</p>
        <div class="product-footer">
          <span class="product-price">${Utils.formatCurrency(item.price)}</span>
          <button class="add-cart-btn" data-id="${item.id}" aria-label="Add ${item.name} to cart">＋</button>
        </div>
      </div>
    </article>
  `;

  const renderSpecials = () => {
    const grid = document.getElementById('specialsGrid');
    if (!grid) return;
    const specials = menuData.filter((i) => i.badge === 'Bestseller').slice(0, 4);
    grid.innerHTML = specials.map(cardTemplate).join('');
  };

  const renderMenu = () => {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    const filtered = menuData.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(activeSearch) || item.description.toLowerCase().includes(activeSearch);
      return matchesCategory && matchesSearch;
    });

    grid.innerHTML = filtered.length
      ? filtered.map(cardTemplate).join('')
      : `<div class="empty-state">No items match your search. Try a different keyword or filter.</div>`;

    ObserverModule.observeReveals(grid);
  };

  const bindCardEvents = () => {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.add-cart-btn');
      if (!btn) return;
      const product = menuData.find((i) => i.id === btn.dataset.id);
      if (product) CartModule.addItem(product, 1);
    });
  };

  const bindFilters = () => {
    const group = document.getElementById('filterGroup');
    group?.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      Utils.qsa('.filter-btn', group).forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.filter;
      renderMenu();
    });
  };

  const setSearchTerm = (term) => {
    activeSearch = term.trim().toLowerCase();
    renderMenu();
  };

  const init = async () => {
    menuData = await Utils.fetchJSON('data/menu.json', FALLBACK_MENU);
    renderSpecials();
    renderMenu();
    bindCardEvents();
    bindFilters();
  };

  return { init, setSearchTerm, getMenuData: () => menuData };
})();

document.addEventListener('DOMContentLoaded', MenuModule.init);
