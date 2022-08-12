export default (players, boxscore) => {
  const away = Object.entries(boxscore.teams.away.players);
  const home = Object.entries(boxscore.teams.home.players);
  const statMap = new Map([...away, ...home]);

  const playerMap = new Map();
  for (const [key, player] of Object.entries(players)) {
    const playerStats = {
      name: player.fullName,
      teamId: player.currentTeam.id,
      teamName: player.currentTeam.name,
      age: player.currentAge,
      number: player.primaryNumber,
      position: player.primaryPosition.name,
    };

    const statObj = statMap.get(key).stats;
    
    if (isNull(statObj)) {
      playerMap.set(player.id, playerStats);
    } else {
      const stats = statMap.get(key).stats.skaterStats
        ? statMap.get(key).stats.skaterStats
        : statMap.get(key).stats.goalieStats;

      playerMap.set(player.id, {
        ...playerStats,
        stats: {
          assits: stats.assists,
          goals: stats.goals,
          hits: stats.hits,
          points: stats.assists + stats.goals,
          penaltyMinutes: stats.penaltyMinutes,
        },
      });
    }
  }

  return playerMap;
};

const isNull = (obj) => {
  return (
    (obj && Object.keys(obj).length === 0 && obj.constructor === Object) ||
    obj === undefined
  );
};
