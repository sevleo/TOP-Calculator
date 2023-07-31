const screen = document.querySelector('#screen');

const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.addEventListener('click', captureValue));

let leftOperand = '';
let operator = '';
let rightOperand = '';

function captureValue(e) {
    if (e.target.classList.contains('operand') && operator === '') {
        if (leftOperand === '') {
            if (e.target.classList.contains('dot')) {
                leftOperand = '0.';
            }
            else {
                leftOperand = e.target.innerText;
            }
        }
        else {
            if (leftOperand === '0') {
                if (e.target.classList.contains('dot')) {
                    leftOperand = '0.';
                }
                else {
                    leftOperand = e.target.innerText;
                }
            }
    
            else {
                if (leftOperand.includes('.') && e.target.classList.contains('dot')) {
                    leftOperand = leftOperand;
                }
                else {
                    leftOperand += e.target.innerText;
                }
            }
        }
    }

    if (e.target.classList.contains('operator')) {
        operator = e.target.innerText;
    }

    if (operator !== '' && e.target.classList.contains('operand')) {
        rightOperand = e.target.innerText;
    }
    screen.textContent = `${leftOperand} ${operator} ${rightOperand}`;
    
}

