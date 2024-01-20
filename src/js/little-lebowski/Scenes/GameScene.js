'use strict';

import { Scene } from 'phaser';
import { gameSetup, playerSetup, bombSetup, starSetup } from '../view';
import { gameState, scoreState, levelState } from '../model';
import { triggerGameOver } from '../';

export class GameScene extends Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    gameState.cursors = gameSetup.bindCursorKeys(this);
    gameSetup.loadAssets(this);
    scoreState.setupScore();
    levelState.setupLevel();
  }

  create() {
    gameSetup.renderSky(this);
    gameState.platforms = gameSetup.renderPlatforms(this);
    gameState.scoreText = gameSetup.renderScoreBoardText(
      this,
      scoreState.setupScore(),
    );
    gameState.levelText = gameSetup.renderLevelText(
      this,
      levelState.setupLevel(),
    );
    gameState.stars.push(starSetup.renderStarGroup(this, 5, 450, 70));
    gameState.stars.push(starSetup.renderStarGroup(this, 15, 350, 60));
    gameState.stars.push(starSetup.renderStarGroup(this, 15, 200, 60));
    gameState.stars.push(starSetup.renderStarGroup(this, 25, 50, 50));
    starSetup.setupStarPlatformCollision(
      this,
      gameState.stars,
      gameState.platforms,
    );
    gameState.player = playerSetup.renderPlayer(this);
    playerSetup.setupPlayerPhysics(gameState.player);
    playerSetup.setupPlayerAnimations(this);
    playerSetup.setupPlayerPlatformCollision(
      this,
      gameState.player,
      gameState.platforms,
    );
    gameState.bombs = gameSetup.renderBombs(this);
    bombSetup.setupBombPlatformCollision(
      this,
      gameState.bombs,
      gameState.platforms,
    );
    playerSetup.setupPlayerBombCollision(
      this,
      gameState.player,
      gameState.bombs,
      playerSetup.bombHitsPlayer,
      triggerGameOver,
    );
  }

  update() {
    if (gameState.gameOver) return;

    playerSetup.handlePlayerMovement(gameState.player, gameState.cursors);

    playerSetup.setupPlayerStarCollection(
      gameState.player,
      gameState.stars,
      starSetup.starCollected,
      scoreState.increaseScore,
      this,
    );

    gameState.scoreText.setText(`Score: ${scoreState.getScore()}`);
    gameState.levelText.setText(`Level: ${levelState.getLevel()}`);
    gameState.activeStarGroups = gameState.stars.length || 0;

    gameState.stars.forEach((starGroup) => {
      if (starGroup?.countActive() === 0) {
        gameState.activeStarGroups--;
      }
    });

    if (gameState.activeStarGroups === 0) {
      levelState.incrementLevel();
      gameState.stars.forEach((starGroup) => {
        starSetup.renderRandomStarGroup(starGroup);
      });
    }

    const level = parseInt(levelState.getLevel(), 10);

    if (gameState.bombs.children.size < level) {
      for (let i = gameState.bombs.children.size; i < level; i++) {
        let cordBase = level % 2 == 0 ? i * 16 : 575 - i;
        bombSetup.spawnBomb(gameState.bombs, cordBase);
      }
    }
  }
}
