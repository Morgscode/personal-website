import { Types } from 'phaser';
import { CrappyBirdScene } from '../Scenes';

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
export function setupBirdTileCollisions(scene: CrappyBirdScene) {
  scene.physics.add.collider(scene.bird, scene.ground);
  scene.physics.add.collider(scene.bird, scene.stoneTop);
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
  scene.bird.setVelocityY(-300);
  scene.sound.play('flap');
}
