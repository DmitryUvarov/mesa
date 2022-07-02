
if (document.querySelector('.smal-product-slider')) {
    var smalProductSlider = new Swiper('.smal-product-slider', {
        direction: getDirection(),
        observer: true,
        observerParents: true,
        watchOverflow: true,
        speed: 800,
        slidesPerView: 3,

        // navigation: {
        //     nextEl: ".smal-product-slider .button-next",
        //     prevEl: ".smal-product-slider .button-prev",
        // },
        // Dotts
        // pagination: {
        //     el: '.swiper-paginations',
        //     clickable: true,
        // },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 'auto',
                spaceBetween: 15,

            },
            600: {
                slidesPerView: 3,
                spaceBetween: 17,
            },
        }
    });
}

function getDirection() {
    var windowWidth = window.innerWidth;
    var direction = windowWidth <= 600 ? 'horizontal' : 'vertical';
    return direction;
}

if (document.querySelector('.product-slider')) {
    var ProductSlider = new Swiper('.product-slider', {
        observer: true,
        observerParents: true,
        watchOverflow: true,
        speed: 800,
        slidesPerView: 1,
        effect: "fade",

        thumbs: {
            swiper: smalProductSlider,
        },
        // Dotts
        // pagination: {
        //     el: '.swiper-paginations',
        //     clickable: true,
        // },
        // breakpoints: {
        //     // when window width is >= 320px
        //     320: {
        //         slidesPerView: 1.2,
        //     },
        //     500: {
        //         slidesPerView: 3,

        //     },
        //     // when window width is >= 768px
        //     768: {
        //         slidesPerView: 3,
        //     },
        //     // when window width is >= 992px
        //     992: {
        //         slidesPerView: 4,
        //         spaceBetween: 0
        //     }
        // }
    });
}

// var swiperBottomScrollbarFull = new Swiper('.swiper-bottom-scrollbar-full', {
//     allowTouchMove: true,
//     slidesPerView: 'auto',
//     grabCursor: true,
//     preventClicks: true,
//     spaceBetween: 30,
//     keyboardControl: true,
//     speed: 1000,
//     pagination: {
//         el: null
//     },
//     scrollbar: {
//         el: '.swiper-scrollbar',
//         draggable: true,
//         hide: false,
//         snapOnRelease: true
//     },
//     mousewheel: {
//         enable: true
//     },
//     keyboard: {
//         enabled: true
//     },
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev'
//     },
//     breakpoints: {
//         767: {
//             scrollbar: {
//                 hide: true
//             },
//             spaceBetween: 0,
//             autoHeight: true,
//             centeredSlides: false,
//             slidesOffsetAfter: 85
//         }
//     },
//     on: {
//         resize: function () {
//             var windowWidth = $(window).width();
//             if(windowWidth <= 767){
//                     swiperBottomScrollbarFull.direction('vertical');
//                     swiperBottomScrollbarFull.detachEvents();
//             }else{
//                     swiperBottomScrollbarFull.direction('horizontal');
//                     swiperBottomScrollbarFull.attachEvents();
//             }
//             swiperBottomScrollbarFull.update();
//         }
//     }
// });