import { CrappyBirdScene } from '../Scenes';
import { gameState } from './state';
import { delay } from './utils';

/**
 * Setups the Crappy Bird with animations
 */
export function setupCrappyBird(scene: CrappyBirdScene) {
  const bird = scene.physics.add
    .sprite(0, 450, 'bird')
    .setDepth(1)
    .setBounce(0.2, 0.2)
    .setCollideWorldBounds(false)
    .setGravityY(300)
    .setVelocityX(300)
    .setDepth(1);

  scene.anims.create({
    key: 'fly',
    frames: scene.anims.generateFrameNumbers('bird', { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });

  bird.anims.play('fly');

  return bird;
}

/**
 * Handles the flap action (plays sound and increases the birds velocity)
 */
export function flap(scene: CrappyBirdScene): void {
  if (gameState.gameOver) return;
  scene.bird.setVelocityY(-300);
  scene.sound.play('flap');
}

/**
 * Managers bird rotation based on its velocity
 */
export function handleBirdRotation(scene: CrappyBirdScene) {
  if (scene.bird.body.velocity.y > 0 && scene.bird.rotation <= 0.25) {
    scene.bird.rotation += 0.05;
  } else if (scene.bird.rotation >= -0.25) {
    scene.bird.rotation -= 0.05;
  }
  return scene;
}

/**
 * Setups the Crappy Bird tile collisions
 */
export function setupBirdTileCollision(
  scene: CrappyBirdScene,
  bird: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  tiles: Phaser.Physics.Arcade.StaticGroup[],
  hitTile: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
  gameOver: () => boolean,
) {
  scene.physics.add.collider(bird, tiles, hitTile, gameOver, scene);
  return scene;
}

/**
 * Setups the Crappy Bird pipe collisions
 */
export function setupBirdPipeCollision(
  scene: CrappyBirdScene,
  bird: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  pipes: Phaser.Physics.Arcade.StaticGroup[],
  hitPipe: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
  gameOver: () => boolean,
) {
  scene.physics.add.collider(bird, pipes, hitPipe, gameOver, scene);
  return scene;
}

/**
 * The stuff we want to happen when the bird collides with a pipe
 */
export async function birdCollides(
  bird: Phaser.Physics.Arcade.Sprite,
  _: Phaser.Physics.Arcade.Sprite,
) {
  if (!gameState.birdHasCollided) {
    this.sound.play('splat');
    gameState.birdHasCollided = true;
  }
  bird.setTint(0xff0000);
  bird.setFlipY(true);
  bird.setAccelerationX(0);
  bird.setVelocityX(0);
  gameState.gameOver = true;
  await delay(2000);
  bird.disableBody(true, false);
}
