/*Basic Mathematical Functions */

function operate(sign, a, b) {
    let x = parseFloat(a);
    let y = parseFloat(b);
    switch(sign) {
        case "+": 
            return x + y;
        case "-":
            return x - y;
        case "x":
            return x * y;
        case "÷":
            return x / y;
    };
};

/* Calculator's Initial State*/

let firstNumber = ""; 
let secondNumber = "";
let operator = "";
let lastButtonPressed = 'number';
let display = document.querySelector('#display');
let firstOperationChecker = 1;

/*Functions*/



function showOperatorOnDisplay() {
    if (display.innerHTML.charCodeAt(display.innerHTML.length - 1) < 58 && 
                display.innerHTML.charCodeAt(display.innerHTML.length - 1) > 47) {
        display.innerHTML += `${operator}`;
    } else {
        display.innerHTML = display.innerHTML.slice(0, -1) + `${operator}`;
    };
};

function reset(){
    firstNumber = ""; 
    secondNumber = "";
    operator = "";
    display.innerHTML = "";
  //  firstOperationChecker = 1;
    lastButtonPressed = "number";
}

function executeCalculation(){
    if (firstNumber == ""){
        firstNumber = secondNumber;
    } else {
        firstNumber = operate(operator, firstNumber, secondNumber);
        firstOperationChecker = 0;
   };
   console.log(firstNumber);
};

/*Calculator Buttons*/

const numberButton = document.querySelectorAll('.number');
numberButton.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (lastButtonPressed == 'operator'){
            executeCalculation();
            secondNumber = "";
            secondNumber += button.id;
            display.innerHTML = `${secondNumber}`;
        } else if (lastButtonPressed == 'equals'){
            reset();
            secondNumber += button.id;
            display.innerHTML = `${secondNumber}`;
        } else {
            secondNumber += button.id;
            display.innerHTML = `${secondNumber}`;
        }
        lastButtonPressed = "number";
    });
});

const operatorButton = document.querySelectorAll('.operation');
operatorButton.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (secondNumber != ""){
            lastButtonPressed = 'operator';
            operator = button.id;
            showOperatorOnDisplay();
        }
    });
});

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', (e) => {
    executeCalculation();
    display.innerHTML = `${firstNumber}`;
    lastButtonPressed = "equals";
});

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', (e) => {
    reset();
})


//to do: add decimal point