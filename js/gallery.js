/* =========================================================
   BREWVERSE — Gallery
   Grid rendering, category filters, lazy load, lightbox.
   ========================================================= */

const GalleryModule = (() => {
  const IMAGES = [
    { id: 'g1', category: 'interior', size: 'wide', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80', caption: 'Main seating area' },
    { id: 'g2', category: 'coffee', size: 'tall', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&q=80', caption: 'Latte art' },
    { id: 'g3', category: 'people', size: '', url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=700&q=80', caption: 'Our barista at work' },
    { id: 'g4', category: 'food', size: '', url: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=700&q=80', caption: 'Fresh pastries' },
    { id: 'g5', category: 'interior', size: '', url: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=700&q=80', caption: 'Reading corner' },
    { id: 'g6', category: 'coffee', size: '', url: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=700&q=80', caption: 'Pour-over brewing' },
    { id: 'g7', category: 'people', size: 'wide', url: 'https://images.unsplash.com/photo-1522992319-0365e5f11656?w=900&q=80', caption: 'Weekend crowd' },
    { id: 'g8', category: 'food', size: 'tall', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&q=80', caption: 'Cake of the day' },
    { id: 'g9', category: 'coffee', size: '', url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=700&q=80', caption: 'Cold brew tap' },
    { id: 'g10', category: 'interior', size: '', url: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=700&q=80', caption: 'Evening ambience' },
    { id: 'g11', category: 'people', size: '', url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=700&q=80', caption: 'First sip' },
    { id: 'g12', category: 'food', size: '', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&q=80', caption: 'Brunch plate' }
  ];

  let activeFilter = 'all';
  let currentLightboxIndex = 0;
  let currentList = IMAGES;

  const render = () => {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    currentList = activeFilter === 'all' ? IMAGES : IMAGES.filter((img) => img.category === activeFilter);

    grid.innerHTML = currentList.map((img, idx) => `
      <div class="gallery-item ${img.size}" data-index="${idx}">
        <img class="lazy" data-src="${img.url}" alt="${img.caption}" loading="lazy">
        <div class="gallery-overlay"><span>${img.caption}</span></div>
      </div>
    `).join('');

    lazyLoadImages();
    ObserverModule.observeReveals(grid);
  };

  const lazyLoadImages = () => {
    const imgs = Utils.qsa('img.lazy', document.getElementById('galleryGrid'));
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.addEventListener('load', () => img.classList.add('loaded'));
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });
    imgs.forEach((img) => io.observe(img));
  };

  const bindFilters = () => {
    const wrap = document.getElementById('galleryFilters');
    wrap?.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      Utils.qsa('.filter-btn', wrap).forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.gfilter;
      render();
    });
  };

  const openLightbox = (index) => {
    currentLightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    document.getElementById('lightboxImg').src = currentList[index].url;
    lightbox.classList.add('active');
  };

  const closeLightbox = () => document.getElementById('lightbox').classList.remove('active');

  const navigateLightbox = (dir) => {
    currentLightboxIndex = (currentLightboxIndex + dir + currentList.length) % currentList.length;
    document.getElementById('lightboxImg').src = currentList[currentLightboxIndex].url;
  };

  const bindLightbox = () => {
    document.getElementById('galleryGrid')?.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item');
      if (!item) return;
      openLightbox(parseInt(item.dataset.index, 10));
    });

    document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev')?.addEventListener('click', () => navigateLightbox(-1));
    document.getElementById('lightboxNext')?.addEventListener('click', () => navigateLightbox(1));
    document.getElementById('lightbox')?.addEventListener('click', (e) => {
      if (e.target.id === 'lightbox') closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      const lightbox = document.getElementById('lightbox');
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  };

  const init = () => {
    render();
    bindFilters();
    bindLightbox();
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', GalleryModule.init);
