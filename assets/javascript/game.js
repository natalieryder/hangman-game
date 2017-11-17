// debugger;
var game = {
	//random words
	words: [
		{
			word: "deadlift",
			video: "https://www.youtube.com/embed/MDuXuUg15mk",
			works:  ["Gluteus Maximus: (Butt)",
					"Quadriceps: (Upper Front legs)",
					"Adductor Magnus: (Inner Thigh)",
					"Soleus: (Smaller part of your calf muscle)",
					"Hamstrings: (Upper back of legs)",
					"Gastrocnemius: (bigger part of your calf muscle)",
					"Erector Spinae: (lower back)",
					"Trapezius, upper: (upper neck muscles)",
					"Trapezius, middle: (middle neck muscles)",
					"Levator Scapulae: (the muscle from your jaw to your shoulder)",
					"Rhomboids:  ( upper inner back muscles right below your neck)",
					"Rectus Abdominis: (abs)",
					"Obliques: (side abs)"]
		},
		{
			word: "back squat",
			video: "https://www.youtube.com/embed/t2b8UdqmlFs",
		},
		{
			word: "cable pull through",
			video: "https://youtube.com/embed/0VEomRR3HCw",
		},
		{	word: "bench press",
			video: "https://youtube.com/embed/BGhtifoO9Vw",
		},
	],
	on: true,
	wordToGuess:'',
	video: '',
	guessProgress: [],
	guessedLetters: [],
	guessesLeft:5,

	/* gets a random number from 0 to (the number of words - 1), returns the word at that index */
	start: function() {
		document.getElementById("game").innerHTML = 
			"<h2 id='word'></h2>" +
			"<p class='mt-5'>Letters Guessed</p>" +
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

		/*reset all the variables */
		game.on = true;
		this.guessProgress = [];
		this.guessedLetters = [];
		this.guessesLeft = 5;
		var word = this.getRandomWord();
		this.wordToGuess = word.word;
		this.video = word.video;

		for (var i = 0; i < this.wordToGuess.length; i++) {
			if (this.wordToGuess[i] === " ") {
				this.guessProgress.push(" ");
			} else {
				this.guessProgress.push("_");
			}
		}

		this.showGuessProgress();


		document.getElementById("btn-quit").style.display = "block";
		document.getElementById("winning").classList.remove('show');
		document.getElementById("winning").classList.add("hidden");
		document.getElementById("losing").classList.remove('show');
		document.getElementById("losing").classList.add("hidden");
	},

	showGuessProgress: function() {
		/* show each item of the guessProgress array separated by a space */
		document.getElementById("word").innerHTML = (this.guessProgress.join("&nbsp;"));
		/* show each item of the guessedLetters array separated by a space */
		document.getElementById("guessedLetters").innerHTML = (this.guessedLetters.join("&nbsp;"));

		document.getElementById("guessesLeft").innerHTML = (this.guessesLeft);
// console.log("showGuessProgress")
	},

	isGuessed: function(key, guessedLetters) {
		return (guessedLetters.indexOf(key) !== -1);
	},

	isLetter: function(str) {
		return str.length === 1 && str.match(/[a-z]/i);
	},

	guess: function(event) { /* event parameter required in firefox */
		if (!this.on) {
			return;
		}
		var key = String.fromCharCode(event.keyCode).toLowerCase();

		// Doesn't work in firefox
		// this.key = event.key; 

		if (!this.isLetter(key)) {
			return;
		}
		if (this.isGuessed(key, this.guessedLetters)) {
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
		document.getElementById("btn-quit").style.display = "none";
		// document.getElementsByClassName("btn-restart").style.display = "block";
		var winAlert = document.getElementById("winning");
		winAlert.classList.add("show");
		winAlert.classList.remove("hidden");
		document.getElementsByClassName("word-end").innerHTML = this.wordToGuess;
		document.getElementById("video").setAttribute("src",this.video);


		this.showAnswer();

	},

	lose: function() {
		game.on = false;
		var loseAlert = document.getElementById("losing");
		loseAlert.classList.add("show"); // show the lose screnn
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
		alert("hah, I stumped you! The answer is \"" + game.wordToGuess + "\". Try another one!");
		game.initalizeGame();
	});
};

document.onkeyup = function(event) {
	game.guess(event);
};



