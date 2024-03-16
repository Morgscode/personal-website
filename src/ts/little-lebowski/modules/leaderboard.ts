export async function getLeaderboard() {
  try {
    const res = await fetch(
      `${window.location.origin}/.netlify/functions/little-lebowski-leaderboard`,
    );
    const { data, count } = await res.json();
    return { data: data.data, count };
  } catch {
    return false;
  }
}

export async function submitLeaderboardEntry(
  name: string,
  level: number,
  score: number,
) {
  const stats = { name, level, score };
  try {
    const res = await fetch(
      `${window.location.origin}/.netlify/functions/little-lebowski-leaderboard`,
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
    return false;
  }
}
