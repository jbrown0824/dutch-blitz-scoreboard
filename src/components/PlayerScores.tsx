import DutchBlitz from '../games/dutch-blitz';
import { useEffect } from 'react';

interface PlayerScoresProps {
	game?: DutchBlitz;
	round: number;
}

export default function PlayerScores({ game, round }: PlayerScoresProps) {

	useEffect(() => {
		console.log('new round', round, game?.players);
	}, [round]);
	return (
		<div>
			<h2>Players</h2>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Score</th>
						<th>Deck Size</th>
					</tr>
				</thead>
				<tbody>
					{
						game?.getPlayers().map(player => (
							<tr key={`scores-${player.name}`}>
								<td>{player.name}</td>
								<td>{player.score}</td>
								<td>{player.deckSize}</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	);
}
