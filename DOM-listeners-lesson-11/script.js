const e_btn = document.querySelector("#e_btn");
e_btn.style.display = "none";

const btn = document.querySelector("#btn");
const input = document.querySelector("#text");
const square = document.querySelector("#square");
const range = document.querySelector("#range");
const range_span = document.querySelector("#range-span");
let circle = document.body.querySelector("#circle");

let backgroundColorChgange = function () {
  square.style.backgroundColor = input.value;
};

btn.addEventListener("click", backgroundColorChgange);

let circleSize = function () {
  let value = range.value;
  circle.style.width = value + "%";
  circle.style.height = value + "%";
  range_span.innerText = value + "%";
};
range.addEventListener("input", circleSize);
