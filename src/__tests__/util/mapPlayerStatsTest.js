import mapPlayerStats from "../../util/mapPlayerStats.js";

describe("mapPlayerStats", () => {
  test("should map players and boxscore to player stats when happy path", () => {
    const players = {
      ID8471724: {
        id: 8471724,
        fullName: "Kris Letang",
        primaryNumber: "58",
        currentAge: 35,
        currentTeam: {
          id: 5,
          name: "Pittsburgh Penguins",
        },
        primaryPosition: {
          name: "Defenseman",
        },
      },
    };

    const boxscore = {
      teams: {
        home: {
          players: {},
        },
        away: {
          players: {
            ID8471724: {
              stats: {
                skaterStats: {
                  assists: 2,
                  goals: 2,
                  hits: 1,
                  penaltyMinutes: 0,
                },
              },
            },
          },
        },
      },
    };

    const stats = mapPlayerStats(players, boxscore);

    expect(stats.get(8471724)).toEqual({
      name: "Kris Letang",
      teamId: 5,
      teamName: "Pittsburgh Penguins",
      age: 35,
      number: "58",
      position: "Defenseman",
      stats: {
        assits: 2,
        goals: 2,
        hits: 1,
        points: 4,
        penaltyMinutes: 0,
      },
    });
  });

  test("should map players and boxscore to player stats when no stat data", () => {
    const players = {
      ID8471724: {
        id: 8471724,
        fullName: "Kris Letang",
        primaryNumber: "58",
        currentAge: 35,
        currentTeam: {
          id: 5,
          name: "Pittsburgh Penguins",
        },
        primaryPosition: {
          name: "Defenseman",
        },
      },
    };

    const boxscore = {
      teams: {
        home: {
          players: {},
        },
        away: {
          players: {
            ID8471724: {
              stats: {},
            },
          },
        },
      },
    };

    const stats = mapPlayerStats(players, boxscore);

    expect(stats.get(8471724)).toEqual({
      name: "Kris Letang",
      teamId: 5,
      teamName: "Pittsburgh Penguins",
      age: 35,
      number: "58",
      position: "Defenseman",
    });
  });

  test("should map players and boxscore to player stats when goalie", () => {
    const players = {
      ID8471724: {
        id: 8471724,
        fullName: "Kris Letang",
        primaryNumber: "58",
        currentAge: 35,
        currentTeam: {
          id: 5,
          name: "Pittsburgh Penguins",
        },
        primaryPosition: {
          name: "Goalie",
        },
      },
    };

    const boxscore = {
      teams: {
        home: {
          players: {},
        },
        away: {
          players: {
            ID8471724: {
              stats: {
                goalieStats: {
                  assists: 2,
                  goals: 0,
                  hits: 1,
                  penaltyMinutes: 0,
                },
              },
            },
          },
        },
      },
    };

    const stats = mapPlayerStats(players, boxscore);

    expect(stats.get(8471724)).toEqual({
      name: "Kris Letang",
      teamId: 5,
      teamName: "Pittsburgh Penguins",
      age: 35,
      number: "58",
      position: "Goalie",
      stats: {
        assits: 2,
        goals: 0,
        hits: 1,
        points: 2,
        penaltyMinutes: 0,
      },
    });
  });

  test("should map players and boxscore to player stats when multiple players", () => {
    const players = {
      ID8471724: {
        id: 8471724,
        fullName: "Kris Letang",
        primaryNumber: "58",
        currentAge: 35,
        currentTeam: {
          id: 5,
          name: "Pittsburgh Penguins",
        },
        primaryPosition: {
          name: "Defenseman",
        },
      },
      ID8471725: {
        id: 8471725,
        fullName: "John Snow",
        primaryNumber: "1",
        currentAge: 27,
        currentTeam: {
          id: 7,
          name: "Winterfell Direwolves",
        },
        primaryPosition: {
          name: "Defenseman",
        },
      },
      ID8471726: {
        id: 8471726,
        fullName: "Rob Stark",
        primaryNumber: "3",
        currentAge: 28,
        currentTeam: {
          id: 5,
          name: "Winterfell Direwolves",
        },
        primaryPosition: {
          name: "Defenseman",
        },
      },
    };

    const boxscore = {
      teams: {
        home: {
          players: {},
        },
        away: {
          players: {
            ID8471724: {
              stats: {
                skaterStats: {
                  assists: 2,
                  goals: 0,
                  hits: 1,
                  penaltyMinutes: 0,
                },
              },
            },
            ID8471725: {},
            ID8471726: {
              stats: {},
            },
          },
        },
      },
    };

    const stats = mapPlayerStats(players, boxscore);

    expect(stats.size).toBe(3);

    expect(stats.get(8471724)).toEqual({
      name: "Kris Letang",
      teamId: 5,
      teamName: "Pittsburgh Penguins",
      age: 35,
      number: "58",
      position: "Defenseman",
      stats: {
        assits: 2,
        goals: 0,
        hits: 1,
        points: 2,
        penaltyMinutes: 0,
      },
    });
  });
});
