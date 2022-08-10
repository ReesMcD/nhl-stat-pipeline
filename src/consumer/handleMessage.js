import schedule from "node-schedule";
import scheduleGame from "../producer/scheduleGame.js";
import getLiveBoxscore from "../service/getLiveBoxscore.js.js";

import config from "../config/config.js";

const statTopic = config.topics.stats;
const scheduleTopic = config.topics.schedule;

export default async ({ topic, partition, message }) => {
  if (topic === scheduleTopic) {
    scheduleGame(message.value);
  }

  if (topic === statTopic) {
    // TODO: Get live stats and save to db
    schedule.scheduleJob("*/1 * * * * *", () => {
      const data = getLiveBoxscore(message.value);
      console.log(data);
    });
  }
};
