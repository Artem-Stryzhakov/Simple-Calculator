import "./style.css";
import "./scripts/theme.js";
import {
  backspaceFunc,
  calculate,
  changeSignFunc,
} from "./scripts/calculatorFunctions.js";

const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");

const input = document.querySelector("#input");
const equation = document.querySelector("#equation");

const reset = document.querySelector("#reset");
const changeSign = document.querySelector("#changeSign");
const coma = document.querySelector(".coma");

const backspace = document.querySelector("#backspace");
const equal = document.querySelector("#equal");

input.addEventListener("input", (e) => {
  if (e.target.classList.contains("error") && e.target.value === "") {
    e.target.classList.remove("error");
  }
});

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (!input.value || /[\d\.\(\+\-\*\/]/.test(input.value.slice(-1))) {
      input.value += e.target.id;
    }
  });
});

operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (input.value && /[\d\)]/.test(input.value.slice(-1))) {
      input.value += e.target.id;
    }
  });
});

coma.addEventListener("click", (e) => {
  // Проверяем, что последний символ - цифра и в текущем числе еще нет точки
  if (input.value && /\d/.test(input.value.slice(-1))) {
    // Ищем последнее число и проверяем, есть ли в нем уже точка
    const parts = input.value.split(/[\+\-\*\/\(\)]/);
    const lastNumber = parts[parts.length - 1];
    if (!lastNumber.includes(".")) {
      input.value += e.target.id;
    }
  }
});

changeSign.addEventListener("click", () => {
  changeSignFunc(input);
});

reset.addEventListener("click", () => {
  input.value = "";
  equation.innerHTML = "";

  checkInputErrorState(input);
});

backspace.addEventListener("click", () => {
  backspaceFunc(input);

  checkInputErrorState(input);
});

equal.addEventListener("click", () => {
  equation.innerHTML = input.value;
  /*input.value = calculate(input.value);*/
  const result = calculate(input.value);
  if (isNaN(result)) {
    input.classList.add("error");
    input.value = "Incorrect format";
  } else {
    input.value = result;
  }
});

function checkInputErrorState(inputElement) {
  if (inputElement.classList.contains("error") && inputElement.value === "") {
    inputElement.classList.remove("error");
  }
}
