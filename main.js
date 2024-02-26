const display = document.querySelector(".output p");

let firstNum = 0;
let secondNum = 0;
let operator = null;

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
