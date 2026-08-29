// Task 1
// Write a function called cleanInventory that takes an array of objects and returns a new array that:
// Removes duplicates: If two objects have the same id, keep only the first one encountered.
// Filters out incomplete data: Remove any product that is missing a price or a name.
// Sorts the result: The final list should be sorted by price from lowest to highest.

function cleanInventory(inventory) {
  const seenIds = new Set();

  return inventory
    .filter((item) => {
      const isDuplicate = seenIds.has(item.id);
      const isIncomplete = !item.id || !item.name || !item.price;

      if (isDuplicate || isIncomplete) {
        return false;
      }

      seenIds.add(item.id);
      return true;
    })
    .sort((a, b) => a.price - b.price);
}

console.log(
  "Task 1: ",
  cleanInventory([
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Mouse", price: 25 },
    { id: 1, name: "Laptop", price: 1000 },
    { id: 3, name: "Keyboard" },
    { id: 4, name: null, price: 50 },
    { id: 5, name: "Monitor", price: 200 },
    { id: 2, name: "Mouse", price: 25 },
  ]),
);

// Task 2
// Create a function called organizeGuests that takes an array of strings and returns a new array that:
// Normalizes the names: Converts all names to a standard format (e.g., all lowercase or "Title Case").
// Removes duplicates: Ensures each name appears only once, regardless of how it was originally capitalized.
// Sorts alphabetically: From A to Z but Marcos the birthday boy goes first

function organizeGuests(rawGuests) {
  return rawGuests
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
    .filter((str, index, arr) => arr.indexOf(str) === index)
    .sort((a, b) => {
      // Marco the birthday boy
      if (a == "Marcos") {
        return -1;
      }
      a.localeCompare(b);
    });
}

console.log(
  "Task 2: ",
  organizeGuests([
    "lucía",
    "Marcos",
    "ANA",
    "lucía",
    "pedro",
    "marcos",
    "Zoe",
    "ana",
  ]),
);

// Task 3
// Write a function called getCategoryTotals that:
// Filters out any expense with a negative amount (those are errors).
// Groups the expenses by category.
// Sums the total amount for each category.
// Returns an object where the keys are the categories and the values are the totals.

function getCategoryTotals(expenses) {
  return expenses.reduce((acc, item) => {
    if (item.amount < 0) {
      return acc;
    }
    // if (!acc[item.category]) {
    //   acc[item.category] = item.amount;
    // } else {
    //   acc[item.category] += item.amount;
    // }

    acc[item.category] = (acc[item.category] || 0) + item?.amount;

    return acc;
  }, {});
}

console.log(
  "Task 3: ",
  getCategoryTotals([
    { id: 1, category: "Food", amount: 50 },
    { id: 2, category: "Transport", amount: 20 },
    { id: 3, category: "Food", amount: 30 },
    { id: 4, category: "Tech", amount: 1200 },
    { id: 6, category: "Food", amount: -10 }, // Error: Ignore this
    { id: 5, category: "Transport", amount: 15 },
  ]),
);

// Task 4
// Write a function getTopSpender(orders) that:
// Filters only orders where status is "completed".
// Groups the total spent by customerName.
// Finds the name of the person with the highest total.
// Returns a string: "The winner is [Name] with $[Amount]".

function getTopSpender(orders) {
  const reducedOrders = orders.reduce((acc, customer) => {
    if (customer.status === "pending") {
      return acc;
    }
    acc[customer.customerName] =
      (acc[customer.customerName] || 0) + customer.amount;

    return acc;
  }, {});

  let winner = {
    name: "",
    amount: -Infinity,
  };

  for (let item in reducedOrders) {
    if (winner.amount < reducedOrders[item]) {
      winner = {
        name: item,
        amount: reducedOrders[item],
      };
    }
  }
  return {
    reducedOrders,
    winner: `The winner is ${winner.name} with ${winner.amount}`,
  };
}

console.log(
  "Task 4: ",
  getTopSpender([
    { customerName: "Alice", amount: 100, status: "completed" },
    { customerName: "Bob", amount: 50, status: "completed" },
    { customerName: "Alice", amount: 200, status: "pending" }, // Ignore: pending
    { customerName: "Bob", amount: 80, status: "completed" },
    { customerName: "Alice", amount: 50, status: "completed" },
  ]),
);

// Task 5
// Write an asynchronous function called sendNotifications that:
// Loops through the array of notifications.
// Waits for the specified delay using a Promise and setTimeout.
// Logs the message to the console.
// Returns a string when all notifications are finished: "All notifications sent!".

const notifications = [
  { message: "Server starting...", delay: 1000 },
  { message: "Database connected!", delay: 2000 },
  { message: "Backup complete.", delay: 500 },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

async function sendNotifications(list) {
  for (const item of list) {
    await sleep(item.delay);
    console.log(item.message);
  }

  return "All notifications sent!";
}

console.log(
  "Task 5 ",
  sendNotifications(notifications).then((result) => {
    console.log(result);
  }),
);
