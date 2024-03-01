import { Scene } from 'phaser';
import { type LebowskiGameScene } from '../Scenes/GameScene';

export function bindCursorKeys(scene: Scene) {
  const cursors = scene.input.keyboard!.createCursorKeys();
  return cursors;
}

export function bindMobileControls(scene: LebowskiGameScene) {
  const up = document.querySelector('button#arrow-up');
  const left = document.querySelector('button#arrow-left');
  const right = document.querySelector('button#arrow-right');

  up?.addEventListener('touchstart', (event) => {
    event.preventDefault();
    // playerJumpState.handleMobileDoubleJumpState(event.timeStamp);
    scene.cursors.up.isDown = true;
  });
  up?.addEventListener('touchend', (event) => {
    event.preventDefault();
    scene.cursors.up.isDown = false;
  });

  left?.addEventListener('touchstart', (event) => {
    event.preventDefault();
    scene.cursors.left.isDown = true;
  });
  left?.addEventListener('touchend', (event) => {
    event.preventDefault();
    scene.cursors.left.isDown = false;
  });

  right?.addEventListener('touchstart', (event) => {
    event.preventDefault();
    scene.cursors.right.isDown = true;
  });
  right?.addEventListener('touchend', (event) => {
    event.preventDefault();
    scene.cursors.right.isDown = false;
  });
}
