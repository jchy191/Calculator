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
let temporaryAnswer = "";
let operator = "";
let lastButtonPressedWasEquals = 0;
let display = document.querySelector('#display');

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
    temporaryAnswer = "";
}

function executeCalculation(){
    if (firstNumber != "") temporaryAnswer = operate(operator, firstNumber, secondNumber);
    temporaryAnswer = rounder(temporaryAnswer);
};

function rounder(number){
    let lastDigit;
    let displayedNumber = number.toString();
    if (displayedNumber.length > 15){
        (displayedNumber[15] >= 5) ? lastDigit = displayedNumber[14] + 1 : lastDigit = displayedNumber[14];
        console.log(displayedNumber.slice(0,14));
        displayedNumber = displayedNumber.slice(0, 14) + lastDigit;
    }
    return displayedNumber;
}
   

/*Calculator Buttons*/



const numberButton = document.querySelectorAll('.number');
numberButton.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (secondNumber.length == 15){
            return;
        }
        if (lastButtonPressedWasEquals == 1){
            reset();
            secondNumber += button.id;
            display.innerHTML = `${secondNumber}`;
        } else {
            secondNumber += button.id;
            display.innerHTML = `${secondNumber}`;
            executeCalculation();
        }
        lastButtonPressedWasEquals = 0;
    });
});

const operatorButton = document.querySelectorAll('.operation');
operatorButton.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (display.innerHTML != ""){
            operator = button.id;
            showOperatorOnDisplay();
            if (firstNumber == "") {
                firstNumber = secondNumber;
                secondNumber = "";
            }
            if (temporaryAnswer != "") {
                firstNumber = temporaryAnswer;
                display.innerHTML = `${temporaryAnswer}`;
                secondNumber = "";
            }
            lastButtonPressedWasEquals = 0;
        }
    });
});

const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', (e) => {
    if (secondNumber.indexOf(".") == -1) {
        if (secondNumber == "") {
            secondNumber += "0";
        }
        secondNumber += ".";
        display.innerHTML = `${secondNumber}`;
        
    }
    console.log("hi");
});

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', (e) => {
    display.innerHTML = `${temporaryAnswer}`;
    if (firstNumber == ""){
        display.innerHTML = `${secondNumber}`;
    }
    lastButtonPressedWasEquals = 1;
});

const sqrtButton = document.querySelector('#sqrt');
sqrtButton.addEventListener('click', (e) => {
    if (secondNumber!= ""){
        firstNumber = "";
        operator = "";
        if (lastButtonPressedWasEquals == 1) {
            secondNumber = temporaryAnswer;
        }
        temporaryAnswer = Math.sqrt(secondNumber);
        display.innerHTML = `${temporaryAnswer}`;
        lastButtonPressedWasEquals = 1;
    }
});

const percentageButton = document.querySelector('#percentage');
percentageButton.addEventListener('click', (e) => {
    temporaryAnswer = operate("÷", temporaryAnswer, 100);
    display.innerHTML = `${temporaryAnswer}`;
    lastButtonPressedWasEquals = 1;
});

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', (e) => {
    reset();
    lastButtonPressedWasEquals = 0;
});

const backspace = document.querySelector('#backspace');
backspace.addEventListener('click', (e) => {
    if (lastButtonPressedWasEquals == 1) {
        secondNumber = temporaryAnswer.toString();
    };
    secondNumber = secondNumber.slice(0, -1);
    temporaryAnswer = secondNumber;
    display.innerHTML = `${secondNumber}`;
    lastButtonPressedWasEquals = 0;
});

const debug = document.querySelectorAll('.button');
debug.forEach((button) => {
    button.addEventListener('click', (e) => console.log({firstNumber, secondNumber, operator, temporaryAnswer}))
});


//to do: add decimal point, add backspace, add pressing animatino