let items = [{
    name: "Only Skinny Jeans",
    fashion: "Sport",
    producttype: "Jersey Tops",
    color: "Black",
    brand: "Chi Chi London",
    size: "UK 2",
    pricerange: "To £99"
}, {
    name: "Neck Knitted Jumper",
    fashion: "Casual style",
    producttype: "Coats & Jackets",
    color: "Blue",
    brand: "Antipodium",
    size: "UK 18",
    pricerange: "To £99"
}, {
    name: "Turtle Neck Jumper in Rib",
    fashion: "New Look",
    producttype: "Coats & Jackets",
    color: "Green",
    brand: "River Island",
    size: "UK 18L",
    pricerange: "£100 - £299"
}, {
    name: "With Patchwork Crochet",
    fashion: "Vintage",
    producttype: "Dresses",
    color: "White",
    brand: "Adidas",
    size: "UK 20",
    pricerange: "To £99"
}, {
    name: "Levi's Jeans for women",
    fashion: "Casual style",
    producttype: "Dresses",
    color: "Blue",
    brand: "Chi Chi London",
    size: "UK 20S",
    pricerange: "To £99"
}, {
    name: "Boyfriend T-shirt with Bohemian Print",
    fashion: "Classical style",
    producttype: "Jersey Tops",
    color: "Green",
    brand: "New Balance",
    size: "UK 20L",
    pricerange: "To £99"
}, {
    name: "Colour Black",
    fashion: "Casual style",
    producttype: "Coats & Jackets",
    color: "Black",
    brand: "Antipodium",
    size: "UK 22",
    pricerange: "From £300"
}, {
    name: "Monki Festival Knitted",
    fashion: "Nail the 90s",
    producttype: "Dresses",
    color: "Blue",
    brand: "River Island",
    size: "UK 22S",
    pricerange: "To £99"
}, {
    name: "Oversized Cardigan",
    fashion: "Vintage",
    producttype: "Coats & Jackets",
    color: "Golden",
    brand: "Adidas",
    size: "UK 20S",
    pricerange: "To £99"
}, {
    name: "Paul &amp; Joe Sister Jumper with Neon Trims",
    fashion: "New Look",
    producttype: "Jersey Tops",
    color: "White",
    brand: "Chi Chi London",
    size: "UK 18",
    pricerange: "To £99"
}, {
    name: "Only Busted Knee Jean",
    fashion: "Casual Style",
    producttype: "Dresses",
    color: "Blue",
    brand: "New Balance",
    size: "UK 2",
    pricerange: "£100 - £299"
}, {
    name: "Boyfriend T-shirt with Bohemian Print",
    fashion: "Classical style",
    producttype: "Jersey Tops",
    color: "Black",
    brand: "Adidas",
    size: "UK 20S",
    pricerange: "To £99"
}];

function hideAllItems() {
    let personCards = document.querySelectorAll(".person_card");
    for (let i = 0; i < personCards.length; i++) {
        personCards[i].style.display = "none";
    }
}

function filterItems(key, value) {
    let filteredItems = new Array();
    for (let i = 0; i < items.length; i++) {
        if (items[i][key] === value) {
            filteredItems.push(items[i]);
        }
    }
    console.log(filteredItems)
    hideAllItems();
    let cardNames = document.querySelectorAll(".card_name");
    for (let i = 0; i < filteredItems.length; i++) {
        for (let j = 0; j < cardNames.length; j++) {
            if (filteredItems[i].name === cardNames[j].innerHTML) {
                cardNames[j].parentNode.style.display = "block";
            }
        }
    }
}

function displayAllItems() {
    let personCards = document.querySelectorAll(".person_card");
    for (let i = 0; i < personCards.length; i++) {
        personCards[i].style.display = "block";
    }
}

// Desktop version
function reset(elem) {
    elem.children[0].style.padding = "20px";
    elem.querySelector(".dropbtn-name").style.font = "16px/1 'OpenSans Bold', sans-serif"
    elem.style.backgroundColor = "#fff";
    elem.children[0].lastElementChild.innerHTML = "";
    if (elem.querySelector(".selected-filter")) {
        elem.querySelector(".selected-filter").style.backgroundColor = "#fff";
        elem.querySelector(".selected-filter").style.color = "#000";
    }
}

let dropdown_menu = document.querySelector(".dropdown-menu"),
    dropdown = dropdown_menu.querySelectorAll(".dropdown");
for (let i = 0; i < dropdown.length; i++) {
    let target, prevTarget;
    dropdown[i].addEventListener("click", function (e) {
        for (let i = 0; i < dropdown.length; i++) {
            reset(dropdown[i])
        }

        if (prevTarget) prevTarget.classList.remove("selected-filter");
        if (target) target.style = "";
        target = e.target;
        prevTarget = target;

        if (target.parentNode.className === "dropdown-content") {
            // Styling
            target.style.backgroundColor = "rgb(229,229,229)";
            target.style.color = "rgb(241,74,88)";
            target.classList.add("selected-filter");
            if (target.innerHTML !== "Not Selected") {
                // Filtering
                let key = this.querySelector(".dropbtn-name").innerHTML.trim().split(" ").join("").toLowerCase();
                let value = target.textContent.trim();
                filterItems(key, value);
                // Styling
                this.children[0].style.padding = "10px 20px";
                this.querySelector(".dropbtn-name").style.font = "12px/1 'Roboto Bold', sans-serif"
                this.style.backgroundColor = "#e5e5e5";
                this.children[0].lastElementChild.innerHTML = target.textContent;
            } else {
                displayAllItems();
                reset(this);
            }
        }
    });
}


// Tablet and mobile versions
let dropdown_titles = document.querySelector(".dropdown-menu-titles"),
    dropdown_content = document.querySelector(".dropdown-content-tablet"),
    close = document.querySelector(".fa-times"),
    open = document.querySelector(".fa-angle-down");

dropdown_titles.addEventListener("click", function (e) {
    open.classList.toggle("show");
    close.classList.toggle("show");
    dropdown_content.classList.toggle("show");
});

let prevTarget, titleElem, titlesText = [];
let titles = dropdown_titles.querySelectorAll(".dropdown-menu-title");

(function getTitles() {
    for (let i = 0; i < titles.length; i++) {
        titlesText.push(titles[i].innerHTML);
    }
})();

function setTitles() {
    for (let i = 0; i < titles.length; i++) {
        titles[i].innerHTML = titlesText[i];
        titles[i].style.color = "rgb(0,0,0)";
    }
}

dropdown_content.addEventListener("click", function (e) {
    if (prevTarget) {
        prevTarget.style.color = "rgb(168,168,168)";
        prevTarget.parentNode.children[0].style.color = "rgb(0,0,0)";
    }

    let target;
    target = e.target;
    prevTarget = target;
    if (target.parentNode.classList.contains("dropdown-content-list-items")) {
        if (target.innerHTML === "Not selected") {
            setTitles();
            displayAllItems();
        } else {
            // Filtering
            let key = target.parentNode.parentNode.children[0].innerHTML.trim().split(" ").join("").toLowerCase();
            let value = target.textContent.trim();
            filterItems(key, value);
            console.log(key, "  ", value)
            // Styling
            setTitles();
            let selectedClass = target.parentNode.parentNode.classList[1];
            target.style.color = "rgb(241,74,88)";
            target.parentNode.children[0].style.color = "rgb(168,168,168)";
            titleElem = dropdown_titles.querySelector(".dropdown-menu-title-" + selectedClass);
            titleElem.innerHTML = target.innerHTML;
            titleElem.style.color = "rgb(241,74,88)";
        }

        open.classList.toggle("show");
        close.classList.toggle("show");
        dropdown_content.classList.toggle("show");
    }
});