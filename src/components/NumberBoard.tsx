type Board = number[][];

function findEmptyPosition(board: Board): [number, number] {
    for (let row = 0; row < board.length; row++) {
        for(let col = 0; col < board[row].length; col++) {
            if(board[row][col] === 0) {
                return [row, col];
            }
        }
    }

    throw new Error('Empty position not found');
}

function canMoveTile(board: Board, tileRow: number, tileCol: number): boolean {
    const [emptyRow, emptyCol] = findEmptyPosition(board);

    // adjacent tile should have 
    // same row with 1 col difference or 
    // 1 row difference with the same col
    const rowDiff = Math.abs(tileRow - emptyRow);
    const colDiff = Math.abs(tileCol - emptyCol);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

function moveTile(board: Board, tileRow: number, tileCol: number): Board {
    if (!canMoveTile(board, tileRow, tileCol)) {
        return board; // Could return the original since no change needed
    }
    
    const newBoard = board.map(row => [...row]);
    const [emptyRow, emptyCol] = findEmptyPosition(board);

    const tileValue = newBoard[tileRow][tileCol];
    newBoard[tileRow][tileCol] = 0;
    newBoard[emptyRow][emptyCol] = tileValue;

    return newBoard
}

function isSolved(board: Board): boolean {
    const solvedBoard = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] !== solvedBoard[row][col]) {
                return false;
            }
        }
    }
    
    return true;
}