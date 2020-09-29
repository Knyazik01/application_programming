const
    value_x = document.querySelector('#value_x'),
    button = document.querySelector('#calculate'),
    result = document.querySelector('#result');


function calc(x) {
    return Math.cos(Math.abs(x)) + Math.sqrt(x);
}

function show_result_in_block(block, x, y) {
    block.style.display = 'block';
    value_result = `Result: ${Math.round((y + Number.EPSILON) * 1e5) / 1e5}`;
    block.innerText = value_result;
}

function hide_result_block(block) {
    block.style.display = 'none';
    block.innerText = '';
    value_x.value = '';
}

function get_result_or_send_alert() {
    x = Number(value_x.value);
    y = calc(x);
    if (value_x.value === '' || isNaN(x) || isNaN(y)) {
        hide_result_block(result);
        alert('Please, input correct value of x');
    } else {
        show_result_in_block(result, x, y);
    }
}

button.addEventListener('click', function () {
    get_result_or_send_alert();
});

value_x.addEventListener('input', function () {
    if (value_x.value === '') {
        hide_result_block(result);
    }
})