// Copyright Reserved
// Name : Ashish Sadavarti
// Title : Tic Tac Toe Game

// Game elements - Selecting DOM elements for game components
const X = document.querySelector("#X"); // 'X' selection button
const O = document.querySelector("#O"); // 'O' selection button
const boxes = document.querySelectorAll(".grid-item"); // All tic-tac-toe grid cells
const bigbox = document.querySelector(".grid-container"); // The main game board container
const resetButton = document.querySelector("#reset"); // Reset game button
const playerDisplay = document.querySelector("#player-display"); // Display for current player info

// Modal elements - Elements for name input and game end modals
const nameModal = document.getElementById("name-modal"); // Modal for entering player names
const player1Input = document.getElementById("player1"); // Input for Player 1 name
const player2Input = document.getElementById("player2"); // Input for Player 2 name
const startGameBtn = document.getElementById("start-game"); // Button to start game after name entry

const gameEndModal = document.getElementById("game-end-modal"); // Modal shown when game ends
const gameEndMessage = document.getElementById("game-end-message"); // Message in game end modal
const replayBtn = document.getElementById("replay-btn"); // Button to replay with same players
const newGameBtn = document.getElementById("new-game-btn"); // Button to start completely new game

// Game state variables
let currentSymbol = ""; // Tracks current symbol being played ('X' or 'O')
let player1Name = "Player 1"; // Default name for Player 1
let player2Name = "Player 2"; // Default name for Player 2
let currentPlayerName = ""; // Name of current player
let moves = 0; // Count of moves made in current game

// Winning patterns - All possible winning combinations in tic-tac-toe
const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal winning patterns
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical winning patterns
    [0, 4, 8], [2, 4, 6]             // Diagonal winning patterns
];

// Show name input modal when page loads
window.onload = function () {
    nameModal.style.display = "block"; // Display the name entry modal immediately
};

// Start game with entered names
startGameBtn.addEventListener("click", function () {
    // Validate that both names are entered
    if (player1Input.value.trim() === "" || player2Input.value.trim() === "") {
        alert("Please enter both player names!");
        return;
    }

    // Store player names and hide the name modal
    player1Name = player1Input.value.trim();
    player2Name = player2Input.value.trim();
    nameModal.style.display = "none";
    updatePlayerDisplay("Please select X or O to start"); // Prompt for symbol selection
});

// Player symbol selection (X or O)
X.addEventListener("click", function () {
    currentSymbol = "X"; // Set current symbol to X
    currentPlayerName = player1Name; // Set current player to Player 1
    // Disable symbol selection after choosing
    X.style.pointerEvents = "none";
    O.style.pointerEvents = "none";
    updatePlayerDisplay(); // Update the player display
});

O.addEventListener("click", function () {
    currentSymbol = "O"; // Set current symbol to O
    currentPlayerName = player2Name; // Set current player to Player 2
    // Disable symbol selection after choosing
    X.style.pointerEvents = "none";
    O.style.pointerEvents = "none";
    updatePlayerDisplay(); // Update the player display
});

// Update the player display with current game status
function updatePlayerDisplay(message) {
    if (message) {
        // If a specific message is provided, show that
        playerDisplay.textContent = message;
    } else {
        // Otherwise show current player info
        playerDisplay.textContent = `Current Player: ${currentPlayerName} (${currentSymbol})`;
    }
}

// Show game end modal with result message
function showGameEndModal(message) {
    gameEndMessage.textContent = message; // Set the result message
    gameEndModal.style.display = "block"; // Show the modal
    bigbox.style.pointerEvents = "none"; // Disable further moves on the board
}

// Handle clicks on the game board cells
boxes.forEach((box) => {
    box.addEventListener("click", function () {
        // Don't proceed if no symbol selected or cell already taken
        if (!currentSymbol || box.innerText !== "") return;

        // Mark the cell with current symbol
        box.innerText = currentSymbol;
        box.style.pointerEvents = "none"; // Prevent clicking this cell again
        moves++; // Increment move count

        // Check for winner after move
        if (checkWinner()) {
            setTimeout(() => {
                showGameEndModal(`🎉${currentPlayerName} wins!🥳`); // Show win message
            }, 100);
            return;
        }

        // Check for draw if all cells are filled
        if (moves === 9) {
            setTimeout(() => {
                showGameEndModal("It's a draw!"); // Show draw message
            }, 100);
            return;
        }

        // Switch turns
        if (currentSymbol === "X") {
            currentSymbol = "O";
            currentPlayerName = player2Name;
        } else {
            currentSymbol = "X";
            currentPlayerName = player1Name;
        }
        updatePlayerDisplay(); // Update display for new turn
    });
});

// Check if current player has won
function checkWinner() {
    return winningPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return (
            boxes[a].innerText !== "" && // Cell isn't empty
            boxes[a].innerText === boxes[b].innerText && // Three matching symbols
            boxes[b].innerText === boxes[c].innerText
        );
    });
}

// Reset the game board (clear all cells)
function resetBoard() {
    boxes.forEach(box => {
        box.innerText = ""; // Clear cell content
        box.style.pointerEvents = "auto"; // Re-enable cell clicks
    });
    moves = 0; // Reset move counter
    bigbox.style.pointerEvents = "auto"; // Re-enable board
}

// Replay button - reset board but keep same players and symbols
replayBtn.addEventListener("click", () => {
    resetBoard();
    gameEndModal.style.display = "none"; // Hide end game modal
    updatePlayerDisplay(); // Update player display
});

// New Game button - completely reset everything
newGameBtn.addEventListener("click", () => {
    resetBoard();
    currentSymbol = ""; // Reset current symbol
    currentPlayerName = ""; // Reset current player
    player1Name = "Player 1"; // Reset to default names
    player2Name = "Player 2";
    updatePlayerDisplay("Please select X or O to start"); // Reset display message
    gameEndModal.style.display = "none"; // Hide end game modal
    nameModal.style.display = "block"; // Show name entry modal again

    // Re-enable symbol selection buttons
    X.style.pointerEvents = "auto";
    O.style.pointerEvents = "auto";

    // Clear previous player name inputs
    player1Input.value = "";
    player2Input.value = "";
});

// Reset game button (from main UI) - similar to New Game but keeps names
resetButton.addEventListener("click", function () {
    resetBoard();
    // Re-enable symbol selection
    X.style.pointerEvents = "auto";
    O.style.pointerEvents = "auto";
    currentSymbol = ""; // Reset current symbol
    currentPlayerName = ""; // Reset current player
    updatePlayerDisplay("Please select X or O to start"); // Reset display message
});