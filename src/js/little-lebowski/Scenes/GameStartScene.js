'use strict';

import { Scene } from 'phaser';
import { gameSetup } from '../view';
import { gameState } from '../model';

export class GameStartScene extends Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    gameSetup.loadAssets(this);
    gameSetup.bindCursorKeys(this);
  }

  create() {
    gameSetup.renderSky(this);
    gameState.platforms = gameSetup.renderPlatforms(this);

    const overlay = this.add
      .rectangle(
        0,
        0,
        this.cameras.main.width,
        this.cameras.main.height,
        0x000000,
      )
      .setOrigin(0, 0);
    overlay.alpha = 0.7;

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
      .text(250, 340, 'Start Game', { font: '32px Courier', fill: '#222222' })
      .setOrigin(0.5)
      .setInteractive();

    // Move the startButton to the top
    startButton.setDepth(1);

    const borderWidth = 4;
    const borderPadding = 10;

    const startBorder = this.add
      .rectangle(
        startButton.x,
        startButton.y,
        startButton.width + borderPadding * 2,
        startButton.height + borderPadding * 2,
        0xffffff,
      )
      .setOrigin(0.5);
    startBorder.setStrokeStyle(borderWidth, 0xffffff);

    const scoreButton = this.add
      .text(550, 340, 'Score Board', {
        font: '32px Courier',
        fill: '#222222',
      })
      .setOrigin(0.5)
      .setInteractive();

    // Move the startButton to the top
    scoreButton.setDepth(1);

    const scoreBorder = this.add
      .rectangle(
        scoreButton.x,
        scoreButton.y,
        scoreButton.width + borderPadding * 2,
        scoreButton.height + borderPadding * 2,
        0xffffff,
      )
      .setOrigin(0.5);
    scoreBorder.setStrokeStyle(borderWidth, 0xffffff);

    startButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    scoreButton.on('pointerdown', () => {
      this.scene.start('LeaderBoardScene');
    });
  }

  update() {}
}
