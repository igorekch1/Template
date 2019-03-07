let bagCounter = document.querySelector("#bag_counter"),
    bagPrice = document.querySelector("#bag_price"),
    main = document.querySelector("main"),
    shoppingBag = new Array();

function createElem(tag, className, container, text) {
    let elem = document.createElement(tag);
    elem.className = className;
    // Check if we have text to insert
    if (text) {
        elem.innerHTML = text
    }
    // Check if we have container to push in
    if (container) {
        container.appendChild(elem);
    } else {
        document.body.appendChild(elem)
    }

    return elem;
}

main.addEventListener("click", function (e) {
    let target = e.target;

    function destroyBlock(block) {
        block.parentNode.removeChild(block);
    }

    function findItem(arr, name, size, color) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === name &&
                arr[i].size === size &&
                arr[i].color === color) {
                return i;
            }
        }
        return null;
    }

    //When user clicks on "Add to bag"
    if (target.classList.contains("section__item_block_info_button") ||
        target.classList.contains("section__item_block_info_button_text")) {
        //getting data of the item
        let name = this.querySelector("#item-name").innerHTML.trim();
        let price = this.querySelector("#item-price").innerHTML.trim();
        let size = this.querySelector(".section__item_block_info_options_button_size.selected");
        let color = this.querySelector(".section__item_block_info_options_button_color.selected");
        let imagePath = this.querySelector(".main_photo").src.split("/");
        let image = imagePath[imagePath.length - 1].split(".")[0];
        let location = window.location.href.split("/")[window.location.href.split("/").length - 1];
        //check if user has chosen siza and color
        if (!!size && !!color) {
            // If such item already exists
            let itemIndex = findItem(shoppingBag, name, size.innerHTML, color.innerHTML);
            if (itemIndex !== null) {
                shoppingBag[itemIndex].quantity = shoppingBag[itemIndex].quantity + 1;
            } else {
                let item = {
                    name: name,
                    price: price,
                    size: size.innerHTML.trim(),
                    color: color.innerHTML.trim(),
                    quantity: 1,
                    img: "./img/item/" + image + "-bag.png",
                    imgLocation: location
                }
                shoppingBag.push(item);
            }

            bagPrice.innerHTML = (Number(price) + Number(bagPrice.innerHTML)).toFixed(2);
            bagCounter.innerHTML = Number(bagCounter.innerHTML) + 1;
            localStorage.setItem("shoppingBag", JSON.stringify(shoppingBag));
            localStorage.setItem("bag_price", bagPrice.innerHTML);
            localStorage.setItem("bag_counter", bagCounter.innerHTML);
            alert("Added")
        } else alert("Enter all options");
    }

    // When user clicks on "Buy now"
    if (target.classList.contains("section__shoppingBag_button")) {
        if (bagCounter.innerHTML != "0") {
            // reseting page values
            let totalPrice = document.querySelector("#total-price");
            bagPrice.innerHTML = 0;
            totalPrice.innerHTML = 0;
            bagCounter.innerHTML = 0;
            //removing from storage
            localStorage.removeItem("bag_price");
            localStorage.removeItem("bag_counter");
            localStorage.removeItem("shoppingBag");
            // removing all items from the page
            let bagItems = this.querySelector(".section__shoppingBag_people_card");
            destroyBlock(bagItems);
            let sectionHighlight = document.querySelector(".section__shoppingBag_highlight");
            let wrapper = createElem("section", "section__shoppingBag_people_card");
            createElem("div", "empty_bag_text", wrapper, "Thank you for your purchase");
            sectionHighlight.parentNode.insertBefore(wrapper, sectionHighlight);
        } else {
            alert("The bag is empty!!!");
        }
    }
    // When user clicks on "Empty bag"
    if (target.classList.contains("clear_bag")) {
        if (bagCounter.innerHTML != "0") {
            // reseting page values
            let totalPrice = document.querySelector("#total-price");
            bagPrice.innerHTML = 0;
            totalPrice.innerHTML = 0;
            bagCounter.innerHTML = 0;
            //removing from storage
            localStorage.removeItem("bag_price");
            localStorage.removeItem("bag_counter");
            localStorage.removeItem("shoppingBag");
            // removing all items from the page
            let bagItems = this.querySelector(".section__shoppingBag_people_card");
            destroyBlock(bagItems);
            let sectionHighlight = document.querySelector(".section__shoppingBag_highlight");
            let wrapper = createElem("section", "section__shoppingBag_people_card");
            createElem("div", "empty_bag_text", wrapper, "Your shopping bag is empty. Use Catalog to add new items");
            sectionHighlight.parentNode.insertBefore(wrapper, sectionHighlight);
        } else {
            alert ("The bag is already empty!");
        }
    }
    // When user clicks on "Remove item"
    if (target.classList.contains("section__shoppingBag_block_remove_item")) {
        //getting data of the item
        let name = target.parentNode.querySelector(".section__shoppingBag_block_name").innerHTML.trim();
        let price = target.parentNode.querySelector(".card_price_number").innerHTML.trim();
        let size = target.parentNode.querySelector(".card_size_text").innerHTML.trim();
        let color = target.parentNode.querySelector(".card_color_text").innerHTML.trim();
        // removing items from localstorage
        let itemIndex = findItem(shoppingBag, name, size, color);
        if (itemIndex != null) {
            if (shoppingBag[itemIndex].quantity !== 1) {
                shoppingBag[itemIndex].quantity = shoppingBag[itemIndex].quantity - 1;
            } else {
                shoppingBag.splice(itemIndex, 1);
            }
        }
        localStorage.setItem("shoppingBag", JSON.stringify(shoppingBag));

        let totalPrice = document.querySelector("#total-price");
        let itemQuantity = target.parentNode.querySelector(".card_quantity_number");
        let itemPrice = target.parentNode.querySelector(".card_price_number");
        // If quantity of the item == 1 --> destroy this block, else decrease quantity
        if (itemQuantity.innerHTML == "1") {
            destroyBlock(target.parentNode.parentNode);
        } else {
            itemQuantity.innerHTML = Number(itemQuantity.innerHTML) - 1;
        }
        bagPrice.innerHTML = (Number(bagPrice.innerHTML) - Number(itemPrice.innerHTML)).toFixed(2);
        totalPrice.innerHTML = bagPrice.innerHTML;
        bagCounter.innerHTML = Number(bagCounter.innerHTML) - 1;
        localStorage.setItem("bag_price", bagPrice.innerHTML);
        localStorage.setItem("bag_counter", bagCounter.innerHTML);

        if (bagCounter.innerHTML == "0") {
            let sectionHighlight = document.querySelector(".section__shoppingBag_highlight");
            let wrapper = createElem("section", "section__shoppingBag_people_card");
            createElem("div", "empty_bag_text", wrapper, "Your shopping bag is empty. Use Catalog to add new items");
            sectionHighlight.parentNode.insertBefore(wrapper, sectionHighlight);
        }
    }
});

window.addEventListener("load", function (e) {
    if (window.location.pathname.split("/")[window.location.pathname.split("/").length - 1] === "shopping-bag.html") {    
        let shoppingBagItems = JSON.parse(localStorage.getItem("shoppingBag"));
        if (shoppingBagItems) {
            // draw card taking all data from localstorage
            function createCard(arr) {
                for (let i = 0; i < arr.length; i ++) {
                    let itemsWrapper = document.querySelector(".section__shoppingBag_people_card_block");
                    let personCard = createElem("div", "section__shoppingBag_person_card person_card", itemsWrapper);
                    let cardImageWrapper = createElem("div", "person_card_image_wrapper", personCard);
                    let imageLink = createElem("a", "image-link", cardImageWrapper);
                    imageLink.href = "./" + arr[i].imgLocation;
                    let image = createElem("img", "person_card_image", imageLink);
                    image.src = arr[i].img;
                    createElem("div", "person_card_viewItem_background", imageLink);
                    createElem("div", "person_card_viewItem_text", imageLink, "View Item");
                    let cardDescription = createElem("div", "card_description", personCard);
                    createElem("div", "section__shoppingBag_block_name", cardDescription, arr[i].name);
                    let priceBlock = createElem("div", "section__shoppingBag_block_price", cardDescription, "£ ");
                    createElem("span", "card_price_number", priceBlock, arr[i].price);
                    let colorBlock = createElem("div", "card_color", cardDescription, "Price: ");
                    createElem("span", "card_color_text", colorBlock, arr[i].color);
                    let sizeBlock = createElem("div", "card_size", cardDescription, "Size: ");
                    createElem("span", "card_size_text", sizeBlock, arr[i].size);
                    let quantityBlock = createElem("div", "card_quantity", cardDescription, "Quantity: ");
                    createElem("span", "card_quantity_number", quantityBlock, arr[i].quantity);
                    createElem("button", "section__shoppingBag_block_remove_item", cardDescription, "Remove item");
                }
            }
            createCard(shoppingBagItems);
        }
    }
    // loading bought items in our array
    if (localStorage.getItem("shoppingBag")) shoppingBag = Array.from(JSON.parse(localStorage.getItem("shoppingBag")));
    if (localStorage.getItem("bag_price")) bagPrice.innerHTML = localStorage.getItem("bag_price");
    if (localStorage.getItem("bag_counter")) bagCounter.innerHTML = localStorage.getItem("bag_counter");
});