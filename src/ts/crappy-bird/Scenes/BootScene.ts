import { Scene } from 'phaser';
import {
  GameStartScene,
  CrappyBird,
  GameOverScene,
  LeaderboardScene,
} from './';

export class BootScene extends Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    this.scene.add('StartScene', GameStartScene, false);
    this.scene.add('CrappyBird', CrappyBird, false);
    this.scene.add('GameOverScene', GameOverScene, false);
    this.scene.add('LeaderboardScene', LeaderboardScene, false);
    this.scene.launch('StartScene');
  }
}
