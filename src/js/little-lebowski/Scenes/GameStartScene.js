'use strict';

import { Scene } from 'phaser';
import { gameState } from '../model';
import { gameSetup } from '../view';

export class GameStartScene extends Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    gameSetup.loadAssets(this);
    gameState.cursors = gameSetup.bindCursorKeys(this);
    gameSetup.bindMobileControls(this);
  }

  create() {
    this.sound.stopAll();
    this.sound.play('intro', { volume: 0.25 });
    gameSetup.renderSky(this);
    gameState.platforms = gameSetup.renderPlatforms(this);

    this.add
      .rectangle(
        0,
        0,
        this.cameras.main.width,
        this.cameras.main.height,
        0x000000,
      )
      .setOrigin(0, 0)
      .setAlpha(0.7);

    this.add
      .text(400, 180, 'The Adventure(s) of', {
        font: '32px Courier',
        fill: '#fff',
      })
      .setOrigin(0.5);

    this.add
      .text(400, 240, 'Little Lebowski', {
        font: '32px Courier',
        fill: '#fff',
      })
      .setOrigin(0.5);

    const startButton = this.add
      .text(300, 340, 'Start Game', { font: '24px Courier', fill: '#222222' })
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(1);

    const borderWidth = 4;
    const borderPadding = 10;

    this.add
      .rectangle(
        startButton.x,
        startButton.y,
        startButton.width + borderPadding * 2,
        startButton.height + borderPadding * 2,
        0xffffff,
      )
      .setOrigin(0.5)
      .setStrokeStyle(borderWidth, 0xffffff);

    const scoreButton = this.add
      .text(500, 340, 'Leaderboard', {
        font: '24px Courier',
        fill: '#222222',
      })
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(1);

    this.add
      .rectangle(
        scoreButton.x,
        scoreButton.y,
        scoreButton.width + borderPadding * 2,
        scoreButton.height + borderPadding * 2,
        0xffffff,
      )
      .setOrigin(0.5)
      .setStrokeStyle(borderWidth, 0xffffff);

    startButton.on('pointerdown', () => {
      this.scene.stop();
      this.scene.launch('GameScene');
    });

    scoreButton.on('pointerdown', () => {
      this.scene.stop();
      this.scene.launch('LeaderboardScene');
    });
  }

  update() {}
}
