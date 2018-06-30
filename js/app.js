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
var minutes;
var seconds; 

var startTimer = function(){
    console.log("Start");
    startDate = new Date().getTime();
    begin = setInterval(countdown, 1000); // Call countdown function every 1000 milliseconds
}

var stopTimer = function(){
	console.log("Stop");
	window.clearInterval(begin) // clear the timer and so stop the clock
}

var resetTimer = function(){
	console.log("Reset");
	window.clearInterval(begin) // clear the timer and so stop the clock
    document.getElementById("timer").innerHTML = "0m 0s ";
}

var countdown = function(){
    var now = new Date().getTime();
    var distance =  now - startDate;
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
}

document.getElementById('resetButton').addEventListener('click', function() {
      document.getElementsByClassName("modal-container")[0].style.display = 'none';
      resetGame();
  });



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
                stopTimer();
              //  resetGame();
              document.getElementById("finalMoves").innerHTML = attempts;
              document.getElementById("finalTime").innerHTML = minutes + "m " + seconds + "s ";
              document.getElementsByClassName('modal-container')[0].style.display = "block";
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
            startTimer();
        }
        openCard = lastClicked;
    }
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
    resetTimer();
    matchCounter = 0;
    setAttempts(0);
    openCard = null;

    document.getElementsByClassName("stars")[0].children[0].style.display = "inline";     //todo: store a variable with this list so not looking up so much 
    document.getElementsByClassName("stars")[0].children[2].style.display = "inline";

    let deck = document.getElementsByClassName("deck")[0];     //todo: ideally would like to sub out the classes but can optimize in a rev 2 vs deleting and readding
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
        if (target && (target.nodeName == "LI") && !target.classList.contains("open")) { 
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