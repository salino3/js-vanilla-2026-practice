const rawData = [
  { id: 10, name: "Alice", active: true },
  { id: 5, name: "", active: true },
  { id: 12, name: "Bob", active: false },
  { id: 8, name: "Charlie", active: true },
  { id: 1, name: "David", active: true },
];

// Your Goal: Write a function getCleanUsers(data) that:

// Filters out any user where active is false.

// Filters out any user where the name is an empty string "" or null.

// Sorts the remaining users by their id in ascending order (smallest to largest).

function getCleanUsers(data) {
  const cleanedData = data
    .filter((user) => !!user.active && !!user.name)
    .sort((a, b) => {
      if (a.id === b.id) {
        return a.name.localeCompare(b.name);
      }
      return a.id - b.id;
    });

  return cleanedData;
}

const result = getCleanUsers(rawData);

console.log("Task 1 ", result);

//
const transactions = [
  { id: 1, category: "Food", amount: 50 },
  { id: 2, category: "Transport", amount: 20 },
  { id: 3, category: "Food", amount: 30 },
  { id: 4, category: "Utilities", amount: 100 },
  { id: 5, category: "Transport", amount: 15 },
];

// Your Task: Write a function getTotalsByCategory(transactions) that returns an object where:

// The Keys are the category names.

// The Values are the sum of all amounts in that category.

function getTotalsByCategory(transactions) {
  const resulTransactions = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  return resulTransactions;
}

console.log("Task 2 ", getTotalsByCategory(transactions));

// The Challenge: The "User & Posts" Fetcher
// You need to write an async function that:

// Fetches a user from an API.

// Fetches that user's posts using the ID from the first request.

// Returns an object containing both the user and their posts.

// The Code Blueprint:

async function getUserData(userId) {
  const user = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  ).then(function (response) {
    return response.json();
  });

  const posts = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
  ).then((response) => response.json());

  return { user, posts };
}

console.log(
  "Task 3 ",
  getUserData(2).then((res) => console.log(res)),
);
