import { Scene, Math as PhaserMath } from 'phaser';
import { type LebowskiGameScene } from '../Scenes';
import { levelState } from './state';

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

export function handleSpawnBomb(scene: LebowskiGameScene) {
  const level = levelState.getLevel();

  if (scene.bombs.children.size < level && level <= 3) {
    for (let i = scene.bombs.children.size; i < level; i++) {
      const cordXBase =
        scene.player.x <= scene.scale.gameSize.width / 2 ? 575 : 16;
      const cordYBase =
        scene.player.y <= scene.scale.gameSize.height / 2 ? 350 : 16;
      spawnBomb(scene.bombs, cordXBase, cordYBase);
    }
  }
}
