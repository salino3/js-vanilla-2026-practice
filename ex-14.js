const employeeLogs = [
  {
    id: 1,
    name: "Alice",
    department: "Engineering",
    tasksCompleted: 12,
    hoursWorked: 40,
  },
  {
    id: 2,
    name: "Bob",
    department: "Marketing",
    tasksCompleted: 5,
    hoursWorked: 35,
  },
  {
    id: 3,
    name: "Charlie",
    department: "Engineering",
    tasksCompleted: 15,
    hoursWorked: 45,
  },
  {
    id: 4,
    name: "Diana",
    department: "Sales",
    tasksCompleted: 20,
    hoursWorked: 38,
  },
  {
    id: 5,
    name: "Ethan",
    department: "Engineering",
    tasksCompleted: 8,
    hoursWorked: 30,
  },
];

// Write a function called getHighPerformers that processes this data to:

// Filter: Keep only employees in the "Engineering" department
// Calculate: Add a new property to each object called productivityScore.The formula is: $productivityScore = \frac{tasksCompleted}{hoursWorked}$
// Sort: Sort the resulting list by productivityScore in descending order (highest score first)
// Format: Return only the names of these employees as an array of strings.

function getHighPerformers(arr) {
  const arrReduced = arr
    .reduce((acc, employee, index, arr) => {
      if (arr[index].department === "Engineering") {
        arr[index].productivityScore =
          employee.tasksCompleted / employee.hoursWorked;

        acc.push(arr[index]);
      } else {
        return acc;
      }
      return acc;
    }, [])
    .sort((a, b) => b.productivityScore - a.productivityScore);

  return arrReduced.map((e) => e.name);
}

//
function getHighPerformers02(arr) {
  return arr
    .filter((emp) => emp.department === "Engineering")
    .map((emp) => ({
      ...emp, // Spread operator creates a NEW object, no mutation!
      productivityScore: emp.tasksCompleted / emp.hoursWorked,
    }))
    .sort((a, b) => b.productivityScore - a.productivityScore)
    .map((emp) => emp.name);
}

console.log("Task 1 ", getHighPerformers(employeeLogs));
console.log("Task 1 V2 ", getHighPerformers02(employeeLogs));

// The Task: Write a function updateEmployeeName(logs, id, newName) that:

// Takes the employeeLogs array.

// Finds the employee with the matching id.

// Returns a new array where that specific employee's name is updated, but all other employees remain exactly as they were.

// Constraint: Do not use .push() or modify the original logs array.

function updateEmployeeName(logs, id, newName) {
  const newEmployeeLogs = logs.map((log) =>
    log.id === id ? { ...log, name: newName } : log,
  );
  return newEmployeeLogs;
}

console.log("Task 2 ", updateEmployeeName(employeeLogs, 2, "Joe"));
