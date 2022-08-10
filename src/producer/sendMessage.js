import producer from "./producer.js";
import config from "../config/config.js";

const scheduleTopic = config.topics.schedule;

const createMessage = (gameId, gameStart) => ({
  key: gameId,
  value: gameStart,
});

export default (gameId, gameStart) => {
  return producer
    .send({
      topic: scheduleTopic,
      messages: [createMessage(gameId, gameStart)],
    })
    .then(console.log)
    .catch((e) =>
      console.error(`[${config.clientId}/producer] ${e.message}`, e)
    );
};
