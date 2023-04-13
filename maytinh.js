let change = document.getElementById("change");
// hàm đổi màu nút
function changeColor() {
  if (change.classList.contains("button--change")) {
    change.classList.remove("button--change");
  } else {
    change.classList.add("button--change");
  }
}
change.addEventListener("click", () => {
  changeColor();
});

let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");

function buttonclick(value) {
  if (isNaN(value)) {
    handleCal(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}
function handleCal(cal) {
  switch (cal) {
    case "AC":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case "+":
    case "-":
    case "X":
    case "/":
      handleMath(cal);
      break;
  }
}

function handleMath(cal) {
  if (buffer === "0") {
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = cal;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "X") {
    runningTotal *= intBuffer;
  } else if (previousOperator === "/") {
    runningTotal /= intBuffer;
  }
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function init() {
  document
    .querySelector(".allbutton")
    .addEventListener("click", function (event) {
      buttonclick(event.target.innerText);
    });
}
init();
