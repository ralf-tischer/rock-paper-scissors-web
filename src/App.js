import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Game from './components/Game';
import Result from './components/Result';

function App() {
  const [screen, setScreen] = useState('home');
  const [result, setResult] = useState(null);

  const startGame = () => setScreen('game');
  const endGame = (gameResult) => {
    setResult(gameResult);
    setScreen('result');
  };
  const backToHome = () => setScreen('home');

  return (
    <div className="App">
      {screen === 'home' && <Home onStart={startGame} />}
      {screen === 'game' && <Game onGameEnd={endGame} />}
      {screen === 'result' && <Result result={result} onPlayAgain={backToHome} />}
    </div>
  );
}

export default App;