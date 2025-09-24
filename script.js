const gameBoard = ( function () {

    // private

    const board = Array(9).fill(' ');
    let currentPlayer='x';
    const checkGameOver = function() {
        // play(pos) function flips current player proactively. flip again for previous
        let previousPlayer = (currentPlayer==='x') ? 'o' : 'x';
        let temp = currentPlayer;
        currentPlayer = 's'; // leave state stopped if end condition matched
        if(checkWin('x')) {
            // TODO: FIX
            // add previous player at start of string to pass what to fill the grid box with
            // bad implemetation on play 'destroys' info about how to fill the box and have
            // to pass it back somehow.
            let out = previousPlayer + "Player x has won!!!";
            console.log(out);
            return out;
        }
        if(checkWin('o')) {
            let out = previousPlayer + "Player o has won!!!";
            console.log(out);
            return out;
        }
        if(checkBoardFull()) {
            let out = previousPlayer + "Board is full, the game is a draw!!!";
            console.log(out);
            return out;
        }
        currentPlayer = temp;
        return previousPlayer + "Player " + previousPlayer + " just played. Game continues.";
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
        // TODO: FIX
        // bad implementation on player flipping forces to pass info through
        // status strings. final output cuts the first character, so here
        // an extra space must be added
        if(currentPlayer==='s') {
            let out=" Can't play, game is already over";
            console.log(out);
            return out;
        }
        if(position>8 || position<0) {
            let out = " Invalid position: out of bounds";
            console.log(out);
            return out;
        }
        if(board[position]!==' ') {
            let out = " Invalid position: cell full";
            console.log(out);
            return out;
        }
        board[position] = currentPlayer;
        // if not game over, checkGameOver returns flipped player (correct)
        currentPlayer = (currentPlayer==='x') ? 'o' : 'x';

        //REMOVE ON RELEASE VERSION
        console.log();
        print();
        console.log();
        //=========================

        return checkGameOver();
    };
    const reset = function() {
        for(let i=0; i<9; i++) board[i]=' ';
        currentPlayer = 'x';
        let out = "Game has been reset!!!";
        console.log(out);
        console.log();
        print();
        return(out);
    }


    // do stuff
    console.log("New game has started!!!");
    console.log();
    print();

    return { print, play, reset };
})();

const interface = ( function () {
    const status = document.querySelector("div.statustext");
    
    for(let i=0; i<9; i++) {
        const box = "div.box#b" + i; // i hate implicit casting
        document.querySelector(box).addEventListener("click", function(e) {
            let statusText = gameBoard.play(i);

            //extract player
            let player = statusText.charAt(0);
            //remove extra info on string
            status.textContent = statusText.slice(1);
            //yes this is junk, but simple and readable
            if(e.target.firstChild.textContent==='') {
                if(player==='x' || player==='o') {
                    //update board display
                    e.target.firstChild.textContent = (player==='x') ? 'X' : 'O';
                }
            }
        });
    }

    document.querySelector("#reset").addEventListener("click", function(e) {
        let statusText = gameBoard.reset();
        status.textContent = statusText;
        //clear board
        for(let i=0; i<9; i++) {
            const box = "div.box#b" + i; // still hate implicit casting
            document.querySelector(box).firstChild.textContent = '';
        }
    });

    return { };
})();
