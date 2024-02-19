import { Types } from 'phaser';
import { CrappyBirdScene } from '../Scenes';

export function setupCrappyBird(scene: CrappyBirdScene) {
  scene.bird = scene.physics.add.sprite(0, 450, 'bird');
  scene.bird.setBounce(0.2);
  scene.bird.setCollideWorldBounds(false);
  scene.bird.body.setGravityY(300);
  scene.bird.setVelocityX(300);

  scene.anims.create({
    key: 'fly',
    frames: scene.anims.generateFrameNumbers('bird', { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.bird.anims.play('fly');

  return scene.bird;
}

export function setupBirdTileCollisions(scene: CrappyBirdScene) {
  scene.physics.add.collider(scene.bird, scene.ground);
  scene.physics.add.collider(scene.bird, scene.stoneTop);
  return scene;
}

export function handleBirdRotation(scene: CrappyBirdScene) {
  if (scene.bird.body.velocity.y > 0 && scene.bird.rotation <= 0.25) {
    scene.bird.rotation += 0.05;
  } else if (scene.bird.rotation >= -0.25) {
    scene.bird.rotation -= 0.05;
  }
  return scene;
}

export function flap(scene: CrappyBirdScene): void {
  scene.bird.setVelocityY(-500);
  scene.sound.play('flap');
}
