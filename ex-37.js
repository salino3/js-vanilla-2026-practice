// Your goal is to write a single function that parses this data to find your VIP
// customers based on their spending habits.

const storeData = [
  {
    branchId: "BR-101",
    location: "Downtown",
    customers: [
      {
        id: "CUST-001",
        name: "Alice Smith",
        tier: "Gold",
        orders: [
          {
            orderId: "ORD-991",
            date: "2026-03-15",
            items: [
              { sku: "SKU-ABC", quantity: 2, pricePerUnit: 15.0 }, // 30.00
              { sku: "SKU-XYZ", quantity: 1, pricePerUnit: 120.0 }, // 120.00
            ],
          },
          {
            orderId: "ORD-992",
            date: "2026-04-02",
            items: [
              { sku: "SKU-MNO", quantity: 3, pricePerUnit: 10.0 }, // 30.00
            ],
          },
        ],
      },
      {
        id: "CUST-002",
        name: "Bob Jones",
        tier: "Silver",
        orders: [
          {
            orderId: "ORD-993",
            date: "2026-05-10",
            items: [
              { sku: "SKU-ABC", quantity: 1, pricePerUnit: 15.0 }, // 15.00
            ],
          },
        ],
      },
    ],
  },
  {
    branchId: "BR-202",
    location: "Uptown",
    customers: [
      {
        id: "CUST-003",
        name: "Charlie Brown",
        tier: "Platinum",
        orders: [
          {
            orderId: "ORD-994",
            date: "2026-01-20",
            items: [
              { sku: "SKU-LUX", quantity: 1, pricePerUnit: 500.0 }, // 500.00
            ],
          },
        ],
      },
    ],
  },
];

// Calculate Total Spend: For every customer across all branches, calculate their lifetime
// total spend. Total spend for an item is quantity * pricePerUnit.

// Filter by Threshold: Keep only the customers whose total spend is greater than or equal to
//  the minSpend value.

// Format the Output: Return an array of objects containing only the customer's name, tier,
//  and their calculated totalSpend (rounded to two decimal places).

// Sort the Results: The final array must be sorted in descending order based on their totalSpend.

function findVIPs(data, minSpend) {
  // Your code here
}

console.log("Task 1", findVIPs(storeData, 100));
