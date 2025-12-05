import { assign, createMachine } from "xstate";
import { canMoveTile, moveTile, shuffleBoard, type Board } from "../utils/puzzleUtils";

export const picturePuzzleStateMachine = createMachine({
    id: 'picturePuzzle',
    context:{
        board: [
            [1,2,3],
            [4,5,6],
            [7,8,0]
        ],
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
                    guard: ({context, event}) => canMoveTile(context.board, event.row, event.col),
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
                }
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
    }
})

function isSolved(board: Board):boolean {
    const solvedBoard = [
        [1,2,3],
        [4,5,6],
        [7,8,0]
    ]

    for(let row = 0; row < board.length; row++){
        for(let col = 0; col < board[row].length; col++) {
            if(board[row][col] !== solvedBoard[row][col]) {
                return false;
            }
        }
    }

    return true;
}