import Board from './components/Board'
import { useGameStore } from './store/gameStore'

function App() {
  const { currentPlayer, resetGame, isInCheck, isCheckmate } = useGameStore()
  return (
    <div className="h-screen bg-gray-800 flex flex-col items-center justify-start pt-2 overflow-hidden">
        <div className="flex items-center gap-4 mb-4">
            <span className="text-white text-xl font-bold">
                {currentPlayer === 'white' ? '♔ Tour des blancs' : '♚ Tour des noirs'}
            </span>
            {isInCheck && (
                <div className="text-red-400 text-lg font-bold animate-pulse">
                    ⚠️ Échec !
                </div>
            )}
            {isCheckmate && (
                <div className="text-red-500 text-xl font-bold animate-pulse">
                    🏁 Échec et mat !
                </div>
            )}
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
