import Board from './components/Board'
import { useGameStore } from './store/gameStore'

function App() {
  const { currentPlayer, resetGame, isInCheck, isCheckmate, capturedPieces } = useGameStore()
    return (
        <div className="h-screen bg-gray-900 flex items-center justify-center gap-8">
            <Board />
        
            <div className="bg-gray-800 rounded-xl p-6 w-56 flex flex-col gap-6">
            
                {/* Joueur actif */}
                <div className="text-center">
                    <span className="text-white text-lg font-bold">
                        {currentPlayer === 'white' ? '♔ Tour des blancs' : '♚ Tour des noirs'}
                    </span>
                    {isInCheck && !isCheckmate && <p className="text-red-400 animate-pulse mt-1">⚠️ Échec !</p>}
                    {isCheckmate && <p className="text-red-500 animate-pulse mt-1">🏁 Échec et mat !</p>}
                </div>

                {/* Pièces capturées par les noirs */}
                <div>
                    <p className="text-amber-200 text-sm mb-2">Noirs ont pris :</p>
                    <div className="flex flex-wrap gap-1">
                        {capturedPieces.black.map((piece, i) => (
                            <img key={i} src={`https://lichess1.org/assets/piece/cburnett/${piece.color === 'white' ? 'w' : 'b'}${piece.type === 'knight' ? 'N' : piece.type[0].toUpperCase()}.svg`} className="w-6 h-6" />
                        ))}
                    </div>
                </div>

                {/* Pièces capturées par les blancs */}
                <div>
                    <p className="text-amber-200 text-sm mb-2">Blancs ont pris :</p>
                    <div className="flex flex-wrap gap-1">
                        {capturedPieces.white.map((piece, i) => (
                            <img key={i} src={`https://lichess1.org/assets/piece/cburnett/${piece.color === 'white' ? 'w' : 'b'}${piece.type === 'knight' ? 'N' : piece.type[0].toUpperCase()}.svg`} className="w-6 h-6" />
                        ))}
                    </div>
                </div>

                {/* Bouton reset */}
                <button 
                    onClick={resetGame}
                    className="px-4 py-2 bg-amber-800 text-white rounded-full hover:bg-amber-700 w-full"
                >
                    🔄 Nouvelle partie
                </button>
            </div>
        </div>
    )
}

export default App