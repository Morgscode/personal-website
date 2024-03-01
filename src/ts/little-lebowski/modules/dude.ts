import { Scene, Input, GameObjects, Game } from 'phaser';
import { type GameState, playerJumpState } from './state';

export function renderPlayer(scene: Scene) {
  const player = scene.physics.add.sprite(50, 545, 'dude');
  return player;
}

export function setupPlayerPhysics(
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
) {
  player.setBounce(0.2);
  player.body.setGravity(0, 300);
  player.setCollideWorldBounds(true);
  return player;
}

export function setupPlayerAnimations(scene: Scene) {
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
}

export function handlePlayerMovement(
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  cursors: Phaser.Types.Input.Keyboard.CursorKeys,
  scene: Scene,
) {
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
    playerJumpState.resetMobileJumpState();
  }

  return player;
}

export function setupPlayerPlatformCollision(
  scene: Scene,
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  platforms: Phaser.Physics.Arcade.StaticGroup,
) {
  scene.physics.add.collider(player, platforms);
  return scene;
}

export function setupPlayerBombCollision(
  scene: Scene,
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  bombs: Phaser.Physics.Arcade.Group,
  hitBomb: Function,
  gameOver: (game: Game, state: GameState) => void,
) {
  scene.physics.add.collider(player, bombs, hitBomb, gameOver, scene);
  return scene;
}

export function setupPlayerStarCollection(
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  stars: Phaser.Physics.Arcade.Group[],
  collectStarFn: Function,
  increaseScoreFn: () => void,
  scene: Scene,
) {
  scene.physics.add.overlap(
    player,
    stars,
    collectStarFn,
    increaseScoreFn,
    scene,
  );
  return scene;
}

export function bombHitsPlayer(player, bomb) {
  this.sound.play('kaboom');
  bomb.setTexture('kaboom');
  player.setTint(0xff0000);
  player.anims.play('turn');
  player.angle = 180;
  this.physics.pause();
}
