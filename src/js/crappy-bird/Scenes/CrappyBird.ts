import { Scene, Types } from 'phaser';
import { SKY_COLOR } from '../modules/constants';
import { loadCrappyAssets } from '../modules/assets';
import { setupGround, setupStoneTop } from '../modules/tiles';
import {
  setupCrappyBird,
  setupBirdTileCollisions,
  handleBirdRotation,
} from '../modules/bird';

export type CrappyBirdScene = {
  bird: Types.Physics.Arcade.SpriteWithDynamicBody;
  ground: Phaser.Physics.Arcade.StaticGroup[];
  stoneTop: Phaser.Physics.Arcade.StaticGroup[];
} & Scene;

export class CrappyBird extends Scene {
  bird: Types.Physics.Arcade.SpriteWithDynamicBody;
  ground: Phaser.Physics.Arcade.StaticGroup[];
  stoneTop: Phaser.Physics.Arcade.StaticGroup[];

  constructor() {
    super({ key: 'CrappyBirdScene' });
  }

  preload(): void {
    loadCrappyAssets(this);
  }

  create(): void {
    this.cameras.main.setBackgroundColor(SKY_COLOR);

    this.ground = setupGround(this);
    this.stoneTop = setupStoneTop(this);
    this.bird = setupCrappyBird(this);
    setupBirdTileCollisions(this);

    this.cameras.main
      .setBounds(0, 0, Infinity, 600)
      .startFollow(this.bird, false, 1, 1, -100, 0);

    this.input.on('pointerdown', (event: Event) => {
      this.bird!.setVelocityY(-400);
      this.sound.play('flap');
    });
  }

  update(): void {
    handleBirdRotation(this);

    // get last ground element
    const ground = this.ground[this.ground.length - 1].children.entries;
    const final = ground[ground.length - 1] as Phaser.Physics.Arcade.Sprite;
    // if bird x > (ground.length - 1 - 700)
    if (this.bird.x > final.x - 700) {
      this.ground.push(this.physics.add.staticGroup());
      this.stoneTop.push(this.physics.add.staticGroup());
      // create new ground
      for (let i = 0; i < 120; i++) {
        const x = final.x + i * 70;
        this.ground[this.ground.length ? this.ground.length - 1 : 0].create(
          x,
          800,
          'ground',
        );

        this.stoneTop[
          this.stoneTop.length ? this.stoneTop.length - 1 : 0
        ].create(x, 0, 'stone');
      }
      this.physics.add.collider(this.bird, this.ground);
      this.physics.add.collider(this.bird, this.stoneTop);
      console.log(this.ground);
      console.log(this.stoneTop);
    }
    // if more than one ground group
    if (this.ground.length > 2) {
      // destroy first group
      this.ground[0].clear(true, true);
      // filter the array
      this.ground = this.ground.filter((_, index) => index !== 0);
      console.log(this.ground);
    }

    // if more than one ground group
    if (this.stoneTop.length > 2) {
      // destroy first group
      this.stoneTop[0].clear(true, true);
      // filter the array
      this.stoneTop = this.stoneTop.filter((_, index) => index !== 0);
      console.log(this.stoneTop);
    }
  }
}
