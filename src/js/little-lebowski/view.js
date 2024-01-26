'use strict';

import { Input, Math as PhaserMath } from 'phaser';
import { gameState, playerJumpState } from './model';

export const gameSetup = {
  loadAssets(scene) {
    scene.load.image('sky', './assets/img/sky.png');
    scene.load.image('ground', './assets/img/platform.png');
    scene.load.image('star', './assets/img/star.png');
    scene.load.image('bomb', './assets/img/bomb.png');
    scene.load.image('kaboom', './assets/img/explosion.png');
    scene.load.spritesheet('dude', './assets/img/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
    scene.load.audio('kaboom', './assets/sounds/explosion.mp3');
    scene.load.audio('coin-pickup', './assets/sounds/coin-pickup.mp3');
    scene.load.audio('jump-1', './assets/sounds/jump-1.mp3');
    scene.load.audio('jump-2', './assets/sounds/jump-2.mp3');
    scene.load.audio('intro', './assets/sounds/intro.mp3');
    scene.load.audio('level-up', './assets/sounds/level-up.mp3');
    return scene;
  },
  renderSky(scene) {
    scene.add.image(0, 0, 'sky').setOrigin(0, 0);
    return scene;
  },
  renderPlatforms(scene) {
    const platforms = scene.physics.add.staticGroup();
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
  renderBombs(scene) {
    const bombs = scene.physics.add.group();
    return bombs;
  },
  bindCursorKeys(scene) {
    const cursors = scene.input.keyboard.createCursorKeys();
    return cursors;
  },
  bindMobileControls(scene) {
    playerJumpState.clearMobileJumpState();
    const up = document.querySelector('button#arrow-up');
    const left = document.querySelector('button#arrow-left');
    const right = document.querySelector('button#arrow-right');

    up.addEventListener('touchstart', (event) => {
      playerJumpState.handleMobileDoubleJumpState(event.timeStamp);
      gameState.cursors.up.isDown = true;
    });
    up.addEventListener('touchend', () => {
      gameState.cursors.up.isDown = false;
    });

    left.addEventListener('touchstart', () => {
      gameState.cursors.left.isDown = true;
    });
    left.addEventListener('touchend', () => {
      gameState.cursors.left.isDown = false;
    });

    right.addEventListener('touchstart', () => {
      gameState.cursors.right.isDown = true;
    });
    right.addEventListener('touchend', () => {
      gameState.cursors.right.isDown = false;
    });
  },
  renderScoreBoardText(scene, score) {
    const scoreText = scene.add.text(16, 16, `Score: ${score}`, {
      fontSize: `32px`,
      fontFamily: 'Courier',
      fill: `#303030`,
    });
    return scoreText;
  },
  renderLevelText(scene, level) {
    const levelText = scene.add.text(600, 16, `Level: ${level}`, {
      fontSize: `32px`,
      fontFamily: 'Courier',
      fill: `#303030`,
    });
    return levelText;
  },
};

export const starSetup = {
  renderStarGroup(scene, xVal, yVal, stepXVal) {
    const stars = scene.physics.add.group({
      key: 'star',
      repeat: 5,
      setXY: { x: xVal, y: yVal, stepX: stepXVal },
    });
    stars.children.iterate(function (child) {
      child.setBounceY(PhaserMath.FloatBetween(0.6, 1));
    });
    return stars;
  },
  setupStarPlatformCollision(scene, stars, platforms) {
    scene.physics.add.collider(stars, platforms);
    return scene;
  },
  starCollected(player, star) {
    this.sound.play('coin-pickup');
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
  renderBomb(scene) {
    const bomb = scene.physics.add.sprite(400, 300, 'bomb');
    return bomb;
  },
  spawnBomb(bombs, xCord) {
    const bomb = bombs.create(xCord, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(PhaserMath.Between(-200, 200), 20);
    return bomb;
  },
  setupBombPlatformCollision(scene, bomb, platforms) {
    scene.physics.add.collider(bomb, platforms);
    return scene;
  },
};

export const playerSetup = {
  renderPlayer(scene) {
    const player = scene.physics.add.sprite(50, 545, 'dude');
    return player;
  },
  setupPlayerPhysics(player) {
    player.setBounce(0.2);
    player.body.setGravity(0, 300);
    player.setCollideWorldBounds(true);
    return player;
  },
  setupPlayerAnimations(scene) {
    scene.anims.create({
      key: 'left',
      frames: scene.anims.generateFrameNumbers('dude', {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 10,
    });

    scene.anims.create({
      key: 'right',
      frames: scene.anims.generateFrameNumbers('dude', {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
    return scene;
  },
  handlePlayerMovement(player, cursors, scene) {
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
      scene.sound.play('jump-1');
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
      (Input.Keyboard.DownDuration(cursors.up, 500) ||
        playerJumpState.getMobileDoubleJump()) &&
      !player.body.touching.down &&
      jumpCount == 1 &&
      player.body.velocity.y < 30 &&
      player.body.velocity.y > -100
    ) {
      scene.sound.play('jump-2');
      player.setVelocityY(-325);
      playerJumpState.resetJumpCount();
      playerJumpState.clearMobileJumpState();
    }

    return player;
  },
  setupPlayerPlatformCollision(scene, player, platforms) {
    scene.physics.add.collider(player, platforms);
    return scene;
  },
  setupPlayerBombCollision(scene, player, bombs, hitBomb, gameOver) {
    scene.physics.add.collider(player, bombs, hitBomb, gameOver, scene);
    return scene;
  },
  setupPlayerStarCollection(
    player,
    stars,
    collectStarFn,
    increaseScoreFn,
    scene,
  ) {
    scene.physics.add.overlap(
      player,
      stars,
      collectStarFn,
      increaseScoreFn,
      scene,
    );
    return scene;
  },
  bombHitsPlayer(player, bomb) {
    this.sound.play('kaboom');
    bomb.setTexture('kaboom');
    player.setTint(0xff0000);
    player.anims.play('turn');
    player.angle = 180;
    this.physics.pause();
  },
};
