import axios from "axios";

import getNHLDailySchedule from "../../service/getNHLDailySchedule.js";
import config from "../../config/config.js";

jest.mock("axios");

describe("getNHLDailySchedule", () => {
  describe("when API call is successful", () => {
    it("should return data", async () => {
      const gameId = 1;
      const resp = {
        data: {
          players: "The Hound",
        },
      };
      axios.get.mockResolvedValueOnce(resp);

      const result = await getNHLDailySchedule();

      expect(axios.get).toHaveBeenCalledWith(
        `${config.nhlApi}/v1/schedule?date=2021-10-12`
      );
      expect(result).toEqual(resp.data);
    });
  });
});
