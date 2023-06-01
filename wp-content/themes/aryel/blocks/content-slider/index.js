window.addEventListener('load', function() {
    var sliders = Array.from(document.querySelectorAll('.content-slider'));
    for (let slider of sliders) {
        new Swiper(slider.querySelector('.swiper'), {
            slidesPerView: 1.6,
            spaceBetween: 16,
            loop: true,
            loopedSlides: 4,
            centeredSlides: true,
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 24,
                },
            },
        });
    }
});