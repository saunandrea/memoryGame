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
let timeoutComplete = true;
let matchCounter = 0;
let attempts = 0;
const moves = document.getElementsByClassName("moves")[0];
let startDate;
var timer; 

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

function checkifCardsMatch(lastClicked) {
    if (openCard) {
        let iconElement = lastClicked.firstChild;
        console.log("List item ", iconElement.classList, " was clicked!");
        let iconClass;
        for (let c of iconElement.classList) {
            if (c.indexOf('fa-') > -1) {
                iconClass = c;
            }
        }
        if (!iconClass) {
            console.log("Error. Not an icon.");
            return;
        }
        if (openCard.firstChild.classList.contains(iconClass)) {
            console.log("it's a match");
            lastClicked.classList.toggle("match");
            openCard.classList.toggle("match");
            matchCounter++;
            if (matchCounter == 8) {
                console.log("you woooonnn!!!!");
                resetGame();
                return;
            }
        } else {
            console.log("not looking good");
            lastClicked.classList.toggle("open");
            openCard.classList.toggle("open");
        }
        openCard = null;
        setAttempts(attempts + 1);
    } else {
        if(attempts == 0 ){
            console.log("want timer to start");
            startDate = new Date().getTime();
            timer = window.setInterval(function () {
                var now = new Date().getTime();
                var distance =  now - startDate;
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
            }, 1000);
        }
        openCard = lastClicked;
    }

    /*     if (!timeoutComplete) {
            setTimeout(function () {
                timeoutComplete = true;
            }, 1000)
        } */

}

function setAttempts(newVal) {
    attempts = newVal;
    if (attempts == 15) {
        document.getElementsByClassName("stars")[0].firstElementChild.style.display = "none";
    }
    else if (attempts == 20) {
        document.getElementsByClassName("stars")[0].lastElementChild.style.display = "none";
    }
    moves.innerHTML = attempts;
}

function resetGame() {
    window.clearInterval(timer);
    timer = null; //todo: for some reason timer not starting again after a reset
    document.getElementById("timer").innerHTML = "0m 0s ";
    matchCounter = 0;
    setAttempts(0);
    //todo: store a variable with this list so not looking up so much 
    document.getElementsByClassName("stars")[0].children[0].style.display = "inline";
    document.getElementsByClassName("stars")[0].children[2].style.display = "inline";
    //todo: ideally would like to sub out the classes but can optimize in a rev 2 vs deleting and readding
    let deck = document.getElementsByClassName("deck")[0];
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }
    setCards(cards);

}

function setupEvents() {
    document.getElementsByClassName("deck")[0].addEventListener("click", function (e) {
        let target;
        if (e.target) {
            target = e.target;
        } else {
            return;
        }
        if (target.nodeName == "I") {
            target = target.parentNode;
        }
        if (target && (target.nodeName == "LI") && !target.classList.contains("open")) {  //(timeoutComplete || !openCard) &&
            target.classList.add("open");
            setTimeout(function () {
                checkifCardsMatch(target);
            }, 1000)
        }
    });

    document.getElementsByClassName("restart")[0].addEventListener("click", function (e) {
        resetGame();
    });
}

setCards(cards);
setupEvents();