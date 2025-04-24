import {
  LOST_MESSAGES,
  MEDAL_MESSAGES,
  STREAK_MESSAGES,
  TROPHY_MESSAGES,
} from './constants.js';

export default class UIManager {
  static setText(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  }

  static setComputerChoiceSvg(computerChoice) {
    const svgContainer = document.querySelector('.computer .svg-container');
    const existingSvgElem = document.querySelector('.computer .choice-svg');
    if (existingSvgElem) {
      svgContainer.removeChild(existingSvgElem);
    }

    if (computerChoice) {
      const svgElem = document.createElement('img');
      svgElem.setAttribute('src', `assets/svgs/${computerChoice}.svg`);
      svgElem.classList.add('choice-svg');
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
    UIManager.setText('.round-count span', count ? count : 'None yet!');
    UIManager.setText('.player-round-wins', playerWins);
    UIManager.setText('.computer-round-wins', computerWins);
    UIManager.setText('.round-result', roundMessages[winner]);
    UIManager.setComputerChoiceSvg(computerChoice);
  }

  static setPopup(game) {
    const { trophies, playerWins, highestStreaks, computerWins } = game;

    const getDOMScore = (selector) =>
      +document.querySelector(selector)?.textContent || 0;

    const gameLostContents = ['💔', '☔', '😿', '🌧️', '😭'];

    const popupConditions = [
      {
        isApplicable: () =>
          highestStreaks > getDOMScore('.player-streaks .score'),
        content: '🔥',
        messages: STREAK_MESSAGES,
      },
      {
        isApplicable: () =>
          getDOMScore('.player-game-wins .score') + 1 === playerWins,
        content: '🎖️',
        messages: MEDAL_MESSAGES,
      },
      {
        isApplicable: () =>
          getDOMScore('.player-trophy .score') + 1 === trophies,
        content: '🏆',
        messages: TROPHY_MESSAGES,
      },
      {
        isApplicable: () =>
          getDOMScore('.computer-game-wins .score') + 1 === computerWins,
        content:
          gameLostContents[Math.floor(Math.random() * gameLostContents.length)],
        messages: LOST_MESSAGES,
      },
    ];

    const popups = popupConditions.filter((c) => c.isApplicable());

    if (popups.length > 0) {
      UIManager.renderPopup(popups);
    }
  }

  static renderPopup(popups) {
    const overlay = document.querySelector('.overlay');
    const popupContainer = document.querySelector('.popup-container');
    const popupText = document.querySelector('.popup-message');
    const popup = document.querySelector('.popup');

    let current = 0;

    const showPopup = () => {
      const { content, messages } = popups[current];
      popupText.textContent =
        messages[Math.floor(Math.random() * messages.length)];
      popup.textContent = content;

      overlay.classList.add('on');
      popupContainer.classList.add('on');
      popupText.classList.add('on');
      popup.classList.add('on');
    };

    const hidePopup = () => {
      overlay.classList.remove('on');
      popupContainer.classList.remove('on');
      popupText.classList.remove('on');
      popup.classList.remove('on');

      popupText.textContent = '';
      popup.textContent = '';
    };

    const nextPopup = () => {
      hidePopup();
      current++;
      if (current < popups.length) {
        showPopup();
      }
    };

    popup.onclick = nextPopup;
    showPopup();
  }

  static updateGameUI(game) {
    const { count, trophies, playerWins, highestStreaks, computerWins } = game;

    UIManager.setPopup(game);

    UIManager.setText('.game-count .score', count);
    UIManager.setText('.player-trophy .score', trophies);
    UIManager.setText('.player-game-wins .score', playerWins);
    UIManager.setText('.player-streaks .score', highestStreaks);
    UIManager.setText('.computer-game-wins .score', computerWins);
  }
}
