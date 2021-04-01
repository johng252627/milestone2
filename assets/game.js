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