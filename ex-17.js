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

//
const userProfile = {
  id: "u123",
  username: "dev_pro",
  settings: {
    theme: "dark",
    notifications: true,
    languages: ["English", "Spanish"],
  },
};

// Level 1 Update: Create updatedUsername where the username is changed to "master_coder".

// Nested Update: Create themeChanged where the theme inside settings is changed to "light".

// Array inside Object: Add a language where "French" is added to the languages array inside the settings object.

// The "Gotcha": Create toggleNotifications that flips the boolean value of notifications.

function toggleNotifications(value, flipValue) {
  return flipValue ? !value : value;
}

function updatedUsername(user, flipNotification) {
  const updatedUsername = {
    ...user,
    settings: {
      ...user.settings,
      theme: "light",
      notifications: toggleNotifications(
        user.settings.notifications,
        flipNotification,
      ),
      languages: [...user.settings.languages, "French"],
    },
    username: "master_coder",
  };

  return updatedUsername;
}

console.log("Task 3:", updatedUsername(userProfile, true));

//
function updatedLanguagesUser(user, languageToRemove) {
  const updatedUser = {
    ...user,
    settings: {
      ...user.settings,
      languages: user.settings.languages.filter((l) => l !== languageToRemove),
    },
  };

  return updatedUser;
}

console.log("Task 4:", updatedLanguagesUser(userProfile, "Spanish"));

//
const inventory = [
  { id: "p1", name: "Laptop", stock: 5, price: 1000 },
  { id: "p2", name: "Mouse", stock: 10, price: 50 },
  { id: "p3", name: "Keyboard", stock: 0, price: 80 }, // Out of stock!
];

const cart = [{ id: "p4", name: "Screen", price: 250 }];

// Write a function addToCart(productId) that returns a new state object containing both updated arrays.

// Rules for the logic:

// Check Stock: If the product's stock in inventory is 0, return the state unchanged (or log "Out of stock").

// Update Inventory: Decrease the stock of the target product by 1.

// If the product is not in the cart, add it as a new object: { id, name, quantity: 1 }.

function addToCart(productId, inventory, cart) {
  const productById = inventory.find((p) => p.id === productId);

  if (!productById) {
    console.log("Product " + productId + " doe not esxist");
    return {
      inventory,
      cart,
    };
  }

  if (productById.stock === 0) {
    console.log("Out of stock -", productId);
    return {
      inventory,
      cart,
    };
  }

  const { stock, ...newCartObj } = productById;
  const updatedCart = [...cart, newCartObj];
  const updatedInventory = inventory.map((p) =>
    p.id === productById.id ? { ...p, stock: p.stock - 1 } : p,
  );
  return {
    updatedInventory,
    updatedCart,
  };
}

console.log("Task 5:", addToCart("p2", inventory, cart));

//
const todo = [
  { id: "t1", task: "Write Unit Tests", priority: "High" },
  { id: "t2", task: "Fix Login Bug", priority: "Medium" },
  { id: "t3", task: "Update Documentation", priority: "Low" },
];

const done = [
  {
    id: "t0",
    task: "Setup Project",
    priority: "High",
    completedAt: "2023-10-01",
  },
];

// Write a function completeTask(taskId) that returns a new state object.

// Rules:

// Find the task: Locate the task in the todo array.

// Handle missing tasks: If the ID doesn't exist in todo, return the current state unchanged.

// Immutably Remove: Create a new todo array without the completed task.

// Immutably Add & Transform: Create a new done array that includes the task from step 1,

// but add a new property completedAt: "2026-04-03" to that task object.

function getDayString() {
  let date = new Date();
  let output =
    String(date.getDate()).padStart(2, "0") +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    date.getFullYear();

  return output;
}

function completeTask(taskId, todo, done) {
  const reducedTodos = todo.reduce(
    (acc, task) => {
      if (task.id === taskId) {
        acc.task = task;
      } else {
        acc.todo.push(task);
      }

      return acc;
    },
    { task: {}, todo: [] },
  );

  if (!reducedTodos.task.id) {
    return {
      todo,
      done,
    };
  }

  const newDone = [...done];

  newDone.push({
    ...reducedTodos.task,
    completedAt: getDayString(),
  });

  console.log("clog1", newDone === done); // false, different memory reference for respect immutability

  return {
    todo: reducedTodos.todo,
    done: newDone,
  };
}

console.log("Task 6:", completeTask("t1", todo, done));

//
function completeTaskV2(taskId, todoArray, doneArray) {
  const result = todoArray.reduce(
    (acc, task) => {
      if (task.id === taskId) {
        acc.movedTask = { ...task, completedAt: getDayString() };
      } else {
        acc.newTodo.push(task);
      }
      return acc;
    },
    { newTodo: [], movedTask: null },
  );

  if (!result.movedTask) {
    return { todo: todoArray, done: doneArray };
  }

  return {
    todo: result.newTodo,
    done: [...doneArray, result.movedTask],
  };
}

console.log("Task 6 V2:", completeTaskV2("t2", todo, done));
