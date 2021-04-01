const cardDeck = ["anchor.png", "anchor.png", "arrow.png", "arrow.png", "bed.png", "bed.png", "bike.png", "bike.png",
                "diamond.png", "diamond.png", "candy.png", "candy.png", "atom.png", "atom.png", "smile.png", "smile.png"];

const deck = document.querySelector(".deck-of-cards");

const modal = document.getElementById("modal");

const reset = document.querySelector(".reset-btn");

const tryAgain = document.querySelector(".play-again-btn");

const trackMoves = document.querySelector(".moves");

let revealed = [];
let matched = [];

let moves = 0;

function shuffle(array) {
    let currentOrder = array.length, tempVal, randomOrder;
    while (currentOrder !== 0) {
        randomOrder = Math.floor(Math.random() * currentOrder);
        currentOrder -= 1;
        tempVal = array[currentOrder];
        array[currentOrder] = array[randomOrder];
        array[randomOrder] = tempVal;
    }
    return array;
}

function initGame() {
    console.log("START FUNCTION");
    const shuffleAll = shuffle(cardDeck);
    for (let i = 0; i < shuffleAll.length; i++) {
        const liTag = document.createElement('LI');
        liTag.classList.add('card');
        const addImage = document.createElement('IMG');
        liTag.appendChild(addImage);
        addImage.setAttribute('src', `assets/images/${shuffleAll[i]}`);
        deck.appendChild(liTag);
    }
}

initGame();

function removeCard() {
    while (deck.hasChildNodes()) {
        deck.removeChild(deck.firstChild);
    }
}

function restartPlay() {
    moves = 0;
    trackMoves.innerHTML = 0;
    revealed = [];
    matched = [];
    removeCard();
    initGame();
}

function trackMovesMAde() {
    trackMoves.innerHTML ++;
    moves ++;
}

function checkMatches() {
    if (revealed.length === 2) {
        document.body.style.pointerEvents = "none";
    }
    if (revealed.length === 2 && revealed [0].src === revealed[1].src) {
        match();
    } else if (revealed.length === 2 && revealed[0].src != revealed[1].src) {
        noMatch();
    }
}