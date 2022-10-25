'use strict';

// 1. we will hide the dice when user has just came here
let dice = document.querySelector('#diceimg');
dice.classList.add('hidden');

// 2. we will hide the hold button too when  user has just came
let hold = document.querySelector('.hold');
hold.classList.add('hidden');

//3. --- HIDING THE MESSAGE ABOUT WHOSE TURN IT IS
let chance = document.querySelector('.Message');
chance.classList.add('hidden');
//  ----HIDING THAT PLAYER GOT 1 ----
let youGot1 = document.querySelector('.youGot1');
youGot1.classList.add('hidden');
//  ----HIDING THAT PLAYER GOT WIN  ----
let youWin = document.querySelector('.youWin');
youWin.classList.add('hidden');

//4. we will make the playerScore to 0 at the starting
let playerScore = 0;
document.querySelector('.P0number').textContent = playerScore;
document.querySelector('.P1number').textContent = playerScore;

//5. we will make the player0Total and player1Total to 0 at the starting
let scoreArr = [0, 0];
document.querySelector('.P0Total').textContent = scoreArr[0];
document.querySelector('.P1Total').textContent = scoreArr[1];

// 6. there are two players , 0 and 1 where the 0 will start the game always
let activePlayer = 0;

//we will roll the dice
function roll() {
  PlayerBg();

  //generate a random number between 1 and 6
  let diceNum = Math.floor(Math.random() * 6 + 1);
  console.log(`You Got ${diceNum}`);

  //if the youGot1 message is still displaying turn that shit off
  if (youGot1.classList.add('hidden') != true) {
    youGot1.classList.add('hidden');
  }

  //show the hold button and the MEssage of Whose Chance it's
  hold.classList.remove('hidden');
  chance.classList.remove('hidden');

  //printing the number on dice
  dice.classList.remove('hidden');
  dice.setAttribute('src', `dice-${diceNum}.png`);

  //displaying which player Has throwed the dice
  let player = document.querySelector('.activePlayer');
  player.textContent = activePlayer + 1;

  if (diceNum != 1) {
    //adding the number on current score in current score
    // the textContent is in string
    playerScore = Number(
      document.querySelector(`.P${activePlayer}number`).textContent
    );
    playerScore += diceNum;

    document.querySelector(`.P${activePlayer}number`).textContent = playerScore;
    scoreArr[activePlayer] =
      Number(document.querySelector(`.P${activePlayer}Total`).textContent) +
      playerScore;
    console.log(`You scored: ${scoreArr[activePlayer]}`);
    Winner();
  } else {
    console.log(`holy shit, Player ${activePlayer + 1} got 1 !`);

    //  ----DISPLAY THAT PLAYER GOT 1 ----
    //check it the player is 1 or player 2?
    if (activePlayer == 0) {
      youGot1.style.left = '10%';
      youGot1.classList.remove('hidden');
    } else {
      youGot1.style.left = '43%';
      youGot1.classList.remove('hidden');
    }

    //NOW ADD THE CURRENT SCORE OF PLAYER INTO HIS TOTALSCORE

    scoreArr[activePlayer] = 0;
    document.querySelector(`.P${activePlayer}Total`).textContent =
      scoreArr[activePlayer];
    // AND MAKE THE CURRENT SCORE = 0;
    document.querySelector(`.P${activePlayer}number`).textContent = 0;
    // Winner();
    //  --SWITCHING THE THOWER OR ACTIVE PLAYER
    activePlayer = Number(!activePlayer);
    document.querySelector(`.P${activePlayer}number`).textContent = 0;
    playerScore = 0;
  }
}

//hold button function
function holdScore() {
  // bug solved if hold was clicked twice in a row
  if (
    document.querySelector('.hold').addEventListener('click', function () {
      scoreArr[Number(!activePlayer)] = Number(
        document.querySelector(`.P${Number(!activePlayer)}Total`).textContent
      );

      console.log(`hold button was clicked twice in a row`);
    })
  )
    scoreArr[activePlayer] =
      Number(document.querySelector(`.P${activePlayer}Total`).textContent) +
      playerScore;

  document.querySelector(`.P${activePlayer}Total`).textContent =
    scoreArr[activePlayer];
  document.querySelector(`.P${activePlayer}number`).textContent = 0;
  activePlayer = Number(!activePlayer);
  PlayerBg();

  Winner();
}

//  -- CHECKING IF WE GOT THE WINNER ?
function Winner() {
  //IF THE SCORE IS ABOVE THE WINNING SCORE WE WILL ANNOUNCE THE WINNER(ACTIVE PLAYER);
  let winningScore = 50;
  if (scoreArr[activePlayer] >= winningScore) {
    document.querySelector(`.P${activePlayer}Total`).textContent =
      scoreArr[activePlayer];
    document.querySelector(`.P${activePlayer}number`).textContent = 0;

    // IF ANY GOT 1 ,DON'T SHOW THAT
    if (youGot1.classList.add('hidden') != true) {
      youGot1.classList.add('hidden');
    }
    document.querySelector('.winner').textContent = activePlayer + 1;
    if (activePlayer == 1) {
      youWin.style.left = '51.6%';
      youWin.classList.remove('hidden');
    } else {
      youWin.style.left = '18%';
      youWin.classList.remove('hidden');
    }
    hold.classList.add('hidden');

    if (activePlayer == 0) {
      document.querySelector('body').style.backgroundImage =
        'linear-gradient(to left, rgb(199 26 26) 50%, rgb(61 165 18) 50%)';
    } else {
      document.querySelector('body').style.backgroundImage =
        'linear-gradient(to right, rgb(199 26 26) 50%, rgb(61 165 18) 50%)';
    }

    document.querySelector('.roll').classList.add('hidden');
    document.querySelector('.newGame').style.fontSize = '35px';
    document.querySelector('.newGame').style.backgroundColor = 'black';
    document.querySelector('.newGame').style.color = 'whitesmoke';
    document.querySelector('.newGame').style.left = '42%';
    document.querySelector('.Message').classList.add('hidden');
    document.querySelector(`.player${activePlayer}`).style.color = 'green';
    document.querySelector(`.player${Number(!activePlayer)}`).style.color =
      '#ff3333';
    document.querySelector(`.P${activePlayer}Total`).style.color = 'green';
    document.querySelector(`.P${Number(!activePlayer)}Total`).style.color =
      '#ff3333';

    document.querySelector(`.P${activePlayer}score`).style.color = 'green';
    document.querySelector(`.P${Number(!activePlayer)}score`).style.color =
      '#ff3333';
    document.querySelector(
      `.P${Number(!activePlayer)}score`
    ).style.backgroundColor = 'whitesmoke';
    document.querySelector(
      `.P${Number(activePlayer)}score`
    ).style.backgroundColor = 'whitesmoke';

    document.querySelector(
      `.player${Number(!activePlayer)}`
    ).style.backgroundColor = ' rgba(255, 255, 255, 0.6)';

    document.querySelector(
      `.player${Number(activePlayer)}`
    ).style.backgroundColor = ' rgba(255, 255, 255, 0.75)';

    document.querySelector('.name').classList.remove('hidden');
  }
}

function PlayerBg() {
  if (activePlayer == 1) {
    document.querySelector(`.player${Number(activePlayer)}`).style.color =
      ' black';
    document.querySelector(`.player${activePlayer}`).style.opacity = '0.8';
    document.querySelector(`.player${activePlayer}`).style.backgroundColor =
      'rgba(255, 255, 255, 0.9)';

    document.querySelector(`.player${Number(!activePlayer)}`).style.opacity =
      '0.6';
    document.querySelector(`.player${activePlayer}`).style.backgroundColor =
      'rgba(255, 255, 255, 0.8)';

    document.querySelector(
      `.player${Number(!activePlayer)}`
    ).style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    document.querySelector(`.P${Number(activePlayer)}score`).style.opacity =
      '.9';
    document.querySelector(`.P${Number(!activePlayer)}score`).style.opacity =
      '.3';
    document.querySelector(
      `.P${Number(activePlayer)}score`
    ).style.backgroundColor = '#dad3d3';
    document.querySelector(`.P${Number(activePlayer)}score`).style.opacity =
      '.9';
    document.querySelector(`.P${Number(activePlayer)}score`).style.fontWeight =
      '900';

    document.querySelector(`.player${Number(activePlayer)}`).style.fontWeight =
      '900';
  } else {
    document.querySelector(`.player${Number(!activePlayer)}`).style.color =
      'rgb(0 0 0 / 55%)';
    document.querySelector(`.player${Number(activePlayer)}`).style.fontWeight =
      '900';
    document.querySelector(`.player${activePlayer}`).style.opacity = '0.8';
    document.querySelector(`.player${activePlayer}`).style.backgroundColor =
      'rgba(255, 255, 255, 0.7)';

    document.querySelector(`.player${activePlayer}`).style.backgroundColor =
      'rgba(255, 255, 255, 0.9)';

    document.querySelector(
      `.player${Number(!activePlayer)}`
    ).style.backgroundColor = 'rgba(255, 255, 255, 0.3)';

    document.querySelector(`.P${Number(!activePlayer)}score`).style.opacity =
      '.3';
    document.querySelector(`.P${Number(activePlayer)}score`).style.opacity =
      '.9';
  }
}

// WHEN USER CLICK ON BUTTON 'NEW GAME♾️'
function newGame() {
  location.reload();
  // roll();
}
