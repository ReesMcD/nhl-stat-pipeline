import runProducer from "./producer/runProducer.js";
import runConsumer from "./consumer/runConsumer.js";
import producer from "./producer/producer.js";
import consumer from "./consumer/consumer.js";
import config from "./config/config.js";


const run = async () => {
  runProducer().catch((e) =>
    console.error(`[${config.clientId}/producer/schedule] ${e.message}`, e)
  );
  runConsumer().catch((e) =>
    console.error(`[${config.clientId}/consumer] ${e.message}`, e)
  );
};

run().catch(() => {
  console.error("Big Error")
});

const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

errorTypes.forEach((type) => {
  process.on(type, async () => {
    try {
      console.log(`process.on ${type}`);
      await producer.disconnect();
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
      await producer.disconnect();
      await consumer.disconnect();
    } finally {
      process.kill(process.pid, type);
    }
  });
});
