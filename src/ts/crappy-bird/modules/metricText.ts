import { Scene } from 'phaser';

export function renderScoreBoardText(scene: Scene, score: number) {
  const scoreText = scene.add
    .text(16, 16, `Score: ${score}`, {
      fontSize: `32px`,
      fontFamily: 'Courier',
    })
    .setFill(`#303030`);
  return scoreText;
}
