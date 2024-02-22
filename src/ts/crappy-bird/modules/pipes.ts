import { Math as PhaserMath } from 'phaser';
import { CrappyBirdScene } from '../Scenes';

function createPipeSprites(scene: CrappyBirdScene, x: integer) {
  const pipeColor = PhaserMath.Between(1, 2);
  const pipe1 = scene.physics.add.staticSprite(x, 0, `pipe-${pipeColor}`);
  pipe1.setFlipY(true);
  pipe1.setDepth(1);

  const pipe2 = scene.physics.add.staticSprite(x, 600, `pipe-${pipeColor}`);
  pipe2.setDepth(1);
  return [pipe1, pipe2];
}

export function setupPipes(scene: CrappyBirdScene) {
  const pipes = scene.physics.add.staticGroup();

  const x = scene.bird.x + PhaserMath.Between(700, 1200);

  const [topPipe, bottomPipe] = createPipeSprites(scene, x);

  pipes.addMultiple([topPipe, bottomPipe], true);

  scene.physics.add.collider(scene.bird, topPipe);
  scene.physics.add.collider(scene.bird, bottomPipe);

  return [pipes];
}

export function generatePipes(
  scene: CrappyBirdScene,
  pipes: Phaser.Physics.Arcade.StaticGroup[],
  finalPipe: Phaser.Physics.Arcade.Sprite,
) {
  pipes.push(scene.physics.add.staticGroup());

  const x = finalPipe.x + PhaserMath.Between(200, 800);

  const [topPipe, bottomPipe] = createPipeSprites(scene, x);

  pipes[pipes.length - 1].addMultiple([topPipe, bottomPipe], true);

  scene.physics.add.collider(scene.bird, topPipe);
  scene.physics.add.collider(scene.bird, bottomPipe);

  return pipes;
}

export function handlePipeCleanup(
  scene: CrappyBirdScene,
  pipes: Phaser.Physics.Arcade.StaticGroup[],
  finalPipe: Phaser.Physics.Arcade.Sprite,
) {
  if (pipes.length > 10 && scene.bird.x > finalPipe.x + 450) {
    console.log(pipes);
    // destroy first group
    pipes[0].clear(true, true);
    // filter the array
    pipes = pipes.filter((_, index) => index !== 0);
    console.log(pipes);
  }
  return pipes;
}
