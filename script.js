const screen = document.querySelector('#screen');

const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.addEventListener('click', captureValue));

let leftOperand = '0';
let operator = '';
let rightOperand = '';

function captureValue(e) {
    // Capture left operand
    if (e.target.classList.contains('operand') && operator === '') {
        leftOperand = formOperand(e, leftOperand);
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

    if (e.target.classList.contains('equal') && )

    screen.textContent = `${leftOperand} ${operator} ${rightOperand}`;
    
}

function formOperand(e, operand) {
    if (operand === '' || operand === '0') {
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