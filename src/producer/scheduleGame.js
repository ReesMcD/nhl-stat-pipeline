import schedule from "node-schedule";
import producer from "./producer.js";
import config from "../config/config.js";

const statTopic = config.topics.stats;

const createMessage = () => ({
  key: `Game`,
  value: "Stats",
});

export default async (gameStart) => {
  schedule.scheduleJob(gameStart, async () => {
    await producer.connect();

    producer
      .send({
        topic: statTopic,
        messages: [createMessage()],
      })
      .catch((e) =>
        console.error(`[${config.clientId}/producer] ${e.message}`, e)
      );
  });
};
