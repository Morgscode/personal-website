'use strict';

import { Scene } from 'phaser';
import { gameState, levelState, scoreState, submitStatistics } from '../model';
import { gameSetup } from '../view';
import { triggerGameOver } from '../';

export class GameOverScene extends Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  preload() {
    gameState.cursors = gameSetup.bindCursorKeys(this);
    this.load.plugin(
      'rexinputtextplugin',
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js',
      true,
    );
  }

  create() {
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
      .text(400, 100, 'Game Over :(', { font: '58px Courier', fill: '#fff' })
      .setOrigin(0.5);

    this.add
      .text(300, 175, `Score: ${scoreState.getScore()}`, {
        fontSize: '24px',
        color: '#fff',
      })
      .setOrigin(0.5);

    this.add
      .text(500, 175, `Level: ${levelState.getLevel()}`, {
        fontSize: '24px',
        color: '#fff',
      })
      .setOrigin(0.5);

    this.add
      .text(400, 250, `Add your name to the scoreboard`, {
        fontSize: '18px',
        color: '#fff',
      })
      .setOrigin(0.5);

    const nameInput = this.add.rexInputText(400, 300, 400, 60, {
      type: 'text',
      placeholder: 'enter your name',
      border: 1,
      color: '#333333',
      backgroundColor: '#f9f9f9',
      paddingLeft: '11px',
      paddingRight: '11px',
      paddingTop: '6px',
      paddingBottom: '6px',
      fontFamily: 'Courier',
      fontSize: '18px',
      borderColor: '#ecf0f1',
      maxLength: 12,
    });

    const submitButton = this.add
      .text(400, 375, 'Add to score board', {
        font: '16px Courier',
        fill: '#222222',
      })
      .setOrigin(0.5)
      .setInteractive();

    // Move the submitButton to the top
    submitButton.setDepth(1);

    const restartButton = this.add
      .text(400, 475, 'Restart Game', {
        font: '16px Courier',
        fill: '#222222',
      })
      .setOrigin(0.5)
      .setInteractive();

    // Move the submitButton to the top
    restartButton.setDepth(1);

    const borderWidth = 4;
    const borderPadding = 10;
    const submitBorder = this.add
      .rectangle(
        submitButton.x,
        submitButton.y,
        submitButton.width + borderPadding * 2,
        submitButton.height + borderPadding * 2,
        0xffffff,
      )
      .setOrigin(0.5);
    submitBorder.setStrokeStyle(borderWidth, 0xffffff);

    const resetBorder = this.add
      .rectangle(
        restartButton.x,
        restartButton.y,
        restartButton.width + borderPadding * 2,
        restartButton.height + borderPadding * 2,
        0xffffff,
      )
      .setOrigin(0.5);
    resetBorder.setStrokeStyle(borderWidth, 0xffffff);

    submitButton.on('pointerdown', async () => {
      const name = nameInput.text;
      const level = levelState.getLevel();
      const score = scoreState.getScore();
      try {
        await submitStatistics(name, level, score);
      } catch (error) {
        console.error(error);
      } finally {
        this.scene.start('LeaderBoardScene');
      }
    });

    restartButton.on('pointerdown', async () => {
      triggerGameOver();
      this.scene.restart('GameScene');
    });
  }
}
