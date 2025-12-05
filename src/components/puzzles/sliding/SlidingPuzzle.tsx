import { slidingPuzzleStateMachine } from '../../../machines/slidingPuzzleMachine';
import { useMachine } from '@xstate/react';
import { AnimatePresence, motion } from 'motion/react';
import { Play, RotateCcw } from 'lucide-react';
import './SlidingPuzzle.css'

const SlidingPuzzle: React.FC = () => {
    const [state, send] = useMachine(slidingPuzzleStateMachine)

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

    return (<div className='flex flex-col items-center space-y-4 p-6'>
      <h2 className='text-center text-gray-800'>Sliding Puzzle</h2>
      
      <div className={`puzzle-board bg-gray-800 rounded-lg border border-yellow-600 p-2 ${state.value === 'won' ? 'board-won' : ''}`}>
        {state.context.board.map((row, rowIndex)=>
          row.map((tile, colIndex) => (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              className={`puzzle-tile bg-green-500 text-white ${tile === 0 ? 'empty' : ''}`}
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
                  key={tile}
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

export default SlidingPuzzle;
