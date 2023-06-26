'use strict';

//Selecting Elements

//for selecting background
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//for selecting score 
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

//for selecting current score 
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//selecting dice
const diceEl = document.querySelector('.dice');

//selecting buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//setting default value
let scores, currentScore, activePlayer, playing;
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
    document.getElementById(`name--0`).textContent = `Player 1`;
    document.getElementById(`name--1`).textContent = `Player 2`;
}
init();


//switching player function
const switchPlayer = function () {
    //set values to 0 after swicting
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    //toggle active player
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//set values to selected element for initial condition
score1El.textContent = 0;
score0El.textContent = 0; 
diceEl.classList.add('hidden');


//Roll dice 
btnRoll.addEventListener('click', function () {
    if (playing) {
        //generate random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`

        //if rolled dice is 1.. switch player
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //switiching player 
            switchPlayer();
        }
    }
});

//use of hold button
btnHold.addEventListener('click', function () {
    if (playing) {
        //add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //max score = 100
        if (scores[activePlayer] >= 100) {
            //Player wins
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.getElementById(`name--${activePlayer}`).textContent = "Winner!! 🎉🎉🎉"
        } else {
        
        }
        //switch to next player
        switchPlayer();
    }
});

//reload game 
btnNew.addEventListener('click', init);