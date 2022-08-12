import schedule from "node-schedule";
import scheduleGame from "../producer/scheduleGame.js";
import getLiveBoxscore from "../service/getLiveBoxscore.js";
import mapPlayerStats from "../util/mapPlayerStats.js";
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
      const status = data.gameData.status; // TODO: End job when game ends

      const playerData = mapPlayerStats(
        data.gameData.players,
        data.liveData.boxscore
      ); // TODO: Save to DB

      console.log(status);
      console.log(playerData);
    });
  }
};
