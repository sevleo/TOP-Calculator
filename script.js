const buttons = Array.from(document.querySelectorAll('.button'));
console.log(buttons);

buttons.forEach(button => button.addEventListener('click', printKey));

function printKey(e) {
    console.log(e.target);
}