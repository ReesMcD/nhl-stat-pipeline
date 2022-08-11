import producer from "./producer.js";
import config from "../config/config.js";

const scheduleTopic = config.topics.schedule;

const createMessage = (gameId, gameStart) => ({
  key: gameId,
  value: gameStart,
});

export default async (gameId, gameStart) => {
  try {
    const message = await producer
      .send({
        topic: scheduleTopic,
        messages: [createMessage(gameId, gameStart)],
      });
    return console.log(message);
  } catch (e) {
    return console.error(`[${config.clientId}/producer] ${e.message}`, e);
  }
};
