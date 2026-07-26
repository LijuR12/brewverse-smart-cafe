/* =========================================================
   BREWVERSE — Coffee Builder / Calculator
   ========================================================= */

const CalculatorModule = (() => {
  const selection = {
    base: { value: 'Espresso', price: 2.5, cal: 5 },
    milk: { value: 'Regular', price: 0, cal: 40 },
    sugar: { value: 'No Sugar', price: 0, cal: 0 },
    topping: { value: 'None', price: 0, cal: 0 },
    size: { value: 'Medium', price: 0.8, cal: 30, time: 3 }
  };

  const groupToSummaryId = {
    base: 'sumBase',
    milk: 'sumMilk',
    sugar: 'sumSugar',
    topping: 'sumTopping',
    size: 'sumSize'
  };

  const recalc = () => {
    const totalPrice = Object.values(selection).reduce((sum, o) => sum + o.price, 0);
    const totalCalories = Object.values(selection).reduce((sum, o) => sum + o.cal, 0);

    document.getElementById('sumPrice').textContent = Utils.formatCurrency(totalPrice);
    document.getElementById('sumCalories').textContent = totalCalories;
    document.getElementById('sumTime').textContent = `${selection.size.time || 3} min`;

    Object.entries(groupToSummaryId).forEach(([group, id]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = selection[group].value;
    });
  };

  const bindPills = () => {
    Utils.qsa('.option-pills').forEach((group) => {
      const groupName = group.dataset.group;
      group.addEventListener('click', (e) => {
        const pill = e.target.closest('.option-pill');
        if (!pill) return;

        Utils.qsa('.option-pill', group).forEach((p) => p.classList.remove('selected'));
        pill.classList.add('selected');

        selection[groupName] = {
          value: pill.dataset.value,
          price: parseFloat(pill.dataset.price) || 0,
          cal: parseInt(pill.dataset.cal, 10) || 0,
          time: pill.dataset.time ? parseInt(pill.dataset.time, 10) : undefined
        };
        recalc();
      });
    });
  };

  const bindAddToCart = () => {
    document.getElementById('addBuiltCoffee')?.addEventListener('click', () => {
      const totalPrice = Object.values(selection).reduce((sum, o) => sum + o.price, 0);
      const name = `${selection.size.value} ${selection.base.value} (${selection.milk.value} milk)`;
      CartModule.addItem({
        id: `custom-${Date.now()}`,
        name,
        price: totalPrice,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&q=80'
      }, 1);
    });
  };

  const init = () => {
    bindPills();
    bindAddToCart();
    recalc();
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', CalculatorModule.init);
