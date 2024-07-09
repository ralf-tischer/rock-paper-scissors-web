import React from 'react';

function Result({ result, onPlayAgain }) {
  const determineWinner = () => {
    if (result.user === result.app) return "It's a tie!";
    if (
      (result.user === 'rock' && result.app === 'scissors') ||
      (result.user === 'paper' && result.app === 'rock') ||
      (result.user === 'scissors' && result.app === 'paper')
    ) {
      return 'You win!';
    }
    return 'Computer wins!';
  };

  return (
    <div className="result">
      <h2>Result</h2>
      <p>Your choice: {result.user}</p>
      <p>Computer's choice: {result.app}</p>
      <h3>{determineWinner()}</h3>
      <button onClick={onPlayAgain}>Play Again</button>
    </div>
  );
}

export default Result;