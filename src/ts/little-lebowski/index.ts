import { Game, AUTO, Scale, Types } from 'phaser';
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin.js';
import { BootScene } from './Scenes';
import { gameState, resetGameState } from './modules/state';
import '@/scss/main.scss';

const config: Types.Core.GameConfig = {
  type: AUTO,
  title: 'The Little Lebowski',
  width: 800,
  height: 600,
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  parent: 'little-lebowski-game',
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: false,
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
  scene: [BootScene],
};

export const game: Game = new Game(config);
game.sound.volume = 0.1;

export function triggerGameOver() {
  game.scene.start('GameOverScene');
  return (gameState.gameOver = true);
}

export function triggerGameRestart(game: Game) {
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
