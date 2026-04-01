const cart = [
  { name: "Apple", price: 0.5, available: true },
  { name: "Milk", price: 2.5, available: false },
  { name: "Bread", price: 1.2, available: true },
  { name: "Chocolate", price: 3.0, available: true },
  { name: "Eggs", price: 1.5, available: false },
];

// Write a function called calculateTotal that:

// Filters out items where available is false.

// Sums up the price of the remaining items.

// Returns the final total as a number.

function TotalAvailablePrice(cart) {
  const calcutatedCart = cart.reduce((acc, el) => {
    acc += el.available ? el.price : 0;

    return acc;
  }, 0);
  return calcutatedCart;
}

console.log("Task 1 ", TotalAvailablePrice(cart));

//
const products = [
  { name: "Apple", category: "Fruit", price: 0.5 },
  { name: "Banana", category: "Fruit", price: 0.3 },
  { name: "Steak", category: "Meat", price: 10.0 },
  { name: "Chicken", category: "Meat", price: 7.0 },
  { name: "Carrot", category: "Vegetable", price: 0.2 },
];

// Write a function called groupByCategory that:

// Uses .reduce() to return a new object.

// The keys of the object should be the category names.

// The values should be arrays of the product names belonging to that category.

function groupByCategory(array) {
  return array.reduce((acc, el) => {
    return {
      ...acc,
      [el.category]: acc[el.category]
        ? [...acc[el.category], el.name]
        : [el.category],
    };
  }, {});
}

console.log("Task 2 ", groupByCategory(products));

//
const transactions = [
  { id: 1, amount: 50, status: "completed" },
  { id: 2, amount: 20, status: "pending" },
  { id: 3, amount: 100, status: "completed" },
  { id: 4, amount: 40, status: "failed" },
  { id: 5, amount: 30, status: "completed" },
];

// You have a list of transactions. The user wants a summary that shows the total spent and the
// number of transactions for a specific status (e.g., "completed").

// Write a function getTransactionSummary(list, targetStatus) that returns an object like this:
// { totalAmount: 180, count: 3 } (for "completed").

// Bonus: Try to do it using only one .reduce() and no external variables.

function getTransactionSummary(list, targetStatus) {
  const redicedList = list.reduce(
    (acc, t) => {
      return t.status === targetStatus
        ? { totalAmount: acc.totalAmount + t.amount, count: acc.count + 1 }
        : acc;
    },
    { totalAmount: 0, count: 0 },
  );

  return redicedList;
}

console.log("Task 3 ", getTransactionSummary(transactions, "completed"));

//
const users = [
  { name: "Bob", age: 17, isActive: true },
  { name: "Charlie", age: 30, isActive: false },
  { name: "David", age: 20, isActive: true },
  { name: "Alice", age: 25, isActive: true },
];

// Filter for isActive: true.

// Filter for age >= 18.

// Map to get only the name.

// Sort the names alphabetically.

function transformDataUsers(usersData) {
  return usersData
    .filter((u) => u.age >= 18 && !!u.isActive)
    .map((u) => u.name)
    .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));
}

console.log("Task 4 ", transformDataUsers(users));

// Level,     What it ignores,                                  Example Match (returns 0)

// base,      Ignores Accents and Case,                         a === A === á
// accent,    Ignores Case, but cares about Accents,          a === A (but a !== á)
// case,      Ignores Accents, but cares about Case,          a === á (but a !== A)
// variant,   Cares about Everything (Default),                 Nothing matches unless identical

function transformDataUsers02(usersData) {
  return usersData
    .reduce((acc, u) => {
      if (u.isActive && u.age >= 18) {
        return [...acc, u.name];
      }
      return acc;
    }, [])
    .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));
}

console.log("Task 4 V 2", transformDataUsers02(users));

//
const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    rating: 4.2,
    genres: ["Classic", "Fiction"],
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    rating: 4.6,
    genres: ["Dystopian", "Sci-Fi"],
  },
  {
    id: 3,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    rating: 4.8,
    genres: ["Fantasy", "Adventure"],
  },
  {
    id: 4,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    rating: 4.3,
    genres: ["Classic", "Law"],
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
    rating: 3.9,
    genres: ["Classic", "YA"],
  },
];

// Filter: Create a new array called highlyRated that contains only books with a rating of 4.5 or higher.

// Map: Create a new array called bookLabels that contains strings formatted as: "Title (Year) by Author".

// Find: Find the first book in the original array that belongs to the "Fantasy" genre.

// Reduce: Calculate the average rating of all books in the library.

// Check if any book was published before 1930.

// Check if all books have at least one genre.

function highlyRatedItems(array) {
  const reducedArray = array.reduce(
    (acc, el, index, array) => {
      if (!acc.firstFantasy) {
        acc.firstFantasy = el.genres.some((book) => book === "Fantasy")
          ? el
          : null;
      }

      if (!el.genres.length === 0) {
        acc.allHaveGenre = false;
      }

      if (!acc.somePublishedBefore1930 && el.year < 1930) {
        acc.somePublishedBefore1930 = true;
      }

      if (el.rating >= 4.5) {
        acc.highlyRated.push(el);
      }

      acc.bookLabels.push(`${el.title} (${el.year}) by ${el.author}`);

      acc.average += el.rating;
      if (array.length === index + 1) {
        acc.average = acc.average / array.length;
      }

      return acc;
    },
    {
      somePublishedBefore1930: null,
      allHaveGenre: true,
      highlyRated: [],
      bookLabels: [],
      average: 0,
      firstFantasy: null,
    },
  );

  return reducedArray;
}

console.log("Task 5 ", highlyRatedItems(books));

//
const products02 = [
  { id: 101, name: "Laptop", price: 1200, category: "Electronics" },
  { id: 102, name: "Mouse", price: 25, category: "Electronics" },
  { id: 103, name: "Keyboard", price: 75, category: "Electronics" },
  { id: 104, name: "Backpack", price: 50, category: "Fashion" },
];

const users02 = [
  { id: 1, name: "Alice", premium: true },
  { id: 2, name: "Bob", premium: false },
];

const orders = [
  { orderId: 500, userId: 1, productId: 101, qty: 1 },
  { orderId: 501, userId: 2, productId: 102, qty: 2 },
  { orderId: 502, userId: 1, productId: 103, qty: 1 },
  { orderId: 503, userId: 2, productId: 104, qty: 3 },
];

// Create a function generateReport(orders, products, users) that returns an object using one .reduce() on the orders array.

// The output object should contain:

// totalRevenue: The sum of all orders (price * qty).

// premiumOrders: An object of names of users who are premium: true and placed an order.

// categoryCounts: An object showing how many items were sold per category (e.g., { Electronics: 4, Fashion: 3 }).

// expensiveItems: A list of product names where the unit price is greater than 100.

// orderDetails: A list of strings: "User Name bought Qty x Product Name".

function generateReport(orders, products, users) {
  const productMap = Object.fromEntries(products.map((p) => [p.id, p]));
  const userMap = Object.fromEntries(users.map((u) => [u.id, u])); // {1:  { id: 1, name: "Alice", premium: true } ... }

  const reducedData = orders.reduce(
    (acc, order) => {
      // const productFound = products.find((p) => p.id == order.productId) || {};
      const productFound = productMap[order.productId] || {};
      const userFound = userMap[order.userId] || {};

      //
      acc.categoryCounts[productFound?.category] = acc?.categoryCounts[
        productFound.category
      ]
        ? acc.categoryCounts[productFound.category] + order.qty
        : order.qty;

      //
      if (productFound.price > 100) {
        acc.expensiveItems.push(productFound.name);
      }

      //

      if (
        userFound.premium &&
        productFound.name &&
        !acc.premiumOrders[userFound.id]
      ) {
        acc.premiumOrders[userFound.id] = userFound.name;
      }

      //
      if (userFound.name && productFound.name) {
        acc.orderDetails.push(
          `${userFound.name} bought ${order.qty} x ${productFound.name}`,
        );
      }

      //
      acc.totalRevenue += productFound.price
        ? productFound.price * order.qty
        : 0;

      return acc;
    },
    {
      totalRevenue: 0,
      premiumOrders: {},
      expensiveItems: [],
      orderDetails: [],
      categoryCounts: {},
    },
  );

  return reducedData;
}

console.log("Task 6 ", generateReport(orders, products02, users02));

//
const department = {
  name: "Engineering",
  manager: "Elena",
  salary: 150000,
  team: [
    {
      name: "Frontend",
      manager: "Lucas",
      salary: 120000,
      team: [
        { name: "Sora", manager: null, salary: 90000, team: [] },
        {
          name: "Fullstack",
          manager: "James",
          salary: 85000,
          team: [
            {
              name: "Fullstack",
              manager: "Diego",
              salary: 100000,
              team: [
                { name: "Ana", manager: null, salary: 90000, team: [] },
                { name: "Kale", manager: null, salary: 85000, team: [] },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Backend",
      manager: "Sarah",
      salary: 130000,
      team: [{ name: "Ravi", manager: null, salary: 95000, team: [] }],
    },
    { name: "DevOps", manager: "Mina", salary: 140000, team: [] },
  ],
};

// Create a recursive function analyzeDepartment(node) that traverses this entire tree
// and returns a single summary object.

// The output object should contain:

// totalSalary: The sum of every salary in the entire hierarchy.

// employeeCount: The total number of people (Managers + Team members).

// allManagers: A flat array of all names who are listed as a manager.

// highestSalary: The single highest salary found in the tree.

function analyzeDepartment(node, result, calls) {
  if (!calls) {
    return {
      node,
      result,
      calls: false,
    };
  }
  console.log("clog2", result.allManagers);

  const newArray = [
    ...result.allManagers,
    ...(node.manager ? [node.manager] : []),
  ];

  console.log("clog1", result.employeeCount);
  const newResult = {
    totalSalary: (result.totalSalary += node.salary),
    employeeCount: (result.employeeCount || 0) + (node.name ? 1 : 0),
    allManagers: newArray,
    highestSalary:
      (result.highestSalary || 0) < node.salary
        ? node.salary
        : result.highestSalary,
  };

  const recursiveResult =
    // node && node.team.length > 0
    //   ? node.team.map((el) =>
    //       analyzeDepartment(node, newResult, node.team.length > 0),
    //     )
    //   :
    false;

  //
  console.log("clog3", {
    recursiveResult,
    result: newResult,
    calls: !!recursiveResult,
  });
  return {
    recursiveResult,
    result: newResult,
    calls: !!recursiveResult,
  };
}

console.log(
  "Task 7 ",
  analyzeDepartment(
    department,
    {
      totalSalary: 0,
      employeeCount: 0,
      allManagers: [],
      highestSalary: 0,
    },
    true,
  ),
);

//     const reducedNode =
// node.team &&
// node.team.length > 0 &&
// node.team.reduce(
//   (acc, el) => {
//     if (el.manager) {
//       acc.allManagers.push(node.name);
//     }
//     acc.totalSalary += node.salary;
//     if (acc.highestSalary < node.salary) {
//       acc.highestSalary = node.salary;
//     }

//     if (el.team.length > 0) {
//     }

//     return acc;
//   },
//   {
//     totalSalary: 0,
//     employeeCount: 0,
//     allManagers: [],
//     highestSalary: 0,
//   },
// );
