import { VALID_CHOICES } from './constants.js';

export default class RoundState {
  constructor() {
    this.reset();
  }

  reset() {
    this.count = 0;
    this.playerChoice = null;
    this.computerChoice = null;
    this.playerWins = 0;
    this.computerWins = 0;
    this.winner = null;
  }

  getComputerChoice() {
    const rand = Math.floor(Math.random() * VALID_CHOICES.length);
    return VALID_CHOICES[rand];
  }

  determineWinner(player, computer) {
    if (player === computer) return 'draw';
    const winsAgainst = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper',
    };
    return winsAgainst[player] === computer ? 'player' : 'computer';
  }

  playRound(playerChoice) {
    this.playerChoice = playerChoice;
    this.computerChoice = this.getComputerChoice();
    this.winner = this.determineWinner(this.playerChoice, this.computerChoice);

    if (this.winner !== 'draw') {
      this[`${this.winner}Wins`]++;
      this.count++;
    }
  }
}
