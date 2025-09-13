const gameBoard = ( function () {

    // private

    const board = Array(9).fill(' ');
    let currentPlayer='x';
    const checkGameOver = function() {
        if(checkWin('x')) {
            console.log("Player x has won!!!");
            return;
        }
        if(checkWin('o')) {
            console.log("Player o has won!!!");
            return;
        }
        if(checkBoardFull()) {
            console.log("Board is full, the game is a draw!!!");
            return;
        }
        return;
    };
    const checkWin = function(player) {
        let winCond = 0;
        if(player==='x') {
            winCond = 3;
        } else if(player==='o') {
            winCond = 15;
        } else {
            console.log("Invalid player input for win check");
            return;
        }

        for(let i=1; i<4; i++) {
            if(evaluateRow(i)===winCond) return true;
            if(evaluateColumn(i)===winCond) return true;
        }
        if(evaluateDiag(1)===winCond) return true;
        if(evaluateDiag(-1)===winCond) return true;

        return false;
    };
    const checkBoardFull = function() {
        for(let i=0; i<9; i++) {
            if(board[i]===' ') return false;
        }
        return true;
    };

    // Assign values to cells to easily find winner
    // winning condition: line sum=3 for x or 15 for o, no overlap
    const evaluateCell = function(position) {
        if( position<0 || position>8 ) return 0;
        if(board[position]===' ') return 0;
        if(board[position]==='x') return 1;
        if(board[position]==='o') return 5;
    };
    //index 1,2,3
    const evaluateRow = function(index) {
        if(index<1 || index>3) return 0;
        let sum = 0;
        for(let i=0; i<3; i++) {
            sum += evaluateCell( (index-1)*3 + i );
        }
        return sum;
    };
    //index 1,2,3
    const evaluateColumn = function(index) {
        if(index<1 || index>3) return 0;
        let sum = 0;
        for(let i=0; i<3; i++) {
            sum+= evaluateCell( (index-1) + i*3 );
        }
        return sum;
    };
    //index 1,-1
    const evaluateDiag = function(index) {
        let sum = 0;
        if(index === 1) {
            sum = evaluateCell(0) + evaluateCell(4) + evaluateCell(8);
        }
        if(index === -1) {
            sum = evaluateCell(2) + evaluateCell(4) + evaluateCell(6);
        }
        return sum;
    }


    // public
    
    const print = function() {
        console.log('@@@@@@@');
        console.log('@     @');
        console.log('@ ' + board[0] + board[1] + board[2] + ' @');
        console.log('@ ' + board[3] + board[4] + board[5] + ' @');
        console.log('@ ' + board[6] + board[7] + board[8] + ' @');
        console.log('@     @');
        console.log('@@@@@@@');
    };
    const play = function(position) {
        if(currentPlayer='s') {
            console.log("Can't play, game is already over");
            return;
        }
        if(position>8 || position<0) {
            console.log("Invalid position: out of bounds");
            return;
        }
        if(board[position]!==' ') {
            console.log("Invalid position: cell full");
            return;
        }
        board[position] = currentPlayer;
        currentPlayer = (currentPlayer==='x') ? 'o' : 'x';

        print();
        checkGameOver();
    };

    return { print, play };
})();