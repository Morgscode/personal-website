import { Scene, Types } from 'phaser';
import { SKY_COLOR } from '../modules/constants';
import { loadCrappyAssets } from '../modules/assets';
import {
  setupTiles,
  handleTileGeneration,
  handleTileCleanup,
} from '../modules/tiles';
import {
  generateClouds,
  handleCloudCleanup,
  setupClouds,
} from '../modules/clouds';
import {
  setupCrappyBird,
  setupBirdTileCollisions,
  handleBirdRotation,
  flap,
} from '../modules/bird';

export type CrappyBirdScene = {
  bird: Types.Physics.Arcade.SpriteWithDynamicBody;
  ground: Phaser.Physics.Arcade.StaticGroup[];
  stoneTop: Phaser.Physics.Arcade.StaticGroup[];
  clouds: Phaser.Physics.Arcade.Group[];
} & Scene;

export class CrappyBird extends Scene {
  bird: Types.Physics.Arcade.SpriteWithDynamicBody;
  ground: Phaser.Physics.Arcade.StaticGroup[];
  stoneTop: Phaser.Physics.Arcade.StaticGroup[];
  clouds: Phaser.Physics.Arcade.Group[];

  constructor() {
    super({ key: 'CrappyBirdScene' });
  }

  preload(): void {
    loadCrappyAssets(this);
  }

  create(): void {
    this.cameras.main.setBackgroundColor(SKY_COLOR);

    this.ground = setupTiles(this, 770, 'ground');
    this.stoneTop = setupTiles(this, 0, 'stone');
    this.bird = setupCrappyBird(this);
    setupBirdTileCollisions(this);

    this.clouds = setupClouds(this);

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
    this.clouds = generateClouds(this, finalCloud, this.clouds);
    this.clouds = handleCloudCleanup(this.clouds);
  }
}