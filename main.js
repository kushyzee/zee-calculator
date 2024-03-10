const display = document.querySelector(".output p");
const numbers = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const equals = document.getElementById("equal");
const clearBtn = document.getElementById("ac");
const deleteBtn = document.getElementById("del");

const calcVars = {
  firstNumber: '',
  secondNumber: '',
  operator: '',
};

const calculator = {
  add: (firstNum, secondNum) => {
    return firstNum + secondNum;
  },

  subtract: (firstNum, secondNum) => {
    return firstNum - secondNum;
  },

  multiply: (firstNum, secondNum) => {
    return firstNum * secondNum;
  },

  divide: (firstNum, secondNum) => {
    if (secondNum === 0) {
      display.textContent = "Haha, nice try";
      return;
    }
    return firstNum / secondNum;
  },
};

const updateOperator = () => {
  console.log(calcVars.firstNumber);
};

const clearDisplay = () => {
  calcVars.firstNumber = '';
  calcVars.secondNumber = '';
  calcVars.operator = '';
  display.textContent = "0";
};

const deleteCharacter = () => {
  let { firstNumber, secondNumber, operator } = calcVars;

  if (!operator) {
    if (firstNumber) {
      firstNumber = firstNumber.slice(0, -1);
      updateDisplay(firstNumber);
    }
  } else {
    if (secondNumber) {
      secondNumber = secondNumber.slice(0, -1);
      updateDisplay(secondNumber);
    }
  }

  calcVars.firstNumber = firstNumber;
  calcVars.secondNumber = secondNumber;
  console.log(calcVars.firstNumber, calcVars.secondNumber);
};

const updateDisplay = (num) => {
  if (display.textContent.length === 15) {
    return;
  }

  display.textContent = num;
};

const updateNumberVar = (e) => {
  let { firstNumber, secondNumber, operator } = calcVars;
  const number = e.target.textContent;

  if (e.target.textContent === "." && display.textContent.includes(".")) {
    return;
  }

  if (!operator) {
    firstNumber;
    firstNumber = firstNumber ? firstNumber + number : number;
    updateDisplay(firstNumber);
  } else {
    secondNumber = secondNumber ? secondNumber + number : number;
    updateDisplay(secondNumber);
  }

  calcVars.firstNumber = firstNumber;
  calcVars.secondNumber = secondNumber;
};

numbers.forEach((number) => {
  number.addEventListener("click", updateNumberVar);
});

operators.forEach((operator) => {
  operator.addEventListener("click", updateOperator);
});

clearBtn.addEventListener("click", clearDisplay);
deleteBtn.addEventListener("click", deleteCharacter);
updateDisplay('0');