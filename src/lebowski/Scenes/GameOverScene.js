import * as dataController from "../Controllers/dataController";
import * as uiController from "../Controllers/uiController";

class GameOverScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameOverScene' });
    }

    preload() {
      cursors = uiCtrl.setupCursorKeys(this);
      this.load.plugin(
        'rexinputtextplugin',
        'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js',
        true
      );
    }

    create() {
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

      const gameOverText = this.add
        .text(400, 100, 'Game Over :(', { font: '58px Courier', fill: '#fff' })
        .setOrigin(0.5);

      this.add
        .text(300, 175, `Score: ${dataCtrl.getScore()}`, {
          fontSize: '24px',
          color: '#fff',
        })
        .setOrigin(0.5);

      this.add
        .text(500, 175, `Level: ${dataCtrl.getLevel()}`, {
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

      const borderWidth = 4;
      const borderPadding = 10;
      const border = this.add
        .rectangle(
          submitButton.x,
          submitButton.y,
          submitButton.width + borderPadding * 2,
          submitButton.height + borderPadding * 2,
          0xffffff
        )
        .setOrigin(0.5);
      border.setStrokeStyle(borderWidth, 0xffffff);

      submitButton.on('pointerdown', async () => {
        const name = nameInput.text;
        const level = dataCtrl.getLevel();
        const score = dataCtrl.getScore();
        try {
          await dataCtrl.submitStatistics(name, level, score);
        } catch (error) {
          console.error(error);
        } finally {
          this.scene.start('LeaderBoardScene');
        }
      });
    }
  }