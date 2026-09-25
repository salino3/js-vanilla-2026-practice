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

// Write a JavaScript function called `groupAndCount` that accepts an array of strings
// and returns an object containing the count of occurrences for each word, ignoring
// case and punctuation.

// Normalize strings by converting everything to lowercase.

// Remove trailing or internal punctuation (e.g., ,, ., !, ?).

// Group words by counting the number of times each one appears.

const words = [
  "React",
  "Node.js",
  "react",
  "JavaScript",
  "node.js!",
  "REACT",
  "javascript?",
];

function groupAndCount(array) {
  const result = array.reduce((acc, word) => {
    const newWord = word
      .toLowerCase()
      .normalize("NFC")
      .replace(/[!?,]/g, "") // Remove  !, ?, and ,
      .replace(/\.+$/, ""); // Remove dots only if they are at the end of the string
    acc[newWord] = (acc[newWord] ?? 0) + 1;

    return acc;
  }, {});

  return result;
}

console.log("Task 4", groupAndCount(words));

// Write a function called findUnique that takes an array of numbers and returns a new array
//  containing only the numbers that appear exactly once, preserving their original order.

// Constraints & Edge Cases to Consider
// Duplicate numbers should be completely excluded, not just reduced to one instance.

// The function should return an empty array [] if no unique numbers exist.

// Do not mutate the original array.

const numbers = [1, 2, 2, 3, 4, 4, 5, 1, 6];

function findUnique(arr) {
  const result = Object.entries(
    arr.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {}),
  )
    .map(([key, value]) => value === 1 && Number(key))
    .filter(Boolean);

  return result;
}

console.log("Task 5", findUnique(numbers));
