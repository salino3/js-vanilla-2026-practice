// You work for an e-commerce platform. Write a function named calculateOrderTotals(inventory, order)
// that takes an inventory catalog and a customer order, then returns a summary object.

// Search through the nested categories and products to match each item in the order by productId.

// Check if the item is in stock (stock >= quantity):

// If in stock: Calculate lineTotal (price * quantity), and collect the item details in an
// approved array.

// If insufficient stock: Do not include it in the financial total. Collect the item
// details in a rejected array with a reason "Insufficient stock".

const inventory = [
  {
    category: "Electronics",
    products: [
      { id: "e1", name: "Laptop", price: 1000, stock: 5 },
      { id: "e2", name: "Mouse", price: 25, stock: 12 },
    ],
  },
  {
    category: "Books",
    products: [
      { id: "b1", name: "JS Guide", price: 30, stock: 8 },
      { id: "b2", name: "CSS Basics", price: 20, stock: 0 },
    ],
  },
];

//
const order = {
  orderId: "ORD-9912",
  items: [
    { productId: "e1", quantity: 2 },
    { productId: "e2", quantity: 1 },
    { productId: "b1", quantity: 3 },
    { productId: "b2", quantity: 1 }, // Out of stock!
  ],
};

function calculateOrderTotals(inventory, order) {
  const allProducts = inventory.flatMap((cat) => cat.products);

  let grandTotal = 0;
  const approvedItems = [];
  const rejectedItems = [];

  for (const item of order.items) {
    const product = allProducts.find((p) => p.id === item.productId);

    if (!product || product.stock < item.quantity) {
      rejectedItems.push({
        productId: item.productId,
        requestedQuantity: item.quantity,
        reason: "Insufficient stock",
      });
    } else {
      const lineTotal = product.price * item.quantity;
      grandTotal += lineTotal;

      approvedItems.push({
        name: product.name,
        quantity: item.quantity,
        lineTotal: lineTotal,
      });
    }
  }

  return {
    orderId: order.orderId,
    grandTotal,
    approvedItems,
    rejectedItems,
  };
}

console.log("Task 1", calculateOrderTotals(inventory, order));

const companyStructure = {
  name: "Corporate HQ",
  budget: 50000,
  subDepartments: [
    {
      name: "Engineering",
      budget: 120000,
      subDepartments: [
        {
          name: "Frontend",
          budget: 45000,
          subDepartments: [],
        },
        {
          name: "Backend",
          budget: 60000,
          subDepartments: [
            {
              name: "DevOps",
              budget: 30000,
              // Note: subDepartments key might be omitted or empty on leaf nodes!
            },
          ],
        },
      ],
    },
    {
      name: "Marketing",
      budget: 80000,
      subDepartments: [
        {
          name: "Social Media",
          budget: 25000,
        },
      ],
    },
  ],
};

// Write a recursive function calculateDepartmentBudget(node) that returns the grand total budget
//  of the given department node and all of its descendant sub-departments.

// Handle cases where subDepartments is undefined, null, or an empty array.

// Bonus (optional): Return an object containing both the total budget and a flattened list of
// all department names included in that total:

function calculateDepartmentBudget(node) {
  let totalBudget = node.budget || 0;
  let departmentList = [node.name];

  if (Array.isArray(node.subDepartments)) {
    for (const subDept of node.subDepartments) {
      const subResult = calculateDepartmentBudget(subDept);

      totalBudget += subResult.totalBudget;
      departmentList = departmentList.concat(subResult.departmentList);
    }
  }

  return {
    totalBudget,
    departmentList,
  };
}

console.log("Task 2", calculateDepartmentBudget(companyStructure));

//
function sommaNestedArray(arr) {
  let somma = 0;

  for (let elemento of arr) {
    if (Array.isArray(elemento)) {
      somma += sommaNestedArray(elemento);
    } else {
      somma += elemento;
    }
  }

  return somma;
}

console.log(sommaNestedArray([1, [2, [3, 4], 5], 6]));

//
const project = {
  name: "Web Development",
  cost: 500,
  subTasks: [
    {
      name: "UI/UX Design",
      cost: 1200,
      subTasks: [
        { name: "Wireframes", cost: 300 },
        { name: "Interactive Prototype", cost: 400 },
      ],
    },
    {
      name: "Frontend Development",
      cost: 2000,
      subTasks: [],
    },
    {
      name: "Backend Development",
      cost: 1800,
      subTasks: [{ name: "Database Setup", cost: 600 }],
    },
  ],
};

function finalCost(node) {
  let cost = node.cost || 0;

  if (node.subTasks && node.subTasks.length > 0) {
    for (let item of node.subTasks) {
      cost += finalCost(item);
    }
  }

  return cost;
}

// Sum all costs

console.log("Final cost:", finalCost(project));
