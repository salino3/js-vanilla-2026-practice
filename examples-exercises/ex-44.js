// Imagine you are building a personal finance dashboard. You need to write a JavaScript function
// named analyzeExpenses that processes an array of transaction objects,
// filters them, groups them by category, and returns a sorted summary.

// Function Signature & Requirements
// Write a function analyzeExpenses(transactions, minAmount) that takes:

// transactions: An array of objects, where each object has { id, category, amount, date }.

// minAmount: A number representing the minimum threshold. Only transactions with an amount
//  greater than or equal to minAmount should be included.

// Expected Output
// The function should return an array of objects representing each category's total spending,
//  sorted from highest total spending to lowest.
// Each object in the resulting array should look like this:
// { category: "String", total: Number, count: Number }

const transactions = [
  { id: 1, category: "Food", amount: 45, date: "2026-06-01" },
  { id: 2, category: "Transport", amount: 15, date: "2026-06-02" },
  { id: 3, category: "Food", amount: 120, date: "2026-06-03" },
  { id: 4, category: "Entertainment", amount: 60, date: "2026-06-04" },
  { id: 5, category: "Transport", amount: 5, date: "2026-06-05" },
  { id: 6, category: "Food", amount: 30, date: "2026-06-06" },
];

function analyzeExpenses(transactions, minAmount) {
  const result = transactions.reduce((acc, item) => {
    if (item.amount >= minAmount) {
      if (acc[item.category]) {
        acc[item.category] = {
          ...acc[item.category],
          total: (acc[item.category].total += item.amount),
          count: (acc[item.category].count += 1),
        };
      } else {
        acc[item.category] = {
          category: item.category,
          total: item.amount,
          count: 1,
        };
      }
    }

    return acc;
  }, {});

  return Object.values(result).toSorted((a, b) => b.total - a.total);
}

console.log("Task 1", analyzeExpenses(transactions, 20));

// Imagine you're building a price-comparison tool. You have data from multiple online stores,
// and each store carries a list of products.

// You need to write a JavaScript function named findBestDeals(stores, maxPrice) that processes
// this nested store data and finds the best affordable items.

// Write a function findBestDeals(stores, maxPrice) that takes:

// stores: An array of store objects. Each store looks like this:
// { storeId: Number, storeName: String, products:
//    [ { id: Number, name: String, price: Number, stock: Number }, ... ] }

// maxPrice: A number representing the maximum budget.

// Expected Output
// The function should return a single flattened array of product objects that meet these rules:

// Filter: The product's price must be less than or equal to maxPrice, and its stock must be
// greater than 0 (in stock).

// Enrich: Each product object in the final array should also include the storeName it belongs
//  to (e.g., { id: 1, name: "Laptop", price: 800, stock: 5, storeName: "TechZone" }).

// Sort: Sort the results by price from lowest to highest. If two products have the same price,
// sort them by stock from highest to lowest.

// Limit: Return only the top 3 best deals.

const stores = [
  {
    storeId: 1,
    storeName: "TechHub",
    products: [
      { id: 101, name: "Wireless Mouse", price: 25, stock: 10 },
      { id: 102, name: "Mechanical Keyboard", price: 80, stock: 0 }, // Out of stock!
      { id: 103, name: "USB-C Hub", price: 25, stock: 4 },
    ],
  },
  {
    storeId: 2,
    storeName: "GadgetStore",
    products: [
      { id: 201, name: "Wireless Mouse", price: 20, stock: 15 },
      { id: 202, name: "Monitor", price: 150, stock: 3 },
      { id: 203, name: "Desk Mat", price: 15, stock: 20 },
    ],
  },
];

// Let's look for deals under $30
const result = findBestDeals(stores, 30);

function findBestDeals(stores, maxPrice) {
  const result = stores.flatMap((store) =>
    store.products.reduce((acc, product) => {
      if (product.price <= maxPrice && product.stock > 0) {
        return [
          ...acc,
          {
            ...product,
            storeName: store.storeName,
          },
        ];
      }

      return acc;
    }, []),
  );

  return result
    .toSorted((a, b) => {
      if (a.price !== b.price) {
        return a.price - b.price;
      }
      return b.stock - a.stock;
    })
    .slice(0, 3);
}

console.log("Task 2", findBestDeals(stores, 30));

// Imagine you are building a checkout system for an online store. You need to write a JavaScript
//  function named calculateCart(cart, promoCode) that calculates the final totals, applies
//  valid discounts, and factors in tax.

// Write a function calculateCart(cart, promoCode) that takes:

// cart: An array of items, where each item looks like:
// { id: Number, name: String, price: Number, quantity: Number }.

// promoCode: A string representing a discount code (can be null or an invalid string).

// Promo Code Rules:
// "SAVE10": Gives a 10% discount off the subtotal.

// "SAVE20": Gives a 20% discount off the subtotal.

// "FLAT15": Takes $15 off the subtotal (ensure the subtotal doesn't drop below 0).

// Any other code or null/undefined: Gives 0% discount.

// Expected Output
// The function should return an object with the following structure
// (round monetary values to 2 decimal places if needed, or keep them as accurate numbers):

// {
//   itemCount: Number,       // Total quantity of all items combined
//   subtotal: Number,        // Sum of (price * quantity) before discounts
//   discountAmount: Number,  // The money saved from the promo code
//   tax: Number,             // 10% tax calculated ON THE DISCOUNTED subtotal
//   finalTotal: Number       // Discounted subtotal + tax
// }

const cart = [
  { id: 1, name: "Sneakers", price: 80, quantity: 1 },
  { id: 2, name: "Socks", price: 5, quantity: 3 },
  { id: 3, name: "T-Shirt", price: 20, quantity: 2 },
];

// Subtotal = (80 * 1) + (5 * 3) + (20 * 2) = 80 + 15 + 40 = 135
// Item count = 1 + 3 + 2 = 6

function calculateCart(cart, promoCode) {
  const promoCodes = {
    "SAVE10": 10,
    "SAVE20": 20,
    "FLAT15": 15,
  };

  const result = cart.reduce(
    (acc, cartItem, index, array) => {
      acc.itemCount = acc.itemCount += cartItem.quantity;
      acc.subtotal += cartItem.price * cartItem.quantity;

      if (index === array.length - 1) {
        const discount = promoCode ? promoCodes[promoCode] : 0;

        const totalDiscount =
          promoCode === "FLAT15" ? discount : (acc.subtotal / 100) * discount;
        const totalTaxes = ((acc.subtotal - totalDiscount) / 100) * 10;

        acc.discountAmount = totalDiscount;
        acc.finalTotal = acc.subtotal - totalDiscount + totalTaxes;
        acc.tax = totalTaxes;
      }

      return acc;
    },
    {
      itemCount: 0, // Total quantity of all items combined
      subtotal: 0, // Sum of (price * quantity) before discounts
      discountAmount: 0, // The money saved from the promo code
      tax: 0, // 10% tax calculated ON THE DISCOUNTED subtotal
      finalTotal: 0, // Discounted subtotal + tax
    },
  );

  return result;
}

console.log("Task 3", calculateCart(cart, "SAVE10"));

// Imagine you need to fetch data for a list of users from an external API or database using
// their IDs.
// However, the external service enforces a rate limit: you cannot make more than N requests
// at the same time.

// Write an asynchronous function processInBatches that:

// Accepts an items array (e.g., user IDs).

// Accepts an asyncTask function (an asynchronous function that takes a single item
//  and returns a Promise).

// Accepts an integer batchSize representing the maximum number of concurrent executions allowed.

// Executes the calls in batches (or maintains a concurrency limit) and returns an array
// containing all results in the same order as the input items.

/**
 * Executes async tasks with a maximum concurrency limit.
 *
 * @param {Array<any>} items - Array of elements to process
 * @param {Function} asyncTask - Async function (item) => Promise<any>
 * @param {number} batchSize - Maximum number of concurrent operations
 * @returns {Promise<Array<any>>} - Array containing all results in the original order
 */
async function processInBatches(items, asyncTask, batchSize) {
  const results = [];

  for (let i = 0; i < items.length; i += batchSize) {
    // 1. Slice the array into a chunk of max length `batchSize`
    const batch = items.slice(i, i + batchSize);

    // 2. Map items to promises and wait for all promises in this batch to complete
    const batchResults = await Promise.all(
      batch.map((item) => asyncTask(item)),
    );

    // 3. Store results maintaining chunk order
    results.push(...batchResults);
  }

  return results;
}

// ==========================================
// TEST SUITE
// ==========================================

// Simulates an API call that takes a variable amount of time
const mockFetchUser = async (id) => {
  const delay = Math.floor(Math.random() * 500) + 200;
  await new Promise((resolve) => setTimeout(resolve, delay));
  console.log(`[DONE] User ${id} processed in ${delay}ms`);
  return { id, name: `User_${id}` };
};

async function test() {
  const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const batchSize = 3;

  console.time("Total Execution Time");
  console.log(
    `Starting processing for ${userIds.length} users with a batch size of ${batchSize}...`,
  );

  const results = await processInBatches(userIds, mockFetchUser, batchSize);

  console.timeEnd("Total Execution Time");
  console.log("Final Results:", results);
}

// test();

// Create a function/class createCache that returns a cache object to store key-value pairs
// in memory.

// The cache must support two operations: get(key) and set(key, value, ttlMs).

// set(key, value, ttlMs):

// Stores a key with its value.

// ttlMs (Time-To-Live in milliseconds) is optional. If provided, the key automatically expires
// after ttlMs milliseconds and should no longer be returned by get.

// If the cache reaches its maxCapacity, it must remove the Least Recently Used (LRU) item before
// adding a new one.

// get(key):

// Returns the value if the key exists and has not expired.

// If the key is accessed via get, it becomes the most recently used item.

// Returns null if the key does not exist or has expired.

/**
 * Creates an LRU Cache with key expiration support.
 *
 * @param {number} maxCapacity - Maximum number of items the cache can hold
 */
function createCache(maxCapacity) {
  const cache = new Map();
  return {
    /**
     * @param {string} key
     * @returns {any | null}
     */
    cacheGet(key) {
      if (!cache.has(key)) return null;

      const item = cache.get(key);

      if (item.expiresAt && Date.now() > item.expiresAt) {
        cache.delete(key); // Eliminar elemento expirado
        return null;
      }

      cache.delete(key);
      cache.set(key, item);

      return item.value;
    },

    /**
     * @param {string} key
     * @param {any} value
     * @param {number} [ttlMs] - Time-to-live in milliseconds
     */
    cacheSet(key, value, ttlMs) {
      if (cache.has(key)) {
        cache.delete(key);
      } else if (cache.size >= maxCapacity) {
        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
      }

      const expiresAt = ttlMs ? Date.now() + ttlMs : null;

      cache.set(key, { value, expiresAt });
    },
  };
}

// ==========================================
// TEST SUITE
// ==========================================

async function test02() {
  const cache = createCache(2); // Max capacity of 2 items

  console.log("--- Test 1: Basic Set & Get ---");
  cache.cacheSet("a", 100);
  cache.cacheSet("b", 200);
  console.log("Get a:", cache.cacheGet("a")); // Expected: 100
  console.log("Get b:", cache.cacheGet("b")); // Expected: 200

  console.log("\n--- Test 2: LRU Eviction ---");
  // Cache currently has ['a', 'b']. 'b' was accessed last, so 'a' is LRU.
  // Wait, in Test 1 we accessed 'a' then 'b', so 'a' is the least recently used!
  cache.cacheSet("c", 300); // Should evict 'a'
  console.log("Get a (should be evicted):", cache.cacheGet("a")); // Expected: null
  console.log("Get c:", cache.cacheGet("c")); // Expected: 300

  console.log("\n--- Test 3: TTL Expiration ---");
  cache.cacheSet("d", 400, 500); // Expires in 500ms
  console.log("Get d immediately:", cache.cacheGet("d")); // Expected: 400

  await new Promise((resolve) => setTimeout(resolve, 600)); // Wait 600ms
  console.log("Get d after 600ms:", cache.cacheGet("d")); // Expected: null
}

// test02();

// Scrivi una funzione summarizeTransactions(transactions) che prende in ingresso un array
// di transazioni e restituisce un oggetto in cui:

// Le chiavi sono gli userId.

// Il valore per ciascuna chiave è il totale della somma dei loro acquisti (amount).

// Vanno considerate solo le transazioni con stato "completed" (quelle con stato "pending"
//   o "failed" vanno ignorate).

/**
 * Summarizes total completed transaction amounts per user.
 *
 * @param {Array<{id: number, userId: string, amount: number, status: string}>} transactions
 * @returns {Object.<string, number>}
 */
function summarizeTransactions(transactions) {
  const result = transactions.reduce((acc, order) => {
    if (order.status === "completed") {
      acc[order.userId] = (acc[order.userId] ?? 0) + order.amount;
    }
    return acc;
  }, {});

  return result;
}

// ==========================================
// TEST SUITE
// ==========================================

const transactions02 = [
  { id: 1, userId: "userA", amount: 50, status: "completed" },
  { id: 2, userId: "userB", amount: 100, status: "completed" },
  { id: 3, userId: "userA", amount: 30, status: "failed" },
  { id: 4, userId: "userA", amount: 20, status: "completed" },
  { id: 5, userId: "userB", amount: 40, status: "pending" },
  { id: 6, userId: "userC", amount: 15, status: "completed" },
];

console.log(summarizeTransactions(transactions02));

// Write a function findDuplicateEmails(users) that takes an array of user objects and returns
// an object containing only the emails that appear more than once, along with their total count.

// The comparison should be case-insensitive (e.g., "John@example.com" and "john@example.com"
//    should be counted as the same email).

// Emails that appear only once should not be included in the final object.

const users02 = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "ALICE@example.com" }, // Duplicate (case-insensitive)
  { id: 4, name: "David", email: "david@example.com" },
  { id: 5, name: "Eve", email: "bob@example.com" }, // Duplicate
  { id: 6, name: "Frank", email: "Alice@example.com" }, // Duplicate
];

/**
 * Finds duplicate emails in a list of users (case-insensitive).
 *
 * @param {Array<{id: number, name: string, email: string}>} users
 * @returns {Object.<string, number>} - Object with duplicate emails in lowercase and their counts
 */
function findDuplicateEmails(users) {
  const usersReduced = users.reduce((acc, user) => {
    const email = user.email.toLowerCase();

    acc[email] = (acc[email] ?? 0) + 1;
    return acc;
  }, {});

  const result = {};
  for (let item in usersReduced) {
    if (usersReduced[item] > 1) {
      result[item] = usersReduced[item];
    }
  }

  return result;
}

console.log(findDuplicateEmails(users02));
