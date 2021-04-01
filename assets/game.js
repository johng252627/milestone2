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

deck.addEventListener("click", function(event) {
    function turnCard() {
        const newLocal = "flip";
        event.target.classList.add(newLocal);
        addToRevealed();
    }
    function addToRevealed() {
        if (revealed.length === 0 || revealed.length === 1) {
            revealed.push(event.target.firstElementChild);
       }
        checkMatches();
    }
})

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
        matchFound();
    } else if (revealed.length === 2 && revealed[0].src != revealed[1].src) {
        matchNone();
    }
}

function matchFound() {
    setTimeout(function() {
        revealed[0].parentElement.classList.add("match");
        revealed[1].parentElement.classList.add("match");
        matched.push(...revealed);
        document.body.style.pointerEvents = "auto";
        winGame();
        revealed = [];
    }, 700);
}

function matchNone() {
    setTimeout(function() {
        revealed[0].parentElement.classList.remove("flip");
        revealed[1].parentElement.classList.remove("flip");
        document.body.style.pointerEvents = "auto";
        revealed = [];
    }, 1000);
}

function statsToModal() {
    const stats = document.querySelector(".modal-content");
    for (let i = 1; i <= 3; i++) {
        const statsElement = document.createElement("p");
        statsElement.classList.add("stats");
        statsElement.appendChild(statsElement);
    }
    let p = stats.querySelectorAll("p.stats");
    p[0].innerHTML = "Moves Taken: " + moves;
}

function showModal() {
    const modalClose = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    modalClose.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function winGame() {
    if (matched.length === 16) {
        statsToModal();
        showModal();
    }
}