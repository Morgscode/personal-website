import { Scene } from 'phaser';
import { gameState } from '../modules/state';
import { submitStatistics } from '../modules/leaderboard';
import { triggerGameRestart } from '../';

export class GameOverScene extends Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  preload() {}

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
      .text(225, 225, 'Game Over', {
        font: '38px Courier',
      })
      .setFill('#FFFFFF')
      .setOrigin(0.5)
      .setDepth(1);

    this.add
      .text(225, 275, `Score: ${gameState.score}`, {
        fontSize: '28px',
        color: '#fff',
      })
      .setOrigin(0.5);

    this.add
      .text(225, 325, `Add your name to the leaderboard`, {
        fontSize: '20px',
        color: '#fff',
      })
      .setOrigin(0.5);

    const nameInput = this.add.rexInputText(225, 375, 400, 60, {
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

    const submit = this.add
      .text(225, 450, 'Add to score board', {
        font: '16px Courier',
      })
      .setFill('#222222')
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(1);

    const restart = this.add
      .text(225, 515, 'Restart Game', {
        font: '16px Courier',
      })
      .setFill('#222222')
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(1);

    const borderWidth = 4;
    const borderPadding = 10;

    this.add
      .rectangle(
        submit.x,
        submit.y,
        submit.width + borderPadding * 2,
        submit.height + borderPadding * 2,
        0xffffff,
      )
      .setStrokeStyle(borderWidth, 0xffffff)
      .setOrigin(0.5);

    this.add
      .rectangle(
        restart.x,
        restart.y,
        restart.width + borderPadding * 2,
        restart.height + borderPadding * 2,
        0xffffff,
      )
      .setStrokeStyle(borderWidth, 0xffffff)
      .setOrigin(0.5);

    submit.on('pointerdown', async () => {
      const name = nameInput.text;
      const score = gameState.score;
      try {
        submit.disableInteractive();
        await submitStatistics(name, score);
      } catch (error) {
        submit.setInteractive();
        console.error(error);
      } finally {
        this.scene.start('LeaderboardScene');
      }
    });

    restart.on('pointerdown', () => {
      triggerGameRestart(this.game);
    });
  }
}
