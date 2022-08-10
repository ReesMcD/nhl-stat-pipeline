import axios from "axios";
import config from "../config/config.js";

export default async (gameId) => {
  const resp = await axios.get(`${config.nhlApi}/v1/game/${gameId}/feed/live`);
  return resp.data;
};
