const screen = document.querySelector('#screen');

const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.addEventListener('click', captureValue));

function captureValue(e) {
    // console.log(e.target.innerText);
    screen.textContent = e.target.innerText;
}