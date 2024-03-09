const display = document.querySelector(".output p");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.getElementById("equal");
const clearBtn = document.getElementById("ac");

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

