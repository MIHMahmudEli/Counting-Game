export default class GameModel {
    constructor() {
        this.reset();
        this.roasts = [
            "Was that your best move? I've seen calculators play better.",
            "Maybe try a game of Tic-Tac-Toe first?",
            "I'm a computer, and even I'm embarrassed for you.",
            "21 is a high number for some, I guess.",
            "You're making this too easy. Are you even trying?",
            "I'd offer you a rematch, but the result would be the same.",
            "Your strategy is... interesting. Wrong, but interesting.",
            "I've calculated 14 million futures. You lose in all of them.",
            "Error 404: Player skill not found.",
            "I'm not mad, I'm just disappointed. Actually, I'm a machine, I'm just faster."
        ];
        this.winResponses = [
            "Wait, what? Beginner's luck. Let's try again.",
            "My CPU must have lagged... that doesn't count!",
            "You won? Impossible. My logic circuits are crying.",
            "Okay, okay, maybe you're not a total cabbage. Rematch?",
            "I let you win. It's part of my charm. Ready for a real game?",
            "That was 100% luck. Pure, unadulterated luck.",
            "Checking for glitches... you shouldn't have been able to do that.",
            "Fine. You won once. Don't let it go to your head."
        ];
    }

    reset() {
        this.count = 0;
        this.gameOver = false;
        this.currentTurn = null;
    }

    increment(amount) {
        if (this.gameOver || amount < 1 || amount > 3) return false;

        this.count += amount;
        if (this.count >= 21) {
            this.count = 21;
            this.gameOver = true;
        }
        return true;
    }

    getPerfectMove() {
        const remainder = this.count % 4;

        if (remainder !== 0) {
            return 4 - remainder;
        }

        return Math.floor(Math.random() * 3) + 1;
    }

    getRandomRoast() {
        const index = Math.floor(Math.random() * this.roasts.length);
        return this.roasts[index];
    }

    getRandomWinResponse() {
        const index = Math.floor(Math.random() * this.winResponses.length);
        return this.winResponses[index];
    }

    setTurn(turn) {
        this.currentTurn = turn;
    }
}
