let firstNumber = '';
let secondNumber = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operators = ['+', '-', '*', '/'];
const out = document.querySelector('.out');
const clear = document.querySelector('.clear');
const buttons = document.querySelector('.buttons');

function clearAll () {
    firstNumber = '';
    secondNumber = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

clear.addEventListener('click', clearAll);

buttons.addEventListener('click', (event) => {
    if (!event.target.classList.contains('btn')) return;

    const key = event.target.textContent;
    
    // если нажата клавиша 0-9 и .
    if (digit.includes(key)) {
        if (secondNumber === '' && sign === '') {
            firstNumber += key;
            out.textContent = firstNumber;
        }

    // следующая введённая цифра записывается в secondNumber
        else if (firstNumber !== '' && secondNumber !== '' && finish) {
            secondNumber = key;
            finish = false;
            out.textContent = secondNumber;
        }

    // если есть значение в firstNumber, но нет в secondNumber
        else {
            secondNumber += key;
            out.textContent = secondNumber;
        }

        return;
    }

    // если нажаты клавиши + - * /
    if(operators.includes(key)) {
        sign = key;
        out.textContent = sign;

        return;
    }

    // нажата равно
    if (key === "=") {
        if (secondNumber === '') secondNumber = firstNumber
        switch (sign) {
            case "+":
                firstNumber = (+firstNumber) + (+secondNumber);
                break;
            case "-":
                firstNumber = firstNumber - secondNumber;
                break;
            case "*":
                firstNumber = firstNumber * secondNumber;
                break;
            case "/":
                if (secondNumber === '0') {
                    out.textContent = 'Oшибка'
                    firstNumber = '';
                    secondNumber = '';
                    sign = '';

                    return;
                }
                firstNumber = (firstNumber / secondNumber).toFixed(2);
                break;
        }
        finish = true;
        out.textContent = firstNumber;
    }
});