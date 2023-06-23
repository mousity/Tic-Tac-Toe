import React, { Fragment, useState } from 'react';

// Function to create square component; already formatted as a button
// Returns a button object that changes the icon through a call to an arrow function => handleClick(i) in the Board component
function Square({ value, onSquareClick }) { 
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Function to create and handle most properties of the board
function Board({ xIsNext, squares, onPlay }) {

  // function to handle clicks
  function handleClick(i) {
    // If there is a winner or the square is already filled, do not proceed with the function
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Make a copy of the current squares object to keep up a history later
    const nextSquares = squares.slice();
    // If X is our next player,
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    // Takes in the handlePlay function in the Game component
    onPlay(nextSquares);
  }

  // The winner is the return value of calculateWinner
  const winner = calculateWinner(squares);
  let status;
  // If there is a winner, print it
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // This return statement creates the board that is in our index.js file
  // Takes the form of a 3 by 3 row of interactable square
  return (
    <Fragment>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </Fragment>
  );
}

// Export default means the index.js file will resort to calling this function as the import
export default function Game() {
  // Set the history of the game as an array
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // Set the current move as a single state
  const [currentMove, setCurrentMove] = useState(0);
  // Determine if player 1 or 2 is next
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Handles the play history of the game so we can go back to other moves
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Map our history to 'moves' const
  const moves = history.map((squares, move) => {
    let description;
    // Append all previous moves to the HTML
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Function to calculate winner by checking all possible winning values
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
