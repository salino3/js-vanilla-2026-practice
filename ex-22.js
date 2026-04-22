const orders = [
  {
    id: 101,
    customer: { name: "Alice", member: true },
    items: [
      { name: "Laptop", price: 1200, category: "Electronics" },
      { name: "Mouse", price: 25, category: "Electronics" },
    ],
    status: "delivered",
  },
  {
    id: 102,
    customer: { name: "Bob", member: false },
    items: [
      { name: "Book: JS Guide", price: 30, category: "Books" },
      { name: "Coffee Mug", price: 15, category: "Kitchen" },
    ],
    status: "delivered",
  },
  {
    id: 103,
    customer: { name: "Charlie", member: true },
    items: [
      { name: "Smartphone", price: 800, category: "Electronics" },
      { name: "Case", price: 20, category: "Accessories" },
    ],
    status: "pending",
  },
  {
    id: 104,
    customer: { name: "David", member: true },
    items: [{ name: "Monitor", price: 300, category: "Electronics" }],
    status: "delivered",
  },
];

// Filter: Create a new array containing only orders that have been delivered.

// Filter & Map: From that delivered list, find orders where the customer is a member.
// Return an array of strings formatted as: "CustomerName spent $TotalAmount".

// Hint: You'll need reduce inside the map to calculate the total price of items for each order.

// Reduce: Create a single object that summarizes the total revenue across all orders (including pending)
//  and the total count of items sold.

// Desired Output Format: { totalRevenue: 2390, totalItems: 6 }

// Advanced (Optional): Use flatMap and reduce to create a "Category Tally" object that shows how many
//  items were bought in each category.

// Desired Output Format: { Electronics: 4, Books: 1, ... }

function functionOrders(orders) {
  const result = orders
    .filter((order) => order.status === "delivered" && !!order.customer.member)
    .map(
      (filteredOrder) =>
        `${filteredOrder.customer.name} spent ${filteredOrder.items.reduce(
          (acc, item) => (acc += item.price),
          0,
        )}`,
    );

  let totalItems = 0;
  const totalRevenue = orders.reduce((acc, order) => {
    if (order.items.length > 0) {
      acc += order.items.reduce((acc, item) => {
        totalItems++;
        acc += item.price;

        return acc;
      }, 0);
    } else {
      return acc;
    }

    return acc;
  }, 0);

  return { result, totalRevenue, totalItems };
}

console.log("Task 1:", functionOrders(orders));
