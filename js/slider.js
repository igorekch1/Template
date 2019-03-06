let slideIndex = 1;
let x = 1;

// let show = setInterval(function(){
//     addSlide(x)
// }, 1000);

function addSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(".slider__block");
    let dots = document.querySelectorAll(".slider-dot");    

    // console.log(slides[x], x)
    if (n > slides.length) slideIndex = 1;
    // if (x > slides.length) {
        // slideIndex = 1;
        // x = 1;
    // }

    if (n < 1) slideIndex = slides.length;
    // if (x < 1) {
        // slideIndex = slides.length;
    // }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("current-dot");
    }
    
    // slides[x-1].style.display = "block";
    // dots[x-1].classList.add("current-dot");
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("current-dot");
    x++
}


