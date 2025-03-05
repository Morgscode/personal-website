import { Game, AUTO, Scale, Types } from 'phaser';
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin.js';
import { BootScene } from './Scenes';
import { cyrb128, delay } from './modules/utils';
import { gameState, resetGameState } from './modules/state';
import '@/scss/main.scss';

const config: Types.Core.GameConfig = {
  type: AUTO,
  title: 'Crappy Bird',
  width: 450,
  height: 800,
  max: { width: window.innerWidth, height: window.innerHeight },
  parent: 'crappy-bird-game',
  dom: {
    createContainer: true,
  },
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 300 },
    },
  },
  plugins: {
    global: [
      {
        key: 'rexInputTextPlugin',
        plugin: InputTextPlugin,
        start: true,
      },
    ],
  },
  backgroundColor: 0x0f0f0f,
  seed: [
    ...cyrb128('theSecondMouseAlwaysGetsTheCheese').map((int) => String(int)),
  ],
  scene: [BootScene],
};

const game: Game = new Game(config);
game.sound.volume = 0.01;

export function triggerGameOver() {
  game.scene.start('GameOverScene');
  const main = game.scene.getScene('CrappyBird');
  main.physics.pause();
  gameState.gameOver = true;
}

export function triggerGameRestart(game: Game) {
  const start = game.scene.getScene('StartScene');
  start.scene.remove();
  const main = game.scene.getScene('CrappyBird');
  main.scene.remove();
  const gameOver = game.scene.getScene('GameOverScene');
  gameOver.scene.remove();
  const leaderboard = game.scene.getScene('LeaderboardScene');
  leaderboard.scene.remove();
  resetGameState();
  const boot = game.scene.getScene('BootScene');
  boot.scene.restart();
}
