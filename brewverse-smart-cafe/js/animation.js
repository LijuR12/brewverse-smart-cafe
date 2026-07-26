/* =========================================================
   BREWVERSE — Animation Helpers
   Typewriter effect for the hero headline.
   ========================================================= */

const AnimationModule = (() => {
  const phrases = [
    'Every Cup Tells A Story',
    'Crafted With Passion',
    'Roasted To Perfection',
    'Made For This Moment'
  ];

  const typewriter = (el, words, { typeSpeed = 70, deleteSpeed = 40, pause = 1600 } = {}) => {
    if (!el) return;
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const word = words[wordIndex];

      if (!deleting) {
        charIndex++;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          return setTimeout(tick, pause);
        }
      } else {
        charIndex--;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
    };

    tick();
  };

  const init = () => {
    const el = document.getElementById('typedText');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (el) el.textContent = phrases[0];
      return;
    }
    typewriter(el, phrases);
  };

  return { init, typewriter };
})();

document.addEventListener('DOMContentLoaded', AnimationModule.init);
