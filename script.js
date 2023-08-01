const screen = document.querySelector('#screen');

const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.addEventListener('click', captureValue));

let leftOperand = '';
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
    if (e.target.classList.contains('operator') && leftOperand !== '') {
        operator = e.target.innerText;
    }

    if (operator !== '' && e.target.classList.contains('operand')) {
        rightOperand = e.target.innerText;
    }
    screen.textContent = `${leftOperand} ${operator} ${rightOperand}`;
    
}

