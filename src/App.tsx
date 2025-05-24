import './App.css'
import image from './assets/glassBeaker.webp';

function App() {
  return (
    <>
      <div className='h-dvh'>
        <div className="flex items-center h-full">
          <div className='basis-1/2 flex items-center justify-center'>
            <h1 className='font-mono font-bold text-2xl'>Puzzle Lab</h1>
          </div>
          <div className="basis-1/2 flex flex-wrap gap-4 justify-center">
            <div className='bg-gray-600 rounded-md h-40 w-35 flex flex-col items-center justify-center'>
              <img className='size-24 rounded-md mb-2' src={image}></img>
              <button className='bg-green-500 hover:bg-green-700 focus:outline-2 focus:outline-offset-2 focus:outline-green-500 rounded-sm p-1'>
                Start Puzzle
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
