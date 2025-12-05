import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import PicturePuzzle from '../../components/puzzles/picture/PicturePuzzle'

const PicturePuzzlePage = () => {
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

        <PicturePuzzle />
      </div>
    </div>
  )
}

export default PicturePuzzlePage