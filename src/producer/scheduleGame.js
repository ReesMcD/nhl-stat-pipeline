import schedule from "node-schedule";
import producer from "./producer.js";
import config from "../config/config.js";

const statTopic = config.topics.stats;

const createMessage = (gameId) => ({
  key: `Game`,
  value: gameId,
});

export default async (gameId, gameStart) => {
  // NOTE: Should use gameStart but using every 10 seconds for testing
  console.log(gameStart)
  schedule.scheduleJob("*/10 * * * * *", async () => {
    await producer.connect();

    producer
      .send({
        topic: statTopic,
        messages: [createMessage(gameId)],
      })
      .catch((e) =>
        console.error(`[${config.clientId}/producer/stats] ${e.message}`, e)
      );
  });
};
