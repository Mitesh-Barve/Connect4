const board = document.getElementById('board');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'red';
let gameBoard = Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => null));

function createBoard() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            board.appendChild(cell);
        }
    }
}

function resetBoard() {
    currentPlayer = 'red';
    gameBoard = Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => null));
    board.innerHTML = '';
    createBoard();
    message.innerText = '';
}

function checkWin() {
    // Check rows
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (
                gameBoard[row][col] === currentPlayer &&
                gameBoard[row][col + 1] === currentPlayer &&
                gameBoard[row][col + 2] === currentPlayer &&
                gameBoard[row][col + 3] === currentPlayer
            ) {
                return true;
            }
        }
    }

    // Check columns
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 7; col++) {
            if (
                gameBoard[row][col] === currentPlayer &&
                gameBoard[row + 1][col] === currentPlayer &&
                gameBoard[row + 2][col] === currentPlayer &&
                gameBoard[row + 3][col] === currentPlayer
            ) {
                return true;
            }
        }
    }

    // Check diagonals (bottom-left to top-right)
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            if (
                gameBoard[row][col] === currentPlayer &&
                gameBoard[row + 1][col + 1] === currentPlayer &&
                gameBoard[row + 2][col + 2] === currentPlayer &&
                gameBoard[row + 3][col + 3] === currentPlayer
            ) {
                return true;
            }
        }
    }

    // Check diagonals (top-left to bottom-right)
    for (let row = 0; row < 3; row++) {
        for (let col = 3; col < 7; col++) {
            if (
                gameBoard[row][col] === currentPlayer &&
                gameBoard[row + 1][col - 1] === currentPlayer &&
                gameBoard[row + 2][col - 2] === currentPlayer &&
                gameBoard[row + 3][col - 3] === currentPlayer
            ) {
                return true;
            }
        }
    }

    return false;
}

function checkDraw() {
    return gameBoard.every(row => row.every(cell => cell !== null));
}

function handleClick(event) {
    // Ensure that the click is on a cell
    const cell = event.target.closest('.cell');
    if (!cell) return;

    const col = parseInt(cell.dataset.col, 10);
    const row = findAvailableRow(col);
    if (row === -1) return;

    // Update the game state
    gameBoard[row][col] = currentPlayer;
    // Update the cell's appearance
    const targetCell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (targetCell) {
        targetCell.style.backgroundColor = currentPlayer;
    }

    // Check for win or draw
    if (checkWin()) {
        message.innerText = `${currentPlayer.toUpperCase()} wins!`;
        board.removeEventListener('click', handleClick);
    } else if (checkDraw()) {
        message.innerText = 'It\'s a draw!';
        board.removeEventListener('click', handleClick);
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    }
}

function findAvailableRow(col) {
    for (let row = 5; row >= 0; row--) {
        if (gameBoard[row][col] === null) {
            return row;
        }
    }
    return -1;
}

// Initial setup
createBoard();
board.addEventListener('click', handleClick);
resetBtn.addEventListener('click', resetBoard);
