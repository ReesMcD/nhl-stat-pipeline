import producer from "./producer.js";
import sendMessage from "./sendMessage.js";
import config from "../config/config.js";

const run = async () => {
  await producer.connect();
  setInterval(sendMessage, 1000);
};

run().catch((e) => console.error(`[${config.clientId}/producer] ${e.message}`, e));

const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

errorTypes.forEach((type) => {
  process.on(type, async () => {
    try {
      console.log(`process.on ${type}`);
      await producer.disconnect();
      process.exit(0);
    } catch (_) {
      process.exit(1);
    }
  });
});

signalTraps.forEach((type) => {
  process.once(type, async () => {
    try {
      await producer.disconnect();
    } finally {
      process.kill(process.pid, type);
    }
  });
});