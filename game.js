// Store the question in a variable
var question = document.getElementById('question');

// Store the question number in a variable
var progressText = document.getElementById('progressText');

var progressDisplay = document.getElementById('progressDisplay')

var scoreDisplay = document.getElementById('score');

var loader = document.getElementById('loader');

var game = document.getElementById('game');


// Convert the choices into an array and store it in a variable
var choices = Array.from(document.getElementsByClassName('choice-text'));
// If conversion is not done then we get an HTML Collection object

// Declaring necessary variables
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

// Fetch the questions from Open Trivia DB Open API
// then returns a Promise object and it should be caught
fetch('https://opentdb.com/api.php?amount=15&category=18&difficulty=easy&type=multiple').then(res => {
	return(res.json());
})
.then(loadedQuestions => {
	//questions = loadedQuestions;
	// The fetched questions need to be formatted in the way we have considered
	questions = loadedQuestions.results.map(loadedQuestions => {
		var formattedQuestion = {
			question: loadedQuestions.question
		};

		var answerChoices = [...loadedQuestions.incorrect_answers];
		
		formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
		answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestions.correct_answer);

		answerChoices.forEach((choice, index) => {
			formattedQuestion["choice" + (index + 1)] = choice;

		});
		return formattedQuestion;
	});
	startGame();
})
.catch(err => {
	console.error(err);
});

// Defining necessary constants
const CORRECT_POINTS = 10;
const MAX_QUESTIONS = 15;

function startGame()
{
	setTimeout(function () {
		questionCounter = 0;
		score = 0;
		// Copy the array of questions in availableQuestions into a local copy
		availableQuestions = [...questions];
		getNewQuestion();
		game.classList.remove('hidden');
		loader.classList.add('hidden');
	}, 2000);
}

// Another technique of defining functions
// Syntax - functionName = parameters => {body}
getNewQuestion = () =>
{
	if (questionCounter == MAX_QUESTIONS) {
		localStorage.setItem('mostRecentScore', score);
		return window.location.assign('end.html');
	}
	
	// Increment the question counter
	questionCounter++;

	// Display the question counter
	progressText.innerText = 'Question : ' + questionCounter + '/' + MAX_QUESTIONS;

	// Update the progress bar
	progressDisplay.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

	// Display the score
	scoreDisplay.innerText = score;
	
	// Generate the index of the next qustion 
	let questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];

	//Display the current question
	question.innerText = currentQuestion.question;

	// Display the corresponding choices
	choices.forEach( choice => {
		//Accessing the user-defined attribute
		let number = choice.dataset['number'];
		// Display the choice
		choice.innerText = currentQuestion['choice' + number];
	});

	// Remove the current question from the available questons list
	availableQuestions.splice(questionIndex, 1);

	acceptingAnswers = true;
}

choices.forEach(choice => {
	choice.addEventListener('click', e => {
		console.log(e.target);
		if (!acceptingAnswers)
			return;
		console.log(e.target.dataset['number'], currentQuestion.answer);

		let classToApply = 'incorrect';
		if (e.target.dataset['number'] == currentQuestion.answer) {
			classToApply = 'correct';
			score += CORRECT_POINTS;
		}
		
		// Add a class to show clour change for option selected
		e.target.parentElement.classList.add(classToApply);

		// Remove the class after displaying colour for 2 seconds and then move on to the next question
		setTimeout(function () {
			e.target.parentElement.classList.remove(classToApply);
			getNewQuestion();
		}, 1500);	
	});
});

