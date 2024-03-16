import { triggerGameOver } from '../';

export type GameState = {
  gameOver: boolean;
  score: number;
  level: number;
  activeStarGroups: number;
  jumpCount: number;
  jumpTimeStamp: null | number;
  canDoubleJumpMobile: boolean;
};

export let gameState: GameState = {
  gameOver: false,
  score: 0,
  level: 0,
  activeStarGroups: 0,
  jumpCount: 0,
  jumpTimeStamp: null,
  canDoubleJumpMobile: false,
};

const INITIAL_GAME_STATE = JSON.parse(JSON.stringify(gameState));

export function resetGameState() {
  gameState = JSON.parse(JSON.stringify(INITIAL_GAME_STATE));
}

export const playerJumpState = {
  setupJumpCount() {
    return (gameState.jumpCount = 0);
  },
  setJumpCount() {
    return (gameState.jumpCount = 1);
  },
  resetJumpCount() {
    return (gameState.jumpCount = 0);
  },
  getJumpCount() {
    return gameState.jumpCount;
  },
  handleMobileDoubleJumpState(timestamp: number) {
    const prevTimestamp = gameState.jumpTimeStamp;
    if (prevTimestamp) {
      const downDuration = timestamp - prevTimestamp;
      const isValidDoubleJump =
        gameState.jumpCount === 1 && downDuration <= 500;
      if (isValidDoubleJump) {
        return (gameState.canDoubleJumpMobile = true);
      }
      return (gameState.jumpTimeStamp = timestamp);
    } else {
      return (gameState.jumpTimeStamp = timestamp);
    }
  },
  getMobileDoubleJump() {
    return gameState.canDoubleJumpMobile;
  },
  resetMobileJumpState() {
    gameState.jumpTimeStamp = null;
    gameState.canDoubleJumpMobile = false;
  },
};

export const scoreState = {
  setupScore() {
    return (gameState.score = 0);
  },
  increaseScore() {
    let score = gameState.score;
    score += 20;
    return (gameState.score = score);
  },
  getScore() {
    return gameState.score;
  },
};

export const levelState = {
  setupLevel() {
    return (gameState.level = 1);
  },
  incrementLevel() {
    let level = gameState.level;
    level++;
    return (gameState.level = level);
  },
  getLevel() {
    return gameState.level;
  },
};

export function increaseScore(
  _player: Phaser.Physics.Arcade.Sprite,
  _star: Phaser.Physics.Arcade.Sprite,
) {
  return Boolean(scoreState.increaseScore());
}

export function gameOver(
  _player: Phaser.Physics.Arcade.Sprite,
  _bomb: Phaser.Physics.Arcade.Sprite,
) {
  return triggerGameOver();
}
