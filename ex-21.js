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
