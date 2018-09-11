const liveSearch = () => {
  let searchInput = document.querySelector(".live-search-box");
  const noResultDiv = document.querySelector(".no-city-found");
  let allCities = [...document.querySelectorAll(".gb-card-six-image")];
  searchInput.addEventListener("keyup", e => {
    const inputValue = searchInput.value;
    const reg = new RegExp(`^${inputValue}`, "i");
    const filtered = allCities.filter(el => {
      if (reg.test(el.dataset.city)) {
        el.style.display = "grid";
        return true;
      } else {
        el.style.display = "none";
        return false;
      }
    });
    if (filtered.length == 0) {
      noResultDiv.style.display = "flex";
    } else {
      noResultDiv.style.display = "none";
    }
  });
};
liveSearch();
