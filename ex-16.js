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

//
const products = [
  { name: "Apple", category: "Fruit", price: 0.5 },
  { name: "Banana", category: "Fruit", price: 0.3 },
  { name: "Steak", category: "Meat", price: 10.0 },
  { name: "Chicken", category: "Meat", price: 7.0 },
  { name: "Carrot", category: "Vegetable", price: 0.2 },
];

// Write a function called groupByCategory that:

// Uses .reduce() to return a new object.

// The keys of the object should be the category names.

// The values should be arrays of the product names belonging to that category.

function groupByCategory(array) {
  return array.reduce((acc, el) => {
    return {
      ...acc,
      [el.category]: acc[el.category]
        ? [...acc[el.category], el.name]
        : [el.category],
    };
  }, {});
}

console.log("Task 2 ", groupByCategory(products));
