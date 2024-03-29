import { Scene, Types } from 'phaser';
import { SKY_COLOR } from '../modules/constants';
import { loadCrappyAssets } from '../modules/assets';
import { renderScoreBoardText, manageScore } from '../modules/score';
import {
  setupTiles,
  handleTileGeneration,
  handleTileCleanup,
} from '../modules/tiles';
import {
  setupClouds,
  generateClouds,
  handleCloudCleanup,
} from '../modules/clouds';
import { setupPipes, generatePipes, handlePipeCleanup } from '../modules/pipes';
import { setupCrappyBird, flap, handleBirdRotation } from '../modules/bird';
import { gameState, scoreState } from '../modules/state';

export type CrappyBirdScene = {
  bird: Types.Physics.Arcade.SpriteWithDynamicBody;
  ground: Phaser.Physics.Arcade.StaticGroup[];
  stoneTop: Phaser.Physics.Arcade.StaticGroup[];
  clouds: Phaser.Physics.Arcade.Group[];
  pipes: Phaser.Physics.Arcade.StaticGroup[];
  scoreText: Phaser.GameObjects.Text;
  pipeXRecords: Array<number>;
} & Scene;
export class CrappyBird extends Scene {
  bird: Types.Physics.Arcade.SpriteWithDynamicBody;
  ground: Phaser.Physics.Arcade.StaticGroup[] = [];
  stoneTop: Phaser.Physics.Arcade.StaticGroup[] = [];
  clouds: Phaser.Physics.Arcade.Group[] = [];
  pipes: Phaser.Physics.Arcade.StaticGroup[] = [];
  scoreText: Phaser.GameObjects.Text;
  pipeXRecords: Array<number> = [];

  constructor() {
    super({ key: 'CrappyBird' });
  }

  preload(): void {
    loadCrappyAssets(this);
  }

  create(): void {
    this.sound.stopAll();
    gameState.gameOver = false;
    gameState.score = 0;
    this.cameras.main.setBackgroundColor(SKY_COLOR);
    this.scoreText = renderScoreBoardText(this, scoreState.setupScore());

    this.bird = setupCrappyBird(this);

    this.ground = setupTiles(this.ground, this, 770, 'ground');
    this.stoneTop = setupTiles(this.stoneTop, this, 0, 'stone');

    this.clouds = setupClouds(this.bird.x, this.clouds, this);
    this.pipes = setupPipes(this.pipes, this.pipeXRecords, this);

    this.cameras.main
      .setBounds(0, 0, Infinity, 600)
      .startFollow(this.bird, false, 1, 1, -100, 0);

    this.input.on('pointerdown', (event: Event) => {
      flap(this);
    });

    this.input.keyboard?.on('keydown-SPACE', (event: Event) => {
      flap(this);
    });
  }

  update(): void {
    handleBirdRotation(this);

    // get last ground tile
    const ground = this.ground[this.ground.length - 1].children.entries;
    const finalGround = ground[
      ground.length - 1
    ] as Phaser.Physics.Arcade.Sprite;
    this.ground = handleTileGeneration(
      this,
      finalGround,
      this.ground,
      770,
      'ground',
    );
    this.stoneTop = handleTileGeneration(
      this,
      finalGround,
      this.stoneTop,
      0,
      'stone',
    );
    this.ground = handleTileCleanup(this.ground);
    this.stoneTop = handleTileCleanup(this.stoneTop);

    const cloud = this.clouds[this.clouds.length - 1].children.entries;
    const finalCloud = cloud[cloud.length - 1] as Phaser.Physics.Arcade.Sprite;
    this.clouds = generateClouds(this.bird.x, this.clouds, this, finalCloud);
    this.clouds = handleCloudCleanup(this.bird.x, this.clouds, finalCloud);

    const pipe = this.pipes[this.pipes.length - 1].children.entries;
    const finalPipe = pipe[pipe.length - 1] as Phaser.Physics.Arcade.Sprite;
    this.pipes = generatePipes(this, this.pipes, finalPipe, this.pipeXRecords);

    this.pipes = handlePipeCleanup(this, this.pipes);
    this.pipeXRecords = manageScore(this.bird.x, this.pipeXRecords, this);
    this.scoreText.setText(`Score: ${scoreState.getScore()}`);
  }
}
