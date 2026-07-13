import Board from './components/Board'
import { useGameStore } from './store/gameStore'

function App() {
  const { currentPlayer, resetGame, isInCheck, isCheckmate, capturedPieces } = useGameStore()
  return (
    <div className="h-screen bg-gray-800 flex flex-col items-center justify-start pt-2 overflow-hidden">
        <div className="flex items-center gap-4 mb-4">
            <span className="text-white text-xl font-bold">
                {currentPlayer === 'white' ? '♔ Tour des blancs' : '♚ Tour des noirs'}
            </span>
            {isInCheck && !isCheckmate && (
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
        <div className="flex gap-4 items-start">
            <Board />
            <div className="flex flex-col justify-between" style={{height: '350px'}}>
                <div>
                    <div className="mt-4">
                        <p className="text-amber-200 text-sm mb-1">Noirs ont pris :</p>
                        <div className="flex flex-wrap gap-1">
                            {capturedPieces.black.map((piece, i) => (
                                console.log(piece),
                                <img 
                                    key={i}
                                    alt=""
                                    width={48}
                                    height={48}
                                    src={`https://lichess1.org/assets/piece/cburnett/${piece.color ===  'white' ? 'w' : 'b'}${piece.type === 'knight' ? 'N' : piece.type[0].toUpperCase()}.svg`}
                                    className="w-12 h-12"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                  <p className="text-amber-200 text-sm mb-1">Blancs ont pris :</p>
                    <div className="flex flex-wrap gap-1">
                        {capturedPieces.white.map((piece, i) => (
                            console.log(piece),
                            <img 
                                key={i}
                                alt=""
                                width={48}
                                height={48}
                                src={`https://lichess1.org/assets/piece/cburnett/${piece.color === 'white' ? 'w' : 'b'}${piece.type === 'knight' ? 'N' : piece.type[0].toUpperCase()}.svg`}
                                className="w-12 h-12"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default App