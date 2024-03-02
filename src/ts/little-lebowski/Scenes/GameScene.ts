import { Scene, Types } from 'phaser';
import { gameState } from '../modules/state';
import { gameOver } from '../modules/state';
import { loadAssets, renderSky, renderPlatforms } from '../modules/assets';
import { bindCursorKeys, bindMobileControls } from '../modules/controls';
import {
  scoreState,
  levelState,
  playerJumpState,
  increaseScore,
} from '../modules/state';
import { renderLevelText, renderScoreBoardText } from '../modules/metricText';
import {
  renderStarGroup,
  setupStarPlatformCollision,
  starCollected,
  renderRandomStarGroup,
} from '../modules/stars';
import {
  renderPlayer,
  setupPlayerAnimations,
  setupPlayerPhysics,
  handlePlayerMovement,
  setupPlayerBombCollision,
  setupPlayerPlatformCollision,
  setupPlayerStarCollection,
  bombHitsPlayer,
} from '../modules/dude';
import {
  setupBombs,
  setupBombPlatformCollision,
  handleSpawnBomb,
} from '../modules/bombs';

export type LebowskiGameScene = {
  platforms: Phaser.Physics.Arcade.StaticGroup;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  player: Types.Physics.Arcade.SpriteWithDynamicBody;
  bombs: Phaser.Physics.Arcade.Group;
  stars: Phaser.Physics.Arcade.Group[];
  scoreText: Phaser.GameObjects.Text;
  levelText: Phaser.GameObjects.Text;
} & Scene;

export class GameScene extends Scene {
  platforms: Phaser.Physics.Arcade.StaticGroup;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  player: Types.Physics.Arcade.SpriteWithDynamicBody;
  bombs: Phaser.Physics.Arcade.Group;
  stars: Phaser.Physics.Arcade.Group[] = [];
  scoreText: Phaser.GameObjects.Text;
  levelText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.cursors = bindCursorKeys(this);
    bindMobileControls(this);
    loadAssets(this);
    scoreState.setupScore();
    levelState.setupLevel();
    playerJumpState.setupJumpCount();
  }

  create() {
    renderSky(this);
    this.platforms = renderPlatforms(this);
    this.scoreText = renderScoreBoardText(this, scoreState.setupScore());
    this.levelText = renderLevelText(this, levelState.setupLevel());
    this.stars.push(renderStarGroup(this, 5, 450, 130));
    this.stars.push(renderStarGroup(this, 15, 350, 110));
    this.stars.push(renderStarGroup(this, 15, 200, 110));
    this.stars.push(renderStarGroup(this, 25, 50, 100));
    setupStarPlatformCollision(this, this.stars, this.platforms);
    this.player = renderPlayer(this);
    setupPlayerPhysics(this.player);
    setupPlayerAnimations(this);
    setupPlayerPlatformCollision(this, this.player, this.platforms);
    this.bombs = setupBombs(this);
    setupBombPlatformCollision(this, this.bombs, this.platforms);
    setupPlayerBombCollision(
      this,
      this.player,
      this.bombs,
      bombHitsPlayer,
      gameOver,
    );
  }

  update() {
    if (gameState.gameOver) return;

    handlePlayerMovement(this.player, this.cursors, this);

    setupPlayerStarCollection(
      this.player,
      this.stars,
      starCollected,
      increaseScore,
      this,
    );

    this.scoreText.setText(`Score: ${scoreState.getScore()}`);
    this.levelText.setText(`Level: ${levelState.getLevel()}`);
    gameState.activeStarGroups = this.stars.length ?? 0;

    this.stars.forEach((starGroup) => {
      if (starGroup?.countActive() === 0) {
        gameState.activeStarGroups--;
      }
    });

    if (gameState.activeStarGroups === 0) {
      levelState.incrementLevel();
      this.sound.play('level-up');
      this.stars.forEach((starGroup) => {
        renderRandomStarGroup(starGroup);
      });
    }

    handleSpawnBomb(this);
  }
}
