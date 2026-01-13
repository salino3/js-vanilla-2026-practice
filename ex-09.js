// Task 1
// Filter: Keep only the products that match the given categoryName AND are inStock.
// Map: Extract just the price of those filtered products.
// Reduce: Sum those prices together to get the total revenue.

function calculateCategoryRevenue(products, categoryName) {
  const filteredProducts = products
    .filter((p) => p.category === categoryName && !!p.inStock)
    .map((p) => p.price)
    .reduce((acc, price) => {
      return (acc += price);
    }, 0);
  return filteredProducts;
}

console.log(
  "Task 1: ",
  calculateCategoryRevenue(
    [
      {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        price: 1200,
        inStock: true,
      },
      {
        id: 2,
        name: "Coffee Maker",
        category: "Home",
        price: 80,
        inStock: true,
      },
      {
        id: 3,
        name: "Smartphone",
        category: "Electronics",
        price: 800,
        inStock: false,
      },
      {
        id: 4,
        name: "Headphones",
        category: "Electronics",
        price: 150,
        inStock: true,
      },
      {
        id: 5,
        name: "Desk Chair",
        category: "Home",
        price: 200,
        inStock: true,
      },
      {
        id: 6,
        name: "Headphones",
        category: "Electronics",
        price: 150,
        inStock: false,
      },
      {
        id: 7,
        name: "Headphones",
        category: "Electronics",
        price: 950,
        inStock: true,
      },
    ],
    "Electronics"
  )
);
