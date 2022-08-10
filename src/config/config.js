export default {
  host: "localhost",
  port: "9092",
  clientId: "nhl-stat-pipeline",
  groupdId: "nhl-group",
  nhlApi: "https://statsapi.web.nhl.com/api",
  topics: {
    schedule: "schedule",
    stats: "stats",
  },
};
