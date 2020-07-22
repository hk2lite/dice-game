/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, highScore;
highScore = prompt('Enter High Score:');
init();

// Rolling Dice
document.querySelector('.btn-roll').addEventListener('click', function () {  // function that declared inside dom without name is known as Anonymous Function
    if (gamePlaying){
        var dice = Math.floor(Math.random() * 6 + 1);  // Math.random() throw random value in 0 - 1 in decimal.. So, * 6 means 0 - 5, but it still throws
// decimal. To remove those decimal Math.floor() used. Added + 1 to set range between 1-6;

        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // Game Logic........
        if (dice !== 1){
            roundScore += dice;
            document.getElementById('current-'+activePlayer).textContent = roundScore;
        }
        else {
            nextPlayer();
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying){
        scores[activePlayer] += roundScore;  // Update score in array whenever somoone click on hold
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
        if (scores[activePlayer] >= highScore){
            document.querySelector('#name-'+activePlayer).textContent = 'Winner !!!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

})

function nextPlayer() {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        // document.querySelector('.player-0-panel').classList.remove('active');
        // document.querySelector('.player-1-panel').classList.add('active');

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active'); // It will be switched whenever else satisfied active class
        // Toggle mai -- active hoga to remove kr dega, nahi hoga to add kr dega...

        document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none'; // .style.properites = 'value'
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}
/**Document object helps us in dom manipulation**/
/*

// Here, JS automatically does coercion, Which means when you add 1 integer with string then it
// will be convert it under the string = '#current-'+1 = '#current-1'
// In this above code, We used document.querySelector('#Add Your Id) and textContent will change content within that id tags. We gave dice value to represent under that content.

// Other ways to change content
/!**document.querySelector('#current-'+activePlayer).innerHTML = '<em>' + dice + '</em>' **!/ // It's made that element italic

// Dom CSS Changer*/