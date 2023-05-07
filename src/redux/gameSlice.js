import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    nextSymbol: "❌",
    cells: Array(9).fill(null),
    winner: null,
    history: [[null, null, null, null, null, null, null, null, null]],
    currentMove: 0,
  },
  reducers: {
    resetBoard: (state) => {
      state.nextSymbol = "❌";
      state.winner = null;
      state.cells = Array(9).fill(null);
      state.history = [[null, null, null, null, null, null, null, null]];
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
