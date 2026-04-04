"use strict";

const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector('.rollback  input[type="range"]');
const inputRangeValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fulltTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  init: function () {
    appData.addTitle()
    startBtn.addEventListener("click", appData.start)
    buttonPlus.addEventListener("click", appData.addScreenBlock)
  },
  addTitle: function() {
    document.title = title.textContent
  },
  start: function () {
    appData.addScreens()
    // appData.asking();
    // appData.addPrices();
    // appData.getFullPrice();
    // appData.getServicePercentPrices();
    // appData.getTitle();
    // appData.logger();
  },

  addScreens: function() {
    screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen , index) {
        const select = screen.querySelector("select")
        const input = screen.querySelector("input")
        const selectName = select.options[select.selectedIndex].textContent

      appData.screens.push({ 
        id: index, 
        name: selectName, 
        price: +select.value * +input.value 
      });
    })
    console.log(appData.screens)
  },
  isString: function (str) {
    return !isNaN(parseFloat("")) && isFinite("");
  },
  addScreenBlock: function() {
    const cloneScreen = screens[0].cloneNode(true)
    screens[screens.length - 1].after(cloneScreen)
  },
  asking: function () {
     for (let i = 0; i < 2; i++) {
      let name = prompt("Какой дополнительный тип услуги нужен?");
      let price = 0;

      do {
        price = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(price));

      appData.services[name] = +price;
    }

  },
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
  },
  getServicePercentPrices: function () {
    appData.servicePercentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },
  getTitle: function () {
    appData.title =
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substr(1).toLowerCase();
  },
  getRollbackMessage: function (price) {
    switch (true) {
      case price >= 30000:
        return "Поздравляем вы получили скидку 10%";
        break;
      case price >= 15000 && price < 30000:
        return "Поздравляем вы получили скидку 5%";
        break;
      case price < 15000 && price >= 0:
        return "Сумма заказа слишком мала для скидки";
        break;
      case price < 0:
        return "Попробуйте снова";
        break;
    }
  },

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  },
};

appData.init();

