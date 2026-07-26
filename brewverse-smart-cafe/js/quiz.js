/* =========================================================
   BREWVERSE — Coffee Quiz
   Three quick questions → a personalized recommendation.
   ========================================================= */

const QuizModule = (() => {
  const answers = {};
  let step = 0;

  const RECOMMENDATIONS = {
    'strong-hot-bitter': { name: 'Espresso Shot', desc: 'Bold, intense, and no-nonsense — just like you like it.', img: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300&q=80' },
    'strong-hot-sweet': { name: 'Caramel Latte', desc: 'A strong espresso base balanced with rich caramel sweetness.', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=300&q=80' },
    'strong-cold-bitter': { name: 'Cold Brew', desc: 'Bold and smooth, steeped slow for a punchy, low-acid kick.', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&q=80' },
    'strong-cold-sweet': { name: 'Iced Vanilla Latte', desc: 'Strong espresso, chilled and sweetened with silky vanilla.', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&q=80' },
    'mild-hot-bitter': { name: 'Classic Cappuccino', desc: 'Balanced and comforting, with just enough edge.', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&q=80' },
    'mild-hot-sweet': { name: 'Double Mocha', desc: 'Gentle, chocolatey, and endlessly cozy.', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&q=80' },
    'mild-cold-bitter': { name: 'Iced Matcha Latte', desc: 'Light, earthy, and refreshingly smooth over ice.', img: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=300&q=80' },
    'mild-cold-sweet': { name: 'Iced Vanilla Latte', desc: 'Sweet, mellow, and perfectly chilled.', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&q=80' }
  };

  const showStep = (index) => {
    Utils.qsa('.quiz-step').forEach((el, i) => { el.style.display = i === index ? 'block' : 'none'; });
    Utils.qsa('#quizProgress span').forEach((dot, i) => dot.classList.toggle('done', i < index));
  };

  const showResult = () => {
    const key = `${answers.strength}-${answers.temp}-${answers.taste}`;
    const result = RECOMMENDATIONS[key] || RECOMMENDATIONS['mild-hot-sweet'];

    document.getElementById('quizQuestions').style.display = 'none';
    document.getElementById('quizProgress').style.display = 'none';
    document.getElementById('quizResultImg').src = result.img;
    document.getElementById('quizResultName').textContent = result.name;
    document.getElementById('quizResultDesc').textContent = result.desc;
    document.getElementById('quizResult').classList.add('active');
  };

  const reset = () => {
    step = 0;
    Object.keys(answers).forEach((k) => delete answers[k]);
    document.getElementById('quizQuestions').style.display = 'block';
    document.getElementById('quizProgress').style.display = 'flex';
    document.getElementById('quizResult').classList.remove('active');
    showStep(0);
  };

  const bindEvents = () => {
    document.getElementById('quizQuestions')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.quiz-option');
      if (!btn) return;
      answers[btn.dataset.key] = btn.dataset.value;
      step++;
      if (step < 3) {
        showStep(step);
      } else {
        showResult();
      }
    });

    document.getElementById('quizRestart')?.addEventListener('click', reset);
  };

  const init = () => {
    showStep(0);
    bindEvents();
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', QuizModule.init);
