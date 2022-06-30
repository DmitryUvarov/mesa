//@@include('sliders.js');
//@@include('app/dynamic_adapt.js');


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





// buger
let burgerBtns = [...document.querySelectorAll(".burger")];
for (const burgerBtn of burgerBtns) {
    burgerBtn.addEventListener("click", function () {
        body.classList.toggle("active");
    });
}
//  \\\
