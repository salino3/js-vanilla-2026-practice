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

// The Task: Modify your getHighPerformers function or create a new one called getDepartmentSummary(logs, deptName) that:

// Filters by a department name passed as an argument.

// Edge Case: If the department doesn't exist in the data or has no employees, return the string: "No employees found for [deptName] department".

// If it does exist, return an object like this:
// { department: "Engineering", count: 3, averageTasks: 11.67 }

function getDepartmentSummary(logs, deptName) {
  const filtered = logs.filter((emp) => emp.department === deptName);

  if (filtered.length === 0) {
    return `No employees found for ${deptName} department`;
  }

  const totalTasks = filtered.reduce((sum, emp) => sum + emp.tasksCompleted, 0);
  const average = totalTasks / filtered.length;

  return {
    department: deptName,
    count: filtered.length,
    averageTasks: Number(average.toFixed(2)),
  };
}

console.log("Task 3 ", getDepartmentSummary(employeeLogs, "Engineering"));

//
const employeeLogs02 = [
  { id: 101, name: "Sarah", department: "Engineering", tasksCompleted: 45 },
  { id: 102, name: "Mike", department: "Design", tasksCompleted: 12 },
  { id: 103, name: "Elena", department: "Engineering", tasksCompleted: 30 },
  { id: 104, name: "Josh", department: "Sales", tasksCompleted: 8 },
];

// Write recordProgress(logs, id, newCount) so that:

// It finds the employee by id.

// Condition: It only updates tasksCompleted if newCount is strictly greater than the current value.

// Immutability: It returns a new array if an update happens.

// Optimization: If the newCount is lower or the id isn't found, it returns the original logs array (this prevents React from re-rendering unnecessarily).

function recordProgress(logs, id, newCount) {
  const employee = logs.find((emp) => emp.id === id);

  if (!employee || newCount <= employee.tasksCompleted) {
    return logs;
  }

  return logs.map((emp) =>
    emp.id === id ? { ...emp, tasksCompleted: newCount } : emp,
  );
}

console.log("Task 4 ", recordProgress(employeeLogs02, 104, 22));
console.log(false == "0"); // true
console.log(typeof NaN); // number
console.log("7" - 2); // 5 , it is a number
console.log("7" * 2);
const result = ["1", "1", "2"].map(console.log);
console.log(result);
