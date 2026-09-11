// You work for an e-commerce platform. Write a function named calculateOrderTotals(inventory, order)
// that takes an inventory catalog and a customer order, then returns a summary object.

// Search through the nested categories and products to match each item in the order by productId.

// Check if the item is in stock (stock >= quantity):

// If in stock: Calculate lineTotal (price * quantity), and collect the item details in an
// approved array.

// If insufficient stock: Do not include it in the financial total. Collect the item
// details in a rejected array with a reason "Insufficient stock".

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
  const allProducts = inventory.flatMap((cat) => cat.products);

  let grandTotal = 0;
  const approvedItems = [];
  const rejectedItems = [];

  for (const item of order.items) {
    const product = allProducts.find((p) => p.id === item.productId);

    if (!product || product.stock < item.quantity) {
      rejectedItems.push({
        productId: item.productId,
        requestedQuantity: item.quantity,
        reason: "Insufficient stock",
      });
    } else {
      const lineTotal = product.price * item.quantity;
      grandTotal += lineTotal;

      approvedItems.push({
        name: product.name,
        quantity: item.quantity,
        lineTotal: lineTotal,
      });
    }
  }

  return {
    orderId: order.orderId,
    grandTotal,
    approvedItems,
    rejectedItems,
  };
}

console.log("Task 1", calculateOrderTotals(inventory, order));
