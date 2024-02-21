import { type CrappyBirdScene } from '../Scenes';

/**
 * Gnerates some inital tiles. Used from the start of the game
 */
export function setupTiles(
  scene: CrappyBirdScene,
  tileY: number,
  tileKey: string,
) {
  const tiles = [scene.physics.add.staticGroup()];

  for (let i = 0; i < 120; i++) {
    const x = i * 70;
    tiles[0].create(x, tileY, tileKey);
  }

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
  if (scene.bird.x > finalTile.x - 700) {
    tiles.push(scene.physics.add.staticGroup());
    // create new tiles
    for (let i = 0; i < 120; i++) {
      const x = finalTile.x + i * 70;

      tiles[tiles.length ? tiles.length - 1 : 0].create(x, tileY, tileKey);
    }
    // add a colider
    scene.physics.add.collider(scene.bird, tiles);
  }
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
    tiles = tiles.filter((_, index) => index !== 0);
  }
  return tiles;
}
