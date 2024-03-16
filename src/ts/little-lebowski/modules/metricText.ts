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

export function renderLevelText(scene: Scene, level: number) {
  const levelText = scene.add
    .text(600, 16, `Level: ${level}`, {
      fontSize: `32px`,
      fontFamily: 'Courier',
    })
    .setFill(`#303030`);
  return levelText;
}
