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

console.log("Task 2: ", formattedGuests);

// Task 3
// Find the first "Out of Stock" item: Use .find() to get the object where stock === 0.
// The Logic Check: Use .some() to see if any "Electronics" have stock < 10.
// The Summary Object (The "Single Pass" Challenge):
// Create an object that counts the items per category.
// Constraint: Try to do this using .reduce() so you only iterate the array once to build the final object: { Electronics: 3, Appliances: 2 }.

function checkOutOfStock(inventory) {
  const firstStockZero = inventory.find((item) => item.stock === 0);
  const areSomeItemsLessThan10 = firstStockZero
    ? true
    : inventory.some((item) => item.stock < 10);

  const categoryCounted = inventory.reduce((acc, item) => {
    console.log("clog3", item.stock, acc);

    if (!acc[item.category]) {
      acc[item.category] = 0;
    }
    acc[item.category] += item.stock;

    return acc;
  }, {});

  return {
    firstStockZero,
    areSomeItemsLessThan10,
    categoryCounted,
  };
}

console.log(
  "Task 3: ",
  checkOutOfStock([
    { id: 1, name: "Laptop", category: "Electronics", stock: 5 },
    { id: 2, name: "Coffee Maker", category: "Appliances", stock: 0 },
    { id: 3, name: "Headphones", category: "Electronics", stock: 12 },
    { id: 4, name: "Toaster", category: "Appliances", stock: 2 },
    { id: 5, name: "Smartphone", category: "Electronics", stock: 8 },
  ]),
);

// Task 4
// Create a function that returns an array of unique customers, and sums their total amounts.

function reduceDataCustomer(rawOrders) {
  return Object.values(
    rawOrders.reduce((acc, order) => {
      if (!acc[order.customer]) {
        acc[order.customer] = { customer: order.customer, total: 0 };
      }

      acc[order.customer].total += order.amount || 0;

      return acc;
    }, {}),
  );
}

console.log(
  "Task 4: ",
  reduceDataCustomer([
    { customer: "Alex", amount: 50 },
    { customer: "Bella", amount: 30 },
    { customer: "Alex", amount: 20 },
    { customer: "Chris", amount: 100 },
    { customer: "Bella", amount: 10 },
  ]),
);

// Task 5
// Step 1: Use reduce on the employees array to get total spending per department
// (e.g., { Engineering: 240000, ... }).
// Step 2: Use filter or reduce on the budgets array to compare the limits with your
// totals and calculate the overBy amount.

const employees = [
  { id: 2, name: "Bob", dept: "Marketing", salary: 50000 },
  { id: 1, name: "Alice", dept: "Engineering", salary: 80000 },
  { id: 3, name: "Charlie", dept: "Engineering", salary: 90000 },
  { id: 4, name: "David", dept: "Sales", salary: 60000 },
  { id: 5, name: "Emily", dept: "Engineering", salary: 70000 },
  { id: 6, name: "Frank", dept: "Marketing", salary: 45000 },
];

const budgets = [
  { dept: "Engineering", limit: 200000 },
  { dept: "Marketing", limit: 100000 },
  { dept: "Sales", limit: 50000 },
];

function checkBudgetDepartaments(employees, budgets) {
  const spendingDepartament = employees.reduce((acc, workers) => {
    if (!acc[workers.dept]) {
      acc[workers.dept] = 0;
    }

    acc[workers.dept] += workers.salary;

    return acc;
  }, {});

  return budgets.reduce((acc, item) => {
    acc[item.dept] = item.limit < spendingDepartament[item.dept];
    return acc;
  }, {});
}

console.log("Task 5: ", checkBudgetDepartaments(employees, budgets));

//
let book = {
  title: "JavaScript Essentials",
};

let additionalDetails = {
  author: "Alex Doe",
  year: 2023,
};

Object.assign(book, additionalDetails);

// Displaying the result variable 'book'
console.log("Book Details:", book);
