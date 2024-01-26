export let gameState = {
  gameOver: false,
  cursors: null,
  joyStick: null,
  player: null,
  bombs: [],
  platforms: [],
  stars: [],
  levelText: '1',
  scoreText: '0',
  activeStarGroups: 0,
};

const initalGameState = JSON.parse(JSON.stringify(gameState));

export function resetGameState() {
  gameState = JSON.parse(JSON.stringify(initalGameState));
}

export const playerJumpState = {
  setupJumpCount() {
    return window.sessionStorage.setItem('jumpCount', 0);
  },
  setJumpCount() {
    return window.sessionStorage.setItem('jumpCount', 1);
  },
  resetJumpCount() {
    return window.sessionStorage.setItem('jumpCount', 0);
  },
  getJumpCount() {
    return window.sessionStorage.getItem('jumpCount');
  },
  handleMobileDoubleJumpState(timestamp) {
    const prevTimestamp = window.sessionStorage.getItem('jumpTimeStamp');
    if (prevTimestamp) {
      const downDuration = timestamp - prevTimestamp;
      const isValidDoubleJump =
        window.sessionStorage.getItem('jumpCount') == 1 && downDuration <= 500;

      if (isValidDoubleJump) {
        return window.sessionStorage.setItem('mobileDoubleJump', true);
      }

      return window.sessionStorage.setItem('jumpTimeStamp', timestamp ?? false);
    } else {
      return window.sessionStorage.setItem('jumpTimeStamp', timestamp ?? false);
    }
  },
  getMobileDoubleJump() {
    return window.sessionStorage.getItem('mobileDoubleJump');
  },
  clearMobileJumpState() {
    window.sessionStorage.removeItem('jumpTimeStamp');
    window.sessionStorage.removeItem('mobileDoubleJump');
  },
};

export const scoreState = {
  setupScore() {
    return window.sessionStorage.setItem('gameScore', 0);
  },
  increaseScore() {
    let score = parseInt(window.sessionStorage.getItem('gameScore'), 10);
    score += 20;
    return window.sessionStorage.setItem('gameScore', score);
  },
  getScore() {
    return parseInt(window.sessionStorage.getItem('gameScore'));
  },
};

export const levelState = {
  setupLevel() {
    return window.sessionStorage.setItem('gameLevel', 1);
  },
  incrementLevel() {
    let level = parseInt(window.sessionStorage.getItem('gameLevel'), 10);
    level++;
    return window.sessionStorage.setItem('gameLevel', level);
  },
  getLevel() {
    return window.sessionStorage.getItem('gameLevel');
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
