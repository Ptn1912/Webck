window.addEventListener('load', function() {
    var sliders = Array.from(document.querySelectorAll('.logo-display--slider'));
    for (let slider of sliders) {
        var settings = {
            slidesPerView: 'auto',
            spaceBetween: 12,
            allowTouchMove: false,
            loop: true,
            speed: 2500,
            loopedSlides: 12,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            breakpoints: {
                768: {
                    spaceBetween: 24,
                },
            },
        };
        new Swiper(slider.querySelector('.logo-display__swiper--top'), settings);
        new Swiper(slider.querySelector('.logo-display__swiper--bottom'), {
            ...settings,
            autoplay: {
                ...settings.autoplay,
                reverseDirection: true,
            },
        });
    }
});