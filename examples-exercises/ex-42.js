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

function countStockItems(node) {}

console.log("Task 1", countStockItems(catalog));
