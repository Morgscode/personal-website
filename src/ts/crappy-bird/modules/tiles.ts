import { type CrappyBirdScene } from '../Scenes';
import { birdCollides } from './bird';

/**
 * Generates some inital tiles. Used from the start of the game
 */
export function setupTiles(
  tiles: Phaser.Physics.Arcade.StaticGroup[],
  scene: CrappyBirdScene,
  tileY: number,
  tileKey: string,
) {
  tiles.push(scene.physics.add.staticGroup());

  for (let i = 0; i < 120; i++) {
    const x = i * 70;
    tiles[0].create(x, tileY, tileKey).setDepth(2);
  }

  scene.physics.add.collider(
    tiles[0],
    scene.bird,
    birdCollides as unknown as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
    () => true,
    scene,
  );

  return tiles;
}

/**
 * Handles progressive tile generation
 */
export function handleTileGeneration(
  scene: CrappyBirdScene,
  finalTile: Phaser.Physics.Arcade.Sprite,
  tiles: Phaser.Physics.Arcade.StaticGroup[],
  tileY: number,
  tileKey: string,
) {
  if (scene.bird.x > finalTile.x - 700 === false) return tiles;

  tiles.push(scene.physics.add.staticGroup());
  // create new tiles
  for (let i = 0; i < 120; i++) {
    const x = finalTile.x + i * 70;

    tiles[tiles.length - 1].create(x, tileY, tileKey).setDepth(2);
  }

  scene.physics.add.collider(
    tiles[tiles.length - 1],
    scene.bird,
    birdCollides as unknown as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
    () => true,
    scene,
  );

  return tiles;
}

/**
 * Removes the first tile physics group when there is more than two
 */
export function handleTileCleanup(tiles: Phaser.Physics.Arcade.StaticGroup[]) {
  if (tiles.length > 2) {
    // destroy first group
    tiles[0].clear(true, true);
    // filter the array
    tiles = tiles.filter((tiles) => tiles.children.entries.length);
  }
  return tiles;
}
