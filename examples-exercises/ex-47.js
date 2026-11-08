// he Goal: Write a function called slugify(str) that takes a string and converts
// it into a URL-friendly "slug".

// Lowercase: Convert all characters to lowercase.

// Trim: Remove whitespace from the beginning and end of the string.

// Special Characters: Replace spaces and non-alphanumeric characters (excluding hyphens) with a single hyphen (-).

// Clean up: Ensure there are no consecutive hyphens (--) or leading/trailing hyphens in the final output.

//
function slugify(str) {
  const result = str
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/[\s-]+/g, "-") // Replace spaces and multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Trim leading and trailing hyphens

  return result;
}

console.log("Task 1: ", slugify(" JavaScript & CSS: The Ultimate Guide!     "));

// Challenge: The Nested Department Payroll Aggregator
// The Goal: Write a function calculateDepartmentPayroll(org) that takes a deeply nested organizational
//  structure (where a department can have direct employees and further subDepartments)
//  and returns a summary object mapping each department's name to its total payroll
//  (the sum of its direct employees' salaries plus the payroll of all its nested sub-departments).

const companyOrg = {
  name: "Global HQ",
  employees: [
    { name: "Alice", salary: 50000 },
    { name: "Bob", salary: 60000 },
  ],
  subDepartments: [
    {
      name: "Engineering",
      employees: [
        { name: "Charlie", salary: 100000 },
        { name: "Diana", salary: 110000 },
      ],
      subDepartments: [
        {
          name: "Frontend Team",
          employees: [
            { name: "Eve", salary: 80000 },
            { name: "Frank", salary: 85000 },
          ],
        },
      ],
    },
    {
      name: "Human Resources",
      employees: [{ name: "Grace", salary: 70000 }],
    },
  ],
};

function calculateDepartmentPayroll(org) {
  const result = {};

  function helper(department) {
    let total =
      department && department.employees && department.employees.length > 0
        ? department.employees.reduce((sum, emp) => sum + emp.salary, 0)
        : 0;

    if (department.subDepartments) {
      for (const subDept of department.subDepartments) {
        total += helper(subDept);
      }
    }

    result[department.name] = total;

    return total;
  }

  helper(org);

  return result;
}

console.log("Task 2: ", calculateDepartmentPayroll(companyOrg));
