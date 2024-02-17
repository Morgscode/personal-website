import { CrappyBirdScene } from '../Scenes';

export function loadCrappyAssets(scene: CrappyBirdScene) {
  scene.load.spritesheet('bird', './assets/img/bird.png', {
    frameWidth: 50,
    frameHeight: 34,
  });
  scene.load.image('ground', './assets/img/grass.png');
  scene.load.image('stone', './assets/img/stone-top.png');
  scene.load.audio('flap', './assets/sounds/bird-flap.mp3');
  return scene;
}
