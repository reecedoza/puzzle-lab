import { Grid3X3 } from "lucide-react";
import { Link } from "react-router";

const HomePage = () => {
    const puzzles = [
        {
            id: 'sliding',
            name: 'Sliding Puzzle',
            description: '15-puzzle sliding game',
            path: '/puzzles/sliding',
            icon: Grid3X3,
            color: 'bg-green-500 hover:bg-green-600',
            iconColor: 'text-green-600'
        }
    ]
    
    return (
        <>
        <div className='min-h-screen bg-gray-100 py-12 px-4'>
            <div className="max-w-6xl mx-auto">
                <div className='text-center mb-12'>
                    <h1 className='text-5xl md:text-6xl font-bold text-gray-800 mb-4'>🧩 Puzzle Lab</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {puzzles.map((puzzle) => {
                        const IconComponent = puzzle.icon
                        
                        return (
                            <Link
                                key={puzzle.id}
                                to={puzzle.path}
                                className={`${puzzle.color} text-white rounded-xl p-8 shadow-lg transform hover:scale-105 transition-all duration-200 group`}
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-4 p-4 bg-white/90 rounded-full">
                                        <IconComponent size={48} className={puzzle.iconColor} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">{puzzle.name}</h3>
                                    <p className="text-lg opacity-90">{puzzle.description}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
}

export default HomePage;