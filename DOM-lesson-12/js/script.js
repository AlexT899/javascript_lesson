"use strict";

const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector('.rollback  input[type="range"]');
const inputRangeValue = document.querySelector(".rollback span.range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fulltTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

let screenQty = document.querySelectorAll(".main-controls__views.element")[0];
let screens = document.querySelectorAll(".screen");
let count = 0;
const appData = {
  title: "",
  screens: [],
  screensCount: 0,
  screenPrice: 0,
  adaptive: true,
  rollback: inputRange,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  init: function () {
    appData.addTitle();
    startBtn.addEventListener("click", appData.start);
    buttonPlus.addEventListener("click", appData.addScreenBlock);
    screenQty.addEventListener("input", appData.validateForm);
    inputRange.addEventListener("input", appData.rangeForm);
  },
  reset: function () {
    appData.screens = [];
    appData.screensCount = 0;
    appData.screenPrice = 0;
    appData.servicePricesPercent = 0;
    appData.servicePricesNumber = 0;
    appData.fullPrice = 0;
    appData.servicePercentPrice = 0;
    appData.servicesPercent = {};
    appData.servicesNumber = {};
  },
  validateForm: function () {
    screens = document.querySelectorAll(".screen");

    for (let screen of screens) {
      let select = screen.querySelector("select");
      let input = screen.querySelector("input");

      if (select.value === "" || input.value === "") {
        startBtn.disabled = true;
        startBtn.style.backgroundColor = "#A52A2A";
        return;
      }
    }
    startBtn.disabled = false;
    startBtn.style.backgroundColor = "green";
  },
  rangeForm: function () {
    inputRangeValue.textContent = inputRange.value + "%";
    appData.rollback = +inputRange.value;
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    appData.reset();
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    // appData.logger();
    appData.showResult();
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCount.value = appData.screensCount;
    totalCountOther.value =
      appData.servicePercentPrice + appData.servicePricesNumber;
    fulltTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
  },
  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
    console.log(appData.screens);
  },
  isString: function (str) {
    return !isNaN(parseFloat("")) && isFinite("");
  },
  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    appData.validateScreen();
  },

  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    for (let screen of appData.screens) {
      appData.screensCount += +screen.count;
    }

    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePricesNumber +
      appData.servicePricesPercent;

    appData.servicePercentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },

  // getRollbackMessage: function (price) {
  //   switch (true) {
  //     case price >= 30000:
  //       return "Поздравляем вы получили скидку 10%";
  //       break;
  //     case price >= 15000 && price < 30000:
  //       return "Поздравляем вы получили скидку 5%";
  //       break;
  //     case price < 15000 && price >= 0:
  //       return "Сумма заказа слишком мала для скидки";
  //       break;
  //     case price < 0:
  //       return "Попробуйте снова";
  //       break;
  //   }
  // },

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  },
};

appData.init();
