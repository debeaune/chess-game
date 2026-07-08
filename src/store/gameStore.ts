import { create } from 'zustand'
import type { Board, Position } from '../types/chess'
import { createInitialBoard } from '../utils/initialBoard'

interface GameState {
    board: Board
    currentPlayer: 'white' | 'black'
    selectedPosition: Position | null
    possibleMoves: Position[]
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

    selectPiece: (position) => set((state) => ({
        selectedPosition: position,
        possibleMoves: [] // on calculera les mouvements après
    })),

    movePiece: (to) => set((state) => ({
        // on implémentera ça après
    })),

    resetGame: () => set({
        board: createInitialBoard(),
        currentPlayer: 'white',
        selectedPosition: null,
        possibleMoves: [],
    }),
}))