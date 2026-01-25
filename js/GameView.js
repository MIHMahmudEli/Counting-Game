export default class GameView {
    constructor() {
        this.countDisplay = document.getElementById("count");
        this.turnIndicator = document.getElementById("turn-indicator");
        this.buttons = document.querySelectorAll("#buttons button");
        this.startContainer = document.getElementById("start-container");

        // Modal Elements
        this.modalOverlay = document.getElementById("modal-overlay");
        this.modalResult = document.getElementById("modal-result");
        this.modalActions = document.getElementById("modal-actions");
    }

    updateCount(count) {
        this.countDisplay.textContent = count;
        this.countDisplay.style.transform = "scale(1.1)";
        setTimeout(() => this.countDisplay.style.transform = "scale(1)", 200);
    }

    updateTurn(turn, isGameOver) {
        if (isGameOver) {
            this.turnIndicator.textContent = "Match Ended";
        } else {
            this.turnIndicator.textContent = turn === "computer" ? "Computer's Turn" : "Your Turn";
        }
    }

    renderResult(message, isWin) {
        this.modalResult.innerHTML = `<span class='${isWin ? "win" : "lose"}'>${message}</span>`;
        this.modalOverlay.classList.remove("hidden");
    }

    clearResult() {
        this.modalOverlay.classList.add("hidden");
        this.modalResult.textContent = "";
        this.modalActions.innerHTML = "";
    }

    disableButtons(disabled) {
        this.buttons.forEach(btn => btn.disabled = disabled);
    }

    updateButtonStates(count, forceDisable = false) {
        this.buttons.forEach((btn, index) => {
            const num = index + 1;
            btn.disabled = forceDisable || (count + num > 21);
        });
    }

    showRestartButton(callback) {
        this.modalActions.innerHTML = "";
        const restartBtn = document.createElement("button");
        restartBtn.textContent = "🔄 Play Again";
        restartBtn.className = "btn btn-primary";
        restartBtn.onclick = () => {
            this.clearResult();
            callback();
        };
        this.modalActions.appendChild(restartBtn);
    }

    bindChooseFirst(handler) {
        const buttons = this.startContainer.querySelectorAll("button");
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Clear previous selection
                buttons.forEach(b => b.classList.remove('selected-btn'));
                // Highlight new selection
                btn.classList.add('selected-btn');

                const turn = btn.textContent.includes("Me") ? 'player' : 'computer';
                handler(turn);
            });
        });
    }

    resetSelection() {
        const buttons = this.startContainer.querySelectorAll("button");
        buttons.forEach(b => b.classList.remove('selected-btn'));
    }

    bindPlayerMove(handler) {
        this.buttons.forEach((btn, index) => {
            btn.onclick = () => handler(index + 1);
        });
    }
}
