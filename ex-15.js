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

// The Challenge: The "Department Mapper"
// You have an array of Employees and an array of Departments. Your goal is to create a
// new array of strings that describes which department each person belongs to.

// Your Task: Write a function getEmployeeLabels(employees, departments) that returns
// an array of strings in the format: "Name works in DepartmentName".

const employees02 = [
  { id: 1, name: "Alice", deptId: 101 },
  { id: 2, name: "Bob", deptId: 102 },
  { id: 3, name: "Charlie", deptId: 101 },
];

const departments = [
  { id: 101, name: "Engineering" },
  { id: 102, name: "Marketing" },
];

function getEmployeeLabels(employees, departments) {
  const reducedEmployees = employees.reduce((acc, emp) => {
    acc[emp.name] =
      `${emp.name} works in ${departments.find((d) => d.id === emp.deptId).name}`;

    return acc;
  }, {});

  return Object.values(reducedEmployees);
}

console.log("Task 4 ", getEmployeeLabels(employees02, departments));

//
function getEmployeeLabels02(employees, departments) {
  return employees.map((emp) => {
    const dept = departments.find((d) => d.id === emp.deptId);
    return `${emp.name} works in ${dept ? dept.name : "Unknown"}`;
  });
}

console.log("Task 4 V2", getEmployeeLabels02(employees02, departments));

// The Challenge: The "FizzBuzz" Sum
// Write a function sumSpecial(n) that takes a number n and returns
//  the sum of all numbers from 1 up to n that are divisible by 3 or 5. Example: If n = 10: Numbers
//  divisible by 3 or 5: 3, 5, 6, 9, 10 Result: $3 + 5 + 6 + 9 + 10 = 33$ Constraints:If n is negative, return 0.
//  Be careful not to count a number twice if it's divisible by both (like 15).

function sumSpecial(n) {
  if (n < 0) {
    return 0;
  }

  let sum = 0;

  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }

  return sum;
}

console.log("Task 5 ", sumSpecial(33));
