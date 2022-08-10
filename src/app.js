import getNHLDailySchedule from "./client/getNHLDailySchedule.js";

const run = async () => {
  const resp = await getNHLDailySchedule();
  console.log(resp);
};

run();
