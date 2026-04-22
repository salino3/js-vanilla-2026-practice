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

// ultraZipMap
const ultraZipMap = (...args) => {
  // 1. Extract the callback
  const callback = args.slice(-1)[0];

  // 2. Everything else is our data
  const arrays = args.slice(0, -1);

  const maxLength = Math.max(...arrays.map((a) => a.length));

  return Array.from({ length: maxLength }).map((_, i) => {
    // Pass an array of all items at index 'i' to the callback
    const currentItems = arrays.map((a) => a[i]);
    return callback(...currentItems, i, arrays);
  });
};

function functionOrders(orders) {
  let totalItems = 0;

  const result = orders
    .filter((order) => order.status === "delivered" && !!order.customer.member)
    .map(
      (filteredOrder) =>
        `${filteredOrder.customer.name} spent ${filteredOrder.items.reduce(
          (acc, item) => (acc += item.price),
          0,
        )}`,
    );

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

  const reducedCateroies = ultraZipMap(
    orders.map((order) => order.items),
    (arr, i) => {
      return arr.map((item) => item.category);
    },
  ).flat(Infinity);

  const categoryTally = {};

  reducedCateroies.forEach((element) => {
    categoryTally[element] = (categoryTally[element] || 0) + 1;
  });

  return { result, totalRevenue, totalItems, categoryTally };
}

console.log("Task 1:", functionOrders(orders));
