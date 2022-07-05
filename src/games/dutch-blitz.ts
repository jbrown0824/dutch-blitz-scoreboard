import Game from '../contracts/game';
import Player from '../contracts/player';
import average from '../utils/average';
import standardDeviation from '../utils/standard-deviation';

const DEFAULT_DECK_SIZE = 10;

interface GameOptions {
	pointsNeededToWin: number;
	weight: number;
	min: number;
	max: number;
}

class DutchBlitz implements Game {
	players: Player[] = [];
	pointsNeededToWin: number;
	roundNumber: number = 0;
	weight: number = 1;
	min: number = 5;
	max: number = 15;

	constructor(options: GameOptions) {
		this.pointsNeededToWin = options.pointsNeededToWin;
		this.weight = options.weight;
		this.min = options.min;
		this.max = options.max;
	}

	addPlayer(name: string): void {
		this.players.push(DutchBlitz.makePlayer(name));
	}

	getPlayers(): Player[] {
		return this.players;
	}

	startRound(): Player[] {
		console.log('starting round');
		this.updateDeckSizes();
		this.roundNumber++;

		return this.getPlayers();
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

	/**
	 * Calculates the standard deviation from average score, and updates player deck size
	 * @private
	 */
	private updateDeckSizes(): void {
		const scores = this.getPlayers().map(player => player.score);
		const avg = average(scores);
		const stdDev = standardDeviation(scores);

		this.getPlayers().forEach(player => {
			if (stdDev === 0) {
				player.deckSize = DEFAULT_DECK_SIZE;
			} else {
				const playerDeviationFromAverage = (player.score - avg) / stdDev;
				const adjustment = (stdDev * playerDeviationFromAverage) / DEFAULT_DECK_SIZE
				player.deckSize = DEFAULT_DECK_SIZE + Math.round(adjustment);
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
