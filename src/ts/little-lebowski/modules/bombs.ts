import { Scene, Math as PhaserMath, GameObjects } from 'phaser';

export function setupBombs(scene: Scene) {
  const bombs = scene.physics.add.group();
  return bombs;
}

export function spawnBomb(
  bombs: Phaser.Physics.Arcade.Group,
  xCord = 15,
  yCord = 16,
) {
  const bomb = bombs.create(xCord, yCord, 'bomb');
  bomb.setBounce(1);
  bomb.setCollideWorldBounds(true);
  bomb.setVelocity(PhaserMath.Between(-150, 150), 20);
  bomb.setMaxVelocity(500, 500);
  return bomb;
}

export function setupBombPlatformCollision(
  scene: Scene,
  bombs: Phaser.Physics.Arcade.Group,
  platforms: Phaser.Physics.Arcade.StaticGroup,
) {
  scene.physics.add.collider(bombs, platforms);
  return scene;
}
