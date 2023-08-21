function sideScroll(element, direction, speed, distance, step) {
    scrollAmount = 0
    let slideTimer = setInterval(function () {
        if (direction == "left") {
            element.scrollLeft -= step
        } else {
            element.scrollLeft += step
        }
        scrollAmount += step
        if (scrollAmount >= distance) {
            window.clearInterval(slideTimer)
        }
    }, speed)
}
//upperbox=======================================1
let fowardButton = document.getElementById("right")
fowardButton.onclick = function () {
    let conatiner = document.getElementById("box")
    sideScroll(conatiner, "right", 20, 100, 10)
}

let backwardButton = document.getElementById("left")
backwardButton.onclick = function () {
    let conatiner = document.getElementById("box")
    sideScroll(conatiner, "left", 20, 100, 10)
}
//=================================================2
let minEl = document.getElementById("btn21")
minEl.onclick = function () {
    let conatiner = document.getElementById("box2")
    sideScroll(conatiner, "right", 20, 200, 10)
}

let plusEl = document.getElementById("btn12")
plusEl.onclick = function () {
    let conatiner = document.getElementById("box2")
    sideScroll(conatiner, "left", 20, 200, 10)
}
//==================================================3
let bb2El = document.getElementById("bb2")
bb2El.onclick = function () {
    let conatiner = document.getElementById("box3")
    sideScroll(conatiner, "right", 20, 200, 10)
}

let bb1El = document.getElementById("bb1")
bb1El.onclick = function () {
    let conatiner = document.getElementById("box3")
    sideScroll(conatiner, "left", 20, 200, 10)
}
//slideshow===========================================

//================================================slideshow======================================
const sliderContainer = document.querySelector('.slider-container');
const images = ['https://d1csarkz8obe9u.cloudfront.net/posterpreviews/shoe-cover-promotion-design-template-3342116f18fc86233f782b63f4c40430_screen.jpg?ts=1619586236', 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/nike-shoes-facebook-ad-design-template-d6596b25a6b7653604b53b589c4df176_screen.jpg?ts=1613405853', 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/nike-shoes-facebook-ad-design-template-3feddc44f949d144553f31630a701ac7_screen.jpg?ts=1613411918']
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

window.onload = () => {
    const styles = getComputedStyle(sliderContainer);
    const currentAnimations = styles.animation;

    // if (currentAnimations.includes('blink')) {
    //     sliderContainer.style.animation = currentAnimations.replace('blink', '').trim();
    // }

    console.log(currentAnimations)
}

let currentIndex = 0;

function nextSlide() {
    if (currentIndex == images.length - 1) {
        currentIndex = 0
        sliderContainer.style.backgroundImage = `url(${images[currentIndex]})`
    } else {
        currentIndex++
        sliderContainer.style.backgroundImage = `url(${images[currentIndex]})`
    }
}

function prevSlide() {
    if (currentIndex == 0) {
        return;
    } else {
        currentIndex--
        sliderContainer.style.backgroundImage = `url(${images[currentIndex]})`
    }
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

setInterval(nextSlide, 2000)

