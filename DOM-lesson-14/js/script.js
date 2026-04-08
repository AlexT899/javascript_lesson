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
let checkbox = document.querySelectorAll(".main-controls__views.element")[1];
let screens = document.querySelectorAll(".screen");
let count = 0;

const elementsToDisable = checkbox.querySelectorAll(
  "input[type='checkbox'] , select"
);

const cmsCheckbox = document.querySelector("#cms-open");
const hiddenCmsVariant = document.querySelector(".hidden-cms-variants");
const selectCms = hiddenCmsVariant.querySelector("select");
const inputCmsOther = hiddenCmsVariant.querySelector(".main-controls__input");
const inputCmsOtherInput = hiddenCmsVariant.querySelector(
  ".main-controls__input input"
);
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
    this.addTitle();
    startBtn.addEventListener("click", this.handleStart.bind(this));
    resetBtn.addEventListener("click", this.handleReset.bind(this));
    buttonPlus.addEventListener("click", this.addScreenBlock.bind(this));
    screenQty.addEventListener("input", this.validateForm.bind(this));
    inputRange.addEventListener("input", this.rangeForm.bind(this));
    cmsCheckbox.addEventListener("change", this.toggleCms.bind(this));
    selectCms.addEventListener("change", this.openHiddenInput.bind(this));
  },

  openHiddenInput: function () {
    if (selectCms.value === "other") {
      inputCmsOther.style.display = "block";
    } else {
      inputCmsOther.style.display = "none";
    }
  },
  toggleCms: function () {
    if (cmsCheckbox.checked) {
      hiddenCmsVariant.style.display = "flex";
    } else {
      hiddenCmsVariant.style.display = "none";
    }
  },

  handleStart: function () {
    elementsToDisable.forEach((el) => {
      el.disabled = true;
    });

    cmsCheckbox.disabled = true;

    startBtn.style.display = "none";
    resetBtn.style.display = "inline-block";

    this.start(); // запускаем расчёт
  },

  handleReset: function () {
    elementsToDisable.forEach((el) => {
      el.disabled = false;
    });

    cmsCheckbox.disabled = false;

    startBtn.style.display = "inline-block";
    resetBtn.style.display = "none";

    this.reset(); // сброс данных и формы
  },

  reset: function () {
    // 1. Сброс данных
    this.screens = [];
    this.screensCount = 0;
    this.screenPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};

    // 2. Сброс экранов
    screens = document.querySelectorAll(".screen");

    screens.forEach((screen, index) => {
      if (index > 0) {
        screen.remove();
      } else {
        screen.querySelector("select").selectedIndex = 0;
        screen.querySelector("input").value = "";
      }
    });

    // 3. Сброс услуг (checkbox + input)
    otherItemsPercent.forEach((item) => {
      item.querySelector("input[type=checkbox]").checked = false;
    });

    otherItemsNumber.forEach((item) => {
      item.querySelector("input[type=checkbox]").checked = false;
    });

    // 4. Сброс range
    inputRange.value = 0;
    inputRangeValue.textContent = "0%";
    this.rollback = 0;

    // 5. Очистка результатов
    total.value = "";
    totalCount.value = "";
    totalCountOther.value = "";
    fulltTotalCount.value = "";
    totalCountRollback.value = "";

    // 6. Кнопка Start снова неактивна
    startBtn.disabled = true;
    startBtn.style.backgroundColor = "#A52A2A";

    console.clear();
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
    this.rollback = +inputRange.value;
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.logger();
    this.showResult();
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCount.value = this.screensCount;
    totalCountOther.value = this.servicePercentPrice + this.servicePricesNumber;
    fulltTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },
  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
    console.log(this.screens);
  },
  isString: (str) => {
    return !isNaN(parseFloat("")) && isFinite("");
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    cloneScreen.querySelector("input").value = "";
    screens[screens.length - 1].after(cloneScreen); // Он вставляет указанный элемент сразу после текущего элемента в HTML.
  },

  addPrices: function () {
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    for (let screen of this.screens) {
      this.screensCount += +screen.count;
    }

    this.fullPrice =
      +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    this.servicePercentPrice =
      this.fullPrice - this.fullPrice * (this.rollback / 100);
  },

  logger: function () {},
};

appData.init();
