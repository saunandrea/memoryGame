/*
 * Create a list that holds all of your cards
 */
const cards = [
    "fa-bug", "fa-bug",
    "fa-leaf", "fa-leaf",
    "fa-diamond", "fa-diamond",
    "fa-heart", "fa-heart",
    "fa-hand-peace-o", "fa-hand-peace-o",
    "fa-magic", "fa-magic",
    "fa-motorcycle", "fa-motorcycle",
    "fa-sun-o", "fa-sun-o"
];

let openCard = null;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function setCards(cardArray) {
    let shuffled = shuffle(cardArray);
    let deck = document.getElementsByClassName("deck")[0];
    for (let fa of shuffled) {
        let li = document.createElement("li");
        li.classList.add("card");
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

function setupEvents() {
    document.getElementsByClassName("deck")[0].addEventListener("click", function (e) {
        // e.target is the clicked element!
        // If it was a list item
        if (e.target && e.target.nodeName == "LI" && !e.target.classList.contains("open") && !e.target.classList.contains("match")) {
            // List item found!  Output the ID!
            let iconElement = e.target.firstChild;
            e.target.classList.add("open");
            console.log("List item ", iconElement.classList, " was clicked!");
            let iconClass;
            for (let c of iconElement.classList) {
                if (c.indexOf('fa-') > -1) {
                    iconClass = c;
                }
            }
            if (openCard) {
                if (openCard.firstChild.classList.contains(iconClass)) {
                    console.log("it's a match");
                    e.target.classList.toggle("match");
                    openCard.classList.toggle("match");
                    e.target.classList.toggle("open");
                    openCard.classList.toggle("open");
                    openCard = null;
                } else {
                    console.log("not looking good");
                    e.target.classList.toggle("open");
                    openCard.classList.toggle("open");
                    openCard = null;
                }

            } else {
                openCard = e.target;
            }
        }
    });
}

setCards(cards);
setupEvents();