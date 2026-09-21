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
        { name: "Cable HDMI", price: 15 },
        { name: "Adapter", price: 30 },
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

function sumPrices(node) {
  let result = 0;
  if (node.price && typeof node?.price === "number") {
    result += node.price;
  }

  if (Array.isArray(node)) {
    for (let item of node) {
      result += sumPrices(item);
    }
  } else if (typeof node === "object" && node !== null) {
    for (let key in node) {
      result += sumPrices(node[key]);
    }
  }

  return result;
}

console.log("Task 2", sumPrices(order));

// Objective: Write a recursive function `collectHashtags(node)` that searches for all strings
// starting with the `#` character at any depth level and returns them in a single flat array.

const feed = {
  title: "My Feed",
  mainPost: {
    text: "Learning JS recursion!",
    tags: ["#javascript", "#coding"],
    author: {
      name: "Mario",
      bio: "Web developer #frontend",
    },
  },
  sidebar: [
    { text: "Check out my new project", tag: "#project" },
    {
      comments: ["#dev", { body: "Great post!", tag: "#tech" }],
    },
  ],
};

function collectHashtags(node) {
  let result = [];

  if (typeof node === "string") {
    const words = node.split(" ");
    for (let word of words) {
      if (word.startsWith("#")) {
        result.push(word);
      }
    }
  } else if (typeof node === "object" && node !== null) {
    for (let key in node) {
      result = result.concat(collectHashtags(node[key]));
    }
  }

  return result;
}

console.log("Task 3", collectHashtags(feed));
