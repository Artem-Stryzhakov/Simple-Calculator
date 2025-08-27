// ----------- BACKSPACE ----------- //

export function backspaceFunc(input) {
  const selectionStart = input.selectionStart;
  const selectionEnd = input.selectionEnd;
  const length = input.value.length;

  const textbefore = input.value.substring(0, selectionStart);
  const textafter = input.value.substring(selectionEnd, length);

  if (selectionStart === selectionEnd) {
    // No text is selected; delete the character before the cursor
    input.value =
      input.value.substring(0, selectionStart - 1) +
      input.value.substring(selectionEnd, length);
    input.focus();
    input.selectionStart = selectionStart - 1;
    input.selectionEnd = selectionStart - 1;
  } else {
    // Text is selected; delete the selected text
    input.value = textbefore + textafter;
    input.focus();
    input.selectionStart = selectionStart;
    input.selectionEnd = selectionStart;
  }
}

// ----------- MAIN CALCULATE FUNC ----------- //

export function calculate(expr) {
  try {
    expr = expr.replace(/\s+/g, "").replace(/,/g, ".");

    // Сначала обрабатываем проценты
    expr = processPercentages(expr);

    // Обрабатываем скобки рекурсивно
    while (expr.includes("(")) {
      expr = expr.replace(/\(([^()]+)\)/g, (_, innerExpr) => {
        return calculateInner(innerExpr);
      });
    }

    return calculateInner(expr);
  } catch (error) {
    return "Incorrect format";
  }
}

// ----------- PREPARES PERCENTAGES FOR CALCULATION ----------- //

function processPercentages(expr) {
  // Обрабатываем случаи: число + процент и число - процент
  expr = expr.replace(
    /(\d+\.?\d*)\s*([+-])\s*(\d+\.?\d*)%/g,
    (match, base, op, percent) => {
      const percentageValue = base * (percent * 0.01);
      return op === "+"
        ? `${base}+${percentageValue}`
        : `${base}-${percentageValue}`;
    },
  );

  // Обрабатываем простые проценты (только процент)
  expr = expr.replace(/(\d+\.?\d*)%/g, (match, number) => {
    return `(${number}*0.01)`;
  });

  return expr;
}

// ----------- EVALUATES EXPRESSIONS ----------- //

function calculateInner(expr) {
  // Обрабатываем унарные минусы (отрицательные числа)
  expr = expr.replace(/(^|[\+\-\*\/\(])-/g, "$1-1*");

  let changed = true;
  let iterations = 0;

  // Обрабатываем умножение и деление
  while (changed && iterations < 50) {
    changed = false;
    const newExpr = expr.replace(
      /(-?\d+\.?\d*)\s*([*\/])\s*(-?\d+\.?\d*)/,
      (match, a, op, b) => {
        changed = true;
        return op === "*" ? a * b : a / b;
      },
    );
    if (changed) expr = newExpr;
    iterations++;
  }

  changed = true;
  iterations = 0;

  // Обрабатываем сложение и вычитание
  while (changed && iterations < 50) {
    changed = false;
    const newExpr = expr.replace(
      /(-?\d+\.?\d*)\s*([+-])\s*(-?\d+\.?\d*)/,
      (match, a, op, b) => {
        changed = true;
        return op === "+"
          ? parseFloat(a) + parseFloat(b)
          : parseFloat(a) - parseFloat(b);
      },
    );
    if (changed) expr = newExpr;
    iterations++;
  }

  return parseFloat(expr);
}

// ----------- CHANGE SIGN ----------- //

export function changeSignFunc(input) {
  if (!input.value) return;

  const selectionStart = input.selectionStart;
  const selectionEnd = input.selectionEnd;

  // Если есть выделенный текст - меняем знак выделенной части
  if (selectionStart !== selectionEnd) {
    const selectedText = input.value.substring(selectionStart, selectionEnd);
    const newText = toggleSign(selectedText);
    input.value =
      input.value.substring(0, selectionStart) +
      newText +
      input.value.substring(selectionEnd);
    return;
  }

  // Меняем знак последнего числа
  const parts = input.value.split(/([\+\-\*\/\(\)])/).filter(Boolean);
  let lastNumberIndex = -1;

  // Ищем последнее число в выражении
  for (let i = parts.length - 1; i >= 0; i--) {
    if (/^-?\d+\.?\d*$/.test(parts[i])) {
      lastNumberIndex = i;
      break;
    }
  }

  if (lastNumberIndex !== -1) {
    parts[lastNumberIndex] = toggleSign(parts[lastNumberIndex]);
    input.value = parts.join("");
  } else {
    // Если чисел нет, просто добавляем минус в начало
    input.value = "-" + input.value;
  }
}

function toggleSign(numberStr) {
  if (numberStr.startsWith("-")) {
    return numberStr.substring(1); // Убираем минус
  } else {
    return "-" + numberStr; // Добавляем минус
  }
}
