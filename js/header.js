if (window.matchMedia("(min-width: 767px) and (max-width: 1024px)").matches) {
    let searchIcon = document.querySelector("#search-icon");
    let searchInput = document.querySelector(".header__block_search_input");
    let searchWrapper = document.querySelector(".header__block_search");
    searchIcon.addEventListener("click", function (e) {
        if (!searchInput.classList.contains("active")) {
            searchInput.style.display = "block";
            searchInput.classList.add("active");
            searchWrapper.classList.add("active");
        } else {
            searchInput.style.display = "none";
            searchInput.classList.remove("active");
            searchWrapper.classList.remove("active");
        }
    });
}

let nav = document.querySelector(".header__block_nav_wrapper");
let menu = document.querySelector(".header_menu_mobile");
menu.addEventListener("click", function (e) {
    this.classList.toggle("cross");
    nav.classList.toggle("active_list");
});