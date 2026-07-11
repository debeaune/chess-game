import Board from './components/Board'
import { useGameStore } from './store/gameStore'

function App() {
  const { currentPlayer, resetGame } = useGameStore()
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-start pt-4 p-4 overflow-y-auto">
        <div className="flex items-center gap-4 mb-4">
            <span className="text-white text-xl font-bold">
                {currentPlayer === 'white' ? '♔ Tour des blancs' : '♚ Tour des noirs'}
            </span>
            <button 
                onClick={resetGame}
                className="px-4 py-2 bg-amber-800 text-white rounded-full hover:bg-amber-700"
            >
                🔄 Nouvelle partie
            </button>
        </div>
        <Board />
    </div>
  )
}
export default App
