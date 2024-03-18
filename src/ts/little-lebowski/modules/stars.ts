import { Scene, Math as PhaserMath } from 'phaser';
import { type LebowskiGameScene } from '../Scenes';
import { scoreState } from './state';

export function renderStarGroup(
  scene: LebowskiGameScene,
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
  scene.physics.add.overlap(
    scene.player,
    stars,
    starCollected as unknown as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
    scoreState.increaseScore,
    scene,
  );
  scene.physics.add.collider(stars, scene.platforms);
  return stars;
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
