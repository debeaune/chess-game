export interface Piece {
    type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
    color: 'white' | 'black'
}

export type Board = (Piece | null)[][]

export interface Position {
    row: number
    col: number
}
