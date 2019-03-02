let photosWrapper = document.querySelector(".section__item_block_photos");

photosWrapper.addEventListener("click", function (e) {
    let target = e.target;
    let current = this.querySelector(".active"); // current active photo
    
    function getImageSrc(img) {
        return img.src.split("/")[img.src.split("/").length - 1];
    }    
    
    if (target.classList.contains("section__item_photo_background")) {
        current.classList.remove("active"); // resetting background for previous photo
        let mainPhoto = this.querySelector(".main_photo");
        mainPhoto.src = "./img/item/" + getImageSrc(target.parentNode.children[0]); //setting the src of main photo
        target.classList.add("active"); // setting background for current photo
    }
});