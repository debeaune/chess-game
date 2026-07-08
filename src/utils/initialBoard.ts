import type { Board, Piece } from '../types/chess'

export function createInitialBoard(): Board {
    const board: Board = Array(8).fill(null).map(() => Array(8).fill(null))
    
    // Pièces noires - rangée 0
    const blackPieces: Piece['type'][] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
    
    // Pièces blanches - rangée 7
    const whitePieces: Piece['type'][] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
    
    // Placer les grandes pièces
    blackPieces.forEach((type, col) => {
        board[0][col] = { type, color: 'black' }
        board[7][col] = { type: whitePieces[col], color: 'white' }
    })
    
    // Placer les pions
    for (let col = 0; col < 8; col++) {
        board[1][col] = { type: 'pawn', color: 'black' }
        board[6][col] = { type: 'pawn', color: 'white' }
    }
    
    return board
}