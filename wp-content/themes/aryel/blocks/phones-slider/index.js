function playVideo(slider, video) {
    if (!video || !slider) {
        return;
    }
    if (slider.querySelector('video.started')) {
        slider.querySelector('video.started').pause();
        slider.querySelector('video.started').classList.remove('started');
    }
    video.play();
    video.classList.add('started');
}

window.addEventListener('load', function() {
    var sliders = Array.from(document.querySelectorAll('.phones-slider'));
    for (let slider of sliders) {
        new Swiper(slider.querySelector('.swiper'), {
            slidesPerView: 1.6,
            spaceBetween: 24,
            loop: true,
            centeredSlides: true,
            navigation: {
                nextEl: slider.querySelector('.phones-slider__control--next'),
                prevEl: slider.querySelector('.phones-slider__control--prev'),
            },
            on: {
                slideChangeTransitionEnd: function(instance) {
                    playVideo(instance.el, instance.el.querySelector('.swiper-slide-active video'));
                },
            },
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 80,
                },
            },
        });
    }
});