import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import SlidingPuzzlePage from './pages/puzzles/SlidingPuzzlePage';
import PicturePuzzlePage from './pages/puzzles/PicturePuzzlePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/puzzles/sliding" element={<SlidingPuzzlePage />} />
      <Route path="/puzzles/picture" element={<PicturePuzzlePage />} />
    </Routes>
  )
}

export default App
