import { createSlice } from "@reduxjs/toolkit";

const emptyBoard = [[null, null, null, null, null, null, null, null, null]];
const emptyCells = Array(9).fill(null);
export const gameSlice = createSlice({
  name: "game",
  initialState: {
    nextSymbol: "❌",
    cells: emptyCells,
    winner: null,
    history: emptyBoard,
    currentMove: 0,
  },
  reducers: {
    resetBoard: (state) => {
      state.nextSymbol = "❌";
      state.winner = null;
      state.cells = emptyCells;
      state.history = emptyBoard;
    },
    setNextSymbol: (state) => {
      state.nextSymbol = state.nextSymbol === "❌" ? "🇴" : "❌";
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
    setCells: (state, action) => {
      state.cells = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setCurrentMove: (state, action) => {
      state.currentMove = action.payload;
    },
  },
});

export const {
  resetBoard,
  setNextSymbol,
  setCells,
  setCurrentMove,
  setHistory,
  setWinner,
} = gameSlice.actions;

export default gameSlice.reducer;
