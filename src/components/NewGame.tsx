import DutchBlitz from '../games/dutch-blitz';
import { ChangeEvent, FormEvent, useState } from 'react';

interface NewGameProps {
	onCreate: (game: DutchBlitz) => void;
	onCancel: () => void;
}

export default function NewGame({ onCreate, onCancel }: NewGameProps) {
	const [players, setPlayers] = useState<string[]>(['','']);

	const start = () => {
		let game = new DutchBlitz({
			max: 15, min: 5, pointsNeededToWin: 75, weight: 1.5
		});

		players.forEach((name) => game.addPlayer(name));
		onCreate(game);
		setPlayers([]);
	};

	const addPlayer = () => {
		setPlayers([ ...players, '']);
	}

	const onChange = (name: string, i: number) => {
		let playerInput = [ ...players ];
		playerInput[i] = name;
		setPlayers(playerInput);
	}

	return (
		<div>
			<h1>New Game</h1>
			<button onClick={addPlayer}>Add Player</button>

			{
				players.map((player, index) =>
					(
						<div key={`new-player-${index}`}>Name: <input value={player} onChange={(e) => onChange(e.target.value, index)} /></div>
					)
				)
			}

			<button onClick={start}>Start</button>
			<br /><br />
			<button onClick={onCancel}>Cancel</button>

		</div>
	);
}
