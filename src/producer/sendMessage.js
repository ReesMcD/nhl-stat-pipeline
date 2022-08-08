import producer from "./producer.js";
import config from "../config/config.js";

const scheduleTopic = config.topics.schedule;

const createMessage = () => ({
  key: `key`,
  value: `value`,
});

export default () => {
  return producer
    .send({
      topic: scheduleTopic,
      messages: [createMessage()],
    })
    .then(console.log)
    .catch((e) => console.error(`[${config.clientId}/producer] ${e.message}`, e));
};
