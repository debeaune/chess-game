import { create } from 'zustand'
import type { Board, Position } from '../types/chess'
import { createInitialBoard } from '../utils/initialBoard'
import { getPawnMoves, getRookMoves, getBishopMoves,  getKnightMoves, getQueenMoves, getKingMoves, isKingInCheck, isCheckmate } from '../utils/move'

interface GameState {
    board: Board
    currentPlayer: 'white' | 'black'
    selectedPosition: Position | null
    possibleMoves: Position[]
    isInCheck: boolean
    isCheckmate: boolean
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
    isCheckmate: false,

    selectPiece: (position) => set((state) => {
        const piece = state.board[position.row][position.col] 
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

        moves = moves.filter(move => {
            const testBoard = state.board.map(row => [...row])
            testBoard[move.row][move.col] = testBoard[position.row][position.col]
            testBoard[position.row][position.col] = null
            return !isKingInCheck(testBoard, piece.color)
        })
    
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
        const checkmate = inCheck && isCheckmate(newBoard, nextPlayer)

        return {
            board: newBoard,
            selectedPosition: null,
            possibleMoves: [],
            currentPlayer: nextPlayer,
            isInCheck: inCheck,
            isCheckmate: checkmate
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