(function(){
const display = document.getElementById('display');
const buttons = Array.from(document.querySelectorAll('button[data-val]'));
const equalsBtn = document.getElementById('equals');
const clearBtn = document.getElementById('clear');

let formula = '';
let lastWasOperator = false;

function updateDisplay(val) {
const current = display.value;
if (current === '0' && val !== '.') display.value = val;
else display.value = current + val;
}

buttons.forEach(btn => {
btn.addEventListener('click', () => {
const v = btn.getAttribute('data-val');
if (!v) return;
if ('+-*/'.includes(v)) {
if (lastWasOperator) {
// заменяем предыдущий оператор
display.value = display.value.slice(0, -1) + v;
} else {
updateDisplay(v);
}
formula += v;
lastWasOperator = true;
} else {
updateDisplay(v);
formula += v;
lastWasOperator = false;
}
});
});

equalsBtn.addEventListener('click', () => {
try {
// простая оценка выражения
// eslint-disable-next-line no-eval
const result = eval(display.value);
display.value = String(result);
formula = String(result);
lastWasOperator = false;
} catch (e) {
display.value = 'Ошибка';
formula = '';
}
});

clearBtn.addEventListener('click', () => {
display.value = '0';
formula = '';
lastWasOperator = false;
});
})();
