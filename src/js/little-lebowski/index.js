'use strict';

import '@/scss/main.scss';
import * as Phaser from 'phaser';
import {
  GameStartScene,
  GameScene,
  GameOverScene,
  LeaderBoardScene,
} from './Scenes';
import { gameState } from './model';

const config = {
  type: Phaser.AUTO,
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

export const game = new Phaser.Game(config);

export function triggerGameOver() {
  game.scene.start('GameOverScene');
  gameState.gameOver = true;
}
