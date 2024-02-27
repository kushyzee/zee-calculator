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

const updateGlobalVariables = (e) => {
  if (firstNum && secondNum) {
    firstNum = Number(display.textContent);
    operatorSign = e.target.id;
    console.log(
      "make the first number to be the result of previous calculation"
    );
    secondNum = null
  } else if (firstNum) {
    secondNum = Number(display.textContent);
    console.log(firstNum, secondNum);
    operatorSign = e.target.id;
    console.log("do the calculation");
  } else {
    firstNum = Number(display.textContent);
    operatorSign = e.target.id;
  }
};

const populateDisplay = (e) => {
  let num = e.target.textContent;

  if (operatorSign) {
    display.textContent = "";
    operatorSign = null;
  }
  if (display.textContent.length === 15) {
    return;
  }
  display.textContent += num;
};

numbers.forEach((number) => number.addEventListener("click", populateDisplay));
operators.forEach((operator) =>
  operator.addEventListener("click", updateGlobalVariables)
);
