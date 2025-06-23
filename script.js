const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let input = '';

const operators = {
    '×': '*',
    '÷': '/',
    '−': '-',
    '+': '+',
    '%': '%'
};

function updateDisplay() {
    display.textContent = input || '0';
}

function evaluateInput() {
    try {
        const result = eval(input);
        input = result.toString();
    } catch {
        input = 'Error';
    }
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            input = '';
        } else if (value === '=') {
            evaluateInput();
            return;
        } else if (operators[value]) {
            input += operators[value];
        } else {
            input += value;
        }

        updateDisplay();
    });
});

// Bonus: Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key.match(/[0-9]/)) input += e.key;
    else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '%')
        input += e.key;
    else if (e.key === 'Enter') evaluateInput();
    else if (e.key === 'Backspace') input = input.slice(0, -1);
    else if (e.key === 'c' || e.key === 'C') input = '';
    else if (e.key === '.') input += '.';

    updateDisplay();
});