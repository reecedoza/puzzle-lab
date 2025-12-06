import { assign, createMachine } from 'xstate';

export type Board = number[][];

export const slidingPuzzleStateMachine = createMachine({
  id: 'slidingPuzzle',  
  context: {
    board: [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]],
    moves: 0
  },
  initial: 'idle',
  states: {
    idle: { 
      on: { 
        START_GAME: {
          target: 'playing',
          actions: assign({
            board: ({context}) => shuffleBoard(context.board),
            moves: 0
          })
        }
      } 
    },
    playing: {
      on: {
        MOVE_TILE: {
          guard: ({ context, event }) => canMoveTile(context.board, event.row, event.col),
          actions: assign({
            board: ({context, event}) => moveTile(context.board, event.row, event.col),
            moves: ({context}) => context.moves + 1
          })
        },
        RESTART: {
          actions: assign({
            board: ({context}) => shuffleBoard(context.board),
            moves: 0
          })
        },
      },
      always: {
        guard: ({context}) => isSolved(context.board),
        target: 'won'
      }
    },
    won: { 
      on: { 
        PLAY_AGAIN: {
          target: 'playing', 
          actions: assign({
            board: ({context}) => shuffleBoard(context.board),
            moves: 0
          })
        }
      } 
    }
  },
});

function isSolved(board: Board): boolean {
    const solvedBoard = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]]; // could update to hold any board size?

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] !== solvedBoard[row][col]) {
                return false;
            }
        }
    }
    
    return true;
}

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