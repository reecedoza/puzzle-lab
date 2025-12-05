export type Board = number[][];

export function findEmptyPosition(board: Board): [number, number] {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === 0) {
        return [row, col];
      }
    }
  }
  throw new Error('Empty position not found');
}

export function canMoveTile(board: Board, tileRow: number, tileCol: number): boolean {
  const [emptyRow, emptyCol] = findEmptyPosition(board);
  
  const rowDiff = Math.abs(tileRow - emptyRow);
  const colDiff = Math.abs(tileCol - emptyCol);
  
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

export function moveTile(board: Board, tileRow: number, tileCol: number): Board {
  if (!canMoveTile(board, tileRow, tileCol)) {
    return board;
  }
  
  const newBoard = board.map(row => [...row]);
  const [emptyRow, emptyCol] = findEmptyPosition(board);
  
  const tileValue = newBoard[tileRow][tileCol];
  newBoard[tileRow][tileCol] = 0;
  newBoard[emptyRow][emptyCol] = tileValue;
  
  return newBoard;
}

export function shuffleBoard(board: Board, numMoves: number = 100): Board {
  let currentBoard = board.map(row => [...row]);
  
  for (let i = 0; i < numMoves; i++) {
    const validMoves: Array<[number, number]> = [];
    
    for (let row = 0; row < currentBoard.length; row++) {
      for (let col = 0; col < currentBoard[row].length; col++) {
        if (currentBoard[row][col] !== 0 && canMoveTile(currentBoard, row, col)) {
          validMoves.push([row, col]);
        }
      }
    }
    
    if (validMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * validMoves.length);
      const [moveRow, moveCol] = validMoves[randomIndex];
      currentBoard = moveTile(currentBoard, moveRow, moveCol);
    }
  }
  
  return currentBoard;
}