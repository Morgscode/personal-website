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
    setGameScore() {
      return window.localStorage.setItem('playerOneScore', 0);
    },
    getGameScore() {
      return parseInt(window.localStorage.getItem('playerOneScore'));
    },
  };

  const levelState = {
    setupGameLevel() {
      return window.localStorage.setItem('playerOneLevel', 1);
    },
    incrementGameLevel() {
      let level = parseInt(window.localStorage.getItem('playerOneLevel'), 10);
      level++;
      return window.localStorage.setItem('playerOneLevel', level);
    },
    getGameLevel() {
      return window.localStorage.getItem('playerOneLevel');
    },
  };

  return {
    setJumpCount: playerJumpState.setJumpCount,
    resetJumpCount: playerJumpState.resetJumpCount,
    getJumpCount: playerJumpState.getJumpCount,
    setupPlayerOneScore: scoreState.setGameScore,
    getPlayerOneGameScore: scoreState.getGameScore,
    setupLevel: levelState.setupGameLevel,
    getLevel: levelState.getGameLevel,
    levelUp: levelState.incrementGameLevel,
  };
})();

/**
 * UI Controller (VIEW)
 */
const uiController = (() => {
  const initialSceneSetupFunctions = {
    loadGameAssets(gameObject) {
      gameObject.load.image(
        'sky',
        './dist/resources/little-lebowski/assets/sky.png'
      );
      gameObject.load.image(
        'ground',
        './dist/resources/little-lebowski/assets/platform.png'
      );
      gameObject.load.image(
        'star',
        './dist/resources/little-lebowski/assets/star.png'
      );
      gameObject.load.image(
        'bomb',
        './dist/resources/little-lebowski/assets/bomb.png'
      );
      gameObject.load.spritesheet(
        'dude',
        './dist/resources/little-lebowski/assets/dude.png',
        {
          frameWidth: 32,
          frameHeight: 48,
        }
      );
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
    displayGameTitle(gameObject) {
      const titleCss = {
        font: '16px Courier',
        fill: '#fff',
      };
      gameObject.add.text(
        300,
        15,
        `${gameObject.game.config.gameTitle}`,
        titleCss
      );
      return gameObject;
    },
    bindCursorKeys(gameObject) {
      const cursors = gameObject.input.keyboard.createCursorKeys();
      return cursors;
    },
    renderScoreBoardText(gameObject, score) {
      const scoreText = gameObject.add.text(16, 16, `score: ${score}`, {
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
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      });
      return stars;
    },
    setupPlatformStarsCollision(gameObject, stars, platforms) {
      gameObject.physics.add.collider(stars, platforms);
      return gameObject;
    },
    starCollected(player, star) {
      star.disableBody(true, true);
      let score = parseInt(window.localStorage.getItem('playerOneScore'));
      score += 10;
      return window.localStorage.setItem('playerOneScore', score);
    },
    renderRandomStarGroup(stars) {
      stars.children.iterate((child) => {
        yVal = Phaser.Math.Between(0, 500);
        child.enableBody(true, child.x, yVal, true, true);
      });
      return stars;
    },
  };

  const playerOneSetupFunctions = {
    renderPlayerOne(gameObject) {
      const playerOne = gameObject.physics.add.sprite(50, 545, 'dude');
      return playerOne;
    },
    setPlayerOneInitialPhysics(player) {
      player.setBounce(0.2);
      player.body.setGravity(0, 300);
      player.setCollideWorldBounds(true);
      return player;
    },
    setPlayerOneAnimations(gameObject) {
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
    setupPlayerOneMovement(player, cursors, dataCtrl) {
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
    setupPlayerBombCollision(gameObject, player, bombs, hitBomb) {
      gameObject.physics.add.collider(player, bombs, hitBomb, null, gameObject);
      return gameObject;
    },
    setupPlayerStarCollection(player, stars, collectStarFn, gameObject) {
      gameObject.physics.add.overlap(
        player,
        stars,
        collectStarFn,
        null,
        gameObject
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
    },
    setupBombPlatformCollision(gameObject, bomb, platforms) {
      gameObject.physics.add.collider(bomb, platforms);
      return gameObject;
    },
    setupBombPlayerCollision(gameObject, player, bombs, hitBomb) {
      gameObject.physics.add.collider(player, bombs, hitBomb, null, gameObject);
      return gameObject;
    },
  };

  return {
    loadAssets: initialSceneSetupFunctions.loadGameAssets,
    renderSky: initialSceneSetupFunctions.renderBlueSkyBackground,
    renderPlatforms: initialSceneSetupFunctions.renderScenePlatforms,
    renderBombs: initialSceneSetupFunctions.renderSceneBombs,
    renderStars: starSetupFunctions.renderStarGroup,
    collectStar: starSetupFunctions.starCollected,
    setStarPlatformCollisions: starSetupFunctions.setupPlatformStarsCollision,
    displayTitle: initialSceneSetupFunctions.displayGameTitle,
    setupCursorKeys: initialSceneSetupFunctions.bindCursorKeys,
    renderPlayerOne: playerOneSetupFunctions.renderPlayerOne,
    setPlayerOnePhysics: playerOneSetupFunctions.setPlayerOneInitialPhysics,
    setPlayerOneAnimations: playerOneSetupFunctions.setPlayerOneAnimations,
    setPlayerPlatformCollisions:
      playerOneSetupFunctions.setupPlayerPlatformCollision,
    setPlayerBombCollisions: playerOneSetupFunctions.setupPlayerBombCollision,
    bombHitsPlayer: playerOneSetupFunctions.bombHitsPlayer,
    setPlayerStarCollisions: playerOneSetupFunctions.setupPlayerStarCollection,
    setPlatformBombCollisions: bombSetupFunctions.setupBombPlatformCollision,
    evaluatePlayerOneMovement: playerOneSetupFunctions.setupPlayerOneMovement,
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
  //------- GAME CONFIG
  let game;
  let gameOver = false;
  let cursors;
  let player;
  let bombs;
  let platforms;
  let stars = [];
  let scoreText;
  let activeStarGroups;

  const config = {
    type: Phaser.AUTO,
    parent: 'little-lebowski-game',
    title: 'The Little Lebowski',
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false,
      },
    },
    scene: {
      preload,
      create,
      update,
    },
  };

  let observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };
  let observer = new IntersectionObserver(triggerGame, observerOptions);
  let observerTarget = document.querySelector('#little-lebowski-game');
  observer.observe(observerTarget);

  function triggerGame(entries, observer) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        if (!game) {
          game = new Phaser.Game(config);
        } else {
          game.scene.resume();
        }
      } else {
        if (game) {
          game.scene.pause();
        }
      }
    });
  }

  function triggerGameOver() {
    gameOver = true;
  }

  //----- GAME SCENE FUNCTIONS DEFINITIONS

  function preload() {
    uiCtrl.loadAssets(this);
  }

  function create() {
    dataCtrl.setupPlayerOneScore();
    dataCtrl.setupLevel();
    uiCtrl.renderSky(this);
    platforms = uiCtrl.renderPlatforms(this);
    stars.push(uiCtrl.renderStars(this, 5, 450, 70));
    stars.push(uiCtrl.renderStars(this, 15, 350, 60));
    stars.push(uiCtrl.renderStars(this, 15, 200, 60));
    stars.push(uiCtrl.renderStars(this, 25, 50, 50));
    uiCtrl.setStarPlatformCollisions(this, stars, platforms);
    player = uiCtrl.renderPlayerOne(this);
    uiCtrl.setPlayerOnePhysics(player);
    uiCtrl.setPlayerPlatformCollisions(this, player, platforms);
    uiCtrl.setPlayerOneAnimations(this);
    bombs = uiCtrl.renderBombs(this);
    uiCtrl.setPlatformBombCollisions(this, bombs, platforms);
    uiCtrl.setPlayerBombCollisions(this, player, bombs, uiCtrl.bombHitsPlayer, triggerGameOver);
    cursors = uiCtrl.setupCursorKeys(this);
    uiCtrl.displayTitle(this);
    scoreText = uiCtrl.renderScoreText(this, dataCtrl.getPlayerOneGameScore());
    levelText = uiCtrl.renderLevelText(this, dataCtrl.getLevel());
  }

  function update() {
    uiCtrl.evaluatePlayerOneMovement(player, cursors, dataCtrl);
    uiCtrl.setPlayerStarCollisions(player, stars, uiCtrl.collectStar, this);
    scoreText.setText(`Score: ${dataCtrl.getPlayerOneGameScore()}`);
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
      for (let i = bombs.children.size; i < level; i++)
      {
        let cordBase = level % 2 == 0 ? i * 16 : 300 - i;
        uiCtrl.spawnBomb(bombs, cordBase);
      }
    }
  }
  return { game, config };
})(uiController, dataController);
