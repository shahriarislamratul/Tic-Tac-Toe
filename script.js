const board = document.getElementById("board");
const status = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const xClickSound = document.getElementById("xClickSound");
const oClickSound = document.getElementById("oClickSound");
const winSound = document.getElementById("winSound");
const drawSound = document.getElementById("drawSound");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameEnded = false;

// Function to create the Tic Tac Toe board
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
}

// Handle click on a cell
function handleCellClick(event) {
    if (gameEnded) return; // Ignore clicks after the game ends
    const clickedCell = event.target;
    const cellIndex = parseInt(clickedCell.getAttribute("data-index"));

    if (gameBoard[cellIndex] === "" && !checkWinner()) {
        gameBoard[cellIndex] = currentPlayer;
        updateBoard();
        playClickSound(currentPlayer); // Play click sound based on currentPlayer
        if (checkWinner()) {
            status.textContent = `Player ${currentPlayer} wins!`;
            playWinSound(); // Play victory sound
            gameEnded = true;
        } else if (gameBoard.every((cell) => cell !== "")) {
            status.textContent = "It's a draw!";
            markDraw();
            playDrawSound(); // Play draw sound
            gameEnded = true;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Current Player: ${currentPlayer}`;
        }
    }
}

// Update the board based on the current state
function updateBoard() {
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = gameBoard[i];
    }
}

// Play click sound based on the current player
function playClickSound(player) {
    if (player === "X") {
        xClickSound.play();
    } else if (player === "O") {
        oClickSound.play();
    }
}

// Check for a winner and highlight the winning line or mark draw
function checkWinner() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            highlightWinningLine(condition);
            return true;
        }
    }

    return false;
}

// Highlight the winning line by adding a CSS class and remove it after a delay
function highlightWinningLine(line) {
    const cells = document.getElementsByClassName("cell");
    line.forEach((index) => {
        cells[index].classList.add("winning-cell");
    });

    setTimeout(() => {
        line.forEach((index) => {
            cells[index].classList.remove("winning-cell");
            cells[index].style.backgroundColor = ""; // Reset cell color
        });
    }, 3000); // Change the timeout duration (in milliseconds) as needed
}

// Mark draw by changing the background color of all cells
function markDraw() {
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "#FF0000"; // Change to your preferred color
    }
}

// Play the winning sound
function playWinSound() {
    winSound.play();
}

// Play the draw sound
function playDrawSound() {
    drawSound.play();
}

// Reset the game
function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    status.textContent = "Current Player: X";
    updateBoard();
    
    // Reset cell colors
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = ""; // Reset to default or your preferred background color
    }

    // Pause the victory music and draw sound
    winSound.pause();
    winSound.currentTime = 0; // Reset the audio to the beginning
    drawSound.pause();
    drawSound.currentTime = 0; // Reset the audio to the beginning

    gameEnded = false; // Reset game state
}

// Initialize the game
createBoard();
status.textContent = "Current Player: X";
