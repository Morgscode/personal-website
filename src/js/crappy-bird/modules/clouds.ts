import { Math as PhaserMath } from 'phaser';
import { CrappyBirdScene } from '../Scenes';

/**
 * Gnerates some inital clouds from the start of the game
 */
export function setupClouds(scene: CrappyBirdScene) {
  const clouds = [scene.physics.add.group()];
  let stepX: integer = 0;

  // create new clouds
  for (let i = 0; i < 12; i++) {
    // calculate the coords for the next cloud relative to the
    const x = scene.bird.x + stepX + Math.floor(PhaserMath.Between(200, 700));
    // calculate the next step value realtive to the bird x position
    stepX = Math.floor(PhaserMath.Between(700, 2100));
    const y = Math.floor(PhaserMath.Between(150, 300));
    clouds[0]
      .create(x, y, `cloud-${PhaserMath.Between(1, 3)}`)
      .setVelocityX(PhaserMath.Between(-20, -70))
      .setDepth(0)
      .setScale(Math.floor(PhaserMath.Between(1, 2)))
      .refreshBody();
  }

  clouds[0].children.iterate((child: Phaser.GameObjects.GameObject) => {
    const body = child.body as Phaser.Physics.Arcade.Body;
    body.allowGravity = false;
    return null;
  });

  return clouds;
}

/**
 * Handles progressive cloud generation
 */
export function generateClouds(
  scene: CrappyBirdScene,
  finalCloud: Phaser.Physics.Arcade.Sprite,
  clouds: Phaser.Physics.Arcade.Group[],
) {
  if (scene.bird.x > finalCloud.x - 450) {
    clouds.push(scene.physics.add.group());
    // start at 450 so the next cloud always generates off screem
    let stepX: integer = 450;
    // create 25 new clouds
    for (let i = 0; i < 12; i++) {
      // calculate the coords for the next cloud relative to the
      const x =
        finalCloud.x + stepX + Math.floor(PhaserMath.Between(1200, 4200));
      // calculate the next step value realtive to the bird x position
      stepX = Math.floor(PhaserMath.Between(700, 2100));
      const y = Math.floor(PhaserMath.Between(150, 300));

      clouds[clouds.length - 1]
        .create(x, y, `cloud-${Math.floor(PhaserMath.Between(1, 3))}`)
        .setVelocityX(Math.floor(PhaserMath.Between(-20, -70)))
        .setDepth(0)
        .setScale(Math.floor(PhaserMath.Between(1, 2)))
        .refreshBody();
    }

    clouds[clouds.length - 1].children.iterate(
      (child: Phaser.GameObjects.GameObject) => {
        const body = child.body as Phaser.Physics.Arcade.Body;
        body.allowGravity = false;
        return null;
      },
    );
  }

  return clouds;
}

/**
 * Removes the first cloud physics group when there is more than two
 */
export function handleCloudCleanup(
  scene: CrappyBirdScene,
  clouds: Phaser.Physics.Arcade.Group[],
  finalCloud: Phaser.Physics.Arcade.Sprite,
) {
  if (clouds.length > 2 && scene.bird.x > finalCloud.x + 450) {
    // destroy first group
    clouds[0].clear(true, true);
    // filter the array
    clouds = clouds.filter((_, index) => index !== 0);
  }
  return clouds;
}
