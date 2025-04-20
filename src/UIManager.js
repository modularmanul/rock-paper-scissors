export default class UIManager {
  static setText(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  }

  static updateRoundUI(round) {
    const {
      playerChoice,
      computerChoice,
      count,
      playerWins,
      computerWins,
      winner,
    } = round;

    const roundMessages = {
      player: 'You won!',
      computer: 'You lose!',
      draw: "It's a draw!",
    };

    UIManager.setText('.player-choice span', playerChoice);
    UIManager.setText('.computer-choice span', computerChoice);
    UIManager.setText('.round-count span', count);
    UIManager.setText('.player-round-wins', playerWins);
    UIManager.setText('.computer-round-wins', computerWins);
    UIManager.setText('.round-result', roundMessages[winner]);
  }

  static updateGameUI(game) {
    UIManager.setText('.game-count span', game.count);
    UIManager.setText('.player-game-wins span', game.playerWins);
    UIManager.setText('.computer-game-wins span', game.computerWins);
    UIManager.setText('.player-streaks span', game.streaks);
  }
}
