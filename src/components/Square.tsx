import type { Piece } from '../types/chess'

interface SquareProps {
    piece: Piece | null
    isLight: boolean
    isSelected: boolean
    isPossibleMove: boolean
    onClick: () => void
}

function getPieceEmoji(piece: Piece): string {
    const emojis = {
        white: { king: '♔', queen: '♕', rook: '♖', bishop: '♗', knight: '♘', pawn: '♙' },
        black: { king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟' }
    }
    return emojis[piece.color][piece.type]
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
                <span className="text-4xl select-none">
                    {getPieceEmoji(piece)}
                </span>
            )}
        </div>
    )
}

export default Square