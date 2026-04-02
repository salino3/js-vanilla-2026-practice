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

//* playerRecord: An object showing how many matches each player/team participated in (win or lose).

// Example: { Federer: 1, Nadal: 1, Lakers: 1, ... }

//* longestMatch: The id of the match with the highest duration.

function transformData(matches) {
  const reducedMatches = matches.reduce((acc, match) => {
    return [...acc, ...match.players];
  }, []);
  console.log("clog5", reducedMatches);
  const groupedTransformData = Object.entries(
    Object.groupBy(matches, (match) => {
      return match.sport;
    }),
  ).reduce(
    (acc, [key, value], index, array) => {
      let highierTime = 0;
      let idMatch = 0;

      acc.bySport[key.toLowerCase()] = value.map((m) => m.winner);

      acc["totalPlayTime"] =
        (acc.totalPlayTime || 0) +
        value.reduce((acc, m) => {
          console.log("clog2", highierTime < m.duration ? m.id : idMatch);
          highierTime = highierTime < m.duration ? m.duration : highierTime;
          idMatch = highierTime < m.duration ? m.id : idMatch;
          return (acc += m.duration);
        }, 0);
      console.log("clog1", value);

      //   acc.longestMatch =
      //     acc.longestMatch < highierTime ? highierTime : acc.longestMatch;
      acc.idLongestMatch = idMatch;
      return acc;
    },
    { bySport: {}, playerRecord: {}, idLongestMatch: 0 },
  );

  return groupedTransformData;
}

console.log("Task 1:", transformData(matches));
