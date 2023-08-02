const expressionDiv = document.querySelector('#expression');
const resultDiv = document.querySelector('#result');

const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.addEventListener('click', captureValue));

let leftOperand = '';
let operator = '';
let rightOperand = '';
let result = '';
let overrideLeftOperand = false;

function captureValue(e) {
    // Capture left operand
    if (e.target.classList.contains('operand') && operator === '') {
        leftOperand = formOperand(e, resultDiv.textContent, overrideLeftOperand);
        result = leftOperand;
        resultDiv.textContent = leftOperand;
        overrideLeftOperand = false;
    }

    // Capture operator
    if (e.target.classList.contains('operator')) {
        if (resultDiv.textContent !== '' && rightOperand === '') {
            if (leftOperand.endsWith(".")) {
                leftOperand = leftOperand.slice(0, -1); // Remove decimal point if it is not followed by a digit
                result = leftOperand;
            }
            operator = e.target.innerText;
        }
        else if (resultDiv.textContent !== '' && rightOperand !=='') {
            result = calculate(leftOperand, operator, rightOperand);
            operator = e.target.innerText;
            leftOperand = result;
            overrideLeftOperand = true;
            rightOperand = '';
        }
        expressionDiv.textContent = `${leftOperand} ${operator}`;
        resultDiv.textContent = result;
        // rightOperand = '';
    }

    // Capture right operand
    if (e.target.classList.contains('operand') && operator !== '' ) {
        rightOperand = formOperand(e, rightOperand);
        result = rightOperand;
        resultDiv.textContent = result;
    }

    // Calculate
    if (e.target.classList.contains('equal') && rightOperand !== '') {

        result = calculate(leftOperand, operator, rightOperand);
        resultDiv.textContent = result;
        overrideLeftOperand = true;
        expressionDiv.textContent = `${leftOperand} ${operator} ${rightOperand} =`;
        rightOperand = '';
        leftOperand = result;
    }

    // Execute clear
    if (e.target.dataset.key === 'keyClear') {
        leftOperand = '0';
        operator = '';
        rightOperand = '';
        expressionDiv.textContent = '';
        resultDiv.textContent = '0';
    }

    // Execute delete
    if (e.target.dataset.key === 'keyDelete') {
        if (rightOperand !== '') {
            result = result.slice(0, -1);
            rightOperand = result;
            resultDiv.textContent = result;
        }
        else {
            result = result.slice(0, -1);
            resultDiv.textContent = result;
            rightOperand = result;
        }
    }

    console.log(`Left operand ${leftOperand} \nOperator ${operator} \nRight operand ${rightOperand} \nResult ${result}`);
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
            return parseFloat((leftNumber + rightNumber).toFixed(2)).toString();
        case '-':
            return parseFloat((leftNumber - rightNumber).toFixed(2)).toString();
        case '*':
            return parseFloat((leftNumber * rightNumber).toFixed(2)).toString();
        case '/':
            return parseFloat((leftNumber / rightNumber).toFixed(2)).toString();
    }
}