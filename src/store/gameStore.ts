import { create } from 'zustand'
import type { Board, Position } from '../types/chess'
import { createInitialBoard } from '../utils/initialBoard'
import { getPawnMoves, getRookMoves, getBishopMoves,  getKnightMoves, getQueenMoves, getKingMoves, isKingInCheck } from '../utils/move'

interface GameState {
    board: Board
    currentPlayer: 'white' | 'black'
    selectedPosition: Position | null
    possibleMoves: Position[]
    isInCheck: boolean
}

interface GameActions {
    selectPiece: (position: Position) => void
    movePiece: (to: Position) => void
    resetGame: () => void
}

export const useGameStore = create<GameState & GameActions>((set) => ({
    board: createInitialBoard(),
    currentPlayer: 'white',
    selectedPosition: null,
    possibleMoves: [],
    isInCheck: false,

    selectPiece: (position) => set((state) => {
        const piece = state.board[position.row][position.col] 
        console.log('currentPlayer', state.currentPlayer)
        if (!piece) return { selectedPosition: null, possibleMoves: [] }
        if (piece.color !== state.currentPlayer) return { selectedPosition: null, possibleMoves: [] }
    
        let moves: Position[] = []
    
        if (piece.type === 'pawn') {
            moves = getPawnMoves(state.board, position, piece.color)
        } else if (piece.type === 'rook') {
            moves = getRookMoves(state.board, position, piece.color)
        } else if (piece.type === 'bishop') {
            moves = getBishopMoves(state.board, position, piece.color)
        }  else if (piece.type === 'knight') {
            moves = getKnightMoves(state.board, position, piece.color)
        }  else if (piece.type === 'queen') {
            moves = getQueenMoves(state.board, position, piece.color)
        } else if (piece.type === 'king') {
            moves = getKingMoves(state.board, position, piece.color)
        }
    
        return {
            selectedPosition: position,
            possibleMoves: moves
        }
    }),

    movePiece: (to) => set((state) => {
        console.log('movePiece appelé', to)
        const { board, selectedPosition, currentPlayer } = state
    
        if (!selectedPosition) return {}
    
        const newBoard = board.map(row => [...row])
        newBoard[to.row][to.col] = newBoard[selectedPosition.row][selectedPosition.col]
        newBoard[selectedPosition.row][selectedPosition.col] = null

        const nextPlayer = currentPlayer === 'white' ? 'black' : 'white'
        const inCheck = isKingInCheck(newBoard, nextPlayer)
    
        return {
            board: newBoard,
            selectedPosition: null,
            possibleMoves: [],
            currentPlayer: nextPlayer,
            isInCheck: inCheck
        }
    }),

    resetGame: () => set({
        board: createInitialBoard(),
        currentPlayer: 'white',
        selectedPosition: null,
        possibleMoves: [],
        isInCheck: false,
    }),
}))