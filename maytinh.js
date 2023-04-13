// region vùng khai báo class
let buttonChange = "button--change";
// end region vùng khai báo class

// region vùng khai báo các nút
let buttonDivide = document.getElementById("buttonDivide");
let buttonSeven = document.getElementById("buttonSeven");
let buttonEight = document.getElementById("buttonEight");
let buttonNine = document.getElementById("buttonNine");
let buttonMultiply = document.getElementById("buttonMultiply");
let buttonFour = document.getElementById("buttonFour");
let buttonSix = document.getElementById("buttonSix");
let buttonFive = document.getElementById("buttonFive");
let buttonMinus = document.getElementById("buttonMinus");
let buttonOne = document.getElementById("buttonOne");
let buttonTwo = document.getElementById("buttonTwo");
let buttonThree = document.getElementById("buttonThree");
let buttonPlus = document.getElementById("buttonPlus");
let buttonZero = document.getElementById("buttonZero");
let buttonEqual = document.getElementById("buttonEqual");
let targetNumber = document.getElementById("targetNumber");
let buttonChanges = document.getElementsByClassName(buttonChange);

// end region vùng khai báo các nút

// region vùng khai báo các hàm
/**
 * function làm sáng dấu phép tính
 * created by tdmanh1 13/04/2023
 */
function highlightButton(e) {
  // xóa toàn bộ highlight cũ đi
  if (buttonChanges && buttonChanges.length > 0) {
    for (let i = 0; i < buttonChanges.length; i++) {
      if (buttonChanges[i].classList.contains(buttonChange)) {
        buttonChanges[i].classList.remove(buttonChange);
      }
    }
  }
  // thêm highlight ở dấu hiện tại
  if (!e.target.classList.contains(buttonChange)) {
    e.target.classList.add(buttonChange);
  }
  // chuyển state về bằng 2
  sessionStorage.setItem("state", "2");
  // gán giá trị cho dấu bằng dấu hiện tại
  // chỉ gán dấu khác dấu =
  if (e.target.innerText != "=") {
    sessionStorage.setItem("symbol", e.target.innerText);
  }
}
/**
 * function bằng
 * created by tdmanh1 13/04/2023
 */
function equal(e) {
  highlightButton(e);
  let numberOne = sessionStorage.getItem("numberOne");
  let numberTwo = sessionStorage.getItem("numberTwo");
  let state = sessionStorage.getItem("state");
  let symbol = sessionStorage.getItem("symbol");
  let result = "0";
  //thực hiện tính toán
  if (numberOne && numberTwo && state && symbol) {
    //tính toán
    switch (symbol.toLowerCase()) {
      case "x":
        result = numberOne * numberTwo;
        break;
      case "/":
        result = numberOne / numberTwo;
        break;
      case "+":
        result = numberOne + numberTwo;
        break;
      case "-":
        result = numberOne - numberTwo;
        break;
      default:
        break;
    }
  }
  // gán giá trị result vào màn hình
  targetNumber.innerText = result;
  // gán giá trị vào numberTwo
  sessionStorage.setItem("numberTwo", result);
}
/**
 * function gán giá trị của số hiện tại vào trong ô hiển thị số máy tính
 * created by tdmanh1 13/04/2023
 */
function addNewNumber(e) {
  // chỉ cho phép hiển thị 8 chữ số
  let newValue;
  if (targetNumber.innerText.length <= 7) {
    if (
      !sessionStorage.getItem("state") ||
      sessionStorage.getItem("state") == "1"
    ) {
      newValue = targetNumber.innerText + e.target.innerText;
    } else {
      newValue = e.target.innerText;
    }
    // xóa số 0 ở đầu đi nếu có 2 chữ số
    if (newValue.length > 1 && newValue.startsWith("0")) {
      targetNumber.innerText = newValue.replace("0", "");
    } else {
      targetNumber.innerText = newValue;
    }
    // gán giá trị vào number two và one
    if (
      !sessionStorage.getItem("state") ||
      sessionStorage.getItem("state") == "1"
    ) {
      sessionStorage.setItem("numberTwo", targetNumber.innerText);
    } else {
      sessionStorage.setItem("numberOne", targetNumber.innerText);
    }
  }
  // chuyển state về 1 để nhập số tiếp theo thay vì số mới
  sessionStorage.setItem("state", "1");
}

// end region vùng khai báo các hàm

// region vùng gán function vào nút
buttonEqual.addEventListener("click", (e) => equal(e));

buttonDivide.addEventListener("click", (e) => highlightButton(e));
buttonMultiply.addEventListener("click", (e) => highlightButton(e));
buttonPlus.addEventListener("click", (e) => highlightButton(e));
buttonMinus.addEventListener("click", (e) => highlightButton(e));

buttonSeven.addEventListener("click", (e) => addNewNumber(e));
buttonEight.addEventListener("click", (e) => addNewNumber(e));
buttonNine.addEventListener("click", (e) => addNewNumber(e));
buttonFour.addEventListener("click", (e) => addNewNumber(e));
buttonSix.addEventListener("click", (e) => addNewNumber(e));
buttonFive.addEventListener("click", (e) => addNewNumber(e));
buttonOne.addEventListener("click", (e) => addNewNumber(e));
buttonTwo.addEventListener("click", (e) => addNewNumber(e));
buttonThree.addEventListener("click", (e) => addNewNumber(e));
buttonZero.addEventListener("click", (e) => addNewNumber(e));

// end region vùng gán function vào nút
