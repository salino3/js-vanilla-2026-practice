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
