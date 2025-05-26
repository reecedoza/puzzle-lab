import React from 'react';
import { puzzleStateMachine } from '../machines/gameMachine';
import { useMachine } from '@xstate/react';
import { AnimatePresence, motion } from 'motion/react';
import { Play, RotateCcw } from 'lucide-react';

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
            <h2 className='puzzle-title mb-1'>Sliding Puzzle</h2>
            <div className={`board ${state.value}`}>
                {state.context.board.map((row, rowIndex)=> 
                    row.map((tile, colIndex) => (
                        <motion.div 
                            key={`${rowIndex}-${colIndex}`}
                            className={`tile ${tile === 0 ? 'empty' : ''}`}
                            onClick={() => handleTileClick(rowIndex, colIndex)}
                            layout
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                visualDuration: 0.5,    
                                bounce: 0.25,
                                damping: 25
                            }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={tile} // ← Different key strategy here
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    {tile === 0 ? '' : tile}
                                </motion.span>
                            </AnimatePresence>
                        </motion.div>
                    ))
                )}
                {state.value === 'idle' && (
                    <div className='overlay start-overlay'>
                        <button onClick={handleStartGame} className='start-button'>
                            <Play size={20} className="button-icon" />
                            Start Game
                        </button>
                    </div>
                )}
                {state.value === 'won' && (
                    <div className="overlay win-overlay">
                        <div className="win-content flex flex-col">
                            <h3>🎉 Congratulations! 🎉</h3>
                            <p>You solved it in {state.context.moves} moves!</p>
                            <button onClick={handlePlayAgain} className="play-again-button">
                                <Play size={18} className="button-icon" />
                                Play Again
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className='flex justify-between items-center mt-1 px-3'>
                <p>Moves: {state.context.moves}</p>
                {state.value === 'playing' && (
                    <button onClick={handleRestart} className="restart-button">
                        <RotateCcw size={18} className="button-icon" />
                    </button>
                )}
            </div>
            {/* { TODO: Render board and buttons } */}
        </div>
    )
}
