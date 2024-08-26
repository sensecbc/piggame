"use strict";
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const switchPlayer = function () {
  //switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // else = if the dice is = 1. if dice = 1 then the activeplayer must change. if the active player is 0 then change to 1 if not then change to 0
  player0El.classList.toggle("player--active"); //since we start player0 with the active player class we can toggle between them
  player1El.classList.toggle("player--active"); //since we start player0 with the active player class we can toggle between them
};

//rolling dice functionality
btnRoll.addEventListener("click", function () {
  //generate random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  //display dice
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`; //shows dice with the const dice calculation

  //check if rolled 1. if 1 is rolled switch player and reset current player score
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener("click", function () {
  //add current score to active players score
  scores[activePlayer] += currentScore; //index 0 or 1. if active player 0 then adds current score to array. if active player 1 then adds current score to array
  document.getElementById(`score--${activePlayer}`).textContent = //shows currentscore
    scores[activePlayer];
  switchPlayer();

  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
  } else {
    switchPlayer();
  }
});
