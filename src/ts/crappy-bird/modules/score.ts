import { Scene } from 'phaser';
import { scoreState } from './state';

export function renderScoreBoardText(scene: Scene, score: number) {
  const scoreText = scene.add
    .text(5, 25, `Score: ${score}`, {
      fontSize: `32px`,
      fontFamily: 'Courier',
    })
    .setFill(`#303030`)
    .setDepth(3);
  scoreText.scrollFactorX = 0;
  scoreText.scrollFactorY = 0;
  return scoreText;
}

export function manageScore(birdX: number, pipeXRecords: Array<number>, scene) {
  return pipeXRecords.filter((x) => {
    if (birdX > x) {
      scene.sound.play('point');
      scoreState.increaseScore();
      return false;
    } else {
      return true;
    }
  });
}
