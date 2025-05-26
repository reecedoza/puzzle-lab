import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import SlidingPuzzle from '../../components/puzzles/SlidingPuzzle'

const SlidingPuzzlePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Link 
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Puzzles
        </Link>

        <SlidingPuzzle />
      </div>
    </div>
  )
}

export default SlidingPuzzlePage