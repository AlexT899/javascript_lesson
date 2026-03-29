const title = document.getElementsByTagName("h1");

const calculateButton = document.getElementsByClassName("handler_btn");

const resetButton = document.getElementsByClassName("handler_btn");

const addButton = document.querySelector(".screen-btn");

const otherItemsPercent = document.querySelectorAll(".other-items.percent");

const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputType = document.querySelector('.rollback  input[type="range"]');

const span = document.querySelector(".rollback .range-value");

const allInput = document.getElementsByClassName("total-input");
const firstInput = allInput[0];
const firstInput = allInput[0];
const secondInput = allInput[1];
const thirdInput = allInput[2];
const fourthInput = allInput[3];
const fifthInput = allInput[4];

for (let i = 0; i < allInput.length; i++) {
  console.log(allInput[i]);
}

let screen = document.querySelectorAll(".screen");

console.log(title[0]);
console.log(calculateButton[0]);
console.log(resetButton[1]);
console.log(addButton);
console.log(otherItemsPercent);
console.log(otherItemsNumber);
console.log(inputType);
console.log(span);
console.log(allInput);
console.log(screen);
