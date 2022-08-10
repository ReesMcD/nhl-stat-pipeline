import producer from "./producer.js";
import config from "../config/config.js";

const scheduleTopic = config.topics.schedule;

const createMessage = (gameStart) => ({
  key: `Schedule`,
  value: gameStart,
});

export default (gameStart) => {
  return producer
    .send({
      topic: scheduleTopic,
      messages: [createMessage(gameStart)],
    })
    .then(console.log)
    .catch((e) =>
      console.error(`[${config.clientId}/producer] ${e.message}`, e)
    );
};
