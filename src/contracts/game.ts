import Player from './player';

interface Game {
	players: Player[];
	pointsNeededToWin: number;
	roundNumber: number;

	addPlayer: (name: string) => void;
	getPlayers: () => Player[];
	addScore: (player: Player, roundScore: number) => void;
	startRound: () => Player[];
	getWinner: () => Player | undefined;
}

export default Game;
