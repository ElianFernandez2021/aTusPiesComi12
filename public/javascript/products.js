document.addEventListener("DOMContentLoaded", () => {
    const elementosCarousel = document.querySelectorAll(".carousel")
    M.Carousel.init(elementosCarousel, {
        duration:150
    });
});