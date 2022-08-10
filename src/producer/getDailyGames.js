import getNHLDailySchedule from "../service/getNHLDailySchedule.js";

export default async () => {
  const gameArr = [];
  const schedule = await getNHLDailySchedule();
  const games = schedule.dates[0].games;

  games.forEach((game) => {
    gameArr.push({ gameId: game.gamePk+"", gameStart: game.gameDate });
  });

  return gameArr;
};
