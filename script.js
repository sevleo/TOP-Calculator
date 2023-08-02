const expressionDiv = document.querySelector('#expression');
const resultDiv = document.querySelector('#result');

let leftOperand = '';
let operator = '';
let rightOperand = '';
let result = '';
let overrideLeftOperand = false;

const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.addEventListener('click', captureValueOnScreen));
window.addEventListener("keydown", handleKeyboardInput);



function captureValueOnScreen(e) {
    if (e.target.classList.contains('operand') && operator === '') {
        captureLeftOperand(e);
    }

    if (e.target.classList.contains('operator')) {
        captureOperator(e);
    }

    if (e.target.classList.contains('operand') && operator !== '' ) {
        captureRightOperand(e);
    }

    if (e.target.classList.contains('equal') && rightOperand !== '') {
        captureEqual(e);
    }

    if (e.target.dataset.key === 'keyClear') {
        executeClear(e);
    }

    if (e.target.dataset.key === 'keyDelete') {
        executeDelete(e);
    }

    console.log(`Left operand ${leftOperand} \nOperator ${operator} \nRight operand ${rightOperand} \nResult ${result}`);
}

function formOperand(e, operand, overrideLeftOperand, keyboardEntry) {
    if (operand === '' || operand === '0' || overrideLeftOperand === true) {
        if (keyboardEntry === false) {
            if (e.target.classList.contains('dot')) {
                operand = '0.'; // To ensure zero goes before decimal if user enters decimal
            }
            else {
                operand = e.target.innerText; // To ensure only one zero in a number
            }
        }
        else if (keyboardEntry === true) {
            if (e === '.') {
                operand = '0.'; // To ensure zero goes before decimal if user enters decimal
            }
            else {
                operand = e; // To ensure only one zero in a number
            }
        }
    }
    else {
        if (keyboardEntry === false) {
            if (operand.includes('.') && e.target.classList.contains('dot')) {
                operand = operand; // To ensure only one decimal
            }
            else {
                operand += e.target.innerText; // To cover cases in which entered value is not a decimal or a zero
            } 
        }
        else if (keyboardEntry === true) {
            if (operand.includes('.') && e === '.') {
                operand = operand; // To ensure only one decimal
            }
            else {
                operand += e; // To cover cases in which entered value is not a decimal or a zero
            } 
        }
    }
    return operand;
}

function calculate(leftOperand, operator, rightOperand) {
    const leftNumber = Number(leftOperand);
    const rightNumber = Number(rightOperand);
    switch (operator) {
        case '+':
            return parseFloat((leftNumber + rightNumber).toFixed(2)).toString();
        case '-':
            return parseFloat((leftNumber - rightNumber).toFixed(2)).toString();
        case '*':
            return parseFloat((leftNumber * rightNumber).toFixed(2)).toString();
        case '/':
            return parseFloat((leftNumber / rightNumber).toFixed(2)).toString();
    }
}

function captureLeftOperand(e, keyboardEntry = false) {
    leftOperand = formOperand(e, resultDiv.textContent, overrideLeftOperand, keyboardEntry);
    result = leftOperand;
    resultDiv.textContent = leftOperand;
    overrideLeftOperand = false;
}

function captureOperator(e) {
    if (resultDiv.textContent !== '0' && rightOperand === '') {
        if (leftOperand.endsWith(".")) {
            leftOperand = leftOperand.slice(0, -1); // Remove decimal point if it is not followed by a digit
            result = leftOperand;
        }
        operator = e.target.innerText;
        expressionDiv.textContent = `${leftOperand} ${operator}`;
        resultDiv.textContent = result;
    }
    else if (resultDiv.textContent !== '' && rightOperand !=='') {
        result = calculate(leftOperand, operator, rightOperand);
        operator = e.target.innerText;
        leftOperand = result;
        overrideLeftOperand = true;
        rightOperand = '';
        expressionDiv.textContent = `${leftOperand} ${operator}`;
        resultDiv.textContent = result;
    }

}

function captureRightOperand(e) {
    rightOperand = formOperand(e, rightOperand);
    result = rightOperand;
    resultDiv.textContent = result;
}

function captureEqual(e) {
    result = calculate(leftOperand, operator, rightOperand);
    resultDiv.textContent = result;
    overrideLeftOperand = true;
    expressionDiv.textContent = `${leftOperand} ${operator} ${rightOperand} =`;
    rightOperand = '';
    leftOperand = result;
}

function executeClear(e) {
    leftOperand = '0';
    operator = '';
    rightOperand = '';
    result = '';
    expressionDiv.textContent = '';
    resultDiv.textContent = '0';
}

function executeDelete(e) {
    if (resultDiv.textContent !== '0') {
        result = result.slice(0, -1);
        rightOperand = result;
        resultDiv.textContent = result;
    }

}


function handleKeyboardInput(e) {
    if (((e.key >= 0 & e.key <= 9) || e.key === '.') && operator === '') {
        captureLeftOperand(e.key, keyboardEntry = true);
    }
    // if (e.key === '.') appendPoint();
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clear();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/');
    //   setOperation(convertOperator(e.key));
}