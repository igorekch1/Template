let slideIndex = 1;

let slideInterval;

function show() {
    slideInterval = setInterval(function(){
        showSlides(++slideIndex)
    }, 2000);
}

function addSlide(n) {
    showSlides(slideIndex += n);
    clearInterval(slideInterval);
    show();
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    clearInterval(slideInterval);
    show();
}

function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(".slider__block");
    let dots = document.querySelectorAll(".slider-dot");    

    if (n > slides.length) slideIndex = 1;

    if (n < 1) slideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("current-dot");
    }
    console.log(dots[slideIndex-1])
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("current-dot");
}

window.onload = function(e) {
    show();
}
