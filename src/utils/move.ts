import type { Board, Piece, Position } from '../types/chess'

export function getPawnMoves(board: Board, position: Position, color: 'white' | 'black'): Position[] {
    const moves: Position[] = []
    const direction = color === 'white' ? -1 : 1

    const oneStep = position.row + direction

    if (oneStep >= 0 && oneStep < 8 && board[oneStep][position.col] === null) {
    moves.push({ row: oneStep, col: position.col })
    }

    const startRow = color === 'white' ? 6 : 1
    const twoSteps = position.row + direction * 2

    if (position.row === startRow && board[oneStep][position.col] === null && board[twoSteps][position.col] === null) {
        moves.push({ row: twoSteps, col: position.col })
    }
    
    const captureCols = [position.col - 1, position.col + 1]

    captureCols.forEach(col => {
        if (col >= 0 && col < 8 && board[oneStep][col] !== null && board[oneStep][col]?.color !== color) {
        moves.push({ row: oneStep, col })
        }
    })

    return moves
}

export function getRookMoves(board: Board, position: Position, color: 'white' | 'black'): Position[] {
    const moves: Position[] = []
    const directions = [
        { row: -1, col: 0 }, // haut
        { row: 1, col: 0 },  // bas
        { row: 0, col: -1 }, // gauche
        { row: 0, col: 1 },  // droite
    ]

    directions.forEach(dir => {
    let row = position.row + dir.row
    let col = position.col + dir.col
    
    while (row >= 0 && row < 8 && col >= 0 && col < 8) {
        if (board[row][col] === null) {
            moves.push({ row, col })
        } else if (board[row][col]?.color !== color) {
            moves.push({ row, col })
            break
        } else {
            break
        }
        row += dir.row
        col += dir.col
    }
})

    return moves
}

export function getBishopMoves(board: Board, position: Position, color: 'white' | 'black'): Position[] {
    const moves: Position[] = []
    const directions = [
        { row: -1, col: -1 }, // haut-gauche
        { row: -1, col: +1 },  // haut-droite
        { row: +1, col: -1 }, // bas-gauche
        { row: +1, col: +1 },  // bas-droite
    ]

    directions.forEach(dir => {
        let row = position.row + dir.row
        let col = position.col + dir.col
    
        while (row >= 0 && row < 8 && col >= 0 && col < 8) {
            if (board[row][col] === null) {
                moves.push({ row, col })
            } else if (board[row][col]?.color !== color) {
                moves.push({ row, col })
                break
            } else {
                break
            }
            row += dir.row
            col += dir.col
        }
    })

    return moves
}

export function getKnightMoves(board: Board, position: Position, color: 'white' | 'black'): Position[] {
    const moves: Position[] = []
    const directions = [
        { row: -2, col: -1 }, 
        { row: -1, col: -2 },  
        { row: +1, col: -2 }, 
        { row: +2, col: -1 },  
        { row: -2, col: +1 }, 
        { row: -1, col: +2 },  
        { row: +1, col: +2 }, 
        { row: +2, col: +1 },  
    ]

    directions.forEach(dir => {
        let row = position.row + dir.row
        let col = position.col + dir.col

        if (row >= 0 && row < 8 && col >= 0 && col < 8) {
            if (board[row][col] === null || board[row][col]?.color !== color) {
            moves.push({ row, col })
            }
        }
    })

    return moves
}

export function getQueenMoves(board: Board, position: Position, color: 'white' | 'black'): Position[] {
    const moves = [
        ...getRookMoves(board, position, color),
        ...getBishopMoves(board, position, color)
    ]
    return moves
}

export function getKingMoves(board: Board, position: Position, color: 'white' | 'black'): Position[] {
    const moves: Position[] = []
    const directions = [
        { row: -1, col: -1 }, // haut-gauche
        { row: -1, col: 0 },  // haut
        { row: -1, col: +1 }, // haut-droite
        { row: 0, col: -1 },  // gauche
        { row: 0, col: +1 },  // droite
        { row: +1, col: -1 }, // bas-gauche
        { row: +1, col: 0 },  // bas
        { row: +1, col: +1 }, // bas-droite
    ]

    directions.forEach(dir => {
        let row = position.row + dir.row
        let col = position.col + dir.col

        if (row >= 0 && row < 8 && col >= 0 && col < 8) {
            if (board[row][col] === null || board[row][col]?.color !== color) {
            moves.push({ row, col })
            }
        }
    })

    return moves
}

function getMovesForPiece(board: Board, position: Position, piece: Piece): Position[] {
    switch (piece.type) {
        case 'pawn': return getPawnMoves(board, position, piece.color)
        case 'rook': return getRookMoves(board, position, piece.color)
        case 'bishop': return getBishopMoves(board, position, piece.color)
        case 'knight': return getKnightMoves(board, position, piece.color)
        case 'queen': return getQueenMoves(board, position, piece.color)
        case 'king': return getKingMoves(board, position, piece.color)
        default: return []
    }
}

export function isKingInCheck(board: Board, color: 'white' | 'black'): boolean {
    // 1. Trouver la position du roi
    let kingPosition: Position | null = null
    
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col]
            if (piece?.type === 'king' && piece?.color === color) {
                kingPosition = { row, col }
            }
        }
    }
    
    if (!kingPosition) return false
    
    // 2. Vérifier si une pièce adverse peut atteindre le roi
    const opponentColor = color === 'white' ? 'black' : 'white'

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col]
            if (piece && piece.color === opponentColor) {
                const moves = getMovesForPiece(board, { row, col }, piece)
                if (moves.some(move => move.row === kingPosition!.row && move.col === kingPosition!.col)) {
                    return true
                }
            }
        }
    }

    return false
    
}



