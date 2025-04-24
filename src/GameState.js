export default class GameState {
  constructor() {
    this.reset();
  }

  reset() {
    this.count = 0;
    this.trophies = 0;
    this.playerWins = 0;
    this.highestStreaks = 0;
    this.streaks = 0;
    this.computerWins = 0;
  }

  updateScore(winner) {
    this.count++;
    if (winner === 'player') {
      this.playerWins++;
      this.streaks++;
      if (this.streaks > this.highestStreaks)
        this.highestStreaks = this.streaks;
      if (this.playerWins % 3 === 0) {
        this.trophies++;
      }
    } else if (winner === 'computer') {
      this.computerWins++;
      this.streaks = 0;
    }
  }
}
