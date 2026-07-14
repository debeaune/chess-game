import type { Piece } from '../types/chess'

interface SquareProps {
    piece: Piece | null
    isLight: boolean
    isSelected: boolean
    isPossibleMove: boolean
    onClick: () => void
}

function getPieceImage(piece: Piece): string {
    const color = piece.color === 'white' ? 'w' : 'b'
    const type = {
        king: 'K', queen: 'Q', rook: 'R', 
        bishop: 'B', knight: 'N', pawn: 'P'
    }[piece.type]
    return `https://lichess1.org/assets/piece/cburnett/${color}${type}.svg`
}

function Square({ piece, isLight, isSelected, isPossibleMove, onClick }: SquareProps) {
    return (
        <div
            onClick={onClick}
            className={`w-12 h-12 flex items-center justify-center cursor-pointer
                ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
                ${isSelected ? 'ring-4 ring-blue-500' : ''}
                ${isPossibleMove ? 'ring-4 ring-green-400' : ''}
            `}
        >
            {piece && (
                <img 
                    src={getPieceImage(piece)}
                    alt={`${piece.color} ${piece.type}`}
                    className="w-10 h-10 select-none"
                />
            )}
        </div>
    )
}

export default Square