import { Scene } from 'phaser';

export function loadAssets(scene: Scene) {
  scene.load.image('sky', './assets/img/sky.png');
  scene.load.image('ground', './assets/img/platform.png');
  scene.load.image('star', './assets/img/star.png');
  scene.load.image('bomb', './assets/img/bomb.png');
  scene.load.image('kaboom', './assets/img/explosion.png');
  scene.load.spritesheet('dude', './assets/img/dude.png', {
    frameWidth: 32,
    frameHeight: 48,
  });
  scene.load.audio('kaboom', './assets/sounds/explosion.mp3');
  scene.load.audio('coin-pickup', './assets/sounds/coin-pickup.mp3');
  scene.load.audio('jump-1', './assets/sounds/jump-1.mp3');
  scene.load.audio('jump-2', './assets/sounds/jump-2.mp3');
  scene.load.audio('intro', './assets/sounds/intro.mp3');
  scene.load.audio('level-up', './assets/sounds/level-up.mp3');
  return scene;
}

export function renderSky(scene: Scene) {
  scene.add.image(0, 0, 'sky').setOrigin(0, 0);
  return scene;
}

export function renderPlatforms(scene: Scene) {
  const platforms = scene.physics.add.staticGroup();
  // ground layer
  platforms.create(400, 600, 'ground').setScale(2).refreshBody();
  // 2nd left
  platforms.create(250, 500, 'ground');
  // 2nd right
  platforms.create(750, 500, 'ground');
  // 3rd left
  platforms.create(-100, 400, 'ground');
  // 3rd middle
  platforms.create(400, 400, 'ground');
  // 3rd right
  platforms.create(900, 400, 'ground');
  // 4th left
  platforms.create(145, 275, 'ground');
  // 4th right
  platforms.create(650, 275, 'ground');
  // 5th left
  platforms.create(0, 125, 'ground');
  // 5th right
  platforms.create(500, 125, 'ground');
  return platforms;
}
