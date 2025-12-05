import { useMachine } from '@xstate/react';
import { picturePuzzleStateMachine } from '../../../machines/picturePuzzleMachine';
import './PicturePuzzle.css';
import { Play, RotateCcw } from 'lucide-react';

const MACHU_PICHU_IMAGE = 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&h=600&fit=crop';

const PicturePuzzle: React.FC = () => {
    const [state, send] = useMachine(picturePuzzleStateMachine);

    const handleStartGame = () => {
        send({ type:'START_GAME' })
    }
    
    const handleRestart = () => {
        send({ type: 'RESTART' })
    }

    const handlePlayAgain = () => {
        send({ type: 'PLAY_AGAIN' })
    }

    const handleTileClick = (row: number, col: number) => {
        send({ type: 'MOVE_TILE', row, col })
    }

    return (
        <div className='flex flex-col items-center space-y-4 p-6'>
            <h2 className='text-center text-gray-800'>Picture Puzzle</h2>
            <div className="picture-board">
                {state.context.board.map((row, rowIndex) => 
                    row.map((tile, colIndex) => (
                        <div 
                            key={`${rowIndex}-${colIndex}`}
                            className={`picture-tile ${tile === 0 ? 'empty' : `tile-${tile}`}`}
                            style={{backgroundImage: tile === 0 ? 'none' : `url(${MACHU_PICHU_IMAGE})`}}
                            onClick={() => handleTileClick(rowIndex, colIndex)}>
                        </div>
                    ))
                )}

                {state.value === 'idle' && (
                    <div className='puzzle-overlay bg-green-500/80'>
                        <button 
                        onClick={handleStartGame} 
                        className='flex items-center space-x-2 px-6 py-3 bg-white text-green-600 font-bold rounded-lg hover:scale-105 transition-transform'
                        >
                            <Play size={20} />
                            <span>Start Game</span>
                        </button>
                    </div>
                )}

                {state.value === 'won' && (
                    <div className="puzzle-overlay bg-yellow-400/80">
                        <div className="flex flex-col items-center text-center text-gray-800">
                            <h3 className="text-2xl font-bold mb-2">🎉 Congratulations! 🎉</h3>
                            <p className="text-lg mb-4">You solved it in {state.context.moves} moves!</p>
                            <button 
                                onClick={handlePlayAgain} 
                                className="flex items-center space-x-2 px-6 py-3 bg-white text-yellow-600 font-bold rounded-lg hover:scale-105 transition-transform"
                            >
                                <Play size={18} />
                                <span>Play Again</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className='flex justify-between items-center w-80 px-3'>
                <p className="text-gray-600 font-medium">Moves: {state.context.moves}</p>
                {state.value === 'playing' && (
                    <button 
                        onClick={handleRestart} 
                        className="flex items-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:scale-105 transition-all"
                    >
                        <RotateCcw size={18} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default PicturePuzzle;