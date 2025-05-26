import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import SlidingPuzzlePage from './pages/puzzles/SlidingPuzzlePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/puzzles/sliding" element={<SlidingPuzzlePage />} />
    </Routes>
  )
}

export default App
