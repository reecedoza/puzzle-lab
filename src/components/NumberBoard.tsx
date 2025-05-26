import React from 'react';
import { puzzleStateMachine } from '../machines/gameMachine';
import { useMachine } from '@xstate/react';

export const SlidingPuzzle: React.FC = () => {
    const [state, send] = useMachine(puzzleStateMachine)

    const handleTileClick = (row: number, col: number) => {
        send({ type: 'MOVE_TILE', row, col });
    };

    const handleStartGame = (): void => {
        send({ type: 'START_GAME' });
    };

    const handlePlayAgain = (): void => {
        send({ type: 'PLAY_AGAIN' });
    };

    const handleRestart = (): void => {
        send({ type: 'RESTART' });
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
                {state.value === 'idle' && (
                    <div className='overlay start-overlay'>
                        <button onClick={handleStartGame} className='start-button'>
                            Start Game
                        </button>
                    </div>
                )}
                {state.value === 'won' && (
                    <div className="overlay win-overlay">
                        <div className="win-content">
                            <h3>🎉 Congratulations! 🎉</h3>
                            <p>You solved it in {state.context.moves} moves!</p>
                            <button onClick={handlePlayAgain} className="play-again-button">
                                Play Again
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {state.value === 'playing' && (
                <button onClick={handleRestart} className="restart-button">
                    Restart
                </button>
            )}
            {/* { TODO: Render board and buttons } */}
        </div>
    )
}
