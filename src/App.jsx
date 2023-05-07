import "./App.css";
import { Cell } from "./components/Cell/Cell";
import { ResetButton } from "./components/ResetButton/ResetButton";
import { GoBackButton } from "./components/GoBackButton/GoBackButton";
import { useDispatch, useSelector } from "react-redux";
import {
  resetBoard,
  setCells,
  setCurrentMove,
  setHistory,
  setWinner,
  setNextSymbol,
} from "./redux/gameSlice";

export default function App() {
  const dispatch = useDispatch();
  const { nextSymbol, cells, winner, history, currentMove } = useSelector(
    (state) => state.game
  );

  const handleResetBoard = () => {
    dispatch(resetBoard());
  };

  const winningCombinations = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (cells) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }
    return null;
  };

  const handleCellToggle = (index) => {
    const newCells = [...cells];
    if (newCells[index] === null && winner === null) {
      newCells[index] = nextSymbol;
      const newHistory = [...history, newCells];
      dispatch(setCells(newCells));
      dispatch(setHistory(newHistory));
      dispatch(setCurrentMove(newHistory.length - 1));
      dispatch(setNextSymbol());
      dispatch(setWinner(calculateWinner(newCells)));
    }
  };
  const handleGoBack = () => {
    if (currentMove > 0) {
      const newHistory = history.slice(0, currentMove);
      const prevBoard = newHistory[newHistory.length - 1];
      dispatch(setCells(prevBoard));
      dispatch(setHistory(newHistory));
      dispatch(setCurrentMove(currentMove - 1));
      dispatch(setNextSymbol());
      dispatch(setWinner(calculateWinner(prevBoard)));
    } else if (currentMove === 0) {
      handleResetBoard();
      dispatch(
        setHistory([[null, null, null, null, null, null, null, null, null]])
      );
      dispatch(setCurrentMove(0));
    }
  };

  return (
    <div className="container">
      <div className="button-container">
        <ResetButton onClick={handleResetBoard}></ResetButton>
        <GoBackButton onClick={handleGoBack}></GoBackButton>
      </div>
      <div className="board">
        {" "}
        <div className="cell-row">
          <Cell handleClick={() => handleCellToggle(0)} symbol={cells[0]} />
          <Cell handleClick={() => handleCellToggle(1)} symbol={cells[1]} />
          <Cell handleClick={() => handleCellToggle(2)} symbol={cells[2]} />
        </div>
        <div className="cell-row">
          <Cell handleClick={() => handleCellToggle(3)} symbol={cells[3]} />
          <Cell handleClick={() => handleCellToggle(4)} symbol={cells[4]} />
          <Cell handleClick={() => handleCellToggle(5)} symbol={cells[5]} />
        </div>
        <div className="cell-row">
          <Cell handleClick={() => handleCellToggle(6)} symbol={cells[6]} />
          <Cell handleClick={() => handleCellToggle(7)} symbol={cells[7]} />
          <Cell handleClick={() => handleCellToggle(8)} symbol={cells[8]} />
        </div>
      </div>
      {winner ? <div className="winner">{winner} WINS!</div> : null}
    </div>
  );
}
