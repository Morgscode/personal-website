'use strict';

import { Game, AUTO } from 'phaser';
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin.js';
import { BootScene } from './Scenes';
import { gameState, resetGameState } from './model';
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
  scene: [BootScene],
  plugins: {
    global: [
      {
        key: 'rexInputTextPlugin',
        plugin: InputTextPlugin,
        start: true,
      },
      // ...
    ],
  },
};

export const game = new Game(config);

export function triggerGameOver() {
  game.scene.start('GameOverScene');
  gameState.gameOver = true;
}

export function triggerGameRestart(game) {
  const start = game.scene.getScene('StartScene');
  start.scene.remove();
  const main = game.scene.getScene('GameScene');
  main.scene.remove();
  const gameOver = game.scene.getScene('GameOverScene');
  gameOver.scene.remove();
  const leaderboard = game.scene.getScene('LeaderboardScene');
  leaderboard.scene.remove();
  resetGameState();
  const boot = game.scene.getScene('BootScene');
  boot.scene.restart();
}
