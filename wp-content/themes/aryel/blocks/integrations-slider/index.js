window.addEventListener('load', function() {
    var sliders = Array.from(document.querySelectorAll('.integrations-slider'));
    for (let slider of sliders) {
        new Swiper(slider.querySelector('.integrations-slider__swiper'), {
            slidesPerView: 'auto',
            spaceBetween: 12,
            loop: true,
            loopedSlides: 12,
            centeredSlides: true,
            navigation: {
                nextEl: slider.querySelector('.integrations-slider__control--next'),
                prevEl: slider.querySelector('.integrations-slider__control--prev'),
            },
            breakpoints: {
                768: {
                    spaceBetween: 24,
                },
            },
        });
    }
});