//
// The Smart Home Manager
// You are building a dashboard for a smart home. You have an array of "Room" objects.
// Your task is to perform three specific data transformations without mutating the
// original array or the original objects.

// Toggle a Switch: Create a new array where the Kitchen (id: 2) has lightsOn set to true.

// Add a Room: Add a new room object: { id: 4, room: "Bathroom", lightsOn: false, temperature: 19 } to the end of the list.

// Climate Control: Create a new array where every room's temperature is increased by 2 degrees.

const homeState = [
  { id: 1, room: "Living Room", lightsOn: true, temperature: 22 },
  { id: 2, room: "Kitchen", lightsOn: false, temperature: 20 },
  { id: 3, room: "Bedroom", lightsOn: true, temperature: 21 },
];

function toggleLight(state, id) {
  return state.map((room) =>
    room.id === id ? { ...room, lightsOn: !room.lightsOn } : room,
  );
}

function addNewRoom(state, obj) {
  return [...state, ...[obj]];
}

function controlTemperature(state, degrees = 2) {
  return state.map((room) => ({
    ...room,
    temperature: room.temperature + degrees,
  }));
}

function dashboardSmartHome(homeState) {
  let transformedDataHome = toggleLight(homeState, 2);

  transformedDataHome = addNewRoom(transformedDataHome, {
    id: 4,
    room: "Bathroom",
    lightsOn: false,
    temperature: 19,
  });

  transformedDataHome = controlTemperature(transformedDataHome);

  return transformedDataHome;
}

console.log("Task 1:", dashboardSmartHome(homeState));

//
const mallDirectory = [
  {
    id: "s1",
    name: "TechWorld",
    details: { open: true, rating: 4.5 },
    categories: ["electronics", "gadgets"],
  },
  {
    id: "s2",
    name: "FashionHub",
    details: { open: false, rating: 4.2 },
    categories: ["clothing", "accessories"],
  },
];

// Deep Update (The Object): Create a new array where TechWorld (id: "s1") is now closed

// (open: false). Crucial: You must copy the details object, not just the top-level store object.

// The Filter: Create a new array that removes the store with the id "s2" (FashionHub).

// Deep Update (The Array): Create a new array where TechWorld gets a new category added: "gaming".

//  The final categories for TechWorld should be ["electronics", "gadgets", "gaming"].

function deepUpdateMallDirectory(
  mallDirectory,
  closeStores = [],
  deleteStores = [],
  addCategory = {},
) {
  if (
    closeStores.length === 0 &&
    deleteStores.length === 0 &&
    addCategory.length === 0
  ) {
    return mallDirectory;
  }

  let updatedMallDirectory = mallDirectory;

  //
  if (closeStores.length > 0) {
    updatedMallDirectory = updatedMallDirectory.map((store) =>
      closeStores.includes(store.id)
        ? {
            ...store,
            details: {
              ...store.details,
              open: !store.details.open,
            },
          }
        : store,
    );
  }

  //
  if (deleteStores.length > 0) {
    updatedMallDirectory = updatedMallDirectory.filter(
      (store) => !deleteStores.includes(store.id),
    );
  }

  //
  if (Object.values(addCategory).length > 0) {
    updatedMallDirectory = updatedMallDirectory.map((store) =>
      addCategory[store.id]
        ? {
            ...store,
            categories: [...store.categories, ...[addCategory[store.id]]],
          }
        : store,
    );
  }

  return updatedMallDirectory;
}

console.log(
  "Task 2:",
  deepUpdateMallDirectory(mallDirectory, ["s1"], ["s2"], {
    "s1": "gaming",
  }),
);

//
const companyData = {
  companyName: "TechCorp",
  lastUpdated: "2024-01-01",
  employees: [
    {
      id: "u101",
      name: "Alice",
      role: "Admin",
      access: {
        canEdit: true,
        canDelete: false,
        projects: ["Project Alpha", "Project Beta"],
      },
    },
    {
      id: "u102",
      name: "Bob",
      role: "Editor",
      access: {
        canEdit: true,
        canDelete: false,
        projects: ["Project Alpha"],
      },
    },
  ],
};

// Grant Global Permissions: The CEO wants everyone in the employees array to have
// canDelete set to true in their access object.

// Project Expansion: Alice (u101) has been assigned a new project: "Project Gamma".
// Update her projects array without affecting Bob's.

// Timestamp Update: Update the lastUpdated string at the top level to the current
// date ("2026-04-08"), but ensure you return the entire companyData object structure.

// Security Sweep: Remove "Bob" from the employees array entirely.

function canDeleteValue(companyData, value = true) {
  return {
    ...companyData,
    employees: companyData.employees.map((e) => ({
      ...e,
      access: {
        ...e.access,
        canDelete: value,
      },
    })),
  };
}

//
function projectExpansion(companyData, id, project) {
  return {
    ...companyData,
    employees: companyData.employees.map((e) =>
      e.id === id
        ? {
            ...e,
            access: {
              ...e.access,
              projects: [...e.access.projects, ...[project]],
            },
          }
        : e,
    ),
  };
}

//
function securitySweep(companyData, id) {
  return {
    ...companyData,
    employees: companyData.employees.filter((e) => e.id !== id),
  };
}

//
function getDayString() {
  let date = new Date();
  let output =
    String(date.getDate()).padStart(2, "0") +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    date.getFullYear();

  return output;
}

function transformDataCompany(companyData) {
  let transformedData = canDeleteValue(companyData);

  transformedData = projectExpansion(transformedData, "u101", "Project Gamma");

  transformedData = securitySweep(transformedData, "u102");

  return { ...transformedData, lastUpdated: getDayString() };
}

console.log("Task 3:", transformDataCompany(companyData));

//
const storeState = {
  cart: [
    { id: "p1", name: "Laptop", price: 1000, quantity: 1, category: "Tech" },
    { id: "p2", name: "Mouse", price: 50, quantity: 2, category: "Tech" },
    { id: "p3", name: "Monitor", price: 300, quantity: 1, category: "Tech" },
  ],
  discounts: {
    Tech: 0.1, // 10% off
    Food: 0.05, // 5% off
  },
  settings: {
    currency: "USD",
    appliedCoupons: [],
  },
};

// Apply Category Discount: Create a new array of products where the price of any item in the
// "Tech" category is reduced by the percentage defined in storeState.discounts.Tech.

// Bulk Buy Bonus: If an item has a quantity of 2 or more, add a new property to that product
// object: bonusGift: "Premium Sticker".

// Calculate Grand Total: Add a new property to the top-level object called totalValue.
// This should be the sum of all item prices multiplied by their quantities (after the discount is applied).

// Update Settings: Change the currency to "EUR" and add "WELCOME2026" to the appliedCoupons array.

// Clean Up: Remove the discounts object from the final result entirely (the CEO says it's sensitive data).

function manageStoreState(storeState) {
  // implement the solution
}

console.log("Task 4:", manageStoreState(storeState));
