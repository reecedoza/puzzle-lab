import { useMachine } from '@xstate/react';
import { picturePuzzleStateMachine } from '../../../machines/picturePuzzleMachine';
import './PicturePuzzle.css';
import { Play, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const MACHU_PICHU_IMAGE = 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&h=600&fit=crop';
const TILE_SIZE = 75;
const GAP = 2; // Gap between tiles

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

    const handleTileClick = (tileId: number) => {
        if(state.value === 'playing') {
            send({ type: 'MOVE_TILE', tileId })
        }
    }

    const getTilePosition = (row: number, col: number) => ({
        x: col * (TILE_SIZE + GAP),
        y: row * (TILE_SIZE + GAP)
    })

    return (
        <div className='flex flex-col items-center space-y-4 p-6'>
            <h2 className='text-center text-gray-800'>Picture Puzzle</h2>
            <div className="picture-board-container">
                {state.context.tiles.map((tile) => {
                    const position = getTilePosition(tile.row, tile.col);
                    return (
                        <motion.div 
                            key={tile.id}
                            className={`picture-tile-absolute tile-${tile.id}`}
                            style={{
                                backgroundImage: `url(${MACHU_PICHU_IMAGE})`,
                                x: position.x,
                                y: position.y
                            }}
                            animate={{ x: position.x, y: position.y }}
                            transition={{
                                type: "tween",
                                duration: 0.15,
                                ease: "easeInOut"
                            }}
                            onClick={() => handleTileClick(tile.id)}>
                        </motion.div>
                    )
                })}

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