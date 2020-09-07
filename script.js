$(document).ready(function() {
    const GRID_MIN = 1;
    const GRID_MAX = 9;

    $('#calculate-btn').click(function() {
        createGrid();
        colorGrid();
    });

    function createGrid() {
        cleanUp();

        let size = $('input[name="grid-size"]:checked').val();

        switch(size) {
            case 'small':
                createSmallGrid();
                break;
            case 'medium':
                let timesTwoSmallGridsInMediumRow = 1;
                createCustomGrid(timesTwoSmallGridsInMediumRow);
                break;
            case 'large':
                let timesTwoSmallGridsInLargeRow = 2;
                createCustomGrid(timesTwoSmallGridsInLargeRow);
                break;
        }
    }

    function colorGrid() {
        let signColor = $('#sign-color').val();
        let backColor = $('#back-color').val();

        $('table').css('border-color', signColor);
        $('td').css('background-color', backColor);

        let uniqueBirthDateNumbers = numbersToColor();

        $.each(uniqueBirthDateNumbers, function(index, value) {
            $('.value-' + value).css('background-color', signColor);
        });
    }

    function numbersToColor() {
        let birthDate = [];
        birthDate.push($('#birth-day').val().split(''));
        birthDate.push($('#birth-month').val().split(''));
        birthDate.push($('#birth-year').val().split(''));

        let birthDateNumbers = [].concat.apply([], birthDate);

        let uniqueNumbers = birthDateNumbers.filter(function(value, index) {
            return index === birthDateNumbers.indexOf(value);
        });

        return uniqueNumbers;
    }

    function cleanUp() {
        $('#result-sign').remove();
    }

    function createSmallGrid() {
        let grid = '<table id="result-sign">';

        for (let i = GRID_MIN; i <= GRID_MAX; i++) {
            grid += '<tr>';
            grid += makeAscendingRow(i);
            grid += '</tr>';
        }

        grid += '</table>';

        $('#result-sign-wrap').html(grid);
    }

    function createCustomGrid(times) {
        let grid = '<table id="result-sign">';

        for (let j = 1; j <= times; j++) {
            for (let i = GRID_MIN; i <= GRID_MAX; i++) {
                grid += makeRowFromTwoSmallGrids(times, i);
            }

            for (let i = GRID_MAX; i >= GRID_MIN; i--) {
                grid += makeRowFromTwoSmallGrids(times, i);
            }
        }

        grid += '</table>';

        $('#result-sign-wrap').html(grid);
    }

    function makeRowFromTwoSmallGrids(times, i) {
        let twoSmallGrids = '<tr>';

        for (let j = 1; j <= times; j++) {
            twoSmallGrids += makeAscendingRow(i);
            twoSmallGrids += makeDescendingRow(i);
        }

        twoSmallGrids += '</tr>';

        return twoSmallGrids;
    }

    function makeAscendingRow(i) {
        let row = '';

        for (let j = GRID_MIN; j <= GRID_MAX; j++) {
            row += makeCell(i, j);
        }

        return row;
    }

    function makeDescendingRow(i) {
        let row = '';

        for (let j = GRID_MAX; j >= GRID_MIN; j--) {
            row += makeCell(i, j);
        }

        return row;
    }

    function makeCell(i, j) {
        let cell = '';
        let cellValue = (i * j) % 10;

        cell += '<td class="value-' + cellValue + '"></td>';

        return cell;
    }
});