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
  const result = stores.map((store) =>
    store.products.reduce((acc, product) => {
      if (product.price <= maxPrice && product.stock > 0) {
        const item = {
          ...product,
          storeName: store.storeName,
        };
        acc = [...acc, item];
      }

      return acc;
    }, []),
  );

  return result;
}

console.log("Task 2", findBestDeals(stores, 30));
