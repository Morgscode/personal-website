'use strict';

import { Scene } from 'phaser';
import { GameStartScene, GameScene, GameOverScene, LeaderboardScene } from './';

export class BootScene extends Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    this.scene.add('StartScene', GameStartScene, false);
    this.scene.add('GameScene', GameScene, false);
    this.scene.add('GameOverScene', GameOverScene, false);
    this.scene.add('LeaderboardScene', LeaderboardScene, false);
    this.scene.launch('StartScene');
  }
}
