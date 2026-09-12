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

//
function finalCostV2(node) {
  const subTasks = node.subTasks || [];

  return subTasks.reduce(
    (accumulator, subTask) => accumulator + finalCost(subTask),
    node.cost || 0,
  );
}

console.log("Final cost:", finalCostV2(project));

// Your goal: Write a recursive function `getEmployeeNames(node)` that returns a flat
// array containing the names of ALL employees in the structure.

const company = {
  name: "Tech Corp",
  employees: [
    {
      name: "Alice",
      employees: [
        { name: "Bob", employees: [] },
        { name: "Charlie", employees: [{ name: "David", employees: [] }] },
      ],
    },
    {
      name: "Eva",
      employees: [],
    },
  ],
};

function getEmployeeNames(node) {
  function collectNames(node) {
    let names = [];

    if (!node.employees || node.employees.length === 0) {
      return [node.name];
    }

    for (let item of node.employees) {
      names = collectNames(item).concat(names);
    }

    return [node.name].concat(names);
  }

  return collectNames(node).slice(1);
}

console.log("Task 2", getEmployeeNames(company)); // Without "Tech Corp"

//
function getEmployeeNamesV2(node) {
  let names = [];

  if (node.employees?.length) {
    for (const employee of node.employees) {
      names = names.concat(employee.name, getEmployeeNames(employee));
    }
  }

  return names;
}

console.log("Task 2 V2", getEmployeeNamesV2(company)); // Without "Tech Corp"

// Objective: Write a recursive function `getEnabledFeatures(node)` that returns an array
// containing the names (keys) of all enabled features (`enabled: true`) at any depth level.

const settings = {
  notifications: {
    enabled: true,
    email: {
      enabled: true,
      digest: {
        cat: { enabled: true },
        enabled: false,
      },
    },
    push: { enabled: false },
  },
  security: {
    enabled: true,
    twoFactor: { enabled: true },
  },
  theme: {
    darkMode: { enabled: false },
  },
};

function getEnabledFeatures(node) {
  // console.log("clog1", Object.keys(node)[0]); // notifications
  let result = [];
  for (let obj in node) {
    if (node[obj].enabled) {
      // result = result.concat(obj);
      // console.log("clog5", obj);

      result = result.concat(getEnabledFeatures(node[obj]));
    }
    console.log("clog4", obj);

    result = result.concat(Object.keys(node[obj]));

    // console.log("clog2", node[obj]);
  }
  // console.log("clog3");

  return result.filter((x) => x != "enabled");
}

console.log("Task 3", getEnabledFeatures(settings));
