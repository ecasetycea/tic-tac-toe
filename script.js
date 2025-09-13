const gameBoard = ( function () {
    const board = Array(9).fill(' ');
    const print = function() {
        console.log('@@@@@@@');
        console.log('@     @');
        console.log('@ ' + board[0] + board[1] + board[2] + ' @');
        console.log('@ ' + board[3] + board[4] + board[5] + ' @');
        console.log('@ ' + board[6] + board[7] + board[8] + ' @');
        console.log('@@@@@@@');
    };

    board[3]='x';
    board[5]='o';

    return { print };
})();