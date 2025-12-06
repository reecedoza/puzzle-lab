import { assign, createMachine } from "xstate";

export type Tile = {
    id: number;
    row: number;
    col: number;
}

export type Position = {
    row: number;
    col: number;
}

export const picturePuzzleStateMachine = createMachine({
    id: 'picturePuzzle',
    context:{
        tiles: [
            { id: 1, row: 0, col: 0 },
            { id: 2, row: 0, col: 1 },
            { id: 3, row: 0, col: 2 },
            { id: 4, row: 1, col: 0 },
            { id: 5, row: 1, col: 1 },
            { id: 6, row: 1, col: 2 },
            { id: 7, row: 2, col: 0 },
            { id: 8, row: 2, col: 1 }
        ],
        emptyPosition: { row: 2, col: 2 },
        moves: 0
    },
    initial: 'idle',
    states: {
        idle: {
            on: {
                START_GAME: {
                    target: 'playing',
                    actions: assign(({context}) => {
                        const result = shuffleBoardAbsolute(context.tiles, context.emptyPosition, 50)
                        return {
                            tiles: result.tiles,
                            emptyPosition: result.emptyPosition,
                            moves: 0
                        }
                    })
                }
            }
        },
        playing: {
            on: {
                MOVE_TILE: {
                    guard: ({context, event}) => {
                        const tile = context.tiles.find(t => t.id === event.tileId);
                        return tile ? canMoveTileAbsolute(tile, context.emptyPosition) : false;
                    },
                    actions: assign(({context, event}) => {
                        const result = moveTileAbsolute(context.tiles, context.emptyPosition, event.tileId)
                        return {
                            tiles: result.tiles,
                            emptyPosition: result.emptyPosition,
                            moves: context.moves + 1
                        }
                    })
                },
                RESTART: {
                    actions: assign(({context}) => {
                        const result = shuffleBoardAbsolute(context.tiles, context.emptyPosition)
                        return {
                            tiles: result.tiles,
                            emptyPosition: result.emptyPosition,
                            moves: 0
                        }
                    })
                }
            },
            always: {
                guard: ({context}) => isSolvedAbsolute(context.tiles),
                target: 'won'
            }
        },
        won: {
            on: {
                PLAY_AGAIN: {
                    target: 'playing',
                    actions: assign(({context}) => {
                        const result = shuffleBoardAbsolute(context.tiles, context.emptyPosition)
                        return {
                            tiles: result.tiles,
                            emptyPosition: result.emptyPosition,
                            moves: 0
                        }
                    })
                }
            }
        }
    }
})

function isSolvedAbsolute(tiles: Tile[]):boolean {
    const solvedTiles = [
        { id: 1, row: 0, col: 0 },
        { id: 2, row: 0, col: 1 },
        { id: 3, row: 0, col: 2 },
        { id: 4, row: 1, col: 0 },
        { id: 5, row: 1, col: 1 },
        { id: 6, row: 1, col: 2 },
        { id: 7, row: 2, col: 0 },
        { id: 8, row: 2, col: 1 }
    ]

    for(let solvedTile of solvedTiles){
        const actualTile = tiles.find(t => t.id === solvedTile.id);

        if(!actualTile || actualTile.row !== solvedTile.row || actualTile.col !== solvedTile.col) {
            return false;
        }
    }

    return true;
}

export function canMoveTileAbsolute(tile: Tile, emptyPosition: Position): boolean {
  const rowDiff = Math.abs(tile.row - emptyPosition.row);
  const colDiff = Math.abs(tile.col - emptyPosition.col);
  
  return (rowDiff === 0 && colDiff === 1) || (rowDiff === 1 && colDiff === 0);
}

export function moveTileAbsolute(
    tiles: Tile[], 
    emptyPosition: Position, 
    tileId: number
): { tiles: Tile[], emptyPosition: Position } {
    const tileToMove = tiles.find(t => t.id === tileId);
    if (!tileToMove || !canMoveTileAbsolute(tileToMove, emptyPosition)) {
        return { tiles, emptyPosition };
    }
    
    const newTiles = tiles.map(tile => 
        tile.id === tileId ? { ...tile, row: emptyPosition.row, col: emptyPosition.col } : tile
    );
    
    const newEmptyPosition = { row: tileToMove.row, col: tileToMove.col }
    
    return { tiles: newTiles, emptyPosition: newEmptyPosition };
}

export function shuffleBoardAbsolute(tiles: Tile[], emptyPosition: Position, numMoves: number = 100): { tiles: Tile[], emptyPosition: Position } {
    let currentTiles = tiles.map(tile => ({...tile}));
    let currentEmpty = { ...emptyPosition };

    for(let i = 0; i < numMoves; i++) {
        // find all valid moves
        const validTiles: Tile[] = [];
        for(let tile of currentTiles){
            if(canMoveTileAbsolute(tile, currentEmpty)) {
                validTiles.push(tile);
            }
        }
        // choose one of the valid moves rnadomly
        const randomIndex = Math.floor(Math.random() * validTiles.length);
        const tileToMove = validTiles[randomIndex];

        const result = moveTileAbsolute(currentTiles, currentEmpty, tileToMove.id);
        currentTiles = result.tiles;
        currentEmpty = result.emptyPosition;
    }

    return { tiles: currentTiles, emptyPosition: currentEmpty };
}