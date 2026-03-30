const cart = [
  { name: "Apple", price: 0.5, available: true },
  { name: "Milk", price: 2.5, available: false },
  { name: "Bread", price: 1.2, available: true },
  { name: "Chocolate", price: 3.0, available: true },
  { name: "Eggs", price: 1.5, available: false },
];

// Write a function called calculateTotal that:

// Filters out items where available is false.

// Sums up the price of the remaining items.

// Returns the final total as a number.

function TotalAvailablePrice(cart) {
  const calcutatedCart = cart.reduce((acc, el) => {
    acc += el.available ? el.price : 0;

    return acc;
  }, 0);
  return calcutatedCart;
}

console.log("Task 1 ", TotalAvailablePrice(cart));
