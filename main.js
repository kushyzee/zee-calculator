const display = document.querySelector(".output p");
const numbers = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const equals = document.getElementById("equal");
const clearBtn = document.getElementById("ac");
const deleteBtn = document.getElementById("del");
const plusMinusBtn = document.getElementById("plus-minus");

const calculator = {
  firstNumber: "",
  secondNumber: "",
  operator: "",
  currentInput: "",
  result: false,
  currentOperatorBtn: "",

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
      return "haha";
    }
    return firstNum / secondNum;
  },
};

const updateOperator = (e) => {
  let { firstNumber, secondNumber, operator, currentInput } = calculator;

  if (currentInput === "" && !calculator.result) return;

  if (calculator.currentOperatorBtn) {
    calculator.currentOperatorBtn.style.backgroundColor = "";
  }

  e.target.style.backgroundColor = "#de7a07";
  calculator.currentOperatorBtn = e.target;

  if (calculator.result) {
    operator = e.target.id;
    calculator.result = false;
  } else if (firstNumber === "") {
    firstNumber = currentInput;
  } else if (secondNumber === "") {
    secondNumber = currentInput;
    firstNumber = doCalculation(firstNumber, secondNumber, operator);
  }

  operator = e.target.id;

  if (firstNumber === "haha") {
    updateDisplay(firstNumber);
    firstNumber = "";
    operator = "";
  } else {
    firstNumber = roundNumber(firstNumber, 13);
    updateDisplay(firstNumber);
  }

  calculator.firstNumber = firstNumber;
  calculator.secondNumber = "";
  calculator.operator = operator;
  calculator.currentInput = "";
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

const equalsClicked = () => {
  let { firstNumber, secondNumber, operator, currentInput } = calculator;

  backgroundColorChanger("#2525be", equals);

  if (calculator.currentOperatorBtn) {
    calculator.currentOperatorBtn.style.backgroundColor = "";
    calculator.currentOperatorBtn = "";
  }

  if (firstNumber !== "" && currentInput !== "" && operator !== "") {
    secondNumber = currentInput;
    firstNumber = doCalculation(firstNumber, secondNumber, operator);
    calculator.result = true;
    operator = "";
  } else {
    firstNumber = "";
    currentInput = "";
    operator = "";
  }

  if (firstNumber === "haha") {
    updateDisplay(firstNumber);
    firstNumber = "";
    operator = "";
  } else if (currentInput !== "") {
    firstNumber = roundNumber(firstNumber, 13);
    updateDisplay(firstNumber);
    currentInput = "";
  }

  calculator.firstNumber = firstNumber;
  calculator.secondNumber = "";
  calculator.currentInput = currentInput;
  calculator.operator = operator;
};

const updateCurrentInput = (e) => {
  let { firstNumber, secondNumber, currentInput } = calculator;
  const number = e.target.textContent;

  backgroundColorChanger("#333333", e.target);

  if (display.textContent.length === 15) {
    return;
  }

  // make sure only one decimal point is used
  if (number === "." && currentInput.includes(".")) {
    return;
  }

  // reset calculator if a result is gotten and number buttons are pressed
  if (calculator.result) {
    currentInput = "";
    operator = "";
    firstNumber = "";
    secondNumber = "";
    calculator.result = false;

    if (number === ".") {
      currentInput = "0.";
    } else {
      currentInput = number;
    }
  } else if (number === ".") {
    if (currentInput === "") {
      currentInput = "0.";
    } else if (!currentInput.includes(".")) {
      currentInput += number;
    }
  } else {
    currentInput = currentInput === "" ? number : currentInput + number;
  }

  updateDisplay(currentInput);

  calculator.currentInput = currentInput;
  calculator.firstNumber = firstNumber;
  calculator.secondNumber = secondNumber;
};

const negativeClick = () => {
  let value = "";
  let negative = "";

  // if there is a result, toggle its sign
  if (calculator.result) {
    value = Number(calculator.firstNumber);
    negative = -value;
    calculator.firstNumber = negative.toString();
    updateDisplay(calculator.firstNumber);
  } else if (calculator.currentInput !== "") {
    value = Number(calculator.currentInput);
    negative = -value;
    calculator.currentInput = negative.toString();
    updateDisplay(calculator.currentInput);
  }
};

const deleteCharacter = () => {
  let { firstNumber, currentInput, result } = calculator;

  backgroundColorChanger("#333333", deleteBtn);

  if (currentInput !== "") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  } else if (result || firstNumber) {
    firstNumber = firstNumber.toString().slice(0, -1);
    updateDisplay(firstNumber);
  }

  calculator.firstNumber = firstNumber;
  calculator.currentInput = currentInput;
};

const clearDisplay = () => {
  if (calculator.currentOperatorBtn) {
    calculator.currentOperatorBtn.style.backgroundColor = "";
    calculator.currentOperatorBtn = "";
  }

  backgroundColorChanger("#333333", clearBtn);

  display.textContent = "";
  calculator.firstNumber = "";
  calculator.secondNumber = "";
  calculator.operator = "";
  calculator.currentInput = "";
};

const updateDisplay = (num) => {
  display.textContent = num;
};

const roundNumber = (num, points) => {
  const factor = Math.pow(10, points);
  return Math.round(num * factor) / factor;
};

const backgroundColorChanger = (color, button) => {
  button.style.backgroundColor = color;
  setTimeout(() => {
    button.style.backgroundColor = "";
  }, 200);
};

numbers.forEach((number) => {
  number.addEventListener("click", updateCurrentInput);
});

operators.forEach((operator) => {
  operator.addEventListener("click", updateOperator);
});

clearBtn.addEventListener("click", clearDisplay);
deleteBtn.addEventListener("click", deleteCharacter);
equals.addEventListener("click", equalsClicked);
plusMinusBtn.addEventListener("click", negativeClick);
