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
	guessProgress: [],
	guessedLetters: [],
	guessesLeft:20,

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
		
	},
	getRandomWord: function() {
		var random = Math.floor(Math.random() * this.words.length);
		return this.words[random];
	},

	initalizeGame: function() {
		this.guessProgress = [];
		this.guessedLetters = [];
		this.guessesLeft = 20;

		this.wordToGuess = this.getRandomWord().word;
		for (var i = 0; i < this.wordToGuess.length; i++) {
			this.guessProgress.push("_");
		}
		this.showGuessProgress();
		document.getElementById("btn-quit").style.display = "block";
		document.getElementById("btn-restart").style.display = "none";
	},

	showGuessProgress: function() {
		/* show each item of the guessProgress array separated by a space */
		document.getElementById("word").innerHTML = (this.guessProgress.join(" "));
		/* show each item of the guessedLetters array separated by a space */
		document.getElementById("guessedLetters").innerHTML = (this.guessedLetters.join(" "));
		document.getElementById("guessesLeft").innerHTML = (this.guessesLeft);
	},

	isGuessed: function(key, list) {
		return (list.indexOf(key) !== -1);
	},

	isLetter: function(str) {
		return str.length === 1 && str.match(/[a-z]/i);
	},

	guess: function(event) { /* event parameter required in firefox */
		var key = String.fromCharCode(event.keyCode).toLowerCase();

		// Doesn't work in firefox
		// this.key = event.key; 

		if (!this.isLetter(key)) {
			// alert("That\'s not a letter!")
			return;
		}
		if (this.isGuessed(key, this.guessedLetters)) {
			// alert("You already guessed that!")
			return;
		}
		if (this.wordToGuess.indexOf(key) === -1) {
			this.guessWrong(key, this.guessedLetters);
		} else {
			this.guessCorrect(key, this.wordToGuess, this.guessProgress);
		}
		this.showGuessProgress();
		if (this.guessProgress.join("") === this.wordToGuess) {
			this.win();
		}
	},
	guessWrong: function(key, list) {
		// add the letter to the guessed array
		list.push(key);
		// decrement the available guesses by 1
		this.guessesLeft --;
	},

	guessCorrect: function(key, wordToGuess, guessProgress) {
		// loop each letter in the wordToGuess, if it matches the guess, add it to guessProgress at the same index
		for (var i = 0; i < wordToGuess.length; i ++) {
			if (wordToGuess[i] === key) {
				guessProgress[i] = key;
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
	document.getElementById("btn-restart").addEventListener("click", function()  {
		game.initalizeGame();
	});
};

document.onkeyup = function(event) {
	game.guess(event);
};



