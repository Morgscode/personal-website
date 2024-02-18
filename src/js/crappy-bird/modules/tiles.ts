import { type CrappyBirdScene } from '../Scenes';

export function setupGround(scene: CrappyBirdScene) {
  scene.ground = [scene.physics.add.staticGroup()];

  for (let i = 0; i < 120; i++) {
    const x = i * 70;
    scene.ground[scene.ground.length ? scene.ground.length - 1 : 0].create(
      x,
      770,
      'ground',
    );
  }

  return scene.ground;
}

export function setupStoneTop(scene: CrappyBirdScene) {
  scene.stoneTop = [scene.physics.add.staticGroup()];

  for (let i = 0; i < 120; i++) {
    const x = i * 70;
    scene.stoneTop[
      scene.stoneTop.length ? scene.stoneTop.length - 1 : 0
    ].create(x, 0, 'stone');
  }

  return scene.stoneTop;
}

export function handleGroundGeneration(scene: CrappyBirdScene) {}

export function handleStoneTopGeneration(scene: CrappyBirdScene) {}
