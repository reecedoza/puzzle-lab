import React from 'react';
import { puzzleStateMachine } from '../machines/gameMachine';
import { useMachine } from '@xstate/react';

export const SlidingPuzzle: React.FC = () => {
    const [state, send] = useMachine(puzzleStateMachine)

    const handleTileClick = (row: number, col: number) => {
        send({ type: 'MOVE_TILE', row, col });
    };

    return (
        <div className='puzzle-container'>
            <h2>Sliding Puzzle</h2>
            <p>Moves: {state.context.moves}</p>

            <div className={`board ${state.value}`}>
                {state.context.board.map((row, rowIndex)=> 
                    row.map((tile, colIndex) => (
                        <div 
                            key={`${rowIndex}-${colIndex}`}
                            className={`tile ${tile === 0 ? 'empty' : ''}`}
                            onClick={() => handleTileClick(rowIndex, colIndex)}
                        >
                            {tile === 0 ? '': tile}
                        </div>
                    ))
                )}
            </div>
            {/* { TODO: Render board and buttons } */}
        </div>
    )
}
