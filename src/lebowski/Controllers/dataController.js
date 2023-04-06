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
  setupGameScore() {
    return window.localStorage.setItem('gameScore', 0);
  },
  increaseGameScore() {
    let score = parseInt(window.localStorage.getItem('gameScore'), 10);
    score += 10;
    return window.localStorage.setItem('gameScore', score);
  },
  getGameScore() {
    return parseInt(window.localStorage.getItem('gameScore'));
  },
};

export const levelState = {
  setupGameLevel() {
    return window.localStorage.setItem('gameLevel', 1);
  },
  incrementGameLevel() {
    let level = parseInt(window.localStorage.getItem('gameLevel'), 10);
    level++;
    return window.localStorage.setItem('gameLevel', level);
  },
  getGameLevel() {
    return window.localStorage.getItem('gameLevel');
  },
};

export async function getLeaderboard() {
  const res = await fetch(
    `${window.location.origin}/.netlify/functions/leaderboard`
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
      }
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
