import { Scene, Math as PhaserMath } from 'phaser';

export function renderStarGroup(
  scene: Scene,
  xVal: number,
  yVal: number,
  stepXVal: number,
) {
  const stars = scene.physics.add.group({
    key: 'star',
    repeat: 5,
    setXY: { x: xVal, y: yVal, stepX: stepXVal },
  });
  stars.children.iterate(function (child) {
    (child as Phaser.Physics.Arcade.Sprite).setBounceY(
      PhaserMath.FloatBetween(0.6, 1),
    );
    return null;
  });
  return stars;
}

export function setupStarPlatformCollision(
  scene: Scene,
  stars: Phaser.Physics.Arcade.Group[],
  platforms: Phaser.Physics.Arcade.StaticGroup,
) {
  scene.physics.add.collider(stars, platforms);
  return scene;
}

export function starCollected(
  _player: Phaser.Physics.Arcade.Sprite,
  star: Phaser.Physics.Arcade.Sprite,
) {
  this.sound.play('coin-pickup');
  star.disableBody(true, true);
  return true;
}

export function renderRandomStarGroup(stars: Phaser.Physics.Arcade.Group) {
  stars.children.iterate((child) => {
    const yVal = PhaserMath.Between(0, 500);
    const x = (child as Phaser.Physics.Arcade.Sprite).x;
    (child as Phaser.Physics.Arcade.Sprite).enableBody(
      true,
      x,
      yVal,
      true,
      true,
    );
    return null;
  });
  return stars;
}
