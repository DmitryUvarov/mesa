const tabsBtn = document.querySelectorAll(".tabs__nav-btn");
const tabsItems = document.querySelectorAll(".tabs__item");

tabsBtn.forEach(onTabClick);

function onTabClick(item) {
    item.addEventListener("click", function () {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute("data-tab");
        let currentTab = document.querySelector(tabId);

        if (!currentBtn.classList.contains('_active')) {
            tabsBtn.forEach(function (item) {
                item.classList.remove('_active');
            });

            tabsItems.forEach(function (item) {
                item.classList.remove('_active');
            });

            currentBtn.classList.add('_active');
            currentTab.classList.add('_active');
        }
    });
}

document.querySelector('.tabs__nav-btn');