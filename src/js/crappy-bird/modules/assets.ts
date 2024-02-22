import { CrappyBirdScene } from '../Scenes';

/**
 * Loads the assets needed for the Crappy bird game
 */
export function loadCrappyAssets(scene: CrappyBirdScene) {
  scene.load.spritesheet('bird', './assets/img/bird.png', {
    frameWidth: 50,
    frameHeight: 34,
  });
  scene.load.image('ground', './assets/img/grass.png');
  scene.load.image('stone', './assets/img/stone-top.png');
  scene.load.image('cloud-1', './assets/img/cloud1.png');
  scene.load.image('cloud-2', './assets/img/cloud2.png');
  scene.load.image('cloud-3', './assets/img/cloud3.png');
  scene.load.image('pipe-1', './assets/img/pipe-green.png');
  scene.load.image('pipe-2', './assets/img/pipe-red.png');

  scene.load.audio('flap', './assets/sounds/bird-flap.mp3');
  scene.load.audio('point', './assets/sounds/point.mp3');
  return scene;
}
