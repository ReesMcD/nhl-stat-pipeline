import axios from "axios";

import getDailyGames from "../../producer/getDailyGames.js";

jest.mock("axios");

describe("getDailyGames", () => {
  describe("when todays games are needed", () => {
    it("should get schdule from the service and make a list of game starts", async () => {
      const resp = {
        data: {
          dates: [
            {
              games: [
                { gamePk: "1", gameDate: "8/11/2022 5pm" },
                { gamePk: "2", gameDate: "8/11/2022 7pm" },
              ],
            },
          ],
        },
      };
      axios.get.mockResolvedValueOnce(resp);

      const result = await getDailyGames();

      expect(result.length).toBe(2);
      expect(result[0].gameId).toEqual("1");
      expect(result[0].gameStart).toEqual("8/11/2022 5pm");
    });
  });
});
