const display = document.querySelector(".output p");
const numbers = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const equals = document.getElementById("equal");
const clearBtn = document.getElementById("ac");
const deleteBtn = document.getElementById("del");

const calcVars = {
  firstNumber: "",
  secondNumber: "",
  operator: "",
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
    if (secondNum == 0) {
      updateDisplay("Haha, nice try");
      return;
    }
    return firstNum / secondNum;
  },
};

const updateOperator = (e) => {
  let { firstNumber, secondNumber, operator } = calcVars;
  firstNumber = Number(firstNumber);
  secondNumber = Number(secondNumber);

  if (firstNumber && secondNumber) {
    firstNumber = doCalculation(firstNumber, secondNumber, operator);
    secondNumber = "";
    operator = e.target.id;
    updateDisplay(firstNumber);
  } else {
    operator = e.target.id;
    updateDisplay(e.target.textContent);
  }
  calcVars.firstNumber = firstNumber;
  calcVars.secondNumber = secondNumber;
  calcVars.operator = operator;
};

const doCalculation = (firstNum, secondNum, operator) => {
  console.log(firstNum, secondNum, operator);
  switch (operator) {
    case "add":
      return calculator.add(firstNum, secondNum);

    case "division":
      return calculator.divide(firstNum, secondNum);

    case "multiply":
      return calculator.multiply(firstNum, secondNum);

    case 'minus':
      return calculator.subtract(firstNum, secondNum);
  }
};

const deleteCharacter = () => {
  let { firstNumber, secondNumber, operator } = calcVars;

  if (!operator) {
    if (firstNumber) {
      firstNumber = firstNumber.slice(0, -1);
      updateDisplay(firstNumber || 0);
    }
  } else {
    if (secondNumber) {
      secondNumber = secondNumber.slice(0, -1);
      updateDisplay(secondNumber || 0);
    }
  }

  calcVars.firstNumber = firstNumber;
  calcVars.secondNumber = secondNumber;
};

const clearDisplay = () => {
  calcVars.firstNumber = "";
  calcVars.secondNumber = "";
  calcVars.operator = "";
  display.textContent = "0";
};

const updateDisplay = (num) => {
  display.textContent = num;
};

const updateNumberVar = (e) => {
  let { firstNumber, secondNumber, operator } = calcVars;
  const number = e.target.textContent;

  if (display.textContent.length === 15) {
    return;
  }

  if (e.target.textContent === "." && display.textContent.includes(".")) {
    return;
  }

  if (!operator) {
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
updateDisplay("0");
