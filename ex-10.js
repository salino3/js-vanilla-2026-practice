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
