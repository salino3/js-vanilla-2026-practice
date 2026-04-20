const transactions = [
  {
    id: "T1",
    customer: "Alice",
    items: ["Laptop", "Mouse"],
    total: 1200,
    status: "complete",
  },
  {
    id: "T2",
    customer: "bob",
    items: ["Keyboard"],
    total: 150,
    status: "complete",
  },
  {
    id: "T1",
    customer: "Alice",
    items: ["Laptop", "Mouse"],
    total: 1200,
    status: "complete",
  },
  {
    id: "T3",
    customer: "charlie",
    items: ["Monitor", "HDMI Cable"],
    total: 300,
    status: "pending",
  },
  {
    id: "T4",
    customer: "ALICE",
    items: ["Headphones"],
    total: 100,
    status: "complete",
  },
  {
    id: "T5",
    customer: "Bob",
    items: ["Webcam"],
    total: 80,
    status: "complete",
  },
];

// Remove Duplicates: Ensure every transaction ID is unique.

// Normalize Names: Convert all customer names to Title Case (e.g., "ALICE" and "alice"
// both become "Alice").

// Filter Results: Keep only the transactions where the status is "complete".

// Consolidate Data: Create a final object that shows:

// totalRevenue: The sum of all total values.

// uniqueCustomers: An array of unique, normalized customer names.

// allProducts: A single flat array containing every item purchased across all valid transactions.

function transformData(transactions) {
  let transformedTransactions = transactions.filter((value, index, array) => {
    const firstIndex = array.findIndex((item) => item.id === value.id);

    return firstIndex === index && value.status === "complete";
  });

  transformedTransactions = transformedTransactions.reduce(
    (acc, item) => {
      acc.totalRevenue += item.total;
      acc.uniqueCustomers.add(
        item.customer.charAt(0).toUpperCase() +
          item.customer.slice(1).toLowerCase(),
      );
      acc.allProducts.push(...item.items);
      return acc;
    },
    { totalRevenue: 0, uniqueCustomers: new Set(), allProducts: [] },
  );

  return {
    ...transformedTransactions,
    // convert Set() to Array
    uniqueCustomers: [...transformedTransactions.uniqueCustomers],
  };
}

console.log("Task 1:", transformData(transactions));

//
function transformDataV2(transactions) {
  const seenIds = new Set();

  const result = transactions.reduce(
    (acc, item) => {
      if (seenIds.has(item.id) || item.status !== "complete") {
        return acc;
      }

      seenIds.add(item.id);

      acc.totalRevenue += item.total;
      acc.uniqueCustomers.add(
        item.customer.charAt(0).toUpperCase() +
          item.customer.slice(1).toLowerCase(),
      );
      acc.allProducts.push(...item.items);

      return acc;
    },
    { totalRevenue: 0, uniqueCustomers: new Set(), allProducts: [] },
  );

  // Final Step: Convert Set to Array
  result.uniqueCustomers = Array.from(result.uniqueCustomers);

  return result;
}

console.log("Task 1 V2:", transformDataV2(transactions));

//
const events = [
  {
    session: "S1",
    region: "US",
    platform: "Web",
    details: { item: "Shoes", price: 100, currency: "USD" },
  },
  {
    session: "S2",
    region: "EU",
    platform: "App",
    details: { item: "Hat", price: 50, currency: "EUR" },
  },
  {
    session: "S1",
    region: "US",
    platform: "Web",
    details: { item: "Shoes", price: 100, currency: "USD" },
  }, // Duplicate
  {
    session: "S3",
    region: "US",
    platform: "Web",
    details: { item: "Jacket", price: 200, currency: "USD" },
  },
  {
    session: "S4",
    region: "EU",
    platform: "Web",
    details: { item: "Shoes", price: 80, currency: "EUR" },
  },
  { session: "S5", region: "AS", platform: "App", details: null }, // Corrupted data
  {
    session: "S6",
    region: "EU",
    platform: "App",
    details: { item: "Gloves", price: 30, currency: "EUR" },
  },
];

// Conversion rates (to USD)
const rates = { EUR: 1.1, USD: 1.0 };

// Write a function generateReport(events) that returns a single object structured by Region.

//X For each region, calculate:

//X totalRevenueUSD: The sum of all prices converted to USD using the rates object.

//X platforms: An array of unique platforms used in that region (e.g., ["Web", "App"]).

// topSellingItem: The name of the item that appeared most frequently in that region.

// Data Integrity:

//X Skip any event where details is null.

//X Ignore duplicate session IDs.

function generateReport(events) {
  const seenIds = new Set();

  const report = events.reduce((acc, event) => {
    if (!event.details || seenIds.has(event.session)) return acc;
    seenIds.add(event.session);

    const { region, platform, details } = event;
    const { item, price, currency } = details;

    if (!acc[region]) {
      acc[region] = {
        totalRevenueUSD: 0,
        platforms: new Set(),
        itemCounts: {}, // Helper to track frequency per region
        topSellingItem: "",
      };
    }

    const target = acc[region];

    const priceInUSD = price * (rates[currency] || 1);
    target.totalRevenueUSD += priceInUSD;

    target.platforms.add(platform);

    target.itemCounts[item] = (target.itemCounts[item] || 0) + 1;

    const currentTopCount = target.itemCounts[target.topSellingItem] || 0;
    if (target.itemCounts[item] > currentTopCount) {
      target.topSellingItem = item;
    }

    return acc;
  }, {});

  return Object.fromEntries(
    Object.entries(report).map(
      ([region, { itemCounts, platforms, ...metrics }]) => [
        region,
        { ...metrics, platforms: Array.from(platforms) },
      ],
    ),
  );
}

console.log("Task 2:", generateReport(events));

//
const inventory = [
  {
    category: "Laptops",
    items: [
      { id: 101, name: "MacBook Pro", price: 2500, stock: 5 },
      { id: 102, name: "Dell XPS", price: 1500, stock: 0 },
      { id: 103, name: "ThinkPad X1", price: 1800, stock: 12 },
    ],
  },
  {
    category: "Accessories",
    items: [
      { id: 201, name: "Mechanical Keyboard", price: 150, stock: 25 },
      { id: 202, name: "Wireless Mouse", price: 50, stock: 40 },
    ],
  },
];

// Find Out of Stock: Write a function getOutOfStock(data) that returns an array of just the names of products
// where stock is 0. Calculate Category Value: Write a function getCategoryValue(data, categoryName) that calculates
// the total value of all items in a specific category (Price $\times$ Stock). Apply Discount: Create a new array
// called discountedInventory where every item priced over $1,000 gets a 10% discount. Note: Don't mutate the original array!

//
function getOutOfStock(data) {
  const newData = data.flatMap((product) =>
    product.items.reduce(
      (acc, item) => (item.stock === 0 ? [...acc, item.name] : acc),
      [],
    ),
  );

  return newData;
}

//
function getCategoryValue(data, categoryName) {
  const category = data.find((cat) => cat.category === categoryName);
  if (!category) return 0;

  return category.items.reduce((total, item) => {
    return total + item.price * item.stock;
  }, 0);
}

//
function discountedInventory(data, over = 1000, percentageDiscount = 10) {
  const newData = data.map((product) => ({
    ...product,
    items: product.items.map((item) => ({
      ...item,
      price:
        item.price > over
          ? item.price - (item.price / 100) * percentageDiscount
          : item.price,
    })),
  }));

  return newData;
}

console.log(
  "Task 3:",
  getOutOfStock(inventory),
  getCategoryValue(inventory, "Accessories"),
  discountedInventory(inventory),
);
