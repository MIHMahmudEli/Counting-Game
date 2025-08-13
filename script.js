let count = 0;
let gameOver = false;
let currentTurn = null;

const buttons = document.querySelectorAll("#buttons button");
const countDisplay = document.getElementById("count");
const turnIndicator = document.getElementById("turn-indicator");
const resultDisplay = document.getElementById("result");

// The game container is always visible
// No need to hide start-container

function chooseFirst(firstPlayer) {
    if (gameOver) restartGame(); // reset if previous game ended

    count = 0;
    gameOver = false;
    currentTurn = firstPlayer;

    resultDisplay.textContent = "";
    updateCountDisplay();
    updateButtons();

    if (currentTurn === "computer") {
        turnIndicator.textContent = "Computer's Turn";
        setTimeout(computerMove, 800);
    } else {
        turnIndicator.textContent = "Your Turn";
    }
}

function updateCountDisplay() {
    countDisplay.textContent = count;
    countDisplay.style.transform = "scale(1.3)";
    setTimeout(() => countDisplay.style.transform = "scale(1)"), 200;
}

function updateButtons() {
    if (gameOver || currentTurn !== "player") {
        buttons.forEach(btn => btn.disabled = true);
        return;
    }
    buttons.forEach((btn, index) => {
        const num = index + 1;
        btn.disabled = (count + num > 21);
    });
}

function playerMove(num) {
    if (gameOver || currentTurn !== "player") return;

    for (let i = 0; i < num; i++) {
        count++;
        updateCountDisplay();
        if (count === 21) {
            resultDisplay.innerHTML = "<span class='lose'>You Lose! You said 21.</span>";
            endGame();
            return;
        }
    }

    currentTurn = "computer";
    updateButtons();
    turnIndicator.textContent = "Computer's Turn";
    setTimeout(computerMove, 800);
}

function computerMove() {
    let move = count % 4 === 0 ? 1 : 4 - (count % 4);
    if (move > 3) move = 3;

    for (let i = 0; i < move; i++) {
        count++;
        updateCountDisplay();
        if (count === 21) {
            resultDisplay.innerHTML = "<span class='win'>Computer Loses! You Win!</span>";
            endGame();
            return;
        }
    }

    currentTurn = "player";
    turnIndicator.textContent = "Your Turn";
    updateButtons();
}

function endGame() {
    gameOver = true;
    updateButtons();
    showRestartButton();
}

function showRestartButton() {
    const existing = document.getElementById("restart-btn");
    if (existing) existing.remove();

    const restartBtn = document.createElement("button");
    restartBtn.id = "restart-btn";
    restartBtn.textContent = "🔄 Restart Game";
    restartBtn.style.background = "#9b59b6";
    restartBtn.style.marginTop = "15px";
    restartBtn.onclick = restartGame;
    resultDisplay.appendChild(document.createElement("br"));
    resultDisplay.appendChild(restartBtn);
}

function restartGame() {
    count = 0;
    gameOver = false;
    currentTurn = null;
    resultDisplay.textContent = "";
    updateCountDisplay();
    updateButtons();
    turnIndicator.textContent = "Your Turn";
}
