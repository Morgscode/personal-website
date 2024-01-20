'use strict';

import { Math as PhaserMath } from 'phaser';
import { playerJumpState } from './model';

export const gameSetup = {
  loadAssets(gameObject) {
    gameObject.load.image('sky', './assets/img/sky.png');
    gameObject.load.image('ground', './assets/img/platform.png');
    gameObject.load.image('star', './assets/img/star.png');
    gameObject.load.image('bomb', './assets/img/bomb.png');
    gameObject.load.spritesheet('dude', './assets/img/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
    return gameObject;
  },
  renderSky(gameObject) {
    gameObject.add.image(0, 0, 'sky').setOrigin(0, 0);
    return gameObject;
  },
  renderPlatforms(gameObject) {
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
  renderBombs(gameObject) {
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
  renderLevelText(gameObject, level) {
    const levelText = gameObject.add.text(600, 16, `Level: ${level}`, {
      fontSize: `32px`,
      fontFamily: 'Courier',
      fill: `#303030`,
    });
    return levelText;
  },
};

export const starSetup = {
  renderStarGroup(gameObject, xVal, yVal, stepXVal) {
    const stars = gameObject.physics.add.group({
      key: 'star',
      repeat: 10,
      setXY: { x: xVal, y: yVal, stepX: stepXVal },
    });
    stars.children.iterate(function (child) {
      child.setBounceY(PhaserMath.FloatBetween(0.6, 1));
    });
    return stars;
  },
  setupStarPlatformCollision(gameObject, stars, platforms) {
    gameObject.physics.add.collider(stars, platforms);
    return gameObject;
  },
  starCollected(player, star) {
    star.disableBody(true, true);
  },
  renderRandomStarGroup(stars) {
    stars.children.iterate((child) => {
      const yVal = PhaserMath.Between(0, 500);
      child.enableBody(true, child.x, yVal, true, true);
    });
    return stars;
  },
};

export const bombSetup = {
  renderBomb(gameObject) {
    const bomb = gameObject.physics.add.sprite(400, 300, 'bomb');
    return bomb;
  },
  spawnBomb(bombs, xCord) {
    const bomb = bombs.create(xCord, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(PhaserMath.Between(-200, 200), 20);
    return bomb;
  },
  setupBombPlatformCollision(gameObject, bomb, platforms) {
    gameObject.physics.add.collider(bomb, platforms);
    return gameObject;
  },
};

export const playerSetup = {
  renderPlayer(gameObject) {
    const player = gameObject.physics.add.sprite(50, 545, 'dude');
    return player;
  },
  setupPlayerPhysics(player) {
    player.setBounce(0.2);
    player.body.setGravity(0, 300);
    player.setCollideWorldBounds(true);
    return player;
  },
  setupPlayerAnimations(gameObject) {
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
  handlePlayerMovement(player, cursors) {
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
      playerJumpState.setJumpCount();
    }

    // double jump
    const jumpCount = playerJumpState.getJumpCount();
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
      playerJumpState.resetJumpCount();
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
