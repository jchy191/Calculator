function add (x, y) {
    return x + y;
};

function subtract (x, y) {
    return x - y;
};

function multiply (x, y) {
    return x * y;
};

function divide (x, y) {
    return x / y;
};

function operate (operator, a, b) {
    switch (operator) {
        case '+': 
            return add (a, b);
        case '-':
            return subtract (a, b);
        case '*':
            return multiply (a, b);
        case '/':
            return divide (a, b);
    };
};

let numerand = "";
let display = document.querySelector('#display');

const numberButton = document.querySelectorAll('.number');
numberButton.forEach((button) => {
    button.addEventListener('click', (e) => {
        numerand += button.id;
        display.innerHTML = `${numerand}`
    });
});



