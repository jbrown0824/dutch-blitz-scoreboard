import Game from '../contracts/game';
import Player from '../contracts/player';
import average from '../utils/average';
import standardDeviation from '../utils/standard-deviation';

const DEFAULT_DECK_SIZE = 10;

class DutchBlitz implements Game {
	players: Player[] = [];
	pointsNeededToWin: number;

	constructor(pointsNeededToWin: number = 75) {
		this.pointsNeededToWin = pointsNeededToWin;
	}

	addPlayer(name: string): void {
		this.players.push(DutchBlitz.makePlayer(name));
	}

	getPlayers(): Player[] {
		return this.players;
	}

	startRound(): Player[] {
		this.updateDeckSizes();
		const players = this.getPlayers();

		players.forEach(player => {
			console.log(player.name, ' needs a deck size of ', player.deckSize);
		});

		return players;
	}

	addScore(player: Player, roundScore: number): void {
		player.score += roundScore;
	}

	getWinner(): Player | undefined {
		let winner: Player | undefined;
		this.getPlayers().forEach(player => {
			if (
				player.score >= this.pointsNeededToWin
				&& (winner && player.score > winner.score)
			) {
				winner = player;
			}
		});

		return winner;
	}

	private updateDeckSizes(): void {
		const scores = this.getPlayers().map(player => player.score);
		const avg = average(scores);
		const stdDev = standardDeviation(scores);

		this.getPlayers().forEach(player => {
			if (stdDev === 0) {
				player.deckSize = DEFAULT_DECK_SIZE;
			} else {
				const playerDeviationFromAverage = (player.score - avg) / stdDev;
				player.deckSize = DEFAULT_DECK_SIZE + Math.round(playerDeviationFromAverage);
			}
		});
	}

	private static makePlayer(name: string): Player {
		return {
			name: name,
			score: 0,
			deckSize: DEFAULT_DECK_SIZE,
		}
	}
}

export default DutchBlitz;
