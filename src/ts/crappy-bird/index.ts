import { Game, AUTO, Scale, Types } from 'phaser';
import { CrappyBird } from './Scenes';
import { cyrb128 } from './modules/hash';
import '@/scss/main.scss';

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
  backgroundColor: '0x0f0f0f',
  seed: [
    ...cyrb128('theSecondMouseAlwaysGetsTheCheese').map((int) => String(int)),
  ],
};

const game: Game = new Game(config);
