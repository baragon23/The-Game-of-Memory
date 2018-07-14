/*
 * Create a list that holds all of your cards
 */

var deck = document.getElementsByTagName("ul")[1];
var openCards = [];
var moves = 0;
var matchedCards = 0;
var score = document.querySelector('.moves');
var startTime, endTime;

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var timerInterval = setInterval(setTime, 1000);

// setup restart button
document.querySelector('.restart').addEventListener('click', function() {
	resetGame();
});

setupGame();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function setupGame() {

	var cardList = document.querySelectorAll('.card');

	startTime = performance.now();

	document.getElementById('playAgain').addEventListener('click', function() {
		playAgain();
	});

	// reset deck of cards
	cardList.forEach(function(card) {
		card.classList.remove('open');
		card.classList.remove('show');
		card.classList.remove('match');
	});

	cardList.forEach(function(card) {
		card.addEventListener('click', function(e) {

			// if the card has not already been displayed or matched
			if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {

				openCards.push(e.target);

				// display card clicked on
				card.classList.add('open');
				card.classList.add('show');

				console.log(openCards);

				// if 2 cards have been clicked
				if (openCards.length === 2) {
					var firstCard = openCards[0].children[0].className;
					var secondCard = openCards[1].children[0].className;

					// the cards match
					if (firstCard === secondCard) {
						openCards.forEach(function(card) {
							card.classList.add('match');
							card.classList.remove('open');
							card.classList.remove('show');
						});

						matchedCards += 2;
						openCards.length = 0;

						// todo: put this if in a isGameWon() function
						// game is won
						if (matchedCards === 16) {
							endTime = performance.now();
							wonGame();
						}
					}
					// the cards don't match
					else {
						setTimeout(function() {
							openCards.forEach(function(card) {
								card.classList.remove('open');
								card.classList.remove('show');
							});
							openCards.length = 0;
						}, 1000);
					}

					// increment moves counter
					movesHandler();

				}
				// only 1 card has been clicked
				else {
					card.classList.add('open');
					card.classList.add('show');
				}
			}
		});
	});

	// convert from nodelist to array so we can use shuffle function
	cardList = [...cardList];
	cardList = shuffle(cardList);

	// add cards to deck
	cardList.forEach(function(card) {
		deck.appendChild(card);
	});
}

function wonGame() {
	endTime = performance.now();
	var finalTime = Math.floor((endTime - startTime) / 1000);
	document.getElementById('timeSummary').innerText = finalTime + ' seconds';

	// display total moves made
	document.getElementById('movesSummary').innerText = moves;

	// show modal
	document.getElementById('modal').style.display = 'flex';
}

function playAgain() {
	totalSeconds = 0; // reset timer

	// todo: will need to call resetGame() here

	// hide modal
	document.getElementById('modal').style.display = 'none';
}

function resetGame() {
	// todo: reset stars back to 3

	moves = 0;
	score.innerText = moves;
	openCards.length = 0;
	wonGame(); // todo: remove after testing modal
	setupGame();
	totalSeconds = 0; // reset timer
}

function movesHandler() {
	moves += 1;

	if (moves === 12) {
		removeStar();
	}
	else if (moves === 16) {
		removeStar();
	}

	score.innerText = moves;
}

function removeStar(count) {
	var stars = document.getElementsByClassName('stars');
	stars[0].removeChild(stars[0].children[0]);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    console.log(array);
    return array;
}

function setTime() {
	++totalSeconds;
	secondsLabel.innerHTML = pad(totalSeconds % 60);
	minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
	var valString = val + "";
	if (valString.length < 2) {
		return "0" + valString;
	} else {
		return valString;
	}
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
