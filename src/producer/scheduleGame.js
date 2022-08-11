import schedule from "node-schedule";
import producer from "./producer.js";
import config from "../config/config.js";

const statTopic = config.topics.stats;

const createMessage = (gameId) => ({
  key: `Game`,
  value: gameId,
});

export default async (gameId, gameStart) => {
  schedule.scheduleJob("*/5 * * * * *", async () => {
    console.log("Job Scheduled");
    await producer.connect();

    producer
      .send({
        topic: statTopic,
        messages: [createMessage(gameId)],
      })
      .catch((e) =>
        console.error(`[${config.clientId}/producer] ${e.message}`, e)
      );
  });
};
