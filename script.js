'use strict';

const numbers = document.querySelectorAll('.number');
const display = document.querySelector('.display');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelector('.clear');
const equals = document.querySelector('.equals');

display.textContent = 0;
let displayValue = null;

let firstNum = null;
let secondNum = 0;
let answer = null;

let lastOperator = null;
let currentOperator = '+';



numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        handleDisplay(e.target.textContent);
    });
});

function handleDisplay(number){

    if (displayValue === null){
        display.textContent = number;
        displayValue = display.textContent;
    } else {
        display.textContent += number;
        displayValue = display.textContent;
    };

};

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {

        currentOperator = e.target.textContent;

        if (firstNum === null) {
            firstNum = displayValue;
            displayValue = null;
            lastOperator = currentOperator;
        } else {
            secondNum = displayValue;
            firstNum = operate(firstNum, lastOperator, secondNum);
            secondNum = null;

            displayValue = null;
            handleDisplay(firstNum);
            displayValue = null;
            
            lastOperator = currentOperator;
        };

        console.log(firstNum, currentOperator, secondNum, '=', answer );

    });
});

clear.addEventListener('click', (e) => {
    display.textContent = 0;
    displayValue = null;
    firstNum = null;
    secondNum =  null;
    answer = null;
    currentOperator = '+';
});

equals.addEventListener('click', () => {
    secondNum = displayValue;
    answer = operate(firstNum, currentOperator, secondNum);
    firstNum = null;
    displayValue = null;
    handleDisplay(answer);
});




function operate(num1, operator, num2){
    switch (operator) {
        case '+':
            return add(+num1, +num2);
        case '-':
            return subtract(+num1, +num2);
        case '*':
            return multiply(+num1, +num2);
        case '/':
            return divide(+num1, +num2);
        default:
            return 'error';
    };
};

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
