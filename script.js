$(document).ready(function() {
    $('#calculate-btn').click(function() {
        createGrid();
        colorGrid(numbersToColor());
    });

    function createGrid() {
        cleanUp();

        let sizeChoice = $('#grid-size').val();

        switch(sizeChoice) {
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

    function colorGrid(birthDateNumbers) {
        $.each(birthDateNumbers, function(index, value) {
            $('.value-' + value).css('background-color', 'red');
        });
    }

    function numbersToColor() {
        // Get user's birth date
        let birthDate = [];
        birthDate.push($('#birth-day').val().split(''));
        birthDate.push($('#birth-month').val().split(''));
        birthDate.push($('#birth-year').val().split(''));

        // Set numbers from user input in one array
        let numbers = [].concat.apply([], birthDate);

        // Filter array to get only unique numbers
        let uniqueNumbers = numbers.filter(function(value, index) {
            return index === numbers.indexOf(value);
        });

        return uniqueNumbers;
    }

    function cleanUp() {
        $('#result-sign').remove();
    }

    function createSmallGrid() {
        console.log('i want small grid');
        let grid = '<table id="result-sign">';

        for (let i = 1; i <= 9; i++) {
            grid += '<tr>';
            for (let j = 1; j <= 9; j++) {
                let cellValue = (i * j) % 10;
                grid += '<td class="value-' + cellValue + '">'+cellValue+'</td>';
            }
            grid += '</tr>';
        }
        grid += '</table>';
        $('#result-sign-wrap').html(grid);
    }

    function createMediumGrid() {
        console.log('i want medium grid');
    }

    function createLargeGrid() {
        console.log('i want large grid');
    }



















    // function sleep(milliseconds) {
    //     const date = Date.now();
    //     let currentDate = null;
    //     do {
    //         currentDate = Date.now();
    //     } while (currentDate - date < milliseconds);
    // }
});