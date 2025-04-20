export default class GameState {
  constructor() {
    this.reset();
  }

  reset() {
    this.count = 0;
    this.playerWins = 0;
    this.computerWins = 0;
    this.streaks = 0;
  }

  updateScore(winner) {
    this.count++;
    if (winner === 'player') {
      this.playerWins++;
      this.streaks++;
    } else if (winner === 'computer') {
      this.computerWins++;
      this.streaks = 0;
    }
  }
}
