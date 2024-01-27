export let gameState = {
  gameOver: false,
  cursors: null,
  player: null,
  bombs: [],
  platforms: [],
  stars: [],
  score: 0,
  level: 0,
  levelText: null,
  scoreText: null,
  activeStarGroups: 0,
  jumpCount: 0,
  jumpTimeStamp: null,
  canDoubleJumpMobile: false,
};

const initalGameState = JSON.parse(JSON.stringify(gameState));

export function resetGameState() {
  gameState = JSON.parse(JSON.stringify(initalGameState));
}

export const playerJumpState = {
  setupJumpCount() {
    return (gameState.jumpCount = 0);
  },
  setJumpCount() {
    return (gameState.jumpCount = 1);
  },
  resetJumpCount() {
    return (gameState.jumpCount = 0);
  },
  getJumpCount() {
    return gameState.jumpCount;
  },
  handleMobileDoubleJumpState(timestamp) {
    const prevTimestamp = gameState.jumpCount;
    if (prevTimestamp) {
      const downDuration = timestamp - prevTimestamp;
      const isValidDoubleJump = gameState.jumpCount == 1 && downDuration <= 500;

      if (isValidDoubleJump) {
        return (gameState.canDoubleJumpMobile = true);
      }
      return (gameState.jumpTimeStamp = timestamp);
    } else {
      return (gameState.jumpTimeStamp = timestamp);
    }
  },
  getMobileDoubleJump() {
    return gameState.canDoubleJumpMobile;
  },
  clearMobileJumpState() {
    gameState.jumpTimeStamp = null;
    gameState.canDoubleJumpMobile = false;
  },
};

export const scoreState = {
  setupScore() {
    return (gameState.score = 0);
  },
  increaseScore() {
    let score = gameState.score;
    score += 20;
    return (gameState.score = score);
  },
  getScore() {
    return gameState.score;
  },
};

export const levelState = {
  setupLevel() {
    return (gameState.level = 1);
  },
  incrementLevel() {
    let level = gameState.level;
    level++;
    return (gameState.level = level);
  },
  getLevel() {
    return gameState.level;
  },
};

export async function getLeaderboard() {
  try {
    const res = await fetch(
      `${window.location.origin}/.netlify/functions/leaderboard`,
    );
    const { data, count } = await res.json();
    return { data: data.data, count };
  } catch {
    return false;
  }
}

export async function submitStatistics(name, level, score) {
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
