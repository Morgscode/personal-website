import { Game, AUTO, Scale, Types } from 'phaser';
import { CrappyBird } from './Scenes';

const config: Types.Core.GameConfig = {
  type: AUTO,
  width: 450,
  height: 800,
  max: { width: window.innerWidth, height: window.innerHeight },
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
      gravity: { y: 300 },
    },
  },
};

const game: Game = new Game(config);
