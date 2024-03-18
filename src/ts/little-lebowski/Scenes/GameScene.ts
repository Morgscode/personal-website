import { Scene, Types } from 'phaser';
import { gameState } from '../modules/state';
import { gameOver } from '../modules/state';
import { loadAssets, renderSky, renderPlatforms } from '../modules/assets';
import { bindCursorKeys, bindMobileControls } from '../modules/controls';
import { scoreState, levelState, playerJumpState } from '../modules/state';
import { renderLevelText, renderScoreBoardText } from '../modules/metricText';
import { renderStarGroup, renderRandomStarGroup } from '../modules/stars';
import {
  renderPlayer,
  setupPlayerAnimations,
  setupPlayerPhysics,
  handlePlayerMovement,
  setupPlayerBombCollision,
  setupPlayerPlatformCollision,
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
    this.player = renderPlayer(this);
    this.stars.push(renderStarGroup(this, 5, 450, 130));
    this.stars.push(renderStarGroup(this, 15, 350, 110));
    this.stars.push(renderStarGroup(this, 15, 200, 110));
    this.stars.push(renderStarGroup(this, 25, 50, 100));
    setupPlayerPhysics(this.player);
    setupPlayerAnimations(this);
    setupPlayerPlatformCollision(this, this.player, this.platforms);
    this.bombs = setupBombs(this);
    setupBombPlatformCollision(this, this.bombs, this.platforms);
    setupPlayerBombCollision(
      this,
      this.player,
      this.bombs,
      bombHitsPlayer as unknown as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      gameOver as unknown as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
    );
  }

  update() {
    if (gameState.gameOver) return;

    handlePlayerMovement(this.player, this.cursors, this);

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
