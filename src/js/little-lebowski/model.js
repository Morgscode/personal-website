export const gameState = {
  gameOver: false,
  cursors: null,
  player: null,
  bombs: [],
  platforms: [],
  stars: [],
  levelText: '1',
  scoreText: '0',
  activeStarGroups: 0,
};

export const playerJumpState = {
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

export const scoreState = {
  setupScore() {
    return window.localStorage.setItem('gameScore', 0);
  },
  increaseScore() {
    let score = parseInt(window.localStorage.getItem('gameScore'), 10);
    score += 10;
    return window.localStorage.setItem('gameScore', score);
  },
  getScore() {
    return parseInt(window.localStorage.getItem('gameScore'));
  },
};

export const levelState = {
  setupLevel() {
    return window.localStorage.setItem('gameLevel', 1);
  },
  incrementLevel() {
    let level = parseInt(window.localStorage.getItem('gameLevel'), 10);
    level++;
    return window.localStorage.setItem('gameLevel', level);
  },
  getLevel() {
    return window.localStorage.getItem('gameLevel');
  },
};

export async function getLeaderboard() {
  const res = await fetch(
    `${window.location.origin}/.netlify/functions/leaderboard`,
  );
  const { data, count } = await res.json();
  return { data: data.data, count };
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
