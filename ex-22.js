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

  // Version 1
  //   const reducedCateroies = ultraZipMap(
  //     orders.map((order) => order.items),
  //     (arr) => arr.map((item) => item.category),
  //   ).flat(Infinity);

  //   const categoryTally = {};

  //   reducedCateroies.forEach((element) => {
  //     categoryTally[element] = (categoryTally[element] || 0) + 1;
  //   });

  // Version 2
  //  Category Tally (flatMap + reduce)
  const categoryTally = orders
    .flatMap((order) => order.items)
    .reduce((tally, item) => {
      tally[item.category] = (tally[item.category] || 0) + 1;
      return tally;
    }, {});

  return { result, totalRevenue, totalItems, categoryTally };
}

console.log("Task 1:", functionOrders(orders));

//
const employees = [
  { id: 1, name: "Sarah", deptId: "ENG", salary: 95000 },
  { id: 2, name: "Mike", deptId: "MKT", salary: 70000 },
  { id: 3, name: "Elena", deptId: "ENG", salary: 120000 },
  { id: 4, name: "John", deptId: "HR", salary: 55000 },
  { id: 5, name: "Amira", deptId: "ENG", salary: 105000 },
  { id: 6, name: "Tom", deptId: "MKT", salary: 85000 },
];

const departments = {
  ENG: "Engineering",
  MKT: "Marketing",
  HR: "Human Resources",
};

// Map & Lookup: Create an array of objects called enrichedEmployees. Each object should contain
// the employee's name and their full department name (e.g., { name: "Sarah", department: "Engineering" }).

// Filter: Find all employees who earn more than 100,000.

// Reduce (Grouping): Create an object where the keys are the Department IDs and the values are
// the sum of salaries for that department.

// Desired Output: { ENG: 320000, MKT: 155000, HR: 55000 }

// Advanced (Chaining): Find the average salary of the "Engineering" department only. (Do this by filtering
//     for ENG first, then reducing to get the sum, then dividing by the filtered array's length).

//
function averageSalaryDepartament(
  employees,
  departments,
  departament = "Engineering",
) {
  const reducedData = employees.reduce(
    (acc, worker, i, workers) => {
      if (departament === departments[worker.deptId]) {
        acc = {
          value: (acc.value += worker.salary),
          count: acc.count + 1,
        };
      }

      if (workers.length === i + 1) {
        return Number((acc.value / acc.count).toFixed(2));
      }

      return acc;
    },
    { count: 0, value: 0 },
  );

  return reducedData;
}

function functionEmployees(employees, departments) {
  const enrichedEmployees = employees.map((employee) => ({
    name: employee.name,
    department: departments[employee.deptId],
  }));

  const richerEmployees = employees.filter(
    (employee) => employee.salary > 100000,
  );

  const reducedGroupped = employees.reduce((acc, worker) => {
    acc[worker.deptId] = (acc[worker.deptId] ?? 0) + worker.salary;
    return acc;
  }, {});

  const averageSalaryForEngineering = averageSalaryDepartament(
    employees,
    departments,
    departments.ENG,
  );

  return {
    enrichedEmployees,
    richerEmployees,
    reducedGroupped,
    averageSalaryForEngineering,
  };
}

console.log("Task 2:", functionEmployees(employees, departments));

//
const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genres: ["Classic", "Drama"],
    available: true,
    rating: 4.2,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genres: ["Dystopian", "Sci-Fi"],
    available: false,
    rating: 4.8,
  },
  {
    id: 3,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genres: ["Fantasy", "Adventure"],
    available: true,
    rating: 4.9,
  },
  {
    id: 4,
    title: "Brave New World",
    author: "Aldous Huxley",
    genres: ["Dystopian", "Classic"],
    available: true,
    rating: 4.5,
  },
];

// Format: Create an array of strings: "TITLE by AUTHOR".

// Search: Find all books that have the genre "Dystopian".

// The "Genre Map": Create an object where each key is a Genre, and the value is an array of
// book titles belonging to that genre.

// Expected Output Snippet: { Classic: ["The Great Gatsby", "Brave New World"], ... }

// Hint: You'll need forEach or reduce + flatMap for this.

// Rating Average: Find the average rating of only the available books.

function theLibrarySystem(books) {
  const titlesBySuthors = books.map((book) => {
    return `${book.title} by ${book.author}`;
  });

  const searchingDystopian = books.filter((book) =>
    book.genres.includes("Dystopian"),
  );

  const genreMap = books.reduce((acc, book) => {
    const genresArr = book.genres ?? [];

    genresArr &&
      genresArr.length > 0 &&
      genresArr.forEach((genre) => {
        if (acc[genre]) {
          acc[genre].push(book.title);
        } else {
          acc[genre] = [book.title];
        }
      });

    return acc;
  }, {});

  let ratingAverageAvailableBooks = books.filter((book) => book.available);

  ratingAverageAvailableBooks =
    ratingAverageAvailableBooks.reduce(
      (acc, availabledBook) => (acc += availabledBook.rating),
      0,
    ) / ratingAverageAvailableBooks.length ?? 0;

  return {
    titlesBySuthors,
    searchingDystopian,
    genreMap,
    ratingAverageAvailableBooks: Number(ratingAverageAvailableBooks.toFixed(2)),
  };
}

console.log("Task 3:", theLibrarySystem(books));

//
const currentStock = {
  "PROD_001": 15,
  "PROD_002": 5,
  "PROD_003": 0,
};

const incomingShipment = [
  { id: "PROD_001", quantity: 10, category: "Fruit" },
  { id: "PROD_003", quantity: 20, category: "Fruit" },
  { id: "PROD_004", quantity: 50, category: "Vegetable" },
];

// Create a function syncWarehouse(stock, shipment) that returns a single object containing:

// Updated Inventory: A new object (don't mutate the original) showing the total quantity
//    of every item after the shipment is added.

// Summary Analytics:

// totalItemsInWarehouse: The sum of all quantities in the updated inventory.

// newProductsAdded: An array of IDs for products that were not in the original
// currentStock but arrived in the incomingShipment.

// Category Count: Use the shipment array to count how many units (quantity) of each
// category were added.

function syncWarehouse(stock, shipment) {
  const updatedStock = { ...stock };
  const newProductsAdded = [];

  const categoryTally = shipment.reduce((tally, item) => {
    if (!(item.id in stock)) {
      newProductsAdded.push(item.id);
    }

    updatedStock[item.id] = (updatedStock[item.id] ?? 0) + item.quantity;

    tally[item.category] = (tally[item.category] ?? 0) + item.quantity;

    return tally;
  }, {});

  const totalItemsInWarehouse = Object.values(updatedStock).reduce(
    (sum, qty) => sum + qty,
    0,
  );

  return {
    updatedStock,
    totalItemsInWarehouse,
    newProductsAdded,
    categoryTally,
  };
}

console.log("Task 4:", syncWarehouse(currentStock, incomingShipment));
