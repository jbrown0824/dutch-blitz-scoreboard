import React from 'react';
import logo from './logo.svg';
import './App.css';
import DutchBlitz from './games/dutchblitz';

function App() {

  const ourGame = new DutchBlitz();

  ourGame.addPlayer('Noah');
  ourGame.addPlayer('Q');
  ourGame.addPlayer('Jeff');
  ourGame.addPlayer('Micah');

  console.log('---------- Game Start');

  const players = ourGame.startRound();


  ourGame.addScore(players[0], 17);
  ourGame.addScore(players[1], 27);
  ourGame.addScore(players[2], 3);
  ourGame.addScore(players[3], 40);

  console.log('---------- Next Round');

  ourGame.startRound();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello World!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
