import { Math as PhaserMath } from 'phaser';
import { CrappyBirdScene } from '../Scenes';

/**
 * Gnerates some inital clouds from the start of the game
 */
export function setupClouds(scene: CrappyBirdScene) {
  const clouds = [scene.physics.add.group()];
  let stepX: integer = 0;

  // create a randomly spread cluster of 12 clouds
  for (let i = 0; i < 12; i++) {
    // calculate the coords for the next cloud relative to the bird x
    const x = scene.bird.x + stepX + PhaserMath.Between(400, 2100);
    stepX = x / 2 + PhaserMath.Between(200, 700);
    const y = PhaserMath.Between(150, 300);
    // create the cloud and set some dynamic properties
    clouds[0]
      .create(x, y, `cloud-${PhaserMath.Between(1, 3)}`)
      .setVelocityX(PhaserMath.Between(-20, -70))
      .setDepth(0)
      .setScale(PhaserMath.Between(1, 2))
      .refreshBody();
  }

  // iterate over the clouds and disable gravity
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

    for (let i = 0; i < 12; i++) {
      // calculate the coords for the next cloud relative to the final cloud
      const x = finalCloud.x + stepX + PhaserMath.Between(1200, 4200);
      stepX = PhaserMath.Between(1200, 3200);
      const y = PhaserMath.Between(150, 300);

      clouds[clouds.length - 1]
        .create(x, y, `cloud-${PhaserMath.Between(1, 3)}`)
        .setVelocityX(PhaserMath.Between(-20, -70))
        .setDepth(0)
        .setScale(PhaserMath.Between(1, 2))
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
 * and all clouds in the first group are all off screen
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
