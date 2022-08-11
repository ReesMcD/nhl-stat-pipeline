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
    games.forEach ((game) => {
      sendMessage(game.gameId, game.gameStart);
    })
  });
};

// run().catch((e) =>
//   console.error(`[${config.clientId}/producer/schedule] ${e.message}`, e)
// );

// const errorTypes = ["unhandledRejection", "uncaughtException"];
// const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

// errorTypes.forEach((type) => {
//   process.on(type, async () => {
//     try {
//       console.log(`process.on ${type}`);
//       await producer.disconnect();
//       process.exit(0);
//     } catch (_) {
//       process.exit(1);
//     }
//   });
// });

// signalTraps.forEach((type) => {
//   process.once(type, async () => {
//     try {
//       await producer.disconnect();
//     } finally {
//       process.kill(process.pid, type);
//     }
//   });
// });
