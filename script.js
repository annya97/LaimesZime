$(document).ready(function () {
    const signColor = $('#sign-color');
    const frameColor = $('#frame-color');

    signColor.change(function () {
        const asSignRadio = $('#frame-as-sign');
        const color = this.value;

        asSignRadio.val(color);

        if (asSignRadio.prop('checked')) {
            frameColor.val(color);
        }
    });

    const backColor = $('#back-color');

    backColor.change(function () {
        const asBackRadio = $('#frame-as-back');
        const color = this.value;

        asBackRadio.val(color);

        if (asBackRadio.prop('checked')) {
            frameColor.val(color);
        }
    });

    const frameColorRadio = $('input[name="frame-color-radio"]');

    frameColor.change(function () {
        frameColorRadio.prop('checked', false);
    });

    frameColorRadio.change(function () {
        const radioChoice = this.value;

        frameColor.val(radioChoice);
    });

    const birthDateError = $('#birth-date-section .text-danger');
    const resultError = $('#result-error');

    $('#calculate-btn').click(function () {
        cleanUp();

        if (isBirthDateEntered()) {
            createGrid();
            colorGrid();
        } else {
            birthDateError.empty();
            birthDateError.append('Ievadiet pilnu dzimšanas datumu!');
            birthDateError.removeClass('hide');

            resultError.empty();
            resultError.append('Kļūda (skatīt augstāk)');
            resultError.removeClass('hide');
        }
    });

    function cleanUp () {
        birthDateError.empty();
        birthDateError.addClass('hide');

        resultError.empty();
        resultError.addClass('hide');

        $('#result-sign').remove();
    }

    function isBirthDateEntered () {
        return Boolean(
            $('#birth-day').val()
            && $('#birth-month').val()
            && $('#birth-year').val()
        );
    }

    function createGrid () {
        const size = $('input[name="grid-size"]:checked').val();

        switch (size) {
            case 'small':
                createSmallGrid();
                break;
            case 'medium':
                const timesTwoSmallGridsInMediumRow = 1;
                createCustomGrid(timesTwoSmallGridsInMediumRow);
                break;
            case 'large':
                const timesTwoSmallGridsInLargeRow = 2;
                createCustomGrid(timesTwoSmallGridsInLargeRow);
                break;
        }
    }

    const gridMin = 1;
    const gridMax = 9;

    function createSmallGrid () {
        let grid = '<table id="result-sign">';

        for (let i = gridMin; i <= gridMax; i++) {
            grid += '<tr>';
            grid += makeAscendingRow(i);
            grid += '</tr>';
        }

        grid += '</table>';

        $('#result-sign-wrap').html(grid);
    }

    function makeAscendingRow (i) {
        let row = '';

        for (let j = gridMin; j <= gridMax; j++) {
            row += makeCell(i, j);
        }

        return row;
    }

    function makeCell (i, j) {
        let cell = '';

        const cellValue = (i * j) % 10;

        cell += '<td class="value-' + cellValue + '"/>';

        return cell;
    }

    function createCustomGrid (times) {
        let grid = '<table id="result-sign">';

        for (let j = 1; j <= times; j++) {
            for (let i = gridMin; i <= gridMax; i++) {
                grid += makeRowFromTwoSmallGrids(times, i);
            }

            for (let i = gridMax; i >= gridMin; i--) {
                grid += makeRowFromTwoSmallGrids(times, i);
            }
        }

        grid += '</table>';

        $('#result-sign-wrap').html(grid);
    }

    function makeRowFromTwoSmallGrids (times, i) {
        let twoSmallGrids = '<tr>';

        for (let j = 1; j <= times; j++) {
            twoSmallGrids += makeAscendingRow(i);
            twoSmallGrids += makeDescendingRow(i);
        }

        twoSmallGrids += '</tr>';

        return twoSmallGrids;
    }

    function makeDescendingRow (i) {
        let row = '';

        for (let j = gridMax; j >= gridMin; j--) {
            row += makeCell(i, j);
        }

        return row;
    }

    function colorGrid () {
        $('td').css('background-color', backColor.val());
        $('table').css('border-color', frameColor.val());

        $.each(numbersToColor(), function (index, value) {
            $('.value-' + value).css('background-color', signColor.val());
        });
    }

    function numbersToColor () {
        let birthDate = [];

        birthDate.push($('#birth-day').val().split(''));
        birthDate.push($('#birth-month').val().split(''));
        birthDate.push($('#birth-year').val().split(''));

        const birthDateNumbers = [].concat.apply([], birthDate);

        const uniqueNumbers = birthDateNumbers.filter(function (value, index) {
            return index === birthDateNumbers.indexOf(value);
        });

        return uniqueNumbers;
    }
});
