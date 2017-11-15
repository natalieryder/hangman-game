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
	start: function() {
		document.getElementById("game").innerHTML = 
		"<h2 id='word'></h2>" +
		"<p>Letters Guessed</p>" +
		"<p id='guessedLetters'></p>" +
		"<p>Guesses Left</p>" +
		"<p id='guessesLeft'>20</p>";
		this.initalizeGame();
		document.getElementById("btn-start").style.display = "none";
		document.getElementById("btn-quit").style.display = "block";
	},
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

	isGuessed: function(key, list) {
		return (list.indexOf(key) !== -1);
	},

	isLetter: function(str) {
		return str.length === 1 && str.match(/[a-z]/i);
	},

	guess: function(event) { /* event parameter required in firefox */
		this.key = String.fromCharCode(event.keyCode).toLowerCase();

		// Doesn't work in firefox
		// this.key = event.key; 

		if (!this.isLetter(this.key)) {
			// alert("That\'s not a letter!")
			return;
		}
		if (this.isGuessed(this.key, this.guessedLetters)) {
			// alert("You already guessed that!")
			return;
		}
		if (this.wordToGuess.indexOf(this.key) === -1) {
			this.guessWrong();
		} else {
			this.guessCorrect();
		}
		this.showGuessProgress();
		if (this.guessProgress.join("") === this.wordToGuess) {
			this.win();
		}
  		
	},
	
	guessWrong: function() {
		// add the letter to the guessed array
		this.guessedLetters.push(this.key);
		// decrement the available guesses by 1
		document.getElementById("guessesLeft").innerHTML --;
	},

	guessCorrect: function() {
		// loop each letter in the wordToGuess, if it matches the guess, add it to guessProgress at the same index
		for (var i = 0; i < this.wordToGuess.length; i ++) {
			if (this.wordToGuess[i] === this.key) {
				this.guessProgress[i] = this.key;
			}
		}
	},
	win: function() {
		document.getElementById("btn-quit").style.display = "none";
		document.getElementById("btn-restart").style.display = "block";
	}
};

window.onload = function() {
	document.getElementById("btn-start").style.display = "block";

	document.getElementById("btn-start").addEventListener("click", function()  {
		game.start();
	});
};

document.onkeyup = function(event) {
	game.guess(event);
};



