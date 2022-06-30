
if (document.querySelector('.numbers-slider')) {
    new Swiper('.numbers-slider', {
        observer: true,
        observerParents: true,
        watchOverflow: true,
        speed: 800,

        // Dotts
        pagination: {
            el: '.swiper-paginations',
            clickable: true,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1.2,
            },
            500: {
                slidesPerView: 3,

            },
            // when window width is >= 768px
            768: {
                slidesPerView: 3,
            },
            // when window width is >= 992px
            992: {
                slidesPerView: 4,
                spaceBetween: 0
            }
        }
    });
}