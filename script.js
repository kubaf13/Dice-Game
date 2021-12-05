'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

let scores, currentScore, activePlayer, playing;

// Starting Conditions
const resetGame = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden')
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player1.classList.remove('player--active');
}
resetGame();

// Rolling dice functionality
btnRoll.addEventListener('click', function (){
    if(playing){
        // 1. Generating a random dice roll
        const dice = Math.trunc( Math.random() * 6) + 1;

        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `img/dice-${dice}.png`

        // 3. Check for rolled 1: if true, switch to next player
        if(dice !== 1){
            //Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            //Switch next player
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function(){
    if(playing){
        // 1. Add current score to active player
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >=100
        if(scores[activePlayer] >= 100){
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
            document.querySelector('.btn--roll').classList.add('hidden')
            document.querySelector('.btn--hold').classList.add('hidden')
        } else {
            //Switch to next player
            switchPlayer();
        }
        // Finish
    }
})

btnNew.addEventListener('click', resetGame)