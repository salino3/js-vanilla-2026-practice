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
    { id: "p4", name: "Pasta", price: 2, quantity: 10, category: "Food" },
    { id: "p5", name: "Beer", price: 3, quantity: 8, category: "Drink" },
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

//
function implementDiscount(storeState) {
  const { discounts } = storeState;
  return {
    ...storeState,
    cart: storeState.cart.map((item) => ({
      ...item,
      price: discounts[item.category]
        ? parseFloat(
            (item.price - item.price * discounts[item.category]).toFixed(2),
          )
        : item.price,
    })),
  };
}

//
function bulkBuyBonus(storeState) {
  return {
    ...storeState,
    cart: storeState.cart.map((item) =>
      item.quantity > 1
        ? {
            ...item,
            bonusGift: "Premium Sticker",
          }
        : item,
    ),
  };
}

//
function grandTotal(storeState) {
  const totalValue = storeState.cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return { ...storeState, totalValue };
}

//
function updateSettings(storeState) {
  return {
    ...storeState,
    settings: {
      currency: "EUR",
      appliedCoupons: [
        ...storeState.settings.appliedCoupons,
        ...["WELCOME2026"],
      ],
    },
  };
}

function manageStoreState(storeState) {
  let transformedData;

  transformedData = implementDiscount(storeState);

  transformedData = bulkBuyBonus(transformedData);

  transformedData = grandTotal(transformedData);

  transformedData = updateSettings(transformedData);

  const { discounts, ...result } = transformedData;
  return result;
}

console.log("Task 4:", manageStoreState(storeState));

//
// Goal: Return a new object where only that specific status is changed.

// Hint: You'll need to spread the metadata, then spread the preferences, then .map()

// the notifications. It's a test of how well you can keep track of your "braces" {}!

const userProfile = {
  id: 1,
  metadata: {
    lastLogin: "2026-04-01",
    preferences: {
      notifications: [
        { type: "Email", status: true },
        { type: "Security", status: true }, // <--- CHANGE THIS TO FALSE
        { type: "Sms", status: false },
      ],
    },
  },
};

function manageNotificationsStatus(userProfile, type) {
  return {
    ...userProfile,
    metadata: {
      ...userProfile.metadata,
      preferences: {
        ...userProfile.metadata.preferences,
        notifications: userProfile.metadata.preferences.notifications.map(
          (n) => (n.type === type ? { ...n, status: !n.status } : n),
        ),
      },
    },
  };
}

console.log("Task 5:", manageNotificationsStatus(userProfile, "Security"));

//
function manageNotificationsStatusV2(userProfile, type) {
  const indexNotification =
    userProfile.metadata.preferences.notifications.findIndex(
      (n) => n.type === type,
    );

  const newObj = structuredClone(userProfile);

  newObj.metadata.preferences.notifications[indexNotification].status =
    !newObj.metadata.preferences.notifications[indexNotification].status;

  return newObj;
}

console.log("Task 5 V2:", manageNotificationsStatusV2(userProfile, "Security"));

//
const rawData = {
  users: [
    { id: 1, name: "Alice", department: "Engineering" },
    { id: 2, name: "Bob", department: "Design" },
  ],
  tasks: [
    { taskId: "t1", userId: 1, title: "Fix Login Bug", priority: "High" },
    { taskId: "t2", userId: 2, title: "New Logo", priority: "Low" },
    { taskId: "t3", userId: 1, title: "Update README", priority: "Low" },
  ],
};

// Merge Data: Create a new array called userWorkloads. Each object in this
// array should represent a user and include a new property assignedTasks
// which is an array of their specific task objects.

// Add Metadata: For each user in userWorkloads, add a taskCount property
// representing how many tasks they have.

// Filter High Priority: Create a separate list called urgentReport that only
// contains tasks with "High" priority, but attach the user's name to each
// task object in that list.

// Immutability Check: Ensure rawData remains untouched.

function userWorkloads(rawData) {
  const { userWorkloads, globalUrgentReport } = rawData.tasks.reduce(
    (acc, task) => {
      const user = acc.userWorkloads.find((u) => u.id === task.userId);

      if (user) {
        user.assignedTasks.push(task);
        user.taskCount++;

        if (task.priority === "High") {
          acc.globalUrgentReport.push({
            ...task,
            userName: user.name,
          });
        }
      }

      return acc;
    },
    {
      // Starting values respecting immutability
      userWorkloads: rawData.users.map((u) => ({
        ...u,
        assignedTasks: [],
        taskCount: 0,
      })),
      globalUrgentReport: [],
    },
  );

  console.log("Immutability Check:", userWorkloads === rawData); // false

  return { userWorkloads, globalUrgentReport };
}

console.log("Task 6:", userWorkloads(rawData));

//
// Assume these functions represent API calls
const fetchUsers = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
        ]),
      500,
    ),
  );

const fetchPosts = () =>
  new Promise((resolve, reject) =>
    // Simulate a random failure 20% of the time
    Math.random() > 0.2
      ? setTimeout(
          () =>
            resolve([
              { userId: 1, content: "Hello!" },
              { userId: 2, content: "JS is cool" },
            ]),
          800,
        )
      : setTimeout(() => reject(new Error("Posts API Failed")), 800),
  );

const fetchTestError = () =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Test API Failed")), 800),
  );

// Parallel Fetching: Use Promise.all or Promise.allSettled to fetch both Users and Posts at the same time
// (don't wait for users to finish before starting posts).
// possible status: 'fulfilled', 'rejected'

// The "Stitch": Once both return, return a single array where each user has
// a posts array attached to them.

// Error Handling: If fetchPosts fails, the function should not crash. Instead, it should return
// the users with an empty posts: [] array and a new property postError: true.

// Timeout Protection: If the whole operation takes longer than 2 seconds,
// reject the promise with "Request Timed Out".

async function fetchingUsersPosts() {
  try {
    const promises = await Promise.allSettled([
      fetchUsers(),
      fetchPosts(),
      fetchTestError(),
    ]);

    return promises.map((p) =>
      p.status === "fulfilled" ? p.value : [p.reason],
    );
  } catch (err) {
    console.error("Critical Failure", err);
  }
}

fetchingUsersPosts().then((data) => {
  console.log("Task 7 Result:", data);
});
