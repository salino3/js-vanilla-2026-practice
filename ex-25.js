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
      console.log("clog1", finalPrice);
      acc.subtotal += item.quantity * item.price;
      acc.finalTotal += item.quantity * finalPrice;

      if (i + 1 === cart.length) {
        acc.totalDiscount = Number(
          (acc.subtotal - (acc.finalTotal ?? 0)).toFixed(2),
        );
      }

      return acc;
    },
    { subtotal: 0, finalTotal: 0, totalDiscount: 0 },
  ));

  // return result;
}

console.log("Task 4:", calculateCartTotals(shoppingCart));
