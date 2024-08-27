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

score0El.textContent = 0; //reseting score ui to 0
score1El.textContent = 0; // same as above
diceEl.classList.add("hidden"); //hide dice at 1st move

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0]; //array that will contain the active player through index
  currentScore = 0;
  activePlayer = 0; //used on the array scores above. values will always be 0 or 1 and it will be the index of the above array
  playing = true; //so that we can play or stop the game as we want

  score0El.textContent = "0";
  score1El.textContent = "0";
  current0El.textContent = "0";
  current1El.textContent = "0";
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player1El.classList.remove("player--active");
  player0El.classList.add("player--active");
};
init(); //executes init function on load

const switchPlayer = function () {
  //switch to next player and reset score //DRY method!
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // if active player is 0 then changes to 1. else = if the dice is = 1. if dice = 1 then the activeplayer must change. if the active player is 0 then change to 1 if not then change to 0
  player0El.classList.toggle("player--active"); //since we start the game with player0 with on active player class we can toggle between them
  player1El.classList.toggle("player--active"); //since we start the game with player0 with on active player class we can toggle between them
};

//rolling dice functionality
btnRoll.addEventListener("click", function () {
  //generate random dice roll
  if (playing) {
    //if playing = true
    //while playing is true then the game resumes
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`; //shows dice with the const dice calculation above

    //check if dice rolled is different then 1
    if (dice !== 1) {
      currentScore += dice; //saves the dice calculation above inside the currentscore variable. also, adds it again if we roll again due to += which means currentScore += currentscore + dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //updates ui with the current score

      //if 1 is rolled switch player and reset current player score
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  //add current score to active players score
  if (playing) {
    scores[activePlayer] += currentScore; //index 0 or 1. if active player 0 then adds current score to array. if active player 1 then adds current score to array
    document.getElementById(`score--${activePlayer}`).textContent = //shows currentscore
      scores[activePlayer];

    //check if player score is above 100
    if (scores[activePlayer] >= 100) {
      playing = false; //if it indeed is above 100 then stop game
      document
        .querySelector(`.player--${activePlayer}`) //add the the winner ui
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active"); //remove the active player ui
    } else {
      switchPlayer(); //if we press hold and it isn't above 100 then switch player.
    }
  }
});

btnNew.addEventListener("click", init); //restarts game with init function
