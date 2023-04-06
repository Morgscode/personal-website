import { StartScene } from "./Scenes/StartScene";
import { GameScene } from "./Scenes/GameScene";
import { GameOverScene } from './Scenes/GameOverScene';
import { LeaderBoardScene } from "./Scenes/LeaderBoardScene";


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

  function triggerGameOver(player, bombs) {
    gameOver = true;
    game.scene.start('GameOverScene');
    return gameOver;
  }