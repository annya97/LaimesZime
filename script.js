$(document).ready(function() {
    const GRID_MIN = 1;
    const GRID_MAX = 9;

    $('#calculate-btn').click(function() {
        createGrid();
        colorGrid(numbersToColor());
    });

    function createGrid() {
        cleanUp();

        let size = $('#grid-size').val();

        switch(size) {
            case 'small':
                createSmallGrid();
                break;
            case 'medium':
                createMediumGrid();
                break;
            case 'large':
                createLargeGrid();
                break;
        }
    }

    function colorGrid(uniqueBirthDateNumbers) {
        $.each(uniqueBirthDateNumbers, function(index, value) {
            $('.value-' + value).css('background-color', 'red');
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

    function createMediumGrid() {
        let grid = '<table id="result-sign">';

        for (let i = GRID_MIN; i <= GRID_MAX; i++) {
            grid += '<tr>';
            grid += makeAscendingRow(i);
            grid += makeDescendingRow(i);
            grid += '</tr>';
        }

        for (let i = GRID_MAX; i >= GRID_MIN; i--) {
            grid += '<tr>';
            grid += makeAscendingRow(i);
            grid += makeDescendingRow(i);
            grid += '</tr>';
        }

        grid += '</table>';
        $('#result-sign-wrap').html(grid);
    }

    function createLargeGrid() {
        let grid = '<table id="result-sign">';

        for (let i = GRID_MIN; i <= GRID_MAX; i++) {
            grid += '<tr>';
            grid += makeAscendingRow(i);
            grid += makeDescendingRow(i);
            grid += makeAscendingRow(i);
            grid += makeDescendingRow(i);
            grid += '</tr>';
        }

        for (let i = GRID_MAX; i >= GRID_MIN; i--) {
            grid += '<tr>';
            grid += makeAscendingRow(i);
            grid += makeDescendingRow(i);
            grid += makeAscendingRow(i);
            grid += makeDescendingRow(i);
            grid += '</tr>';
        }

        for (let i = GRID_MIN; i <= GRID_MAX; i++) {
            grid += '<tr>';
            grid += makeAscendingRow(i);
            grid += makeDescendingRow(i);
            grid += makeAscendingRow(i);
            grid += makeDescendingRow(i);
            grid += '</tr>';
        }

        for (let i = GRID_MAX; i >= GRID_MIN; i--) {
            grid += '<tr>';
            grid += makeAscendingRow(i);
            grid += makeDescendingRow(i);
            grid += makeAscendingRow(i);
            grid += makeDescendingRow(i);
            grid += '</tr>';
        }

        grid += '</table>';
        $('#result-sign-wrap').html(grid);
    }

    function makeAscendingRow(i) {
        let row = '';

        for (let j = GRID_MIN; j <= GRID_MAX; j++) {
            row += makeTableCell(i, j);
        }

        return row;
    }

    function makeDescendingRow(i) {
        let row = '';

        for (let j = GRID_MAX; j >= GRID_MIN; j--) {
            row += makeTableCell(i, j);
        }

        return row;
    }

    function makeTableCell(i, j) {
        let cell = '';
        let cellValue = (i * j) % 10;

        cell += '<td class="value-' + cellValue + '"></td>';

        return cell;
    }
});