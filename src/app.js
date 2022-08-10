import getDailyGames from "./producer/getDailyGames.js";

const run = async () => {
  const resp = await getDailyGames();
  console.log(resp);
};

run();
