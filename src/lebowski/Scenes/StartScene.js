import * as dataController from "../Controllers/dataController";
import * as uiController from "../Controllers/uiController";

class StartScene extends Phaser.Scene {
    constructor() {
      super({ key: 'StartScene' });
    }

    preload() {
      uiCtrl.loadGameSceneAssets(this);
      cursors = uiCtrl.setupCursorKeys(this);
    }

    create() {
      uiCtrl.renderSky(this);
      platforms = uiCtrl.renderPlatforms(this);

      const overlay = this.add
        .rectangle(
          0,
          0,
          this.cameras.main.width,
          this.cameras.main.height,
          0x000000
        )
        .setOrigin(0, 0);
      overlay.alpha = 0.7; 

      const titleTextLine1 = this.add
        .text(400, 180, 'The Adventure(s) of', {
          font: '32px Courier',
          fill: '#fff',
        })
        .setOrigin(0.5);
      const titleTextLine2 = this.add
        .text(400, 240, 'Little Lebowski', {
          font: '32px Courier',
          fill: '#fff',
        })
        .setOrigin(0.5);

      const startButton = this.add
        .text(400, 340, 'Start Game', { font: '32px Courier', fill: '#222222' })
        .setOrigin(0.5)
        .setInteractive();

      // Move the startButton to the top
      startButton.setDepth(1);

      const borderWidth = 4;
      const borderPadding = 10;
      const border = this.add
        .rectangle(
          startButton.x,
          startButton.y,
          startButton.width + borderPadding * 2,
          startButton.height + borderPadding * 2,
          0xffffff
        )
        .setOrigin(0.5);
      border.setStrokeStyle(borderWidth, 0xffffff);

      startButton.on('pointerdown', () => {
        this.scene.start('GameScene');
      });
    }

    update() {}
  }