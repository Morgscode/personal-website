type GameState = {
  score: integer;
  gameOver: boolean;
};

export let gameState: GameState = {
  score: 0,
  gameOver: false,
};

const INITIAL_GAME_STATE = JSON.parse(JSON.stringify(gameState));

export function resetGameState() {
  gameState = JSON.parse(JSON.stringify(INITIAL_GAME_STATE));
}

export const scoreState = {
  setupScore() {
    return (gameState.score = 0);
  },
  increaseScore() {
    let score = gameState.score;
    score += 10;
    return (gameState.score = score);
  },
  getScore() {
    return gameState.score;
  },
};
