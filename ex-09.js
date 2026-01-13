// Task 1
// Filter: Keep only the products that match the given categoryName AND are inStock.
// Map: Extract just the price of those filtered products.
// Reduce: Sum those prices together to get the total revenue.

function calculateCategoryRevenue(products, categoryName) {
  return products
    .filter((p) => p.category === categoryName && !!p.inStock)
    .map((p) => p.price)
    .reduce((acc, price) => {
      return (acc += price);
    }, 0);
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

// Task 2
// Create a function that returns an object where:
// The keys are the category names.
// The values are the total count of items in that category (regardless of stock).

function getCategoryStats(products) {
  return products.reduce((acc, product) => {
    acc[product.category] = acc[product.category]
      ? (acc[product.category] += 1)
      : 1;
    return acc;
  }, {});
}

console.log(
  "Task 2: ",
  getCategoryStats([
    { name: "Laptop", category: "Electronics" },
    { name: "Coffee Maker", category: "Home" },
    { name: "Headphones", category: "Electronics" },
  ])
);

// Task 3
// Create a function that processes a list of order objects.
// Flatten: The brands are inside an array within each order.
//  You need to get all brands into one flat list.
// Filter: Remove any brand that is null or undefined.
// Unique: Ensure the final list has no duplicate brands.
// Sort: Return the list in alphabetical order.

function getUniqueSortedBrands(orders) {
  const brandsArray = [];
  for (x in orders) {
    // brandsArray = [...brandsArray, ...orders[x].brands];
    brandsArray.push(orders[x].brands.filter((brand) => Boolean(brand)));
  }
  return [...new Set(brandsArray.flat(1))].sort();
}

console.log(
  "Task 3: ",
  getUniqueSortedBrands([
    { id: 1, brands: ["Apple", "Samsung", null, ""] },
    { id: 2, brands: ["AB", "Sony", "Apple"] },
    { id: 3, brands: ["Logitech", "Samsung", undefined] },
  ])
);

// Task 3 V2

function getUniqueSortedBrands02(orders) {
  return (
    orders
      // 1 & 2. Flatten the brands and Filter out falsy values (null, undefined, "")
      .flatMap((order) => order.brands)
      .filter((brand) => !!brand)

      // 3. Unique: Use the Set constructor
      // 4. Sort: Default alphabetical sort
      .filter((brand, index, self) => self.indexOf(brand) === index) // Unique using filter
      .sort()
  );
}

console.log(
  "Task 3 V2: ",
  getUniqueSortedBrands02([
    { id: 1, brands: ["AppleS", "Samsung", null, ""] },
    { id: 2, brands: ["AB", "Sony", "Apple"] },
    { id: 3, brands: ["Logitech", "Samsung", undefined] },
  ])
);

// Task 4
// Create a function that returns an array of names of customers
// who have spent more than $500 in total across all their orders.
// who spent more

function getVIPCustomers(data) {
  const reducedData = data.reduce((acc, obj) => {
    let total = obj.orders.reduce((a, b) => a + b.amount, 0);
    if (total > 500) {
      acc[obj.name] = total;
    }

    return acc;
  }, {});

  let spender = Object.entries(reducedData)[0] || {};
  if (Object.keys(spender).length > 0) {
    for (x in reducedData) {
      if (reducedData[x] > spender[1]) {
        spender = [x, reducedData[x]];
      }
    }
  } else {
    return "No VIP customers";
  }

  return {
    vipCustomers: Object.keys(reducedData),
    [spender[0]]: spender[1],
  };
}

console.log(
  "Task 4: ",
  getVIPCustomers([
    {
      name: "Alice",
      orders: [
        { item: "Books", amount: 100 },
        { item: "Laptop", amount: 1200 },
      ],
    },
    {
      name: "Bob",
      orders: [
        { item: "Coffee", amount: 10 },
        { item: "Bread", amount: 5 },
      ],
    },
    {
      name: "Charlie",
      orders: [
        { item: "Monitor", amount: 400 },
        { item: "Mouse", amount: 150 },
      ],
    },
  ])
);
