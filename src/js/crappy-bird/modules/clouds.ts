import { Math as PhaserMath } from 'phaser';
import { CrappyBirdScene } from '../Scenes';

/**
 * Gnerates some inital clouds from the start of the game
 */
export function setupClouds(scene: CrappyBirdScene) {
  const clouds = [scene.physics.add.group()];
  let stepX: integer = 0;

  // create new clouds
  for (let i = 0; i < 50; i++) {
    const x = i * PhaserMath.Between(50, 100) + stepX;
    stepX = x - PhaserMath.Between(-100, 100);
    const y = PhaserMath.Between(100, 300);
    const scale = Math.floor(PhaserMath.Between(1, 2));
    clouds[0]
      .create(x, y, `cloud-${PhaserMath.Between(1, 3)}`)
      .setVelocityX(PhaserMath.Between(-30, -50))
      .setDepth(0)
      .setScale(scale)
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
  if (scene.bird.x > finalCloud.x + 50) {
    clouds.push(scene.physics.add.group());
    const index = clouds.length ? clouds.length - 1 : 0;
    let stepX: integer = 0;
    // create new clouds
    for (let i = 0; i < 50; i++) {
      const x = finalCloud.x + i * PhaserMath.Between(50, 100) + stepX;
      stepX = x - PhaserMath.Between(-100, 100);
      const y = PhaserMath.Between(100, 300);
      clouds[index]
        .create(x, y, `cloud-${PhaserMath.Between(1, 3)}`)
        .setVelocityX(PhaserMath.Between(-30, -50));
    }

    clouds[index].children.iterate((child: Phaser.GameObjects.GameObject) => {
      const body = child.body as Phaser.Physics.Arcade.Body;
      body.allowGravity = false;
      return null;
    });
  }
  return clouds;
}

/**
 * Removes the first cloud physics group when there is more than one
 */
export function handleCloudCleanup(clouds: Phaser.Physics.Arcade.Group[]) {
  if (clouds.length > 2) {
    // destroy first group
    clouds[0].clear(true, true);
    // filter the array
    clouds = clouds.filter((_, index) => index !== 0);
  }
  return clouds;
}
