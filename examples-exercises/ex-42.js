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
  if (node?.inStock === true) {
    result += 1;
  }

  if (Array.isArray(node)) {
    for (let item of node) {
      result += countStockItems(item);
    }
  } else if (typeof node === "object" && node !== null) {
    for (let key in node) {
      result += countStockItems(node[key]);
    }
  }

  return result;
}

console.log("Task 1", countStockItems(catalog));

// Objective: Write a recursive function `sumPrices(node)` that returns the total sum
// of all prices (price) found at any depth level.

const order = {
  id: "ORD-99",
  items: [
    { name: "Laptop", price: 1000 },
    { name: "Mouse", price: 25 },
    {
      bundle: [
        { name: "Cavo HDMI", price: 15 },
        { name: "Adattatore", price: 30 },
      ],
    },
  ],
  shipping: {
    cost: {
      price: 10,
    },
  },
  discountCode: "SUMMER10",
};

function sumPrices(node) {}

console.log("Task 1", sumPrices(catalog));
