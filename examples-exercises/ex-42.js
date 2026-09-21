// Objective: Write a recursive function `countStockItems(node)` that returns the
//  total number of items with the property `inStock: true`, at any depth
//  (whether inside objects or arrays).

const catalog = {
  electronics: [
    { name: "Laptop", inStock: true },
    { name: "Mouse", inStock: false },
    {
      accessories: [
        { name: "Keyboard", inStock: true },
        { name: "Monitor", inStock: true },
      ],
    },
  ],
  books: {
    fiction: [
      { name: "Dune", inStock: false },
      { name: "1984", inStock: true },
    ],
    nonFiction: { name: "Sapiens", inStock: false },
  },
};

function countStockItems(node) {
  let result = 0;

  if (typeof node === "boolean") {
    if (!!node) {
      result += 1;
    }
    return result;
  }

  if (Array.isArray(node)) {
    for (let item of node) {
      result += countStockItems(item);
    }
  }

  console.log("clog2", typeof node);
  if (typeof node === "object" && node !== null) {
    for (let item in node) {
      result += countStockItems(node[item]);
    }
  }

  return result;
}

console.log("Task 1", countStockItems(catalog));
