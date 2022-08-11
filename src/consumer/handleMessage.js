import schedule from "node-schedule";
import scheduleGame from "../producer/scheduleGame.js";
import getLiveBoxscore from "../service/getLiveBoxscore.js";

import config from "../config/config.js";

const statTopic = config.topics.stats;
const scheduleTopic = config.topics.schedule;

export default async ({ topic, partition, message }) => {
  if (topic === scheduleTopic) {
    const gameStart = new Date(message.value);
    scheduleGame(message.key, gameStart);
  }

  if (topic === statTopic) {
    schedule.scheduleJob("*/1 * * * * *", async () => {
      const data = await getLiveBoxscore(message.value);
      // TODO: Clean data and save to db
      const status = data.gameData.status;
      const boxscore = data.liveData.boxscore;
      const players = data.gameData.players
      console.log(status);
      // TODO: End job when game ends
    });
  }
};
