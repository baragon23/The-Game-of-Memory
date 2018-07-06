/*
 * Create a list that holds all of your cards
 */

var deck = document.getElementsByTagName("ul")[1];
var cardList = document.querySelectorAll('.card');
var openCards = [];
var moves = 0;
var score = document.querySelector('.moves');


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
					openCards.length = 0;
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
				moves += 1;
				score.innerText = moves;
			}
			// only 1 card has been clicked
			else {
				card.classList.add('open');
				card.classList.add('show');
			}
		}
	});
});

cardList = shuffle(cardList);

cardList.forEach(function(card) {
	deck.appendChild(card);
});

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

    return array;
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
