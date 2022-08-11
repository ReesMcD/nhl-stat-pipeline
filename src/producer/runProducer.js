import producer from "./producer.js";
import sendMessage from "./sendMessage.js";
import getDailyGames from "./getDailyGames.js";
import config from "../config/config.js";
import schedule from "node-schedule";

export default async () => {
  console.log("Starting Producer");
  await producer.connect();

  schedule.scheduleJob("*/30 * * * * *", async () => {
    const games = await getDailyGames();
    games.forEach((game) => {
      sendMessage(game.gameId, game.gameStart);
    });
  });
};
