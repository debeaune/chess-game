import Square from './Square'
import { useGameStore } from '../store/gameStore'

function Board() {
    const { board, selectedPosition, possibleMoves, selectPiece, movePiece } = useGameStore()

    return (
        <div className="flex flex-col items-center">
            <div className="flex">
                <div className="w-6" /> {/* espace pour les chiffres */}
                    {['a','b','c','d','e','f','g','h'].map(letter => (
                    <div key={letter} className="w-10 text-center text-amber-200 text-sm font-bold">
                        {letter}
                    </div>
                ))}
                </div>
            <div className="flex">
                <div className="flex flex-col justify-around mr-1">
                    {[8,7,6,5,4,3,2,1].map(num => (
                        <div key={num} className="w-6 text-center text-amber-200 text-sm font-bold h-10 flex items-center">
                            {num}
                        </div>
                    ))}
                </div>
                <div className="border-4 border-amber-900 inline-block">
                    {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {row.map((piece, colIndex) => (
                            <Square
                                key={colIndex}
                                piece={piece}
                                isLight={(rowIndex + colIndex) % 2 === 0}
                                isSelected={selectedPosition?.row === rowIndex && selectedPosition?.col === colIndex}
                                isPossibleMove={possibleMoves.some(move => move.row === rowIndex && move.col === colIndex)}
                                onClick={() => {
                                    if (possibleMoves.some(move => move.row === rowIndex && move.col === colIndex)) {
                                        movePiece({ row: rowIndex, col: colIndex })
                                    } else {
                                        selectPiece({ row: rowIndex, col: colIndex })
                                    }
                                }}
                            />
                        ))}
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Board