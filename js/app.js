/*
 * Create a list that holds all of your cards
 */
let cards = [
"fa-bug","fa-bug",
"fa-leaf","fa-leaf",
"fa-diamond","fa-diamond",
"fa-heart","fa-heart",
"fa-hand-peace-o","fa-hand-peace-o",
"fa-magic","fa-magic",
"fa-motorcycle","fa-motorcycle",
"fa-sun-o","fa-sun-o"
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function setCards(cardArray) {
    let shuffled = shuffle(cardArray);
    let deck = document.getElementsByClassName("deck")[0];
    for (let fa of shuffled){
        let li = document.createElement("li");
        //li.classList.add("fa", fa);
        li.classList.add("card", "match");
        let i = document.createElement("i");
        i.classList.add("fa", fa);
        li.appendChild(i);
        deck.appendChild(li);
    }
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

    return array;
}

setCards(cards);
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
