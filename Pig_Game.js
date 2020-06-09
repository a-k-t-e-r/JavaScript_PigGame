document.querySelector('.game-rules').addEventListener('click', function () {
    document.querySelector('.game-rules-model').style.display = 'block';
});

document.querySelector('.game-rules-model').addEventListener('click', function () {
    document.querySelector('.game-rules-model').style.display = 'none';
});

var currentScore = activePlayer = winValue = 0, finalScore = countSix = [0, 0];
var gamePlaying = false;
init();

document.querySelector('.btn-new').addEventListener('click', function () {
    init();
});

document.querySelector('#input-win-score').addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        winValue = document.querySelector('#input-win-score').value;
    }
});

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // dice image show
        document.querySelector('.dice').style.display = 'block';

        // random number generate and associated with dice image
        var diceNumber = Math.floor(Math.random() * 6 + 1);
        document.querySelector('.dice').src = 'dice-' + diceNumber + '.png';

        if (diceNumber == 6) {
            countSix[activePlayer]++;
            console.log(activePlayer, countSix[activePlayer]);
        }

        // score calculate
        if (countSix[activePlayer] == 2) {
            countSix[activePlayer] = 0;
            finalScore[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = finalScore[activePlayer];
            nextPlayer();
        } else if (diceNumber == 1) {
            countSix[activePlayer] = 0;
            nextPlayer();
        } else {
            currentScore += diceNumber;
            document.querySelector('#current-' + activePlayer).textContent = currentScore;
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        countSix[activePlayer] = 0;

        // dice image hide
        document.querySelector('.dice').style.display = 'none';

        // calculate finalscore
        finalScore[activePlayer] += currentScore;
        document.querySelector('#score-' + activePlayer).textContent = finalScore[activePlayer];

        console.log(finalScore[activePlayer]);
        if (finalScore[activePlayer] >= winValue) {
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    // player switch
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // current score omit
    currentScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = currentScore;
    activePlayer = activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
}

function init() {
    gamePlaying = true;
    if (winValue == "") {
        winValue = 100;
    }
    currentScore = activePlayer = 0, finalScore = [0, 0];
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}