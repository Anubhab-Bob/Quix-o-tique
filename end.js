// Get the username
var username = document.getElementById('username');

var saveButton = document.getElementById('saveScore');

var mostRecentScore = localStorage.getItem('mostRecentScore');

// Get the high scores in a varable or set it to be an empty array if there are no high scores yet
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

console.log(highScores);
var finalScore = document.getElementById('finalScore');

// We want to save only top 5 high scores
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', function () {
	saveButton.disabled = !username;
})

saveHighScore = e => {
	console.log("Clicked Save Button");
	/*
	The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
	For example, this can be useful when:
		Clicking on a "Submit" button, prevent it from submitting a form
		Clicking on a link, prevent the link from following the URL
	Note: Not all events are cancelable. Use the cancelable property to find out if an event is cancelable.
	Note: The preventDefault() method does not prevent further propagation of an event through the DOM. Use the stopPropagation() method to handle this.
	*/
	e.preventDefault();

	var scoreDetails = {
		score: mostRecentScore,
		name: username.value,
	};
	//console.log(scoreDetails);
	highScores.push(scoreDetails);

	// Sort the array such that if b.score > a.score then put b before a
	highScores.sort((a, b) => b.score - a.score)

	// Cut of everything after the 5th element
	highScores.splice(5);

	// Save the high scores
	localStorage.setItem('highScores', JSON.stringify(highScores));

	// Go back to home page 
	alert("High Score Saved!")
	window.location.assign('/');
	console.log(highScores);
}