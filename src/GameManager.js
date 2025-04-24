import RoundState from './RoundState.js';
import GameState from './GameState.js';
import UIManager from './UIManager.js';
import { VALID_CHOICES } from './constants.js';

export default class GameManager {
  constructor() {
    this.round = new RoundState();
    this.game = new GameState();
    this.playButton = document.querySelector('#play');
    this.resetButton = document.querySelector('#reset');
    this.playerContainer = document.querySelector('.outer-container.player');
    this.scoreboard = document.querySelector('.scoreboard');

    this.bindUIEvents();
  }

  bindUIEvents() {
    this.playButton?.addEventListener('click', this.handlePlayClick.bind(this));
    this.resetButton?.addEventListener(
      'click',
      this.handleResetClick.bind(this)
    );
    this.scoreboard?.addEventListener(
      'gameResult',
      this.handleGameResult.bind(this)
    );
    this.playerContainer?.addEventListener(
      'click',
      this.handlePlayerChoice.bind(this)
    );
  }

  handlePlayClick() {
    this.playButton.classList.add('disabled');
    this.resetButton.classList.remove('disabled');
    this.playerContainer.style.pointerEvents = 'auto';
  }

  handlePlayerChoice(e) {
    const choice = e.target.dataset.choice ?? null;
    if (!VALID_CHOICES.includes(choice)) return;

    this.round.playRound(choice);
    UIManager.updateRoundUI(this.round);

    if (this.round.playerWins === 5 || this.round.computerWins === 5) {
      const winner = this.round.playerWins === 5 ? 'player' : 'computer';
      this.endGame(winner);
    }
  }

  handleResetClick() {
    this.round.reset();
    this.game.reset();
    UIManager.updateRoundUI(this.round);
    UIManager.updateGameUI(this.game);

    this.playButton.classList.remove('disabled');
    this.resetButton.classList.add('disabled');
    this.playerContainer.style.pointerEvents = 'none';
  }

  handleGameResult(e) {
    this.game.updateScore(e.detail.winner);
    UIManager.updateGameUI(this.game);
  }

  endGame(winner) {
    this.scoreboard.dispatchEvent(
      new CustomEvent('gameResult', {
        detail: { winner },
      })
    );

    this.round.reset();
    UIManager.updateRoundUI(this.round);
  }
}

new GameManager();
