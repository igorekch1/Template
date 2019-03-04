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

let btnBlocks = document.querySelectorAll(".section__item_block_info_options");
for (let i = 0; i < btnBlocks.length; i++) {
    let btns = btnBlocks[i].querySelectorAll(".section__item_block_info_options_button");
    let currentBlock = btnBlocks[i];
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function (e) {
            let target = e.target;
            let current = currentBlock.querySelectorAll(".selected");
            if (!!current.length === true) {
                current[0].classList.remove("selected");
            }
            target.classList.add("selected");
        });
    }
}

let dropdown_menu = document.querySelector(".dropdown-menu");
let dropdown = dropdown_menu.querySelectorAll(".dropdown");
for (let i = 0; i < dropdown.length; i++) {
    let target;
    dropdown[i].addEventListener("click", function (e) {
        if (target) target.style = "";
        target = e.target;
        if (target.parentNode.className === "dropdown-content") {
            target.style = "background-color: #e5e5e5; color: #f14a58;";
            if (target.innerHTML !== "Not Selected") {
                this.children[0].style.padding = "10px 20px";
                this.querySelector(".dropbtn-name").style.font = "12px/1 'Roboto Bold', sans-serif"
                this.style.backgroundColor = "#e5e5e5";
                this.children[0].lastElementChild.innerHTML = target.textContent;
            } else {
                this.children[0].style.padding = "20px";
                this.querySelector(".dropbtn-name").style.font = "16px/1 'OpenSans Bold', sans-serif"
                this.style.backgroundColor = "#fff";  
                this.children[0].lastElementChild.innerHTML = "";
            }
        }
    });
}