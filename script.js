const screen = document.querySelector('#screen');

const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.addEventListener('click', captureValue));

let leftOperand = '0';
let operator = '';
let rightOperand = '';
let overrideLeftOperand = false;

function captureValue(e) {
    // Capture left operand
    if (e.target.classList.contains('operand') && operator === '') {
        leftOperand = formOperand(e, leftOperand, overrideLeftOperand);
        overrideLeftOperand = false;
    }

    // Capture operator
    if (e.target.classList.contains('operator') && leftOperand !== '' && rightOperand === '') {
        if (leftOperand.endsWith(".")) {
            leftOperand = leftOperand.slice(0, -1); // Remove decimal point if it is not followed by a digit
        }
        operator = e.target.innerText;
    }

    // Capture right operand
    if (e.target.classList.contains('operand') && operator !== '' ) {
        rightOperand = formOperand(e, rightOperand);
    }

    // Calculate
    if (e.target.classList.contains('equal') && rightOperand !== '') {
        leftOperand = calculate(leftOperand, operator, rightOperand);
        operator = '';
        rightOperand = '';
        overrideLeftOperand = true;
    }

    screen.textContent = `${leftOperand} ${operator} ${rightOperand}`;
    
}

function formOperand(e, operand, overrideLeftOperand) {
    if (operand === '' || operand === '0' || overrideLeftOperand === true) {
        if (e.target.classList.contains('dot')) {
            operand = '0.'; // To ensure zero goes before decimal if user enters decimal
        }
        else {
            operand = e.target.innerText; // To ensure only one zero in a number
        }
        
    }
    else {
        if (operand.includes('.') && e.target.classList.contains('dot')) {
            operand = operand; // To ensure only one decimal
        }
        else {
            operand += e.target.innerText; // To cover cases in which entered value is not a decimal or a zero
        } 
    }
    return operand;
}

function calculate(leftOperand, operator, rightOperand) {
    const leftNumber = Number(leftOperand);
    const rightNumber = Number(rightOperand);
    switch (operator) {
        case '+':
            return (leftNumber + rightNumber).toFixed(2).toString();
        case '-':
            return (leftNumber - rightNumber).toFixed(2).toString();
        case '*':
            return (leftNumber * rightNumber).toFixed(2).toString();
        case '/':
            return (leftNumber / rightNumber).toFixed(2).toString();
    }
}