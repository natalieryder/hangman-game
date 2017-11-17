// remove item after it's been guessed
// change guesses left based on length of word
// handle the give up button

var game = {
	//random words
	words: [
		{
			word: "deadlift",
			video: "https://www.youtube.com/embed/MDuXuUg15mk",
			works:  [
				"Gluteus Maximus",
				"Quadriceps",
				"Adductor Magnus",
				"Soleus",
				"Hamstrings",
				"Gastrocnemius",
				"Erector Spinae",
				"Trapezius",
				"Levator Scapulae",
				"Rhomboids",
				"Rectus Abdominis",
				"Obliques"
			]
		},
		{
			word: "back squat",
			video: "https://www.youtube.com/embed/t2b8UdqmlFs",
			works: [
				"Quadriceps",
				"Gluteus Maximus",
				"Adductor Magnus",
			]
		},
		{
			word: "cable pull-through",
			video: "https://youtube.com/embed/0VEomRR3HCw",
			works: [
				"Gluteus Maximus",
				"Hamstrings"
			]
		},
		{	word: "bench press",
			video: "https://youtube.com/embed/BGhtifoO9Vw",
			works: [
				"Pectoralis Major",
				"Deltoids",
				"Triceps",
				"Biceps",
				"Latissimus Dorsi"
				]
		},
		{	word: "Hip Thrust",
			video: "https://www.youtube.com/embed/LM8XHLYJoYs",
			works: [
				"Gluteus Maximus"
			]

		},
		{	word: "hanging leg raise",
			video: "https://www.youtube.com/embed/G0ysNevIv0w",
			works: [
				"Latissimus Dorsi",
				"Abdominals",
			]

		},
		{	word: "front squat",
			video: "https://www.youtube.com/embed/VfBOBhwXbro",
			works: [
				"Quadriceps",
				"Upper Back",
			]

		},
		{	word: "lunge",
			video: "https://www.youtube.com/embed/Z2n58m2i4jg",
			works: [
				"Quadriceps",
				"Glutes",
				"Hamstrings"
			]
		},
		{	word: "pull up",
			video: "https://www.youtube.com/embed/hPbZvtzgWx0",
			works: [
				"Latissimus Dorsi",
				"Biceps",
				"Abdominals",
				"Posterior Deltoids"
			]
		},
		{	word: "pull up",
			video: "https://www.youtube.com/embed/NZGBjWRwEP0",
			works: [
				"Pectorals",
				"Abdominals",
				"Triceps",
				"Deltoids"
			]
		},

	],
	on: true,
	wordToGuess:'',
	video: '',
	guessProgress: [],
	guessedLetters: [],
	guessesLeft: '',
	guesses:10,
	wins: 0,

	/* gets a random number from 0 to (the number of words - 1), returns the word at that index */
	start: function() {
		document.getElementById("game").innerHTML = 
			"<p>Press A Letter Key To Guess</p>" +
			"<h2 id='word'></h2>" +
			"<p class='mt-5'>Letters Guessed</p>" +
			"<p id='guessedLetters'></p>" +
			"<p>Guesses Left</p>" +
			"<p id='guessesLeft'>20</p>";
		this.initalizeGame();
		document.getElementById("btn-start").style.display = "none";
	},

	getRandomWord: function(array) {
		var random = Math.floor(Math.random() * array.length);
		return array[random];

		/* removes the word from the array when it is grabbed, but breaks when it runs out */
		// var randomword = array[random];
		// array.splice(random,1);
		// return randomword;

	},

	initalizeGame: function() {

		/*reset all the variables */
		game.on = true;
		this.guessProgress = [];
		this.guessedLetters = [];
		this.guessesLeft = this.guesses;
		var word = this.getRandomWord(this.words);
		this.wordToGuess = word.word.toLowerCase();
		this.video = word.video;
		this.works = word.works;

		for (var i = 0; i < this.wordToGuess.length; i++) {
			if (this.isLetter(this.wordToGuess[i])) {
				this.guessProgress.push("_");
			} else {
				this.guessProgress.push(this.wordToGuess[i]);
			}
		}

		this.showGuessProgress();

		document.getElementById("btn-quit").style.display = "block";
		document.getElementById("winning").classList.add("hidden");
		document.getElementById("losing").classList.add("hidden");
	},

	showGuessProgress: function() {
		/* show each item of the guessProgress array separated by a space */
		document.getElementById("word").innerHTML = (this.guessProgress.join("&nbsp;"));
		/* show each item of the guessedLetters array separated by a space */
		document.getElementById("guessedLetters").innerHTML = (this.guessedLetters.join("&nbsp;"));
		/* show how many guesses are left */
		document.getElementById("guessesLeft").innerHTML = (this.guessesLeft);


	},

	isGuessed: function(key, guessedLetters) {
		return (guessedLetters.indexOf(key) !== -1);
	},

	isLetter: function(str) {
		return str.length === 1 && str.match(/[a-z]/i);
	},
	showError: function(message) {
		var error = document.getElementById("error");
		error.innerHTML = message;
		error.classList.add("error-show");
		setTimeout(function(){error.classList.remove("error-show");}, 2000);
	},
	guess: function(event) { /* event parameter required in firefox */
		if (!this.on) {
			return;
		}
		var key = String.fromCharCode(event.keyCode).toLowerCase();

		// Doesn't work in firefox
		// this.key = event.key; 

		if (!this.isLetter(key)) {
			this.showError("That's not a letter!");
			return;

		}
		if (this.isGuessed(key, this.guessedLetters) || this.isGuessed(key, this.guessProgress)) {
			this.showError("You guessed \"" + key + "\" already");
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
		if (this.guessesLeft <= 0) {
			this.lose();
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
		game.on = false;
		game.wins++;
		document.getElementById("wins").innerHTML = game.wins;
		document.getElementById("btn-quit").style.display = "none";
		var winAlert = document.getElementById("winning");
		winAlert.classList.remove("hidden");
		document.getElementsByClassName("word-end").innerHTML = this.wordToGuess;
		document.getElementById("video").setAttribute("src",this.video);
		document.getElementById("works").innerHTML = this.getRandomWord(this.works);

		this.showAnswer();

	},

	lose: function() {
		game.on = false;
		var loseAlert = document.getElementById("losing");
		loseAlert.classList.remove("hidden");
		document.getElementById("btn-quit").style.display = "none"; //hide the quit button
		this.showAnswer();
		
	},

	showAnswer: function() {
		var wordend = document.getElementsByClassName("wordend");
		for (var i = 0; i < wordend.length; i++) {
			document.getElementsByClassName("wordend")[i].innerHTML = this.wordToGuess;
		}
	}
};

window.onload = function() {
	document.getElementById("btn-start").style.display = "block";

	document.getElementById("btn-start").addEventListener("click", function()  {
		game.start();
	});


	document.body.onclick = function(e) {   //when the document body is clicked
	    if (window.event) {
	        e = event.srcElement;           //assign the element clicked to e (IE 6-8)
	    }
	    else {
	        e = e.target;                   //assign the element clicked to e
	    }
	    if (e.className && e.className.indexOf('btn-restart') !== -1) {
	        //if the element has 'btn-restart' class then...
	        game.initalizeGame();
	    }
	};

	document.getElementsByClassName("btn-restart")[1].addEventListener("click", function()  {
		game.initalizeGame();
	});
	document.getElementById("btn-quit").addEventListener("click", function()  {
		game.on = false;
		alert("hah, I stumped you! The answer is \"" + game.wordToGuess + "\". Try another one!");
		game.initalizeGame();
	});
};

document.onkeyup = function(event) {
	game.guess(event);
};



