import RoundState from './RoundState.js';
import GameState from './GameState.js';
import UIManager from './UIManager.js';
import { VALID_CHOICES } from './constants.js';

export default class GameManager {
  constructor() {
    this.round = new RoundState();
    this.game = new GameState();
    this.bindUIEvents();
  }

  bindUIEvents() {
    document.querySelector('#play')?.addEventListener('click', () => {
      document
        .querySelector('.outer-container.player')
        ?.addEventListener('click', (e) => {
          const choice = e.target.dataset.choice ?? null;
          if (VALID_CHOICES.includes(choice)) {
            this.round.playRound(choice);
            UIManager.updateRoundUI(this.round);

            if (this.round.playerWins === 5 || this.round.computerWins === 5) {
              const winner =
                this.round.playerWins === 5 ? 'player' : 'computer';
              this.endGame(winner);
            }
          }
        });
    });

    document.querySelector('#reset')?.addEventListener('click', () => {
      document
        .querySelector('.scoreboard')
        ?.dispatchEvent(new CustomEvent('gameReset'));
    });

    document.querySelector('.scoreboard')?.addEventListener('gameReset', () => {
      this.game.reset();
      UIManager.updateGameUI(this.game);
      this.round.reset();
      UIManager.updateRoundUI(this.round);
    });

    document
      .querySelector('.scoreboard')
      ?.addEventListener('gameResult', (e) => {
        this.game.updateScore(e.detail.winner);
        UIManager.updateGameUI(this.game);
      });
  }

  endGame(winner) {
    document.querySelector('.scoreboard')?.dispatchEvent(
      new CustomEvent('gameResult', {
        detail: { winner },
      })
    );
    this.round.reset();
    UIManager.updateRoundUI(this.round);
  }
}

new GameManager();
