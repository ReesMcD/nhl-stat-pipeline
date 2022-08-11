import consumer from "./consumer.js";
import config from "../config/config.js";
import handleMessage from "./handleMessage.js";

const scheduleTopic = config.topics.schedule;
const statTopic = config.topics.stats;

export default async () => {
  console.log("Starting Consumer");

  await consumer.connect();
  await consumer.subscribe({ topics: [scheduleTopic, statTopic] });
  await consumer.run({
    eachMessage: (message) => handleMessage(message),
  });
};
