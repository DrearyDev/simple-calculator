'use strict';

const numbers = document.querySelectorAll('.number');
const display = document.querySelector('.display');
const operators = document.querySelectorAll('.operator');


let displayValue = null;
display.textContent = displayValue;



numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        handleDisplay(e.target.textContent);
    });
});

function handleDisplay(number){
    display.textContent += number;
    displayValue = display.textContent;
};

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        console.log(displayValue);
    });
});




function add(num1, num2){
    return num1 + num2;
};

function subtract(num1, num2){
    return num1 - num2;
};

function multiply(num1, num2){
    return num1 * num2;
};

function divide(num1, num2){
    if (num2 === 0) return 'lmao';
    
    return num1 / num2
};

function operate(num1, operator, num2){
    switch (operator) {
        case '+':
            add(num1, num2);
            break;
        case '-':
            subtract(num1, num2);
            break;
        case '*':
            multiply(num1, num2);
            break;
        case '/':
            divide(num1, num2);
            break;
        default:
            return error;
    };
};