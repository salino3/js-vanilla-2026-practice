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
    duration: 150,
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
  const groupedTransformData = Object.entries(
    Object.groupBy(matches, (match) => {
      return match.sport;
    }),
  ).reduce(
    (acc, [key, value], index, array) => {
      console.log(
        "clog1",
        key,
        value,
        value.map((m) => m.duration),
      );

      console.log("clog3", [key.toLowerCase()][0]);
      acc.bySport[key.toLowerCase()] = value.map((m) => m.winner);

      acc["totalPlayTime"] = value.map((m) => m.duration);

      if (array.length === index + 1) {
        acc.totalPlayTime = acc.totalPlayTime.reduce((acc, t) => (acc += t));
      }

      return acc;
    },
    { bySport: {} },
  );

  return groupedTransformData;
}

console.log("Task 1:", transformData(matches));
