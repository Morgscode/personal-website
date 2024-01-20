'use strict';

import '../scss/main.scss';
import * as Phaser from 'phaser';

function getAssetUrl(name) {
  return new URL(`./src/assets/html5-game-asset/${name}.png`, import.meta.url)
    .href;
}

/**
 * Data Controller (MODEL)
 */
const dataController = (() => {
  const playerJumpState = {
    setJumpCount() {
      return window.localStorage.setItem('jumpCount', 1);
    },
    resetJumpCount() {
      return window.localStorage.setItem('jumpCount', 0);
    },
    getJumpCount() {
      return window.localStorage.getItem('jumpCount');
    },
  };

  const scoreState = {
    setupGameScore() {
      return window.localStorage.setItem('gameScore', 0);
    },
    increaseGameScore() {
      let score = parseInt(window.localStorage.getItem('gameScore'), 10);
      score += 10;
      return window.localStorage.setItem('gameScore', score);
    },
    getGameScore() {
      return parseInt(window.localStorage.getItem('gameScore'));
    },
  };

  const levelState = {
    setupGameLevel() {
      return window.localStorage.setItem('gameLevel', 1);
    },
    incrementGameLevel() {
      let level = parseInt(window.localStorage.getItem('gameLevel'), 10);
      level++;
      return window.localStorage.setItem('gameLevel', level);
    },
    getGameLevel() {
      return window.localStorage.getItem('gameLevel');
    },
  };

  async function getLeaderboard() {
    const res = await fetch(
      `${window.location.origin}/.netlify/functions/leaderboard`,
    );
    const { data, count } = await res.json();
    return { data: data.data, count };
  }

  async function submitStatistics(name, level, score) {
    const stats = { name, level, score };
    try {
      const res = await fetch(
        `${window.location.origin}/.netlify/functions/leaderboard`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stats),
        },
      );
      if (res.status !== 201) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    setJumpCount: playerJumpState.setJumpCount,
    resetJumpCount: playerJumpState.resetJumpCount,
    getJumpCount: playerJumpState.getJumpCount,
    setupScore: scoreState.setupGameScore,
    getScore: scoreState.getGameScore,
    increaseScore: scoreState.increaseGameScore,
    setupLevel: levelState.setupGameLevel,
    getLevel: levelState.getGameLevel,
    levelUp: levelState.incrementGameLevel,
    submitStatistics,
    getLeaderboard,
  };
})();

/**
 * UI Controller (VIEW)
 */
const uiController = (() => {
  const initialSceneSetupFunctions = {
    loadGameAssets(gameObject) {
      gameObject.load.image('sky', './src/assets/img/sky.png');
      gameObject.load.image('ground', './src/assets/img/platform.png');
      gameObject.load.image('star', './src/assets/img/star.png');
      gameObject.load.image('bomb', './src/assets/img/bomb.png');
      gameObject.load.spritesheet('dude', './src/assets/img/dude.png', {
        frameWidth: 32,
        frameHeight: 48,
      });
      return gameObject;
    },
    renderBlueSkyBackground(gameObject) {
      gameObject.add.image(0, 0, 'sky').setOrigin(0, 0);
      return gameObject;
    },
    renderScenePlatforms(gameObject) {
      const platforms = gameObject.physics.add.staticGroup();
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
    },
    renderSceneBombs(gameObject) {
      const bombs = gameObject.physics.add.group();
      return bombs;
    },
    bindCursorKeys(gameObject) {
      const cursors = gameObject.input.keyboard.createCursorKeys();
      return cursors;
    },
    renderScoreBoardText(gameObject, score) {
      const scoreText = gameObject.add.text(16, 16, `Score: ${score}`, {
        fontSize: `32px`,
        fontFamily: 'Courier',
        fill: `#303030`,
      });
      return scoreText;
    },
    renderGameLevelText(gameObject, level) {
      const levelText = gameObject.add.text(600, 16, `Level: ${level}`, {
        fontSize: `32px`,
        fontFamily: 'Courier',
        fill: `#303030`,
      });
      return levelText;
    },
  };

  const starSetupFunctions = {
    renderStarGroup(gameObject, xVal, yVal, stepXVal) {
      const stars = gameObject.physics.add.group({
        key: 'star',
        repeat: 10,
        setXY: { x: xVal, y: yVal, stepX: stepXVal },
      });
      stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.6, 1));
      });
      return stars;
    },
    setupPlatformStarsCollision(gameObject, stars, platforms) {
      gameObject.physics.add.collider(stars, platforms);
      return gameObject;
    },
    starCollected(player, star) {
      star.disableBody(true, true);
    },
    renderRandomStarGroup(stars) {
      stars.children.iterate((child) => {
        const yVal = Phaser.Math.Between(0, 500);
        child.enableBody(true, child.x, yVal, true, true);
      });
      return stars;
    },
  };

  const bombSetupFunctions = {
    renderBomb(gameObject) {
      const bomb = gameObject.physics.add.sprite(400, 300, 'bomb');
      return bomb;
    },
    spawnBomb(bombs, xCord) {
      const bomb = bombs.create(xCord, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      return bomb;
    },
    setupBombPlatformCollision(gameObject, bomb, platforms) {
      gameObject.physics.add.collider(bomb, platforms);
      return gameObject;
    },
  };

  const playerSetupFunctions = {
    renderPlayer(gameObject) {
      const player = gameObject.physics.add.sprite(50, 545, 'dude');
      return player;
    },
    setplayerInitialPhysics(player) {
      player.setBounce(0.2);
      player.body.setGravity(0, 300);
      player.setCollideWorldBounds(true);
      return player;
    },
    setplayerAnimations(gameObject) {
      gameObject.anims.create({
        key: 'left',
        frames: gameObject.anims.generateFrameNumbers('dude', {
          start: 0,
          end: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });

      gameObject.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 10,
      });

      gameObject.anims.create({
        key: 'right',
        frames: gameObject.anims.generateFrameNumbers('dude', {
          start: 5,
          end: 8,
        }),
        frameRate: 10,
        repeat: -1,
      });
      return gameObject;
    },
    handlePlayerMovement(player, cursors, dataCtrl) {
      /**
       *
       * Let's asses which cursor is being pressed,
       * and set some velocity on the x-axis if its
       * a left or right key being pressed.
       * if no key is pressed, face the user
       *
       */
      if (cursors.left.isDown) {
        player.setVelocityX(-120);
        player.anims.play('left', true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(120);
        player.anims.play('right', true);
      } else {
        player.setVelocityX(0);
        player.anims.play('turn');
      }

      /**
       *
       * let's assess if the player is touching the ground
       * and if the up key is pressed, jump...
       * also, we'll set a jump counter in the browsers local
       * storage to moderate double jumping.
       *
       */
      // --- jump
      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-325);
        dataCtrl.setJumpCount();
      }

      // double jump
      const jumpCount = dataCtrl.getJumpCount();
      /**
       *
       * if the player is jumping, at a veloctity(Y)
       * of less than 30, and they have only jumped once,
       * ... jump again and reset the jump counter to prevent
       * further jumps.
       *
       */
      if (
        cursors.up.isDown &&
        !player.body.touching.down &&
        jumpCount == 1 &&
        player.body.velocity.y < 30 &&
        player.body.velocity.y > -100
      ) {
        player.setVelocityY(-325);
        dataCtrl.resetJumpCount();
      }

      return player;
    },
    setupPlayerPlatformCollision(gameObject, player, platforms) {
      gameObject.physics.add.collider(player, platforms);
      return gameObject;
    },
    setupPlayerBombCollision(gameObject, player, bombs, hitBomb, gameOver) {
      gameObject.physics.add.collider(
        player,
        bombs,
        hitBomb,
        gameOver,
        gameObject,
      );
      return gameObject;
    },
    setupPlayerStarCollection(
      player,
      stars,
      collectStarFn,
      increaseScoreFn,
      gameObject,
    ) {
      gameObject.physics.add.overlap(
        player,
        stars,
        collectStarFn,
        increaseScoreFn,
        gameObject,
      );
      return gameObject;
    },
    bombHitsPlayer(player, bomb) {
      player.setTint(0xff0000);
      player.anims.play('turn');
      player.angle = 180;
      this.physics.pause();
    },
  };

  return {
    loadGameSceneAssets: initialSceneSetupFunctions.loadGameAssets,
    renderSky: initialSceneSetupFunctions.renderBlueSkyBackground,
    renderPlatforms: initialSceneSetupFunctions.renderScenePlatforms,
    renderBombs: initialSceneSetupFunctions.renderSceneBombs,
    renderStars: starSetupFunctions.renderStarGroup,
    collectStar: starSetupFunctions.starCollected,
    setStarPlatformCollisions: starSetupFunctions.setupPlatformStarsCollision,
    displayTitle: initialSceneSetupFunctions.displayGameTitle,
    setupCursorKeys: initialSceneSetupFunctions.bindCursorKeys,
    renderPlayer: playerSetupFunctions.renderPlayer,
    setplayerPhysics: playerSetupFunctions.setplayerInitialPhysics,
    setplayerAnimations: playerSetupFunctions.setplayerAnimations,
    movePlayer: playerSetupFunctions.handlePlayerMovement,
    setPlayerPlatformCollisions:
      playerSetupFunctions.setupPlayerPlatformCollision,
    setPlayerBombCollisions: playerSetupFunctions.setupPlayerBombCollision,
    bombHitsPlayer: playerSetupFunctions.bombHitsPlayer,
    setPlayerStarCollisions: playerSetupFunctions.setupPlayerStarCollection,
    setPlatformBombCollisions: bombSetupFunctions.setupBombPlatformCollision,
    renderScoreText: initialSceneSetupFunctions.renderScoreBoardText,
    renderLevelText: initialSceneSetupFunctions.renderGameLevelText,
    renderRandomStars: starSetupFunctions.renderRandomStarGroup,
    spawnBomb: bombSetupFunctions.spawnBomb,
  };
})();

/**
 * GameController (Controller)
 */
const gameController = ((uiCtrl, dataCtrl) => {
  let game;
  let gameOver = false;
  let cursors;
  let player;
  let bombs;
  let platforms;
  let stars = [];
  let levelText;
  let scoreText;
  let activeStarGroups;

  //----- GAME SCENE CLASS DEFINITIONS

  class StartScene extends Phaser.Scene {
    constructor() {
      super({ key: 'StartScene' });
    }

    preload() {
      uiCtrl.loadGameSceneAssets(this);
      cursors = uiCtrl.setupCursorKeys(this);
    }

    create() {
      uiCtrl.renderSky(this);
      platforms = uiCtrl.renderPlatforms(this);

      const overlay = this.add
        .rectangle(
          0,
          0,
          this.cameras.main.width,
          this.cameras.main.height,
          0x000000,
        )
        .setOrigin(0, 0);
      overlay.alpha = 0.7;

      const titleTextLine1 = this.add
        .text(400, 180, 'The Adventure(s) of', {
          font: '32px Courier',
          fill: '#fff',
        })
        .setOrigin(0.5);
      const titleTextLine2 = this.add
        .text(400, 240, 'Little Lebowski', {
          font: '32px Courier',
          fill: '#fff',
        })
        .setOrigin(0.5);

      const startButton = this.add
        .text(250, 340, 'Start Game', { font: '32px Courier', fill: '#222222' })
        .setOrigin(0.5)
        .setInteractive();

      // Move the startButton to the top
      startButton.setDepth(1);

      const borderWidth = 4;
      const borderPadding = 10;

      const startBorder = this.add
        .rectangle(
          startButton.x,
          startButton.y,
          startButton.width + borderPadding * 2,
          startButton.height + borderPadding * 2,
          0xffffff,
        )
        .setOrigin(0.5);
      startBorder.setStrokeStyle(borderWidth, 0xffffff);

      const scoreButton = this.add
        .text(550, 340, 'Score Board', {
          font: '32px Courier',
          fill: '#222222',
        })
        .setOrigin(0.5)
        .setInteractive();

      // Move the startButton to the top
      scoreButton.setDepth(1);

      const scoreBorder = this.add
        .rectangle(
          scoreButton.x,
          scoreButton.y,
          scoreButton.width + borderPadding * 2,
          scoreButton.height + borderPadding * 2,
          0xffffff,
        )
        .setOrigin(0.5);
      scoreBorder.setStrokeStyle(borderWidth, 0xffffff);

      startButton.on('pointerdown', () => {
        this.scene.start('GameScene');
      });

      scoreButton.on('pointerdown', () => {
        this.scene.start('LeaderBoardScene');
      });
    }

    update() {}
  }

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
        triggerGameOver,
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
        this,
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

  class GameOverScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameOverScene' });
    }

    preload() {
      cursors = uiCtrl.setupCursorKeys(this);
      this.load.plugin(
        'rexinputtextplugin',
        'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js',
        true,
      );
    }

    create() {
      const overlay = this.add
        .rectangle(
          0,
          0,
          this.cameras.main.width,
          this.cameras.main.height,
          0x000000,
        )
        .setOrigin(0, 0);
      overlay.alpha = 0.7;

      const gameOverText = this.add
        .text(400, 100, 'Game Over :(', { font: '58px Courier', fill: '#fff' })
        .setOrigin(0.5);

      this.add
        .text(300, 175, `Score: ${dataCtrl.getScore()}`, {
          fontSize: '24px',
          color: '#fff',
        })
        .setOrigin(0.5);

      this.add
        .text(500, 175, `Level: ${dataCtrl.getLevel()}`, {
          fontSize: '24px',
          color: '#fff',
        })
        .setOrigin(0.5);

      this.add
        .text(400, 250, `Add your name to the scoreboard`, {
          fontSize: '18px',
          color: '#fff',
        })
        .setOrigin(0.5);

      const nameInput = this.add.rexInputText(400, 300, 400, 60, {
        type: 'text',
        placeholder: 'enter your name',
        border: 1,
        color: '#333333',
        backgroundColor: '#f9f9f9',
        paddingLeft: '11px',
        paddingRight: '11px',
        paddingTop: '6px',
        paddingBottom: '6px',
        fontFamily: 'Courier',
        fontSize: '18px',
        borderColor: '#ecf0f1',
        maxLength: 12,
      });

      const submitButton = this.add
        .text(400, 375, 'Add to score board', {
          font: '16px Courier',
          fill: '#222222',
        })
        .setOrigin(0.5)
        .setInteractive();

      // Move the submitButton to the top
      submitButton.setDepth(1);

      const restartButton = this.add
        .text(400, 475, 'Restart Game', {
          font: '16px Courier',
          fill: '#222222',
        })
        .setOrigin(0.5)
        .setInteractive();

      // Move the submitButton to the top
      restartButton.setDepth(1);

      const borderWidth = 4;
      const borderPadding = 10;
      const submitBorder = this.add
        .rectangle(
          submitButton.x,
          submitButton.y,
          submitButton.width + borderPadding * 2,
          submitButton.height + borderPadding * 2,
          0xffffff,
        )
        .setOrigin(0.5);
      submitBorder.setStrokeStyle(borderWidth, 0xffffff);

      const resetBorder = this.add
        .rectangle(
          restartButton.x,
          restartButton.y,
          restartButton.width + borderPadding * 2,
          restartButton.height + borderPadding * 2,
          0xffffff,
        )
        .setOrigin(0.5);
      resetBorder.setStrokeStyle(borderWidth, 0xffffff);

      submitButton.on('pointerdown', async () => {
        const name = nameInput.text;
        const level = dataCtrl.getLevel();
        const score = dataCtrl.getScore();
        try {
          await dataCtrl.submitStatistics(name, level, score);
        } catch (error) {
          console.error(error);
        } finally {
          this.scene.start('LeaderBoardScene');
        }
      });

      restartButton.on('pointerdown', async () => {
        triggerGameOver();
        this.scene.restart('GameScene');
      });
    }
  }

  class LeaderBoardScene extends Phaser.Scene {
    leaderboard = {};
    rowsYStart = 75;

    constructor() {
      super({ key: 'LeaderBoardScene' });
    }

    preload() {
      this.load.setBaseURL(window.location.origin);
      cursors = uiCtrl.setupCursorKeys(this);
    }

    async create() {
      console.log(this);

      const overlay = this.add
        .rectangle(
          0,
          0,
          this.cameras.main.width,
          this.cameras.main.height,
          0x000000,
        )
        .setOrigin(0, 0);
      overlay.alpha = 0.7;
      try {
        this.leaderboard = await dataCtrl.getLeaderboard();
      } catch (error) {
        console.error(error);
      }

      // Display the leaderboard
      const leaderboardTitle = this.add
        .text(400, 50, 'Leader Board', { font: '32px Courier', fill: '#fff' })
        .setOrigin(0.5);

      this.add.text(260, this.rowsYStart, `Name:`, {
        font: '20px Courier',
        fill: '#fff',
      });
      this.add.text(460, this.rowsYStart, `Level:`, {
        font: '20px Courier',
        fill: '#fff',
      });
      this.add.text(560, this.rowsYStart, `Score:`, {
        font: '20px Courier',
        fill: '#fff',
      });

      const restart = this.add
        .text(400, 550, 'Restart Game', {
          font: '32px Courier',
          fill: '#222222',
        })
        .setOrigin(0.5)
        .setInteractive();

      // Move the restart to the top

      restart.setDepth(1);

      const borderWidth = 4;
      const borderPadding = 10;
      const border = this.add
        .rectangle(
          restart.x,
          restart.y,
          restart.width + borderPadding * 2,
          restart.height + borderPadding * 2,
          0xffffff,
        )
        .setOrigin(0.5);
      border.setStrokeStyle(borderWidth, 0xffffff);

      restart.on('pointerdown', () => {
        this.scene.start('StartScene');
      });

      if (this.leaderboard?.data?.length) {
        for (let i = 0; i < this.leaderboard?.data?.length; i++) {
          const entry = this.leaderboard.data[i];
          this.rowsYStart = this.rowsYStart + 25;
          this.add.text(220, this.rowsYStart, `${i + 1}.`, {
            font: '20px Courier',
            fill: '#fff',
          });
          this.add.text(260, this.rowsYStart, `${entry.name}`, {
            font: '20px Courier',
            fill: '#fff',
          });
          this.add.text(460, this.rowsYStart, `${entry.level}`, {
            font: '20px Courier',
            fill: '#fff',
          });
          this.add.text(560, this.rowsYStart, `${entry.score}`, {
            font: '20px Courier',
            fill: '#fff',
          });
        }
      }
    }
  }

  const config = {
    type: Phaser.AUTO,
    parent: 'little-lebowski-game',
    title: 'The Little Lebowski',
    width: 800,
    height: 600,
    dom: {
      createContainer: true,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false,
      },
    },
    scene: [StartScene, GameScene, GameOverScene, LeaderBoardScene],
  };

  const littleLebowski = new Phaser.Game(config);

  function triggerGameOver(player, bombs) {
    gameOver = true;
    game.scene.start('GameOverScene');
    return gameOver;
  }

  return { game, config };
})(uiController, dataController);
