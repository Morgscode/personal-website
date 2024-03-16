import { CrappyBirdScene } from '../Scenes';
import { gameState } from './state';

/**
 * Setups the Crappy Bird with animations
 */
export function setupCrappyBird(scene: CrappyBirdScene) {
  const bird = scene.physics.add
    .sprite(0, 450, 'bird')
    .setDepth(1)
    .setBounce(0.2)
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
 * Setups the Crappy Bird tile collisions
 */
export function setupBirdTileCollision(scene: CrappyBirdScene) {
  scene.physics.add.collider(scene.bird, scene.ground);
  scene.physics.add.collider(scene.bird, scene.stoneTop);
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
 * Handles the flap action (plays sound and increases the birds velocity)
 */
export function flap(scene: CrappyBirdScene): void {
  if (gameState.gameOver) return;
  scene.bird.setVelocityY(-300);
  scene.sound.play('flap');
}

/**
 * The stuff we want to happen when the bird collides with a pipe
 */
export function birdHitsPipe(
  bird: Phaser.Physics.Arcade.Sprite,
  pipe: Phaser.Physics.Arcade.Sprite,
) {
  bird.setTint(0xff0000);
  bird.setFlipY(true);
  bird.setAccelerationX(0);
  bird.setVelocityX(0);
  bird.anims.stop();
}
