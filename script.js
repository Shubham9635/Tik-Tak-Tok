const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function createBoard() {
    board.innerHTML = "";
    gameState.forEach((cell, index) => {
        let div = document.createElement("div");
        div.classList.add("cell");
        div.innerText = cell;
        div.addEventListener("click", () => makeMove(index));
        board.appendChild(div);
    });
}

function makeMove(index) {
    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    createBoard();
}

function checkWinner() {
    for (let pattern of winPatterns) {
        let [a,b,c] = pattern;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            statusText.innerText = currentPlayer + " Wins!";
            gameActive = false;
            return;
        }
    }

    if (!gameState.includes("")) {
        statusText.innerText = "Draw!";
        gameActive = false;
    }
}

function restartGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.innerText = "";
    createBoard();
}

createBoard();
