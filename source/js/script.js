//@@include('sliders.js');
//@@include('app/dynamic_adapt.js');
//@@include('app/spoller.js');
//@@include('app/inputmask.js');


const body = document.body;
// Функция для проверки поддерживает ли браузер формат изображений .webp
function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
    if (support == true) {
        document.querySelector('html').classList.add('webp');
    } else {
        document.querySelector('html').classList.add('no-webp');
    }
});
//  \\\


// Функция для проверки на мобильные устрайства
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if (isMobile.any()) {
    document.querySelector('html').classList.add('_touch');
}
// \\\\ Функция для проверки на мобильные устрайства



// buger
let html = document.querySelector('html');
let burgerBtns = [...document.querySelectorAll(".burger")];
for (const burgerBtn of burgerBtns) {
    burgerBtn.addEventListener("click", function () {
        body.classList.toggle("active");
        html.classList.toggle("active");
    });
}
//  \\\



window.onload = function () {

    document.addEventListener("click", ducumentActions);

    function ducumentActions(e) {
        const targerElement = e.target;
        if (window.innerWidth > 600 && isMobile.any()) {
            if (targerElement.classList.contains('menu__arrow')) {
                targerElement.closest('.menu__item').classList.toggle('_hover');
            }
            if (!targerElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
                let targerElementHover = document.querySelectorAll('.menu__item._hover');
                var targerElementHoverArray = Array.prototype.slice.call(targerElementHover);
                for (var i = 0; i < targerElementHoverArray.length;) {
                    targerElementHoverArray[i].classList.remove('_hover');
                    ++i
                }
            }

        }
    }

}

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    if (cleaned.length >= 10) var match = cleaned.match(/^(\d{1,10})(\d{9})$/);
    if (match) return match[2]
    return null
}

let Inputphone = document.querySelector('#phone');
let pastedValue = '+998'
Inputmask("+\\9\\98(99) 999-99-99", {
    // placeholder: '',
    clearIncomplete: true,
    clearMaskOnLostFocus: true,
    showMaskOnHover: false,
    onBeforePaste: function (pastedValue, opts) {
        return formatPhoneNumber(pastedValue);
    }
    // onincomplete: function () {

    // }
}).mask(Inputphone);