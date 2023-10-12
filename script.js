'use strict';

const numbers = document.querySelectorAll('.number');
const display = document.querySelector('.display');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelector('.clear');
const equals = document.querySelector('.equals');
const decimal = document.querySelector('.decimal');
const percent = document.querySelector('.percent');
const negativeToggle = document.querySelector('.negative');
const backspace = document.querySelector('.backspace');

display.textContent = 0;
let displayValue = null;

let firstNum = null;
let secondNum = 0;
let answer = null;

let lastOperator = null;
let currentOperator = '+';

let maxDisplayLength = 9;



function numberPress(number){
    handleDisplay(number);
};
numbers.forEach(number => number.addEventListener('click', (e) => numberPress(e.target.textContent)));


function decimalPress(e){
    if (!decimal.classList.contains('toggle')){
        decimal.classList.add('toggle');
        handleDisplay(e.target.textContent);
    };
};
decimal.addEventListener('click', (e) => decimalPress(e));


function percentPress(){
    if (displayValue !== null){
        let conversion = displayValue / 100;
        displayValue = null;
        handleDisplay(conversion);
    };
};
percent.addEventListener('click', percentPress);


function negativeTogglePress(){
    if (displayValue !== null) {
        let conversion = displayValue;
        displayValue = null;

        if (conversion[0] === '-'){
            conversion = conversion.substring(1);
            handleDisplay(conversion);
        } else {
            conversion = '-' + conversion;
            handleDisplay(conversion);
        };
    };
};
negativeToggle.addEventListener('click', negativeTogglePress);


function backspacePress(){
    if (displayValue !== null && displayValue.length > 1){
        let newDisplayValue = displayValue.substring(0, displayValue.length - 1);
        displayValue = null;
        handleDisplay(newDisplayValue);
    };
};
backspace.addEventListener('click', backspacePress);


function handleDisplay(number){
    if (displayValue === null){
        operators.forEach(operator => operator.classList.remove('toggle'));
        display.textContent = number;
        displayValue = display.textContent;
    } else if (displayValue.toString().length < maxDisplayLength) {
        display.textContent += number;
        displayValue = display.textContent;
    };
};


function operatorPress(e){
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

    e.target.classList.add('toggle');
};
operators.forEach(operator => operator.addEventListener('click', (e) => operatorPress(e)));


function clearPress(e){
    display.textContent = 0;
    displayValue = null;
    firstNum = null;
    secondNum =  null;
    answer = null;
    currentOperator = '+';
    decimal.classList.remove('toggle');
    operators.forEach(operator => operator.classList.remove('toggle'));
};
clear.addEventListener('click', (e) => clearPress(e));


function equalsPress(){
    secondNum = displayValue;
    answer = operate(firstNum, currentOperator, secondNum);
    firstNum = null;
    decimal.classList.remove('toggle');
    currentOperator = '+';

    displayValue = null;
    handleDisplay(answer);

    if (answer === 0){
        displayValue = null;
    };
};
equals.addEventListener('click', equalsPress);




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
    if ((num1 * num2).toString().length > maxDisplayLength){
        return (num1 * num2).toPrecision(4);
    };

    return (num1 + num2);
};

function subtract(num1, num2){
    if ((num1 * num2).toString().length > maxDisplayLength){
        return (num1 * num2).toPrecision(4);
    };

    return (num1 - num2);
};

function multiply(num1, num2){
    if ((num1 * num2).toString().length > maxDisplayLength){
        return (num1 * num2).toPrecision(4);
    };
    
    return (num1 * num2);
};

function divide(num1, num2){
    if (num2 === 0) return 'lmao';

    if ((num1 * num2).toString().length > maxDisplayLength){
        return (num1 * num2).toPrecision(4);
    };

    return (num1 / num2);
};
