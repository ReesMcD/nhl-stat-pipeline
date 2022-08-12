import axios from "axios";

import getLiveBoxscore from "../../service/getLiveBoxscore.js";
import config from "../../config/config.js";

jest.mock("axios");

describe("getLiveBoxscore", () => {
  describe("when API call is successful", () => {
    it("should return users list", async () => {
      const gameId = 1;
      const resp = {
        data: {
            boxscore: "1-0"
        }
      };
      axios.get.mockResolvedValueOnce(resp);

      const result = await getLiveBoxscore(gameId);

      expect(axios.get).toHaveBeenCalledWith(
        `${config.nhlApi}/v1/game/${gameId}/feed/live/diffPatch?startTimecode=20211012_000000`
      );
      expect(result).toEqual(resp.data);
    });
  });
});
