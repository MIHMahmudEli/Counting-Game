import GameModel from './GameModel.js';
import GameView from './GameView.js';
import GameController from './GameController.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = new GameController(new GameModel(), new GameView());
});
