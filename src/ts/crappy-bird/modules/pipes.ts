import { Math as PhaserMath } from 'phaser';
import { CrappyBirdScene } from '../Scenes';
import { birdCollides } from './bird';

const pipeYOptions: Record<number, Array<number>> = {
  // even seperated - hardest to easiest
  0: [125, 600],
  1: [100, 625],
  2: [75, 650],
  3: [50, 675],
  4: [25, 700],
  // uneven spaced - not ordered
  5: [0, 600],
  6: [100, 700],
  7: [150, 750],
  8: [25, 575],
  9: [100, 575],
  10: [150, 650],
};

/**
 * Creates two pipe sprites
 */
function createPipeSprites(scene: CrappyBirdScene, x: number) {
  const pipeColor = PhaserMath.Between(1, 2);
  const [topY, bottomY] = pipeYOptions[PhaserMath.Between(0, 10)];
  const pipe1 = scene.physics.add.staticSprite(x, topY, `pipe-${pipeColor}`);
  pipe1.setFlipY(true);
  pipe1.setDepth(1);

  const pipe2 = scene.physics.add.staticSprite(x, bottomY, `pipe-${pipeColor}`);
  pipe2.setDepth(1);

  return [pipe1, pipe2];
}

/**
 * Sets up the pipe physics group and creates the first two
 */
export function setupPipes(
  pipes: Phaser.Physics.Arcade.StaticGroup[],
  pipeXRecords: Array<number>,
  scene: CrappyBirdScene,
) {
  pipes.push(scene.physics.add.staticGroup());
  // calculate the position relative to the bird x
  const x = scene.bird.x + 450;
  pipeXRecords.push(x);

  const [topPipe, bottomPipe] = createPipeSprites(scene, x);
  pipes[0].addMultiple([topPipe, bottomPipe], true);

  scene.physics.add.collider(
    pipes[0],
    scene.bird,
    birdCollides as unknown as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
    () => true,
    scene,
  );

  return pipes;
}

/**
 * Handles progressive pipe generation
 */
export function generatePipes(
  scene: CrappyBirdScene,
  pipes: Phaser.Physics.Arcade.StaticGroup[],
  finalPipe: Phaser.Physics.Arcade.Sprite,
  pipeXRecords: Array<number>,
) {
  // if we have 10 pipe groups, return
  if (pipes.length >= 20) return pipes;
  pipes.push(scene.physics.add.staticGroup());

  // calculate the new pipe position reltive to the final pipe in the game
  const x = finalPipe.x + PhaserMath.Between(150, 550);
  pipeXRecords.push(x);

  const [topPipe, bottomPipe] = createPipeSprites(scene, x);
  pipes[pipes.length - 1].addMultiple([topPipe, bottomPipe], true);

  scene.physics.add.collider(
    pipes[0],
    scene.bird,
    birdCollides as unknown as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
    () => true,
    scene,
  );

  return pipes;
}

/**
 * Handles pipe cleanup
 */
export function handlePipeCleanup(
  scene: CrappyBirdScene,
  pipes: Phaser.Physics.Arcade.StaticGroup[],
) {
  // if we have more than 10 pipe groups
  if (pipes.length > 15) {
    // get the final pipe in the 15th set
    const pipe = scene.pipes[15].children.entries;
    const finalPipe = pipe[pipe.length - 1] as Phaser.Physics.Arcade.Sprite;
    // if its off screen relative to the bird position
    if (scene.bird.x > finalPipe.x + 450) {
      // clear the pipe first 15 pipe groups
      pipes.forEach((pipes, index) => {
        if (index < 15) pipes.clear(true, true);
      });
      // filter any empty arrays
      pipes = pipes.filter((pipes) => pipes.children.entries.length);
    }
  }
  return pipes;
}
