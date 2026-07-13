import { create } from 'zustand'
import type { Board, Position, Piece } from '../types/chess'
import { createInitialBoard } from '../utils/initialBoard'
import { getPawnMoves, getRookMoves, getBishopMoves,  getKnightMoves, getQueenMoves, getKingMoves, isKingInCheck, isCheckmate } from '../utils/move'

interface GameState {
    board: Board
    currentPlayer: 'white' | 'black'
    selectedPosition: Position | null
    possibleMoves: Position[]
    isInCheck: boolean
    isCheckmate: boolean
    castlingRights: {
        white: { kingSide: boolean, queenSide: boolean }
        black: { kingSide: boolean, queenSide: boolean }
    }
    capturedPieces: {
    white: Piece[]  // pièces capturées par les blancs
    black: Piece[]  // pièces capturées par les noirs
    }
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
    castlingRights: {
        white: { kingSide: true, queenSide: true },
        black: { kingSide: true, queenSide: true }
    },
    capturedPieces: {
        white: [],
        black: []
    },

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
            moves = getKingMoves(state.board, position, piece.color, state.castlingRights[piece.color])
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

        const newCastlingRights = { ...state.castlingRights }

        const movingPiece = newBoard[to.row][to.col]

        // Si le roi bouge → plus de roque possible
        if (movingPiece?.type === 'king') {
            newCastlingRights[currentPlayer] = { kingSide: false, queenSide: false }
        }

        // Si la tour bouge → on retire le roque du côté concerné
        if (movingPiece?.type === 'rook') {
            if (selectedPosition.col === 0) {
                newCastlingRights[currentPlayer].queenSide = false
            } else if (selectedPosition.col === 7) {
                newCastlingRights[currentPlayer].kingSide = false
            }
        }

        // Vérifier si c'est un roque
        const piece = board[selectedPosition.row][selectedPosition.col]
        if (piece?.type === 'king') {
            const colDiff = to.col - selectedPosition.col
    
            // Petit roque (roi va de e1 à g1 → colDiff = 2)
            if (colDiff === 2) {
                newBoard[to.row][7] = null  // on vide la tour
                newBoard[to.row][5] = { type: 'rook', color: piece.color }  // tour en f1
            }
    
            // Grand roque (roi va de e1 à c1 → colDiff = -2)
            if (colDiff === -2) {
                newBoard[to.row][0] = null  // on vide la tour
                newBoard[to.row][3] = { type: 'rook', color: piece.color }  // tour en d1
            }
        }

        // Promotion du pion
        if (newBoard[to.row][to.col]?.type === 'pawn') {
            if (to.row === 0 || to.row === 7) {
            newBoard[to.row][to.col] = { type: 'queen', color: newBoard[to.row][to.col]!.color }
            }
        }

        const capturedPiece = board[to.row][to.col]
        const newCapturedPieces = {
            white: [...state.capturedPieces.white],
            black: [...state.capturedPieces.black]
        }

        if (capturedPiece) {
            newCapturedPieces[currentPlayer].push(capturedPiece)
        }

        return {
            board: newBoard,
            selectedPosition: null,
            possibleMoves: [],
            currentPlayer: nextPlayer,
            isInCheck: inCheck,
            isCheckmate: checkmate,
            castlingRights: newCastlingRights,
            capturedPieces: newCapturedPieces
        }
    }),

    resetGame: () => set({
        board: createInitialBoard(),
        currentPlayer: 'white',
        selectedPosition: null,
        possibleMoves: [],
        isInCheck: false,
        castlingRights: {
        white: { kingSide: true, queenSide: true },
        black: { kingSide: true, queenSide: true }
    },
    }),
}))