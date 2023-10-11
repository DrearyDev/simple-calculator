'use strict';

const numbers = document.querySelectorAll('.number');
const display = document.querySelector('.display');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelector('.clear');
const equals = document.querySelector('.equals');
const decimal = document.querySelector('.decimal');
const percent = document.querySelector('.percent');
const negativeToggle = document.querySelector('.negative');

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

decimal.addEventListener('click', (e) => {

    if (!decimal.classList.contains('toggle')){
        decimal.classList.add('toggle');
        handleDisplay(e.target.textContent);
    };

});

percent.addEventListener('click', () => {

    if (displayValue !== null){
        let conversion = displayValue / 100;
        displayValue = null;
        handleDisplay(conversion);
    };

});

negativeToggle.addEventListener('click', () => {

    if (displayValue !== null) {
        let conversion = displayValue * -1;
        displayValue = null;
        handleDisplay(conversion);
    };

});

function handleDisplay(number){

    operators.forEach(operator => {
        operator.classList.remove('toggle');
    });

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
        decimal.classList.remove('toggle');

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

        operator.classList.add('toggle');

    });
});

clear.addEventListener('click', (e) => {
    display.textContent = 0;
    displayValue = null;
    firstNum = null;
    secondNum =  null;
    answer = null;
    currentOperator = '+';
    decimal.classList.remove('toggle');

    operators.forEach(operator => {
        operator.classList.remove('toggle');
    });

});

equals.addEventListener('click', () => {
    secondNum = displayValue;
    answer = operate(firstNum, currentOperator, secondNum);
    firstNum = null;
    decimal.classList.remove('toggle');
    currentOperator = '+';

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
    return (num1 + num2);
};

function subtract(num1, num2){
    return (num1 - num2);
};

function multiply(num1, num2){
    return (num1 * num2);
};

function divide(num1, num2){
    if (num2 === 0) return 'lmao';

    return (num1 / num2);
};
