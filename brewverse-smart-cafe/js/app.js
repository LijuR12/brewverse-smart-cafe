/* =========================================================
   BREWVERSE — App
   Orchestrates navbar behavior, mobile nav, scroll spy,
   back-to-top, scroll progress, testimonials, and FAQ.
   ========================================================= */

const App = (() => {

  /* ---------- Navbar scroll state ---------- */
  const initNavbarScroll = () => {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 20 ? 'var(--shadow-sm)' : 'none';
    });
  };

  /* ---------- Scroll progress bar ---------- */
  const initScrollProgress = () => {
    const bar = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${progress}%`;
    });
  };

  /* ---------- Scroll spy ---------- */
  const initScrollSpy = () => {
    const sections = Utils.qsa('main section[id], .stats-section[id]');
    const navLinks = Utils.qsa('[data-nav]');

    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => spy.observe(section));
  };

  /* ---------- Mobile navigation ---------- */
  const initMobileNav = () => {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('navOverlay');
    const closeBtn = document.getElementById('mobileNavClose');

    const open = () => {
      mobileNav.classList.add('active');
      overlay.classList.add('active');
      hamburger.classList.add('open');
    };
    const close = () => {
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
      hamburger.classList.remove('open');
    };

    hamburger?.addEventListener('click', () => {
      mobileNav.classList.contains('active') ? close() : open();
    });
    closeBtn?.addEventListener('click', close);
    overlay?.addEventListener('click', close);
    Utils.qsa('a', mobileNav).forEach((link) => link.addEventListener('click', close));
  };

  /* ---------- Back to top ---------- */
  const initBackToTop = () => {
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    });
    btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  /* ---------- Testimonials slider ---------- */
  const FALLBACK_TESTIMONIALS = [
    { id: 't01', name: 'Ananya Rao', role: 'Regular Customer', image: 'https://randomuser.me/api/portraits/women/68.jpg', rating: 5, text: 'BrewVerse has the best caramel latte in town. The ambience makes it my go-to spot for work meetings.' },
    { id: 't02', name: 'Karthik Iyer', role: 'Food Blogger', image: 'https://randomuser.me/api/portraits/men/32.jpg', rating: 5, text: 'Every visit feels premium. The build-your-own-coffee feature is such a fun touch, and the cake is unreal.' },
    { id: 't03', name: 'Meera Nair', role: 'Design Student', image: 'https://randomuser.me/api/portraits/women/44.jpg', rating: 4, text: 'Cozy corner, great wifi, and the cold brew is consistently smooth. My favorite study spot.' },
    { id: 't04', name: 'Rohan Verma', role: 'Software Engineer', image: 'https://randomuser.me/api/portraits/men/76.jpg', rating: 5, text: 'I booked a table online in seconds and the staff had it ready exactly on time. Great experience end to end.' },
    { id: 't05', name: 'Priya Menon', role: 'Photographer', image: 'https://randomuser.me/api/portraits/women/21.jpg', rating: 5, text: 'The gallery on their website doesn\'t do it justice - the space is even more beautiful in person.' }
  ];

  const initTestimonials = async () => {
    const track = document.getElementById('testimonialTrack');
    const dotsWrap = document.getElementById('testimonialDots');
    if (!track) return;

    const testimonials = await Utils.fetchJSON('data/testimonials.json', FALLBACK_TESTIMONIALS);
    let current = 0;
    let timer;

    track.innerHTML = testimonials.map((t) => `
      <div class="testimonial-card">
        <div class="testimonial-glass">
          <img src="${t.image}" alt="${t.name}" loading="lazy">
          <div class="testimonial-stars">${Utils.renderStars(t.rating)}</div>
          <p class="testimonial-text">"${t.text}"</p>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-role">${t.role}</div>
        </div>
      </div>
    `).join('');

    dotsWrap.innerHTML = testimonials.map((_, i) => `<button data-index="${i}" class="${i === 0 ? 'active' : ''}"></button>`).join('');

    const goTo = (index) => {
      current = (index + testimonials.length) % testimonials.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      Utils.qsa('button', dotsWrap).forEach((dot, i) => dot.classList.toggle('active', i === current));
    };

    dotsWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      goTo(parseInt(btn.dataset.index, 10));
      resetTimer();
    });

    const resetTimer = () => {
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), 5500);
    };

    resetTimer();
  };

  /* ---------- FAQ accordion ---------- */
  const initFAQ = () => {
    Utils.qsa('.faq-item').forEach((item) => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        Utils.qsa('.faq-item').forEach((el) => {
          el.classList.remove('open');
          el.querySelector('.faq-answer').style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
      });
    });
  };

  const init = () => {
    initNavbarScroll();
    initScrollProgress();
    initScrollSpy();
    initMobileNav();
    initBackToTop();
    initTestimonials();
    initFAQ();
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
