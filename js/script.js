let searchIcon = document.querySelector("#search-icon");
let searchInput = document.querySelector(".header__block_search_input");
searchIcon.addEventListener("click", function(e) {
    if (!searchInput.classList.contains("active")) {
        searchInput.style.display = "block";
        searchInput.classList.add("active");
    } else {
        searchInput.style.display = "none";
        searchInput.classList.remove("active");
    }
});