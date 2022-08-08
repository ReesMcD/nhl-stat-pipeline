import admin from "./admin.js";
import config from "../config/config.js";

try {
  await admin.connect();
  await admin.createTopics({
    waitForLeaders: true,
    topics: [
      { topic: `${config.topics.schedule}` },
      { topic: `${config.topics.stats}` },
    ],
  });
} catch (err) {
  console.error(err);
} finally {
  await admin.disconnect();
}