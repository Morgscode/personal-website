'use strict';

import { Game, AUTO } from 'phaser';
import {
  GameStartScene,
  GameScene,
  GameOverScene,
  LeaderBoardScene,
} from './Scenes';
import { gameState } from './model';
import '@/scss/main.scss';

const config = {
  type: AUTO,
  parent: 'little-lebowski-game',
  title: 'The Little Lebowski',
  width: 800,
  height: 600,
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [GameStartScene, GameScene, GameOverScene, LeaderBoardScene],
};

export const game = new Game(config);

export function triggerGameOver() {
  game.scene.start('GameOverScene');
  gameState.gameOver = true;
}
