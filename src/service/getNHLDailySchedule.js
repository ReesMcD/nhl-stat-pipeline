import axios from "axios";
import config from "../config/config.js";

export default async () => {
  const resp = await axios.get(`${config.nhlApi}/v1/schedule?date=2021-10-12`);
  return resp.data;
};
