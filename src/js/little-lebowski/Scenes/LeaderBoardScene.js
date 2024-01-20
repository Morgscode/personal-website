'use strict';

import * as Phaser from 'phaser';

import { getLeaderboard } from '../model';
import { gameSetup } from '../view';

export class LeaderBoardScene extends Phaser.Scene {
  leaderboard = {};
  rowsYStart = 75;

  constructor() {
    super({ key: 'LeaderBoardScene' });
  }

  preload() {
    gameSetup.bindCursorKeys(this);
  }

  async create() {
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
    try {
      this.leaderboard = await getLeaderboard();
    } catch (error) {
      console.error(error);
    }

    // Display the leaderboard
    this.add
      .text(400, 50, 'Leader Board', { font: '32px Courier', fill: '#fff' })
      .setOrigin(0.5);

    this.add.text(260, this.rowsYStart, `Name:`, {
      font: '20px Courier',
      fill: '#fff',
    });
    this.add.text(460, this.rowsYStart, `Level:`, {
      font: '20px Courier',
      fill: '#fff',
    });
    this.add.text(560, this.rowsYStart, `Score:`, {
      font: '20px Courier',
      fill: '#fff',
    });

    const restart = this.add
      .text(400, 550, 'Restart Game', {
        font: '32px Courier',
        fill: '#222222',
      })
      .setOrigin(0.5)
      .setInteractive();

    // Move the restart to the top

    restart.setDepth(1);

    const borderWidth = 4;
    const borderPadding = 10;
    const border = this.add
      .rectangle(
        restart.x,
        restart.y,
        restart.width + borderPadding * 2,
        restart.height + borderPadding * 2,
        0xffffff,
      )
      .setOrigin(0.5);
    border.setStrokeStyle(borderWidth, 0xffffff);

    restart.on('pointerdown', () => {
      this.scene.start('StartScene');
    });

    if (this.leaderboard?.data?.length) {
      for (let i = 0; i < this.leaderboard?.data?.length; i++) {
        const entry = this.leaderboard.data[i];
        this.rowsYStart = this.rowsYStart + 25;
        this.add.text(220, this.rowsYStart, `${i + 1}.`, {
          font: '20px Courier',
          fill: '#fff',
        });
        this.add.text(260, this.rowsYStart, `${entry.name}`, {
          font: '20px Courier',
          fill: '#fff',
        });
        this.add.text(460, this.rowsYStart, `${entry.level}`, {
          font: '20px Courier',
          fill: '#fff',
        });
        this.add.text(560, this.rowsYStart, `${entry.score}`, {
          font: '20px Courier',
          fill: '#fff',
        });
      }
    }
  }
}