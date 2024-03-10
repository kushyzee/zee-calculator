const display = document.querySelector(".output p");
const numbers = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const equals = document.getElementById("equal");
const clearBtn = document.getElementById("ac");
const deleteBtn = document.getElementById("del");

const calculator = {
  firstNumber: "",
  secondNumber: "",
  operator: "",

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
      // this.secondNumber = '';
      return 'haha';
    }
    return firstNum / secondNum;
  },
};

const updateOperator = (e) => {
  let { firstNumber, secondNumber, operator } = calculator;
  if (firstNumber === "") return;

  if (firstNumber && secondNumber) {
    firstNumber = doCalculation(firstNumber, secondNumber, operator);
    secondNumber = "";
    operator = e.target.id;
    updateDisplay(firstNumber);
  } else {
    operator = e.target.id;
  }

  if (firstNumber === 'haha') {
    firstNumber = '';
    operator = '';
  }

  calculator.firstNumber = firstNumber;
  calculator.secondNumber = secondNumber;
  calculator.operator = operator;
};

const doCalculation = (firstNum, secondNum, operator) => {
  firstNum = Number(firstNum);
  secondNum = Number(secondNum);

  switch (operator) {
    case "add":
      return calculator.add(firstNum, secondNum);

    case "division":
      return calculator.divide(firstNum, secondNum);

    case "multiply":
      return calculator.multiply(firstNum, secondNum);

    case "minus":
      return calculator.subtract(firstNum, secondNum);
  }
};

const updateNumberVar = (e) => {
  let { firstNumber, secondNumber, operator } = calculator;
  const number = e.target.textContent;

  if (display.textContent.length === 15) {
    return;
  }

  if (e.target.textContent === "." && display.textContent.includes(".")) {
    return;
  }

  if (!operator) {
    firstNumber = firstNumber !== "" ? firstNumber + number : number;
    updateDisplay(firstNumber);
  } else {
    secondNumber = secondNumber !== "" ? secondNumber + number : number;
    updateDisplay(secondNumber);
  }

  calculator.firstNumber = firstNumber;
  calculator.secondNumber = secondNumber;
};

const deleteCharacter = () => {
  let { firstNumber, secondNumber, operator } = calculator;

  if (!operator) {
    if (firstNumber !== "") {
      firstNumber = firstNumber.slice(0, -1);
      updateDisplay(firstNumber);
    }
  } else {
    if (secondNumber !== "") {
      secondNumber = secondNumber.slice(0, -1);
      updateDisplay(secondNumber);
    }
  }

  calculator.firstNumber = firstNumber;
  calculator.secondNumber = secondNumber;
};

const clearDisplay = () => {
  calculator.firstNumber = "";
  calculator.secondNumber = "";
  calculator.operator = "";
  display.textContent = "0";
};

const updateDisplay = (num) => {
  display.textContent = num;
};


numbers.forEach((number) => {
  number.addEventListener("click", updateNumberVar);
});

operators.forEach((operator) => {
  operator.addEventListener("click", updateOperator);
});

clearBtn.addEventListener("click", clearDisplay);
deleteBtn.addEventListener("click", deleteCharacter);
// updateDisplay("0");
