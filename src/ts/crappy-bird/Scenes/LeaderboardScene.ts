import { Scene } from 'phaser';
import { getLeaderboard } from '../modules/leaderboard';
import { triggerGameRestart } from '../';

type Leaderboard = {
  data: LeaderboardEntry[];
  count: number;
};

type LeaderboardEntry = {
  name: string;
  score: string;
};

export class LeaderboardScene extends Scene {
  leaderboard: Leaderboard | false;
  rowsYStart = 100;

  constructor() {
    super({ key: 'LeaderboardScene' });
  }

  preload() {}

  async create() {
    try {
      this.leaderboard = await getLeaderboard();
    } catch (error) {
      console.error(error);
    }

    this.add
      .rectangle(
        0,
        0,
        this.cameras.main.width,
        this.cameras.main.height,
        0x00a8ff,
      )
      .setOrigin(0, 0);

    // Display the leaderboard
    this.add
      .text(225, 50, 'Leaderboard', { font: '32px Courier' })
      .setFill('#ffffff')
      .setOrigin(0.5);

    this.add.text(50, this.rowsYStart, `Name:`, {
      font: '20px Courier',
    });

    this.add
      .text(325, this.rowsYStart, `Score:`, {
        font: '20px Courier',
      })
      .setFill('#ffffff');

    const restart = this.add
      .text(225, 550, 'Back to Main Menu', {
        font: '24px Courier',
      })
      .setFill('#222222')
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(1);

    // Move the restart to the top

    const borderWidth = 4;
    const borderPadding = 10;

    this.add
      .rectangle(
        restart.x,
        restart.y,
        restart.width + borderPadding * 2,
        restart.height + borderPadding * 2,
        0xffffff,
      )
      .setOrigin(0.5)
      .setStrokeStyle(borderWidth, 0xffffff);

    restart.on('pointerdown', function () {
      triggerGameRestart(this.scene.game);
    });

    if (!this.leaderboard) return;

    if (this.leaderboard.data.length) {
      for (let i = 0; i < this.leaderboard.data.length; i++) {
        const entry = this.leaderboard.data[i];
        this.rowsYStart = this.rowsYStart + 35;

        this.add
          .text(20, this.rowsYStart, `${i + 1}.`, {
            font: '20px Courier',
          })
          .setFill('#ffffff');

        this.add
          .text(50, this.rowsYStart, `${entry.name}`, {
            font: '20px Courier',
          })
          .setFill('#ffffff');

        this.add
          .text(325, this.rowsYStart, `${entry.score}`, {
            font: '20px Courier',
          })
          .setFill('#ffffff');
      }
    }
  }
}
