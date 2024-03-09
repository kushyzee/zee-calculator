const display = document.querySelector(".output p");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.getElementById("equal");

let firstNum = null;
let secondNum = null;
let operatorSign = null;
let resultUpdated = false;

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

const doCalculation = () => {
  secondNum = Number(secondNum);
  firstNum = Number(firstNum);

  let result = 0;
  switch (operatorSign) {
    case "add":
      result = add(firstNum, secondNum);
      break;

    case "minus":
      result = subtract(firstNum, secondNum);
      break;

    case "division":
      result = divide(firstNum, secondNum);
      break;

    case "multiply":
      result = multiply(firstNum, secondNum);
      break;
  }
  display.textContent = result;
  resultUpdated = true;
};

const updateGlobalVariables = (e) => {
  operatorSign = e.target.id;
  display.textContent = '';
  
};

const populateDisplay = (e) => {
  let num = e.target.textContent;

  if (display.textContent.length === 15) {
    return;
  }

  if (resultUpdated) {
    firstNum = null;
    secondNum = null;
    operatorSign = null;
    display.textContent = "";
    resultUpdated = false;
  }

  display.textContent += num;
  if (operatorSign && firstNum) {
    secondNum = display.textContent;
    // operatorSign = null;
  }

  else if (!secondNum) {
    firstNum = display.textContent;
  }
  console.log(firstNum, secondNum);
};

numbers.forEach((number) => number.addEventListener("click", populateDisplay));
operators.forEach((operator) =>
  operator.addEventListener("click", updateGlobalVariables)
);

equals.addEventListener("click", doCalculation);
