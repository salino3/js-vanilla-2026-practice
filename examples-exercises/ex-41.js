// You work for an e-commerce platform. Write a function named calculateOrderTotals(inventory, order)
// that takes an inventory catalog and a customer order, then returns a summary object.

const inventory = [
  {
    category: "Electronics",
    products: [
      { id: "e1", name: "Laptop", price: 1000, stock: 5 },
      { id: "e2", name: "Mouse", price: 25, stock: 12 },
    ],
  },
  {
    category: "Books",
    products: [
      { id: "b1", name: "JS Guide", price: 30, stock: 8 },
      { id: "b2", name: "CSS Basics", price: 20, stock: 0 },
    ],
  },
];

//
const order = {
  orderId: "ORD-9912",
  items: [
    { productId: "e1", quantity: 2 },
    { productId: "e2", quantity: 1 },
    { productId: "b1", quantity: 3 },
    { productId: "b2", quantity: 1 }, // Out of stock!
  ],
};

function calculateOrderTotals(inventory, order) {
  return;
}

console.log("Task 1", calculateOrderTotals(inventory, order));
