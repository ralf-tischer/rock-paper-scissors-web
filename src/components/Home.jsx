import React from 'react';

function Home({ onStart }) {
  return (
    <div className="home">
      <h1>Rock Paper Scissors</h1>
      <button onClick={onStart}>Start Game</button>
    </div>
  );
}

export default Home;