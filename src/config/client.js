import { Kafka } from "kafkajs";
import config from "./config.js";

export default new Kafka({
  brokers: [`${config.host}:${config.port}`],
  clientId: `${config.clientId}`,
});
