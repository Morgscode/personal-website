import { Scene, Math as PhaserMath } from 'phaser';

export function renderStarGroup(
  scene: Scene,
  xVal: integer,
  yVal: integer,
  stepXVal: integer,
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
  _player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  star: Phaser.Physics.Arcade.Sprite,
) {
  this.sound.play('coin-pickup');
  star.disableBody(true, true);
}

export function renderRandomStarGroup(stars: Phaser.Physics.Arcade.Group) {
  stars.children.iterate((child) => {
    const yVal = PhaserMath.Between(0, 500);
    (child as Phaser.Physics.Arcade.Sprite).enableBody(
      true,
      child.x,
      yVal,
      true,
      true,
    );
    return null;
  });
  return stars;
}
