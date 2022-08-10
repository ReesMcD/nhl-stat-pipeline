import consumer from "./consumer.js";
import config from "../config/config.js";
import handleMessage from "./handleMessage.js";

const scheduleTopic = config.topics.schedule;
const statTopic = config.topics.stats;

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topics: [scheduleTopic, statTopic] });
  await consumer.run({
    eachMessage: (message) => handleMessage(message),
  });
};

run().catch((e) =>
  console.error(`[${config.clientId}/consumer] ${e.message}`, e)
);

const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

errorTypes.forEach((type) => {
  process.on(type, async (e) => {
    try {
      console.log(`process.on ${type}`);
      console.error(e);
      await consumer.disconnect();
      process.exit(0);
    } catch (_) {
      process.exit(1);
    }
  });
});

signalTraps.forEach((type) => {
  process.once(type, async () => {
    try {
      await consumer.disconnect();
    } finally {
      process.kill(process.pid, type);
    }
  });
});
