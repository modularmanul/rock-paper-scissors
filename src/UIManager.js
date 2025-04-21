export default class UIManager {
  static setText(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  }

  static setComputerChoiceSvg(computerChoice) {
    const svgContainer = document.querySelector('.computer .svg-container');
    const existingSvgElem = document.querySelector('.computer-choice-svg');
    if (existingSvgElem) {
      svgContainer.removeChild(existingSvgElem);
    }
    // Do not create img if choice is null; initial state after game reset
    if (computerChoice) {
      const svgElem = document.createElement('img');
      svgElem.setAttribute('width', '200');
      svgElem.setAttribute('height', '200');
      svgElem.setAttribute('src', `assets/svgs/${computerChoice}.svg`);
      svgElem.classList.add('computer-choice-svg');
      svgElem.classList.add(computerChoice);
      svgContainer.appendChild(svgElem);
    }
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
      computer: 'You lost!',
      draw: "It's a draw!",
    };

    UIManager.setText('.player-choice span', playerChoice);
    UIManager.setText('.computer-choice span', computerChoice);
    UIManager.setText('.round-count span', count);
    UIManager.setText('.player-round-wins', playerWins);
    UIManager.setText('.computer-round-wins', computerWins);
    UIManager.setText('.round-result', roundMessages[winner]);
    UIManager.setComputerChoiceSvg(computerChoice);
  }

  static updateGameUI(game) {
    UIManager.setText('.game-count .score', game.count);
    UIManager.setText('.player-game-wins .score', game.playerWins);
    UIManager.setText('.computer-game-wins .score', game.computerWins);
    UIManager.setText('.player-streaks .score', game.streaks);
  }
}
