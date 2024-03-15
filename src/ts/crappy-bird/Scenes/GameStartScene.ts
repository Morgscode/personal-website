import { Scene } from 'phaser';
import { loadCrappyAssets } from '../modules/assets';

export class GameStartScene extends Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    loadCrappyAssets(this);
  }

  create() {
    this.sound.stopAll();

    this.add
      .rectangle(
        0,
        0,
        this.cameras.main.width,
        this.cameras.main.height,
        0x00a8ff,
      )
      .setOrigin(0, 0)
      .setAlpha(0.7);

    this.add
      .text(225, 350, 'Crappy Bird', {
        font: '32px Courier',
      })
      .setFill('#FFFFFF')
      .setOrigin(0.5);

    const startButton = this.add
      .text(225, 425, 'Start Game', { font: '24px Courier' })
      .setFill('#222222')
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
      .text(225, 500, 'Leaderboard', {
        font: '24px Courier',
      })
      .setFill('#222222')
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
      this.scene.launch('CrappyBird');
    });

    scoreButton.on('pointerdown', () => {
      this.scene.stop();
      this.scene.launch('LeaderboardScene');
    });
  }

  update() {}
}
