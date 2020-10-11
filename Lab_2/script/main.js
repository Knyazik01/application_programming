const el_start = document.querySelector('#value_start'),
    el_stop = document.querySelector('#value_stop'),
    el_step = document.querySelector('#value_step'),
    calc_button = document.querySelector('#calculate'),
    result_content = document.querySelector('#result');

function hideBlock(block) {
    block.style.display = 'none';
    block.innerHTML = '';
}

function getValueAt(x) {
    return Math.cos(Math.abs(x)) + Math.sqrt(x);
}

function getIntervalValue(start, stop, step) {

    if (step !== 0) {
        if (((stop - start) / step) >= 0) {

            const arr = [];

            let value = start;
            for (let index = 0; index <= (stop - start) / step; index++) {
                arr.push([value, getValueAt(value)]);
                value += step;
            }

            // if (arr.length !== 0) {
            return arr;
            // } else {
            //     throw new Error('Result is empty. Input correct data!');
            // }

        } else {
            throw new Error('Result is empty. Input correct data!');
        }
    } else {
        throw new Error('Step = 0. Input correct data!');
    }

}

function drawResultTable(array) {
    let html = '<table class="result_table">' +
        '<tr>' +
        '<td><strong>Value of X</strong></td>' +
        '<td><strong>Result</strong></td>' +
        '</tr>';

    let x, y;
    for (let item of array) {
        x = (Math.round((item[0] + Number.EPSILON) * 1e5) / 1e5);
        y = (Math.round((item[1] + Number.EPSILON) * 1e5) / 1e5) || '&mdash;' ;
        html += `<tr><td>${x}</td><td>${y}</td></tr>`;
    }

    html += '</table>'
    result_content.innerHTML = html;
    result_content.style.display = 'block';
    return 0;
}

function main() {
    const result = getIntervalValue(
        +el_start.value,
        +el_stop.value,
        +el_step.value);

    drawResultTable(result);
    return 0;
}

calc_button.addEventListener('click', function () {


    try {
        main();
    } catch (error) {
        console.error(error);
        alert(error);
    }
});

el_start.addEventListener('input', function () {
    hideBlock(result_content);
});

el_stop.addEventListener('input', function () {
    hideBlock(result_content);
});

el_step.addEventListener('input', function () {
    hideBlock(result_content);
});
