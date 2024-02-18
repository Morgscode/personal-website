import { Game, AUTO, Scale } from 'phaser';
import { CrappyBird } from './Scenes';

const config = {
  type: AUTO,
  width: 450,
  height: 800,
  parent: 'crappy-bird-game',
  title: 'Crappy Bird',
  scene: [CrappyBird],
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
};

const game: Game = new Game(config);
