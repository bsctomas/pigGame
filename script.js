'use strict';

// const score0 = (document.querySelector('#score--0');
// const score1 = (document.querySelector('#score--1');

// SELECTING ELEMENTS
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
let scores;
let currentScore;
let activePlayer;
let playing;

// STARTING CONDITIONS
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  // SHOW IT IN THE PAGE
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  // CHANGE PLAYER
  activePlayer = activePlayer === 0 ? 1 : 0;
  // ADDING OR REMOVING THE ACTIVE CLASS THAT CHANGES BACKGROUND
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  if (playing) {
    // GENERATE A RANDOM DICE ROLL
    const dice = Math.trunc(Math.random() * 6) + 1;
    // DISPLAY DICE
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // CHECK FOR ROLLED 1
    if (dice !== 1) {
      // ADD DICE TO CURRENT SCORE
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    // SWITCH TO NEXT PLAYER
    else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // ADD CURRENT SCORE TO SCORE
    scores[activePlayer] += currentScore;
    // SHOW IT IN THE PAGE
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // CHECK IF PLAYER'S SCORE IS >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // SWITCH TO NEXT PLAYER
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
