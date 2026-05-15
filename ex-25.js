const projects = [
  {
    id: 1,
    name: "Alpha-Web",
    team: [
      { name: "Alice", skills: ["JavaScript", "CSS", "HTML"] },
      { name: "Bob", skills: ["Node.js", "MongoDB"] },
    ],
  },
  {
    id: 2,
    name: "Beta-Mobile",
    team: [
      { name: "Charlie", skills: ["Swift", "Firebase"] },
      { name: "Dana", skills: ["JavaScript", "React Native"] },
    ],
  },
  {
    id: 3,
    name: "Gamma-Security",
    team: [
      { name: "Eli", skills: ["Python", "SQL"] },
      { name: "Finn", skills: ["C++", "Java"] },
    ],
  },
];

const searchSkills = ["JavaScript", "React Native"];

// Write a function called findProjectsBySkill(projectList, skillList) that returns an array
// of project names where at least one team member possesses at least one of
// the skills in the skillList.

// Input: The projects array and the searchSkills array.

// Output: An array of strings: ["Alpha-Web", "Beta-Mobile"].

function findProjectsBySkill(projectList, skillList) {
  const result = new Set();

  projectList.filter((project) =>
    project.team.filter((worker) =>
      worker.skills.filter(
        (skill) => skillList.includes(skill) && result.add(project.name),
      ),
    ),
  );

  return Array.from(result);
}

console.log("Task 1:", findProjectsBySkill(projects, searchSkills));

// V2
function findProjectsBySkillV2(projectList, skillList) {
  return projectList
    .filter((project) =>
      project.team.some((worker) =>
        worker.skills.some((skill) => skillList.includes(skill)),
      ),
    )
    .map((project) => project.name);
}

console.log("Task 1 V2:", findProjectsBySkillV2(projects, searchSkills));

//
const products = [
  { id: "p1", name: "Laptop", category: "Electronics", price: 1000 },
  { id: "p2", name: "Mouse", category: "Electronics", price: 50 },
  { id: "p3", name: "Desk Chair", category: "Furniture", price: 200 },
  { id: "p4", name: "Lamp", category: "Furniture", price: 40 },
];

const sales = [
  { productId: "p1", quantity: 2 },
  { productId: "p2", quantity: 5 },
  { productId: "p3", quantity: 1 },
  { productId: "p1", quantity: 1 },
  { productId: "p4", quantity: 10 },
];

//
// Write a function getCategoryRevenue(products, sales) that returns an object. The keys
// should be the category names, and the values should be the total revenue
// (price × quantity) for that category.

function getCategoryRevenue(products, sales) {
  const productsMapped = new Map();

  for (let i = 0; i < products.length; i++) {
    productsMapped.set(products[i].id, products[i]);
  }

  const result = sales.reduce((acc, sale) => {
    let value = productsMapped.get(sale.productId);

    acc[value.category] =
      (acc[value.category] ?? 0) + value.price * sale.quantity;

    return acc;
  }, {});

  return result;
}

console.log("Task 2:", getCategoryRevenue(products, sales));

//
// The Task: "The Notification Center"
// You have a list of user notifications. Some are "unread" and some are "read." You receive
// an array of IDs representing notifications the user just clicked "Mark as Read" on.

const notifications = [
  { id: "n1", message: "New Comment", status: "unread", priority: "high" },
  { id: "n2", message: "System Update", status: "unread", priority: "low" },
  { id: "n3", message: "Friend Request", status: "read", priority: "medium" },
  { id: "n4", message: "Security Alert", status: "unread", priority: "high" },
];

const readIds = ["n1", "n4"];

// Write a function updateNotifications(notifications, readIds) that returns a new array where:

// The status of notifications matching the IDs in readIds is changed to "read".

// Crucially: The notifications that were not in readIds must remain exactly as they were.

// The Twist: High-priority notifications ("high") should be moved to the front of the array,
// regardless of whether they were just updated or not.

function updateNotifications(notifications, readIds) {
  return notifications
    .map((n) => ({
      ...n,
      status: readIds.includes(n.id) ? "read" : n.status,
    }))
    .sort((a, b) => {
      if (a.priority === "high" && b.priority !== "high") return -1;
      if (a.priority !== "high" && b.priority === "high") return 1;
      return 0; // Keep original relative order for others
    });
}

console.log("Task 3:", updateNotifications(notifications, readIds));

//
const shoppingCart = [
  {
    name: "Wireless Mouse",
    price: 29.99,
    quantity: 1,
    category: "Electronics",
  },
  {
    name: "Leather Journal",
    price: 15.0,
    quantity: 2,
    category: "Books",
    discount: 10,
  }, // 10% off
  {
    name: "Mechanical Keyboard",
    price: 89.99,
    quantity: 1,
    category: "Electronics",
    discount: 15,
  }, // 15% off
  { name: "Water Bottle", price: 12.5, quantity: 3, category: "Home" },
  {
    name: "Socks (3-pack)",
    price: 9.99,
    quantity: 5,
    category: "Apparel",
    discount: 20,
  }, // 20% off
];

// Write a function calculateCartTotals(cart) that returns a new object with the following
// four properties:

// subtotal: The total cost of all items before any discounts are applied
//  (taking quantity into account).

// totalDiscount: The total amount of money saved from the discounts.

// finalTotal: The final price the user has to pay (subtotal - totalDiscount).

// itemCount: The total number of physical items in the cart (the sum of all quantities).

// ⚠️ Rule: Keep your decimal outputs rounded to two decimal places (e.g., 110.45).
// Hint: You might want to use Number(value.toFixed(2)) to handle floating-point math
// quirks in JavaScript.

function calculateCartTotals(cart) {
  return (result = cart.reduce(
    (acc, item, i) => {
      let finalPrice = item.discount
        ? item.price - (item.price / 100) * item.discount
        : item.price;

      acc.subtotal += Number((item.quantity * item.price).toFixed(2));
      acc.finalTotal += Number((item.quantity * finalPrice).toFixed(2));

      if (i + 1 === cart.length) {
        acc.totalDiscount = Number(
          (acc.subtotal - (acc.finalTotal ?? 0)).toFixed(2),
        );
      }

      acc.itemCount += item.quantity;

      return acc;
    },
    { subtotal: 0, finalTotal: 0, totalDiscount: 0, itemCount: 0 },
  ));
}

console.log("Task 4:", calculateCartTotals(shoppingCart));

//
const sessionLogs = [
  { userId: "user_A", feature: "Dashboard", duration: 12 },
  { userId: "user_B", feature: "Billing", duration: 5 },
  { userId: "user_A", feature: "Analytics", duration: 45 },
  { userId: "user_C", feature: "Dashboard", duration: 18 },
  { userId: "user_B", feature: "Dashboard", duration: 22 },
  { userId: "user_A", feature: "Dashboard", duration: 15 },
  { userId: "user_C", feature: "Settings", duration: 8 },
];

// Write a function generateUserReport(logs) that processes the logs and returns an array of objects.

// For each unique user, you need to calculate:

// userId: The ID of the user.

// totalDuration: The sum of all their session durations.

// averageDuration: Their average session duration (rounded to one decimal place).

// uniqueFeatures: An array of the unique features they accessed, sorted alphabetically
//  (no duplicate features allowed!).

// ⚠️ Sorting Rule: The final array of user objects must be sorted in descending order
//  based on their totalDuration (the user with the most active time comes first).

function generateUserReport(logs) {
  const grouped = logs.reduce((acc, log) => {
    if (!acc[log.userId]) {
      acc[log.userId] = {
        userId: log.userId,
        totalDuration: 0,
        sessionCount: 0,
        featureSet: new Set(),
      };
    }

    acc[log.userId].totalDuration += log.duration;
    acc[log.userId].sessionCount += 1;
    acc[log.userId].featureSet.add(log.feature);

    return acc;
  }, {});

  console.log("clog2", grouped);
  const reportArray = Object.values(grouped).map((user) => {
    return {
      userId: user.userId,
      totalDuration: user.totalDuration,
      averageDuration: Number(
        (user.totalDuration / user.sessionCount).toFixed(1),
      ),
      uniqueFeatures: Array.from(user.featureSet).sort((a, b) =>
        a.localeCompare(b),
      ),
    };
  });

  return reportArray.sort((a, b) => b.totalDuration - a.totalDuration);
}

console.log("Task 5:", generateUserReport(sessionLogs));

//
const productsData = [
  { id: "p1", name: "Wireless Mouse", price: 29.99, category: "Electronics" },
  { id: "p2", name: "Yoga Mat", price: 45.0, category: "Fitness" },
  { id: "p3", name: "Leather Journal", price: 15.5, category: "Stationery" },
  {
    id: "p4",
    name: "Mechanical Keyboard",
    price: 89.99,
    category: "Electronics",
  },
  { id: "p5", name: "Running Shoes", price: 120.0, category: "Fitness" },
];

const orders = [
  {
    orderId: 101,
    items: [
      { productId: "p1", qty: 2 },
      { productId: "p3", qty: 1 },
    ],
  },
  {
    orderId: 102,
    items: [
      { productId: "p2", qty: 1 },
      { productId: "p5", qty: 2 },
    ],
  },
  {
    orderId: 103,
    items: [
      { productId: "p4", qty: 1 },
      { productId: "p1", qty: 1 },
    ],
  },
  { orderId: 104, items: [{ productId: "p3", qty: 3 }] },
];

// Write a function called calculateCategoryRevenue(products, orders) that
// returns an object showing the total revenue for each category

function calculateCategoryRevenue(products, orders) {
  const flattedOrders = orders.flatMap((o) => o.items);

  const result = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = 0;
    }

    const value = (acc[product.category] +=
      flattedOrders
        .filter((item) => item.productId === product.id)
        .reduce((acc, p) => acc + p.qty, 0) * product.price);

    acc[product.category] = Number(value.toFixed(2));

    return acc;
  }, {});

  return result;
}
console.log("Task 6:", calculateCategoryRevenue(productsData, orders));

//
const students = [
  {
    id: 1,
    name: "Alice",
    subjects: [
      { subject: "Math", score: 85 },
      { subject: "Biology", score: 92 },
      { subject: "Chemistry", score: 78 },
    ],
  },
  {
    id: 2,
    name: "Bob",
    subjects: [
      { subject: "Math", score: 95 },
      { subject: "Biology", score: 88 },
      { subject: "Chemistry", score: 91 },
    ],
  },
  {
    id: 3,
    name: "Charlie",
    subjects: [
      { subject: "Math", score: 70 },
      { subject: "Biology", score: 75 },
      { subject: "Chemistry", score: 80 },
    ],
  },
];

// The function should:

//* Calculate the average score of each student.
//* Return an object with:
// name
// average
// subjectsCount

function getTopStudent(students) {
  const newStudentsData = students.reduce((acc, student) => {
    acc.push({
      name: student.name,
      average: Number(
        (
          student.subjects.reduce((acc, item) => (acc += item.score), 0) /
          student.subjects.length
        ).toFixed(2),
      ),
      subjectsCount: student.subjects.length,
    });

    return acc;
  }, []);
  return newStudentsData;
}

console.log("Task 7:", getTopStudent(students));
