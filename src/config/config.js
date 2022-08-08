export default {
  host: "localhost",
  port: "9092",
  clientId: "nhl-stat-pipeline",
  groupdId: "nhl-group",
  topics: {
    schedule: "schedule",
    stats: "stats",
  }
};
