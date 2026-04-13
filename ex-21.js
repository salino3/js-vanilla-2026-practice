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
  const reducedEvents = events.reduce(
    (acc, event) => {
      if (seenIds.has(event.session) || !event.details) {
        return acc;
      }

      let transformedEvent = {
        ...event,
        details:
          event.details.currency === "USD"
            ? event.details.price
            : event.details.price * rates.USD,
      };

      acc.regions[event.region] =
        acc.regions[event.region] && acc.regions[event.region]?.length > 0
          ? [...acc.regions[event.region], ...[transformedEvent]]
          : [transformedEvent];

      if (acc.regions[event.region].platforms) {
        if (
          !acc.regions[event.region].platforms.includes(
            transformedEvent.platform,
          )
        ) {
          acc.regions[event.region].platforms.push(transformedEvent.platform);
        }
      } else {
        acc.regions[event.region].platforms = [transformedEvent.platform];
      }

      //
      if (acc.topSellingItem[event.details.item]) {
        acc.topSellingItem[event.details.item]++;
      } else {
        acc.topSellingItem[event.details.item] = 1;
      }

      return acc;
    },
    { regions: {}, topSellingItem: {} },
  );

  //
  let sellingItem = Object.entries(reducedEvents.topSellingItem).reduce(
    (acc, [key, value], index, arr) => {
      if (acc.num < value) {
        acc = {
          name: key,
          num: value,
        };
      }

      return arr.length - 1 === index ? acc.name : acc;
    },
    { name: "", num: 0 },
  );

  return { ...reducedEvents, topSellingItem: sellingItem };
}

console.log("Task 2:", generateReport(events));
