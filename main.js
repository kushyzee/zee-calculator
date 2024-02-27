const display = document.querySelector(".output p");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

let firstNum = null;
let secondNum = null;
let operatorSign = null;

const add = (firstNum, secondNum) => {
  return firstNum + secondNum;
};

const subtract = (firstNum, secondNum) => {
  return firstNum - secondNum;
};

const multiply = (firstNum, secondNum) => {
  return firstNum * secondNum;
};

const divide = (firstNum, secondNum) => {
  if (secondNum === 0) {
    display.textContent = "Haha, nice try";
    return;
  }
  return firstNum / secondNum;
};

const populateDisplay = (e) => {
  let num = e.target.textContent;
  if (display.textContent.length === 15) {
    return
  }
  display.textContent += num;
};

numbers.forEach((number) => number.addEventListener("click", populateDisplay));
