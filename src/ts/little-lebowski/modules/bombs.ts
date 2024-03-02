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
  const bomb = bombs.create(
    xCord,
    yCord,
    'bomb',
  ) as Phaser.Physics.Arcade.Sprite;
  bomb.setBounce(1);
  bomb.setCollideWorldBounds(true);
  bomb.setVelocity(PhaserMath.Between(-150, 150), 200);
  bomb.setMaxVelocity(300, 500);
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
