function getComputerChoice() {
  const rand = Math.floor(Math.random() * 3);
  return VALID_CHOICES[rand];
}

function getPlayerChoice(e) {
  return (
    (VALID_CHOICES.includes(e.target.classList.value) &&
      e.target.classList.value) ||
    null
  );
}

function getRoundWinner(playerChoice, computerChoice) {
  let winner = '';
  switch (playerChoice) {
    case 'rock':
      if (computerChoice === 'scissors') {
        winner = 'player';
      } else if (computerChoice === 'paper') {
        winner = 'computer';
      }
      break;
    case 'paper':
      if (computerChoice === 'rock') {
        winner = 'player';
      } else if (computerChoice === 'scissors') {
        winner = 'computer';
      }
      break;

    case 'scissors':
      if (computerChoice === 'paper') {
        winner = 'player';
      } else if (computerChoice === 'rock') {
        winner = 'computer';
      }
      break;

    default:
      winner = null;
  }
  return winner;
}

function play() {
  const round = {
    count: 0,
    playerChoice: null,
    computerChoice: null,
    playerWins: 0,
    computerWins: 0,
    winner: null,
  };

  document.querySelector('.container.player').addEventListener('click', (e) => {
    round.playerChoice = getPlayerChoice(e);
    if (round.playerChoice) {
      round.computerChoice = getComputerChoice();

      // Get round winner
      round.winner = getRoundWinner(round.playerChoice, round.computerChoice);
      if (round.winner === 'player') {
        round.playerWins++;
      } else if (round.winner === 'computer') {
        round.computerWins++;
      }
      if (round.winner) {
        round.count++;
        showRoundScore(round);
      }

      // Get game winner
      if (round.playerWins === 5 || round.computerWins === 5) {
        const customEvent = new CustomEvent('gameResult', {
          detail: {
            winner: round.playerWins === 5 ? 'player' : 'computer',
          },
        });
        document.querySelector('.board').dispatchEvent(customEvent);

        resetRoundScore(round);
      }
    }
  });
}

function showRoundScore({
  count,
  playerChoice,
  computerChoice,
  playerWins,
  computerWins,
  winner,
}) {
  document.querySelector('.player-choice span').textContent = playerChoice;
  document.querySelector('.computer-choice span').textContent = computerChoice;
  document.querySelector('.round-count span').textContent = count;
  document.querySelector('.player-round-wins').textContent = playerWins;
  document.querySelector('.computer-round-wins').textContent = computerWins;
  document.querySelector('.round-result').textContent =
    winner === 'player' ? 'You won!' : 'You lost!';
}

function resetRoundScore(round) {
  Object.keys(round).forEach((key) => {
    key !== 'result' ? (round[key] = 0) : (round[key] = null);
  });
}

function resetGameScore() {
  const customEvent = new CustomEvent('gameReset');
  document.querySelector('.board').dispatchEvent(customEvent);
}

function gameOn() {
  document.querySelector('#play').addEventListener('click', play);
  document.querySelector('#reset').addEventListener('click', resetGameScore);

  const game = {
    count: 0,
    playerWins: 0,
    computerWins: 0,
    streaks: 0,
  };

  const showGameScore = () => {
    document.querySelector('.game-count span').textContent = game.count;
    document.querySelector('.player-game-wins span').textContent =
      game.playerWins;
    document.querySelector('.player-streaks span').textContent = game.streaks;
    document.querySelector('.computer-game-wins span').textContent =
      game.computerWins;
  };

  // Reset game score
  document.querySelector('.board').addEventListener('gameReset', (e) => {
    Object.keys(game).forEach((key) => (game[key] = 0));
    showGameScore();
  });

  // Set game score
  document.querySelector('.board').addEventListener('gameResult', (e) => {
    game.count += 1;
    const gameWinner = e.detail.winner;
    if (gameWinner === 'player') {
      game.playerWins += 1;
    } else {
      game.computerWins += 1;
    }
    showGameScore();
  });
}

const VALID_CHOICES = ['rock', 'paper', 'scissors'];

gameOn();
