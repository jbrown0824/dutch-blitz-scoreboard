import DutchBlitz from '../games/dutch-blitz';
import { useEffect, useState } from 'react';

interface RecordScoresProps {
	game?: DutchBlitz;
	round: number;
	onNewRound: () => void;
}

export default function RecordScores({ game, round, onNewRound }: RecordScoresProps) {

	const [scores, setScores] = useState<number[]>([]);

	useEffect(() => {
		setScores(game?.getPlayers().map(player => 0) ?? []);
	}, [game?.getPlayers().length]);

	const setScore = (value: string, i: number) => {
		const score: number = parseInt(value) as number;
		let updatedScores = [...scores];
		updatedScores[i] = score;
		setScores(updatedScores);
	}

	const saveScores = () => {
		console.log('round scores would be', scores);
		if (!game) return alert('No Game Created');

		const players = game?.getPlayers();
		scores.forEach((score, index) => {
			game.addScore(players[index], score);
		});

		game.startRound();
		onNewRound();
	};

	return (
		<div>
			<h2>Round Scoring</h2>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					{
						game?.getPlayers().map((player, i) => (
							<tr key={`record-score-${player.name}`}>
								<td>{player.name}</td>
								<td><input onChange={(e) => setScore(e.target.value, i)} /></td>
							</tr>
						))
					}
				</tbody>
			</table>
			<button onClick={saveScores}>Save Scores</button>
		</div>
	);
}
