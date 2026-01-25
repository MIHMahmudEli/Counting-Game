export default class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindChooseFirst(this.handleChooseFirst.bind(this));
        this.view.bindPlayerMove(this.handlePlayerMove.bind(this));
    }

    handleChooseFirst(firstPlayer) {
        if (this.model.gameOver) this.restartGame();

        this.model.reset();
        this.model.setTurn(firstPlayer);

        this.view.clearResult();
        this.view.updateCount(this.model.count);
        this.view.updateTurn(this.model.currentTurn, this.model.gameOver);
        this.view.updateButtonStates(this.model.count);

        if (this.model.currentTurn === "computer") {
            this.view.disableButtons(true);
            setTimeout(() => this.computerMove(), 1200); // Consistent high-quality delay
        }
    }

    handlePlayerMove(num) {
        if (this.model.gameOver || this.model.currentTurn !== "player") return;

        // Animate player move increments
        this.processMove(num, "computer");
    }

    /**
     * Executes the incremental steps of a move to provide visual feedback.
     */
    async processMove(num, nextTurn) {
        this.view.disableButtons(true);

        for (let i = 0; i < num; i++) {
            if (this.model.increment(1)) {
                this.view.updateCount(this.model.count);
                if (this.model.gameOver) {
                    this.handleGameOver();
                    return;
                }
                // Slower delay between increments for better UX (500ms)
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        this.model.setTurn(nextTurn);
        this.view.updateTurn(this.model.currentTurn, this.model.gameOver);

        // Only enable buttons if it's the player's turn
        this.view.updateButtonStates(this.model.count, nextTurn === "computer");

        if (this.model.currentTurn === "computer") {
            setTimeout(() => this.computerMove(), 1000);
        }
    }

    computerMove() {
        const move = this.model.getPerfectMove();
        this.processMove(move, "player");
    }

    handleGameOver() {
        const winner = this.model.currentTurn === "player" ? "Computer" : "You";
        const isWin = winner === "You";

        const message = isWin
            ? this.model.getRandomWinResponse() // "Luck-based" win humor
            : this.model.getRandomRoast(); // Sassy loss roast

        this.view.renderResult(message, isWin);
        this.view.showRestartButton(this.restartGame.bind(this));
    }

    restartGame() {
        this.model.reset();
        this.view.clearResult();
        this.view.resetSelection();
        this.view.updateCount(this.model.count);
        this.view.updateTurn("player", false);
        this.view.disableButtons(true);
    }
}
