/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
  return Math.ceil(Math.random() * 100);
}

function shuffle(array) {
  let m = array.length;
  let i;
  let t;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }

  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }

  isLower() {
    if (this.playersGuess < this.winningNumber) {
      return true;
    } else {
      return false;
    }
  }

  playersGuessSubmission(num) {
    this.playersGuess = num;
    if (num < 1 || num > 100 || typeof num !== "number") {
      throw "That is an invalid guess.";
    }
    return this.checkGuess();
  }

  checkGuess() {
    let feedback = "";
    let highLowFeedback = "";
    if (this.playersGuess === this.winningNumber) {
      feedback = "You Win!";
    } else if (this.pastGuesses.includes(this.playersGuess)) {
      feedback = "You have already guessed that number.";
    } else {
      this.pastGuesses.push(this.playersGuess);
      if (this.pastGuesses.length === 5) {
        feedback = "You Lose.";
      } else {
        let diff = this.difference();
        if (this.isLower()) {
          highLowFeedback = "Guess higher.";
        } else {
          highLowFeedback = "Guess lower.";
        }
        if (diff < 10) {
          feedback = "You're burning up!";
        } else if (diff < 25) {
          feedback = "You're lukewarm.";
        } else if (diff < 50) {
          feedback = "You're a bit chilly.";
        } else if (diff < 100) {
          feedback = "You're ice cold!";
        }
      }
    }
    document.getElementById(`guess${this.pastGuesses.length}`).innerHTML =
      this.playersGuess;
    document.getElementById("hotcold").innerHTML = feedback;
    document.getElementById("higher-lower").innerHTML = highLowFeedback;
    document.getElementById("guesses-left").innerHTML =
      5 - this.pastGuesses.length;
    return feedback;
  }

  provideHint() {
    let hintArray = [];
    hintArray.push(
      this.winningNumber,
      generateWinningNumber(),
      generateWinningNumber(),
      generateWinningNumber(),
      generateWinningNumber()
    );
    let hintNums = shuffle(hintArray);
    document.getElementById(
      "hints"
    ).innerHTML = `Psst. One of these is the correct number: ${hintNums}`;
    return hintNums;
  }
}

function newGame() {
  return new Game();
}

function playGame() {
  let game = newGame();

  let guessField = document.getElementById("input");
  let submitButton = document.getElementById("submit");
  let playAgainButton = document.getElementById("playagain");
  let hintButton = document.getElementById("hint");

  submitButton.addEventListener("click", function () {
    let playersGuess = +guessField.value;
    guessField.value = "";
    game.playersGuessSubmission(playersGuess);
  });

  hintButton.addEventListener("click", function () {
    game.provideHint();
  });

  playAgainButton.addEventListener("click", function () {
    location.reload();
  });
}

playGame();
