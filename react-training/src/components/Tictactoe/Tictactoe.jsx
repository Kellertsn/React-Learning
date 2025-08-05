import { useState, useEffect, useRef } from "react";
import "./Gameboard.css";

const checkWinner = (arr) => {
  for (let i = 0; i < 3; i++) {
    if (arr[i][0] && arr[i][0] === arr[i][1] && arr[i][1] === arr[i][2]) {
      return arr[i][0];
    }
  }

  for (let j = 0; j < 3; j++) {
    if (arr[0][j] && arr[0][j] === arr[1][j] && arr[1][j] === arr[2][j]) {
      return arr[0][j];
    }
  }
  //diagonal check
  if (arr[0][0] && arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2]) {
    return arr[0][0];
  }

  if (arr[0][2] && arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0]) {
    return arr[0][2];
  }
  return null;
};

export default function Gameboard() {
  const [board, setBoard] = useState(
    Array.from({ length: 3 }, () => Array(3).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const movesRef = useRef(0);
  //   console.log(board);

  const handleClick = (row, col) => {
    if (board[row][col] || winner) return;
    const newBoard = board.map((r, i) => {
      if (i !== row) return r;
      return r.map((cell, j) => (j === col ? currentPlayer : cell));
    });
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    movesRef.current++;
  };

  const handleRestart = () => {
    setBoard(Array.from({ length: 3 }, () => Array(3).fill(null)));
    setCurrentPlayer("X");
    setWinner(null);
    movesRef.current = 0;
  };

  const isDraw = movesRef.current === 9;

  useEffect(() => {
    // whenever `board` updates, recalc the winner
    setWinner(checkWinner(board));
  }, [board]);

  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      <h2>Current Player: {currentPlayer === "X" ? "X" : "O"}</h2>
      <h3>{winner ? `Winner: ${winner}` : isDraw ? "It's a draw" : null}</h3>

      <div className="game-board">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              className="game-board__cell"
              key={`${i}-${j}`}
              onClick={() => handleClick(i, j)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
}

