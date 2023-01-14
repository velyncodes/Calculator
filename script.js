const displayScreen = document.querySelector(".displayScreen");
const calcDisplay = document.querySelector("h1");
const lastCalcDisplay = document.querySelector("h2");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clearBtn");
const deleteBtn = document.getElementById("deleteBtn");
const calculate = {
  "/": (n1, n2) => n1 / n2,
  "*": (n1, n2) => n1 * n2,
  "-": (n1, n2) => n1 - n2,
  "+": (n1, n2) => n1 + n2,
  "=": (n2) => n2,
  EXP: (n1, n2) => {
    if (n1 && n2) {
      return n1 * 10 ** n2;
    } else if (n2) {
      return 10 ** n2;
    }
  },
};

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

function sendNumValue(num) {
  if (awaitingNextValue) {
    calcDisplay.textContent = num;
    awaitingNextValue = false;
  } else {
    const displayValue = calcDisplay.textContent;
    calcDisplay.textContent = displayValue === "0" ? num : displayValue + num;
  }
}

function addDecimal() {
  if (awaitingNextValue) return;
  if (!calcDisplay.textContent.includes(".")) {
    calcDisplay.textContent = `${calcDisplay.textContent}.`;
  }
}

function useOperator(operator) {
  const currentValue = Number(calcDisplay.textContent);
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
 if (operatorValue === "/" && currentValue === 0) {
    calcDisplay.textContent = `come here bro(⌐■_■)ノ🔪`;
    return;
  }
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calcDisplay.textContent = calculation;
    lastCalcDisplay.textContent = `${firstValue} ${convertOperator(
      operatorValue
    )} ${currentValue}`;
    firstValue = calculation;
  }
  awaitingNextValue = true; // triggered after pressing the operator btn
  operatorValue = operator;
}
function convertOperator(operator) {
  if (operator === "/") return "÷";
  if (operator === "*") return "×";
  if (operator === "-") return "−";
  if (operator === "+") return "+";
  if (operator === "EXP") return "E";
}

function clear() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calcDisplay.textContent = "0";
  lastCalcDisplay.textContent = "";
}

function deleteNum() {
  const currentValue = calcDisplay.textContent;
  if (currentValue.length === 1 && currentValue !== "0") {
    calcDisplay.textContent = "0";
  } else {
    calcDisplay.textContent = currentValue.slice(0, -1);
  }
}

clearBtn.addEventListener("click", clear);
deleteBtn.addEventListener("click", deleteNum);

