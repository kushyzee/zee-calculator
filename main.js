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

  if (currentInput === "") return;

  if (calculator.currentOperatorBtn) {
    calculator.currentOperatorBtn.style.backgroundColor = "";
  }

  e.target.style.backgroundColor = "#de7a07";
  calculator.currentOperatorBtn = e.target;

  if (firstNumber !== "" && secondNumber !== "") {
    firstNumber = doCalculation(firstNumber, secondNumber, operator);
    calculator.result = true;
  } else if (firstNumber === "") {
    firstNumber = currentInput;
  } else if (secondNumber === "") {
    secondNumber = currentInput;
  } 
  
  if (calculator.result) {
    calculator.result = false
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
  calculator.secondNumber = secondNumber;
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
    secondNumber = "";
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
  }

  calculator.firstNumber = firstNumber;
  calculator.secondNumber = secondNumber;
  calculator.operator = operator;
};

const updateNumberVar = (e) => {
  let { firstNumber, secondNumber, operator, currentInput } = calculator;
  const number = e.target.textContent;

  backgroundColorChanger("#333333", e.target);

  if (display.textContent.length === 15) {
    return;
  }

  if (number === "." && currentInput.includes(".")) {
    return;
  }

  if (calculator.result) {
    currentInput = "";
    operator = "";
    firstNumber = ''
    secondNumber = ''
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
  if (calculator.currentInput !== "") {
    const value = Number(calculator.currentInput);
    const negative = -value;
    calculator.currentInput = negative.toString();
    updateDisplay(calculator.currentInput);
  }
};

const deleteCharacter = () => {
  let { firstNumber, secondNumber, operator, currentInput } = calculator;

  backgroundColorChanger("#333333", deleteBtn);

  if (!operator) {
    if (firstNumber !== "") {
      firstNumber = firstNumber.slice(0, -1);
      currentInput = currentInput.slice(0, -1);
      updateDisplay(firstNumber);
    }
  } else {
    if (secondNumber !== "") {
      secondNumber = secondNumber.slice(0, -1);
      currentInput = currentInput.slice(0, -1);
      updateDisplay(secondNumber);
    }
  }

  calculator.firstNumber = firstNumber;
  calculator.secondNumber = secondNumber;
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
  number.addEventListener("click", updateNumberVar);
});

operators.forEach((operator) => {
  operator.addEventListener("click", updateOperator);
});

clearBtn.addEventListener("click", clearDisplay);
deleteBtn.addEventListener("click", deleteCharacter);
equals.addEventListener("click", equalsClicked);
plusMinusBtn.addEventListener("click", negativeClick);
