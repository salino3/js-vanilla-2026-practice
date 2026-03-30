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
