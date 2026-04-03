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

//
function transformData02(matches) {
  const reducedMatch = matches.reduce(
    (acc, match) => {
      // 1. totalPlayTime (Simple sum)
      acc.totalPlayTime += match.duration;

      // 2. bySport (Grouping winners)
      const sport = match.sport.toLowerCase();
      if (!acc.bySport[sport]) {
        acc.bySport[sport] = [];
      }
      acc.bySport[sport].push(match.winner);

      // 3. playerRecord (Looping through the 2 players in the match)
      match.players.forEach((player) => {
        acc.playerRecord[player] = (acc.playerRecord[player] || 0) + 1;
      });

      // 4. longestMatch (Keeping track of the best ID)
      if (match.duration > acc._maxDuration) {
        acc._maxDuration = match.duration;
        acc.longestMatch = match.id;
      }

      return acc;
    },
    {
      totalPlayTime: 0,
      bySport: {},
      playerRecord: {},
      longestMatch: null,
      _maxDuration: 0,
    },
  );
  const { _maxDuration, ...finalResult } = reducedMatch;
  return finalResult;
}

console.log("Task 1 V2:", transformData02(matches));

//
// Simulated API Calls
const fetchUser = (id) =>
  new Promise((res) =>
    setTimeout(() => res({ id, name: "Alex", role: "Developer" }), 500),
  );

const fetchPosts = (userId) =>
  new Promise((res) =>
    setTimeout(
      () =>
        res([
          { id: 101, title: "JS Tips", likes: 10 },
          { id: 102, title: "Async is Fun", likes: 25 },
        ]),
      800,
    ),
  );

const fetchSettings = (userId) =>
  new Promise((res) =>
    setTimeout(() => res({ theme: "dark", notifications: true }), 300),
  );

// Fetches the User first (because you need the ID).

// Fetches Posts and Settings at the same time (to save time!).

// Returns a "Profile" Object that combines all three results.

// Error Handling: Wrap everything in a try/catch block. If any call fails,

// return a custom error message: "Failed to load dashboard".

async function functionFetchData(userId) {
  try {
    const dataUser = await fetchUser(userId).then((res) => res);

    const allData = await Promise.allSettled([
      fetchPosts(dataUser.id),
      fetchSettings(dataUser.id),
    ]);

    return allData.map((f) => f.value);
  } catch (error) {
    console.log("Failed to load dashboard");
  }
}

async function getLength() {
  const result = await functionFetchData(101);
  return result.length;
}

async function processData() {
  const length = await getLength();

  const math = length * 5;
  const message = `The result is ${math}`;

  console.log(message);
  return math;
}

processData();

console.log(
  "Task 2:",
  functionFetchData(101).then((res) => console.log("Result:", res)),
);
