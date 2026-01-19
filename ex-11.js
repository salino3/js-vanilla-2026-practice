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

// Task 2
// Filter: Create a new array called adultsOnly that only includes people aged 18 or older.
// Map: Create a new array of strings called formattedGuests. Each string should be formatted as: "LASTNAME, Firstname".
// Example: { firstName: "jane", lastName: "doe" } becomes "DOE, Jane".
// Crucial Step: You must ensure the Last Name is all uppercase and the First Name has the first letter capitalized (even if the data is messy).
// Output: Use a loop or .forEach() to log each formatted name to the console.

const guests = [
  { firstName: "jane", lastName: "doe", age: 25 },
  { firstName: "bob", lastName: "smith", age: 15 },
  { firstName: "alice", lastName: "williams", age: 32 },
  { firstName: "charlie", lastName: "brown", age: 17 },
  { firstName: "emily", lastName: "davis", age: 45 },
];

const formattedGuests = [];
for (let i = 0; guests.length > i; i++) {
  if (guests[i].age > 17) {
    formattedGuests.push(
      `${guests[i].lastName.toUpperCase()}, ${guests[i].firstName.charAt(0).toUpperCase() + guests[i].firstName.slice(1)}`,
    );
  }
}

console.log("clog1", formattedGuests);
