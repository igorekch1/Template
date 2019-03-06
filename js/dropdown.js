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

let dropdown_titles = document.querySelector(".dropdown-menu-titles"),
    dropdown_content = document.querySelector(".dropdown-content-tablet"),
    close = document.querySelector(".fa-times"),
    open = document.querySelector(".fa-angle-down");

dropdown_titles.addEventListener("click", function(e) {
    open.classList.toggle("show");
    close.classList.toggle("show");
    dropdown_content.classList.toggle("show");
});