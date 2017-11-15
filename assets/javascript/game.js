// debugger;
var game = {
	//random words
	words: [
		{
			word: "copper",
		},
		{
			word: "explain",
		},
		{
			word: "fated",
		},
		{
			word: "truck",
		},
		{
			word: "neat",
		},
		{
			word: "unite",
		},
		{
			word: "branch",
		},
		{
			word: "educated",
		},
		{
			word: "tenuous",
		},
		{
			word: "hum",
		},
		{
			word: "decisive",
		},
		{
			word: "notice",
		},
	],
	wordToGuess:'',
	wordLength:'',
	guessProgress: [],
	guessedLetters: [],

	/* gets a random number from 0 to (the number of words - 1), returns the word at that index */
	getRandomWord: function() {
		var random = Math.floor(Math.random() * this.words.length);
		return this.words[random];
	},

	initalizeGame: function() {
		this.wordToGuess = this.getRandomWord().word;
		for (var i = 0; i < this.wordToGuess.length; i++) {
			this.guessProgress.push("_");
		}
		this.showGuessProgress();
	},

	showGuessProgress: function() {
		/* show each item of the guessProgress array separated by a space */
		document.getElementById("word").innerHTML = (this.guessProgress.join(" "));
		/* show each item of the guessedLetters array separated by a space */
		document.getElementById("guessedLetters").innerHTML = (this.guessedLetters.join(" "));
	},

	guess: function(event) { /* event parameter required in firefox */
		this.key = String.fromCharCode(event.keyCode).toLowerCase();

		// Doesn't work in firefox
		// this.key = event.key; 

		var isLetter = function(str) {
		  return str.length === 1 && str.match(/[a-z]/i);
		};

		if (isLetter(this.key)) {
			/* check if the letter is in the word */
			if (this.wordToGuess.indexOf(this.key) === -1) {
				this.guessWrong();
			} else {
				this.guessCorrect();
			}
	  		this.showGuessProgress();
		} else {
			/* do something here if the key is not a letter */
		}
	},
	
	guessWrong: function() {
		// check if letter has been guessed whether it's in the guessedLetters array
		if (this.guessedLetters.indexOf(this.key) === -1) {
			// add the letter to the guessed array
			this.guessedLetters.push(this.key);
			// decrement the available guesses by 1
			document.getElementById("guessesLeft").innerHTML --;
		} else {
			/* do something if repeat guess */
		}
	},

	guessCorrect: function() {
		// loop each letter in the wordToGuess, if it matches the guess, add it to guessProgress at the same index
		for (var i = 0; i < this.wordToGuess.length; i ++) {
			if (this.wordToGuess[i] === this.key) {
				this.guessProgress[i] = this.key;
			}
		}
	}
};

window.onload = function() {
	game.initalizeGame();
};

document.onkeyup = function(event) {
	game.guess(event);
};

