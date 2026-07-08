import Square from './Square'
import { useGameStore } from '../store/gameStore'

function Board() {
    const { board, selectedPosition, possibleMoves, selectPiece, movePiece } = useGameStore()

    return (
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
    )
}

export default Board