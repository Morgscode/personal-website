import { Math as PhaserMath } from 'phaser';
import { CrappyBirdScene } from '../Scenes';

export function setupPipes(scene: CrappyBirdScene) {
  const pipes = scene.physics.add.staticGroup();

  const x = scene.bird.x + PhaserMath.Between(700, 1200);

  const pipeColor = PhaserMath.Between(1, 2);

  const topPipe = scene.physics.add.staticSprite(x, 0, `pipe-${pipeColor}`);
  topPipe.setFlipY(true);
  topPipe.setDepth(1);

  const bottomPipe = scene.physics.add.staticSprite(
    x,
    600,
    `pipe-${pipeColor}`,
  );
  bottomPipe.setDepth(1);

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

  const pipeColor = PhaserMath.Between(1, 2);

  const topPipe = scene.physics.add.staticSprite(x, 0, `pipe-${pipeColor}`);
  topPipe.setDepth(1);
  topPipe.setFlipY(true);

  const bottomPipe = scene.physics.add.staticSprite(
    x,
    600,
    `pipe-${pipeColor}`,
  );
  bottomPipe.setDepth(1);

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
