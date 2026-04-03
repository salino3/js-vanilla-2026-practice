const matches = [
  {
    id: 1,
    sport: "Tennis",
    players: ["Federer", "Nadal"],
    winner: "Federer",
    duration: 120,
  },
  {
    id: 2,
    sport: "Tennis",
    players: ["Williams", "Sharapova"],
    winner: "Williams",
    duration: 90,
  },
  {
    id: 3,
    sport: "Basketball",
    players: ["Lakers", "Celtics"],
    winner: "Lakers",
    duration: 48,
  },
  {
    id: 4,
    sport: "Basketball",
    players: ["Warriors", "Bulls"],
    winner: "Warriors",
    duration: 52,
  },
  {
    id: 5,
    sport: "Tennis",
    players: ["Djokovic", "Murray"],
    winner: "Djokovic",
    duration: 350,
  },
  {
    id: 6,
    sport: "Tennis",
    players: ["Djokovic", "Sinner"],
    winner: "Sinner",
    duration: 250,
  },
];

// bySport: An object where each key is the sport name.

// The value should be an array of the winners for that sport.

// Example: { Tennis: ["Federer", "Williams", "Djokovic"], ... }

// totalPlayTime: The sum of all duration values across all matches.

// playerRecord: An object showing how many matches each player/team participated in (win or lose).

// Example: { Federer: 1, Nadal: 1, Lakers: 1, ... }

// longestMatch: The id of the match with the highest duration.

function transformData(matches) {
  let highierTime = {
    value: 0,
    id: 10,
  };

  const playerRecord = matches
    .reduce((acc, match) => {
      highierTime =
        highierTime.value < match.duration
          ? {
              value: match.duration,
              id: match.id,
            }
          : highierTime;

      return [...acc, ...match.players];
    }, [])
    .reduce((acc, player) => {
      acc[player] = (acc[player] || 0) + 1;

      return acc;
    }, {});

  const groupedTransformData = Object.entries(
    Object.groupBy(matches, (match) => {
      return match.sport;
    }),
  ).reduce(
    (acc, [key, value], index, array) => {
      acc.bySport[key.toLowerCase()] = value.map((m) => m.winner);

      acc["totalPlayTime"] =
        (acc.totalPlayTime || 0) +
        value.reduce((acc, m) => {
          return (acc += m.duration);
        }, 0);

      return acc;
    },
    { bySport: {} },
  );

  return {
    ...groupedTransformData,
    playerRecord,
    longestMatch: highierTime.id,
  };
}

console.log("Task 1:", transformData(matches));
