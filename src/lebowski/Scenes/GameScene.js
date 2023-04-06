import * as dataController from "../Controllers/dataController";
import * as uiController from "../Controllers/uiController";

class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' });
    }

    preload() {
      cursors = uiCtrl.setupCursorKeys(this);
      uiCtrl.loadGameSceneAssets(this);
      dataCtrl.setupScore();
      dataCtrl.setupLevel();
    }

    create() {
      uiCtrl.renderSky(this);
      platforms = uiCtrl.renderPlatforms(this);
      scoreText = uiCtrl.renderScoreText(this, dataCtrl.getScore());
      levelText = uiCtrl.renderLevelText(this, dataCtrl.getLevel());
      stars.push(uiCtrl.renderStars(this, 5, 450, 70));
      stars.push(uiCtrl.renderStars(this, 15, 350, 60));
      stars.push(uiCtrl.renderStars(this, 15, 200, 60));
      stars.push(uiCtrl.renderStars(this, 25, 50, 50));
      uiCtrl.setStarPlatformCollisions(this, stars, platforms);
      player = uiCtrl.renderPlayer(this);
      uiCtrl.setplayerPhysics(player);
      uiCtrl.setplayerAnimations(this);
      uiCtrl.setPlayerPlatformCollisions(this, player, platforms);
      bombs = uiCtrl.renderBombs(this);
      uiCtrl.setPlatformBombCollisions(this, bombs, platforms);
      uiCtrl.setPlayerBombCollisions(
        this,
        player,
        bombs,
        uiCtrl.bombHitsPlayer,
        triggerGameOver
      );
    }

    update() {
      if (gameOver) return;

      uiCtrl.movePlayer(player, cursors, dataCtrl);
      uiCtrl.setPlayerStarCollisions(
        player,
        stars,
        uiCtrl.collectStar,
        dataCtrl.increaseScore,
        this
      );
      scoreText.setText(`Score: ${dataCtrl.getScore()}`);
      levelText.setText(`Level: ${dataCtrl.getLevel()}`);
      activeStarGroups = stars.length || 0;
      stars.forEach((starGroup) => {
        if (starGroup?.countActive() === 0) {
          activeStarGroups--;
        }
      });
      if (activeStarGroups === 0) {
        dataCtrl.levelUp();
        stars.forEach((starGroup) => {
          uiCtrl.renderRandomStars(starGroup);
        });
      }
      const level = parseInt(dataCtrl.getLevel(), 10);
      if (bombs.children.size < level) {
        for (let i = bombs.children.size; i < level; i++) {
          let cordBase = level % 2 == 0 ? i * 16 : 575 - i;
          uiCtrl.spawnBomb(bombs, cordBase);
        }
      }
    }
  }