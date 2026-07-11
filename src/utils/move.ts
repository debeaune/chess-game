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
    console.log('queen moves:', moves)
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


