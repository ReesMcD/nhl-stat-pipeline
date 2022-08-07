import {Kafka} from "kafkajs";

export const config = {
  host: "localhost",
  port: "9092",
  clientId: "nhl-stat-pipeline"
};

export const kafka = new Kafka({
  brokers: [`${config.host}:9092`],
  clientId: "clientId",
});