import { Scene } from 'phaser';

export function renderScoreBoardText(scene: Scene, score: integer) {
  const scoreText = scene.add.text(16, 16, `Score: ${score}`, {
    fontSize: `32px`,
    fontFamily: 'Courier',
    fill: `#303030`,
  });
  return scoreText;
}

export function renderLevelText(scene: Scene, level: integer) {
  const levelText = scene.add.text(600, 16, `Level: ${level}`, {
    fontSize: `32px`,
    fontFamily: 'Courier',
    fill: `#303030`,
  });
  return levelText;
}
