const screen = document.querySelector('#screen');

const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.addEventListener('click', captureValue));

let leftOperand = '0';
let operator = '';
let rightOperand = '';

function captureValue(e) {
    // Capture left operand
    if (e.target.classList.contains('operand') && operator === '') {
        if (leftOperand === '' || leftOperand === '0') {
            if (e.target.classList.contains('dot')) {
                leftOperand = '0.'; // To ensure zero goes before decimal if user enters decimal
            }
            else {
                leftOperand = e.target.innerText; // To ensure only one zero in a number
            }
        }
        else {
            if (leftOperand.includes('.') && e.target.classList.contains('dot')) {
                leftOperand = leftOperand; // To ensure only one decimal
            }
            else {
                leftOperand += e.target.innerText; // To cover cases in which entered value is not a decimal or a zero
            } 
        }
    }

    // Capture operator
    if (e.target.classList.contains('operator') && leftOperand !== '' && rightOperand === '') {
        operator = e.target.innerText;
    }

    // Capture right operand
    if (e.target.classList.contains('operand') && operator !== '' ) {
        if (rightOperand === '' || rightOperand === '0') {
            if (e.target.classList.contains('dot')) {
                rightOperand = '0.'; // To ensure zero goes before decimal if user enters decimal
            }
            else {
                rightOperand = e.target.innerText; // To ensure only one zero in a number
            }
        }
        else {
            if (rightOperand.includes('.') && e.target.classList.contains('dot')) {
                rightOperand = rightOperand; // To ensure only one decimal
            }
            else {
                rightOperand += e.target.innerText; // To cover cases in which entered value is not a decimal or a zero
            } 
        }
    }
    screen.textContent = `${leftOperand} ${operator} ${rightOperand}`;
    
}

