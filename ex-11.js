// Task 1
// Write a function called calculateTotal that takes this array as an argument.
// Inside the function:
// Initialize a variable for the total.
// Loop through the array.
// Add each price to the total.
// If a price is over $50, apply a 10% discount to that specific item before adding it to the total.
// Log the final result to the console with a friendly message like: "The total price is: $XX.XX".

function calculateTotal(shoppingCart) {
  return `The total price is: $${shoppingCart
    .reduce(
      (acc, product) => {
        acc.price += product.price > 50 ? product.price * 0.9 : product.price;
        return acc;
      },
      { name: "name", price: 0 },
    )
    .price.toFixed(2)}`;
}

console.log(
  "Task 1: ",
  calculateTotal([
    { name: "Wireless Mouse", price: 25.0 },
    { name: "Mechanical Keyboard", price: 75.0 },
    { name: "HDMI Cable", price: 15.5 },
    { name: "Gaming Monitor", price: 120.0 },
    { name: "USB-C Hub", price: 45.0 },
  ]),
);
