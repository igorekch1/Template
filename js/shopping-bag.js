let bagCounter = document.querySelector("#bag_counter"),
    bagPrice = document.querySelector("#bag_price"),
    main = document.querySelector("main"),
    shoppingBag = new Array();

main.addEventListener("click", function (e) {
    let target = e.target;

    function destroyBlock(block) {
        block.parentNode.removeChild(block);
    };

    function findItem(arr, name, size, color) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === name &&
                arr[i].size === size &&
                arr[i].color === color) {
                return i;
            }
        }
        return null;
    };

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
        };

        return elem;
    };

    function createCard() {

    }

    //When user clicks on "Add to bag"
    if (target.classList.contains("section__item_block_info_button") ||
        target.classList.contains("section__item_block_info_button_text")) {
        //getting characteristics of the item
        let name = this.querySelector("#item-name").innerHTML.trim();
        let price = this.querySelector("#item-price").innerHTML.trim();
        let size = this.querySelector(".section__item_block_info_options_button_size.selected");
        let color = this.querySelector(".section__item_block_info_options_button_color.selected");
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
                    quantity: 1
                };
                shoppingBag.push(item);
            };

            bagPrice.innerHTML = (Number(price) + Number(bagPrice.innerHTML)).toFixed(2);
            bagCounter.innerHTML = Number(bagCounter.innerHTML) + 1;
            console.log(shoppingBag)
            localStorage.setItem("shoppingBag", JSON.stringify(shoppingBag));
            // localStorage.setItem("bag_price", bagPrice.innerHTML);
            // localStorage.setItem("bag_counter", bagCounter.innerHTML);
            alert("Added")
        } else alert("Enter all options");
        //inserting price and counter in our page
    }

    // When user clicks on "Buy now"
    if (target.classList.contains("section__shoppingBag_button")) {
        console.log("BOUGHT")
        let totalPrice = document.querySelector("#total-price");
        bagPrice.innerHTML = 0;
        totalPrice.innerHTML = 0;
        bagCounter.innerHTML = 0;
        // localStorage.setItem("bag_price", 0);
        // localStorage.setItem("bag_counter", 0);
        // removing all items from the page
        let bagItems = this.querySelector(".section__shoppingBag_people_card");
        destroyBlock(bagItems);
        let sectionHighlight = document.querySelector(".section__shoppingBag_highlight");
        let wrapper = createElem("section", "section__shoppingBag_people_card");
        createElem("div", "empty_bag_text", wrapper, "Thank you for your purchase");
        sectionHighlight.parentNode.insertBefore(wrapper, sectionHighlight);
    };
    // When user clicks on "Empty bag"
    if (target.classList.contains("clear_bag")) {
        console.log("CLEARED")
        let totalPrice = document.querySelector("#total-price");
        bagPrice.innerHTML = 0;
        totalPrice.innerHTML = 0;
        bagCounter.innerHTML = 0;
        // localStorage.setItem("bag_price", 0);
        // localStorage.setItem("bag_counter", 0);
        // removing all items from the page
        let bagItems = this.querySelector(".section__shoppingBag_people_card");
        destroyBlock(bagItems);
        let sectionHighlight = document.querySelector(".section__shoppingBag_highlight");
        let wrapper = createElem("section", "section__shoppingBag_people_card");
        createElem("div", "empty_bag_text", wrapper, "Your shopping bag is empty. Use Catalog to add new items");
        sectionHighlight.parentNode.insertBefore(wrapper, sectionHighlight);
    };
    // When user clicks on "Remove item"
    if (target.classList.contains("section__shoppingBag_block_remove_item")) {
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
        if (bagCounter.innerHTML == "0") {
            let sectionHighlight = document.querySelector(".section__shoppingBag_highlight");
            let wrapper = createElem("section", "section__shoppingBag_people_card");
            createElem("div", "empty_bag_text", wrapper, "Your shopping bag is empty. Use Catalog to add new items");
            sectionHighlight.parentNode.insertBefore(wrapper, sectionHighlight);
        };
    };
});

// window.addEventListener("load", function (e) {
//     if (localStorage.getItem("bag_price")) {
//         bagPrice.innerHTML = localStorage.getItem("bag_price");
//     } else {
//         bagPrice.innerHTML = "1640.50";
//     }
//     if (localStorage.getItem("bag_price")) {
//         bagCounter.innerHTML = localStorage.getItem("bag_counter");
//     } else {
//         bagCounter.innerHTML = "4";
//     }
// });