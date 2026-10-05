// Write a function extractActiveUserEmails(users) that takes an array of nested user objects and
// returns an array of unique email addresses belonging to active users.

// Iterate through the array of user objects.

// A user is considered active if status.active === true.

// Collect their email address if available (found under contact.email).

// The returned array should contain only lowercase emails with no duplicate values.

const users = [
  {
    id: 1,
    status: { active: true },
    contact: { email: "ALICE@example.com" },
  },
  {
    id: 2,
    status: { active: false },
    contact: { email: "bob@example.com" },
  },
  {
    id: 3,
    status: { active: true },
    contact: { email: "alice@example.com" }, // Duplicate email (different casing)
  },
  {
    id: 4,
    status: { active: true },
    contact: {}, // Missing email
  },
];

function extractActiveUserEmails(users) {
  const reducedUsers = users.reduce((acc, user) => {
    if (user.status.active && user.contact.email) {
      acc.add(user.contact.email.toLowerCase());
    }
    return acc;
  }, new Set());

  return [...reducedUsers];
}

console.log("Task 1:", extractActiveUserEmails(users));

// Write a function calculateCategoryTotals(orders) that processes a list of customer orders
// containing nested items and returns total sales per product category.

// Iterate through an array of orders, where each order contains an array of items.

// Skip any order where status is not "completed" (e.g., ignore "pending" or "cancelled").

// Calculate the total price for each item using: price * quantity * (1 - discount).

// Aggregate the totals by category.

// Round each category total to 2 decimal places.

// Return an object where keys are category names and values are total sales.

const orders = [
  {
    id: "ord_1",
    status: "completed",
    items: [
      {
        name: "Laptop",
        category: "Electronics",
        price: 1000,
        quantity: 1,
        discount: 0.1,
      }, // 1000 * 1 * 0.9 = 900
      {
        name: "Mouse",
        category: "Electronics",
        price: 50,
        quantity: 2,
        discount: 0,
      }, // 50 * 2 * 1 = 100
    ],
  },
  {
    id: "ord_2",
    status: "cancelled",
    items: [
      {
        name: "Phone",
        category: "Electronics",
        price: 500,
        quantity: 1,
        discount: 0,
      },
    ],
  },
  {
    id: "ord_3",
    status: "completed",
    items: [
      {
        name: "Desk Chair",
        category: "Furniture",
        price: 150,
        quantity: 2,
        discount: 0.2,
      }, // 300 * 0.8 = 240
      {
        name: "Monitor",
        category: "Electronics",
        price: 300,
        quantity: 1,
        discount: 0.05,
      }, // 300 * 0.95 = 285
    ],
  },
];

function calculateCategoryTotals(orders) {
  const filteredOreds = orders.filter((order) => order.status === "completed");
  const mappedOrders = filteredOreds.flatMap((order) =>
    order.items.map((item) => {
      const resultItem =
        item.quantity * item.price - item.quantity * item.price * item.discount;

      return {
        name: item.name,
        category: item.category,
        totalPrice: resultItem,
      };
    }),
  );

  const result = Object.groupBy(mappedOrders, ({ category }) => category);
  console.log("clog2", result);
  return mappedOrders;
}

console.log("Task 2:", calculateCategoryTotals(orders));
