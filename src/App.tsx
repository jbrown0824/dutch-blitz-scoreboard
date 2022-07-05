import React, { useEffect, useState } from 'react';
import './App.css';
import DutchBlitz from './games/dutch-blitz';
import PlayerScores from './components/PlayerScores';
import RecordScores from './components/RecordScores';
import NewGame from './components/NewGame';

function App() {

	const [gameName, setGameName] = useState<string>('a');
	const [onNewGame, setOnNewGame] = useState<boolean>(true);
	const [roundNumber, setRoundNumber] = useState<number>(0);

	const [game, setGame] = useState<DutchBlitz | undefined>();

	useEffect(() => {
		setRoundNumber(game?.roundNumber ?? 0);
	}, [gameName]);

	const onNewRound = () => {
		setRoundNumber(game?.roundNumber ?? 0);
		console.log('round changing');
	};

	const startNewGame = () => {
		setOnNewGame(true);
	};

	const onCreateNewGame = (newGame: DutchBlitz) => {
		setGame(newGame);
		setGameName(newGame.getPlayers().map(p => p.name).join() + newGame.roundNumber);
		setOnNewGame(false);
	}

	const onCancelNewGame = () => setOnNewGame(false);

	if (onNewGame) {
		return (
			<div className="App">
				<NewGame onCreate={onCreateNewGame} onCancel={onCancelNewGame}/>
			</div>
		)
	}

	return (
		<div className="App">
			<input type='hidden' value={gameName} />
			<h1>Dutch Blitz Scoreboard</h1>
			<button onClick={startNewGame}>New Game</button>

			<br /><br />
			Round: {roundNumber}<br />

			<div className="game-wrapper">
				<PlayerScores game={game} round={roundNumber}/>
				<RecordScores game={game} round={roundNumber} onNewRound={onNewRound}/>
			</div>
		</div>
	);
}

export default App;
