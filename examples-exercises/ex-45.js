// Write a function runMiddleware(req, middlewares) that executes an array
// of middleware functions sequentially.

// Each middleware function takes two arguments: (req, next).

// When a middleware calls await next(), control passes to the next middleware in the array.

// Once the next middleware finishes, execution returns to the previous middleware
// (like a stack / onion architecture).

// The function runMiddleware should return a Promise that resolves when all middlewares have finished.

/**
 * Runs an array of middleware functions in sequence.
 *
 * @param {Object} req - The request object passed through middlewares
 * @param {Array<Function>} middlewares - Array of (req, next) => Promise<void>
 * @returns {Promise<void>}
 */
async function runMiddleware(req, middlewares) {
  function dispatch(index) {
    // Base case: if we reach the end of the chain, return a resolved promise
    if (index >= middlewares.length) {
      return Promise.resolve();
    }

    const middleware = middlewares[index];

    // Call the current middleware, passing `req` and a `next` function
    // that triggers the dispatch for the next index
    return Promise.resolve(middleware(req, () => dispatch(index + 1)));
  }

  return dispatch(0);
}

// ==========================================
// TEST SUITE
// ==========================================

async function test() {
  const req = { logs: [] };

  const m1 = async (req, next) => {
    req.logs.push("M1 Start");
    await next();
    req.logs.push("M1 End");
  };

  const m2 = async (req, next) => {
    req.logs.push("M2 Start");
    await next();
    req.logs.push("M2 End");
  };

  const m3 = async (req, next) => {
    req.logs.push("M3 Execution");
  };

  await runMiddleware(req, [m1, m2, m3]);

  console.log("Execution Logs:", req.logs);
}

test();

// Write a function countWords(sentence) that takes a string sentence and returns an object
// containing the frequency count of each unique word (case-insensitive).

// Requirements:

// Convert all words to lowercase so "Hello" and "hello" are counted as the same word.

// Ignore empty spaces if multiple spaces occur together.

// Return an object where keys are words and values are their occurrence counts.

/**
 * Counts the occurrences of each word in a string.
 *
 * @param {string} sentence
 * @returns {Object<string, number>}
 */
function countWords(sentence) {
  if (!sentence.trim()) return {};

  const words = sentence
    .toLowerCase()
    .split(" ")
    .reduce((acc, word) => {
      if (word.trim()) {
        acc[word] = (acc[word] ?? 0) + 1;
      }

      return acc;
    }, {});

  console.log("clog1", words);
}

// ==========================================
// TEST SUITE
// ==========================================

function test02() {
  const result1 = countWords("the quick brown fox jumps over the lazy dog the");
  console.log("Test 1 Result:", result1);

  const result2 = countWords("JS is cool and js is   powerful");
  console.log("Test 2 Result:", result2);
}

test02();

// Write a function calculateCartSummary(cart, maxPrice) that takes an array of shopping
//  cart items and a maximum price threshold.

// Requirements:

// Filter: Keep only items whose price is less than or equal to maxPrice AND are currently
// in stock (inStock: true).

// Transform (Map): For each qualified item, calculate its subtotal (price * quantity)
//  and return an array of simplified item summary objects: { name, subtotal }.

// Aggregate (Reduce): Calculate the overall total cost of all the qualified items.

// Return: An object with two properties:

// items: The array of summary objects from step 2.

// totalCost: The total sum calculated in step 3 (rounded to 2 decimal places).

/**
 * Calculates summary and total for in-stock cart items within budget.
 *
 * @param {Array<Object>} cart Array of cart item objects
 * @param {number} maxPrice Maximum price threshold per item
 * @returns {{ items: Array<{name: string, subtotal: number}>, totalCost: number }}
 */
function calculateCartSummary(cart, maxPrice) {
  let totalCost = 0;

  const items = cart.reduce((acc, item) => {
    if (item.inStock && item.price <= maxPrice) {
      const subtotal = item.price * item.quantity;
      const newItem = {
        name: item.name,
        subtotal,
      };
      totalCost += subtotal;
      acc.push(newItem);
    }

    return acc;
  }, []);

  return { items, totalCost };
}

// ==========================================
// TEST SUITE
// ==========================================

function test03() {
  const shoppingCart = [
    { name: "Laptop", price: 1200, quantity: 1, inStock: true },
    { name: "Mouse", price: 25, quantity: 2, inStock: true },
    { name: "Keyboard", price: 75, quantity: 1, inStock: false }, // Out of stock!
    { name: "Monitor", price: 300, quantity: 2, inStock: true },
    { name: "USB Cable", price: 10, quantity: 3, inStock: true },
  ];

  // Test 1: Max price $100
  const result1 = calculateCartSummary(shoppingCart, 100);
  console.log("Result 1 (Max $100):", result1);

  // Test 2: Max price $500
  const result2 = calculateCartSummary(shoppingCart, 500);
  console.log("Result 2 (Max $500):", result2);
}

test03();

// Write a function groupTransactionStats(transactions) that accepts an array of transaction
// objects and groups them by their category.

// Requirements:

// Ignore any transactions marked as status: "failed".

// Group the remaining successful transactions by category.

// For each category, compute:

// totalAmount: The sum of all transaction amounts in that category (rounded to 2 decimal places).

// averageAmount: The average transaction amount in that category (rounded to 2 decimal places).

// count: The total number of successful transactions in that category.

// Return an object where keys are the category names and values are the computed stats.

/**
 * Groups successful transactions by category and calculates aggregate stats.
 *
 * @param {Array<Object>} transactions
 * @returns {Object<string, { totalAmount: number, averageAmount: number, count: number }>}
 */
function groupTransactionStats(transactions) {
  const grouped = transactions.reduce((acc, tx) => {
    if (tx.status !== "successful") return acc;

    if (!acc[tx.category]) {
      acc[tx.category] = { totalAmount: 0, count: 0 };
    }

    acc[tx.category].totalAmount += tx.amount;
    acc[tx.category].count += 1;

    return acc;
  }, {});

  for (const category in grouped) {
    const { totalAmount, count } = grouped[category];

    grouped[category].totalAmount = Number(totalAmount.toFixed(2));
    grouped[category].averageAmount = Number((totalAmount / count).toFixed(2));
  }

  return grouped;
}

// ==========================================
// TEST SUITE
// ==========================================

function test04() {
  const transactions04 = [
    { id: 1, category: "Groceries", amount: 50.5, status: "successful" },
    { id: 2, category: "Electronics", amount: 200, status: "successful" },
    { id: 3, category: "Groceries", amount: 120.25, status: "successful" },
    { id: 4, category: "Electronics", amount: 500, status: "failed" }, // Ignore!
    { id: 5, category: "Entertainment", amount: 15, status: "successful" },
    { id: 6, category: "Groceries", amount: 29.25, status: "successful" },
  ];

  console.log("#Result:", groupTransactionStats(transactions04));

  /*
  Expected Output:
  {
    Groceries: {
      totalAmount: 200,      // (50.5 + 120.25 + 29.25)
      averageAmount: 66.67,  // (200 / 3)
      count: 3
    },
    Electronics: {
      totalAmount: 200,
      averageAmount: 200,
      count: 1
    },
    Entertainment: {
      totalAmount: 15,
      averageAmount: 15,
      count: 1
    }
  }
  */
}

test04();
