import { Scene } from 'phaser';
import { levelState, scoreState } from '../modules/state';
import { submitLeaderboardEntry } from '../modules/leaderboard';
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
      .text(400, 100, 'Game Over :(', { font: '58px Courier' })
      .setFill('#ffffff')
      .setOrigin(0.5);

    this.add
      .text(300, 175, `Score: ${scoreState.getScore()}`, {
        fontSize: '24px',
      })
      .setFill('#ffffff')
      .setOrigin(0.5);

    this.add
      .text(500, 175, `Level: ${levelState.getLevel()}`, {
        fontSize: '24px',
      })
      .setFill('#ffffff')
      .setOrigin(0.5);

    this.add
      .text(400, 250, `Add your name to the leaderboard`, {
        fontSize: '18px',
        color: '#fff',
      })
      .setOrigin(0.5);

    this.input.keyboard!.disableGlobalCapture();

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

    const submit = this.add
      .text(320, 375, 'Add to score board', {
        font: '16px Courier',
      })
      .setFill('#222222')
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(1);

    const restart = this.add
      .text(520, 375, 'Restart Game', {
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
      const level = levelState.getLevel();
      const score = scoreState.getScore();
      try {
        submit.disableInteractive();
        await submitLeaderboardEntry(name, level, score);
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
