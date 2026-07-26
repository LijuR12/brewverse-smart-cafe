/* =========================================================
   BREWVERSE — Search
   Debounced menu search box.
   ========================================================= */

const SearchModule = (() => {
  const init = () => {
    const input = document.getElementById('menuSearch');
    if (!input) return;

    const handleSearch = Utils.debounce((value) => {
      MenuModule.setSearchTerm(value);
    }, 200);

    input.addEventListener('input', (e) => handleSearch(e.target.value));
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', SearchModule.init);
