import schedule from "node-schedule";
import scheduleGame from "../producer/scheduleGame.js";
import getLiveBoxscore from "../client/getLiveBoxscore.js";

import config from "../config/config.js";

const statTopic = config.topics.stats;
const scheduleTopic = config.topics.schedule;

export default async ({ topic, partition, message }) => {
  console.log(`${message.key} - ${message.value}`);
  if (topic === scheduleTopic) {
    scheduleGame(message.value);
  } 

  if (topic === statTopic) {
      schedule.scheduleJob("*/1 * * * * *", () => {
            const data = getLiveBoxscore();
            console.log(data);
      });
  } 
};
