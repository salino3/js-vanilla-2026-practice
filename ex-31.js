//
const corporateNetwork = [
  {
    companyName: "TechCorp",
    locations: ["New York", "San Francisco"],
    departments: {
      engineering: [
        { id: 101, name: "Alice", role: "Frontend Developer", salary: 110000 },
        { id: 102, name: "Bob", role: "Engineering Manager", salary: 150000 },
      ],
      marketing: [
        { id: 103, name: "Charlie", role: "SEO Specialist", salary: 80000 },
      ],
    },
  },
  {
    companyName: "BizGrowth",
    locations: ["Chicago", "London"],
    departments: {
      engineering: [
        { id: 201, name: "David", role: "Backend Developer", salary: 125000 },
        { id: 202, name: "Eva", role: "CTO", salary: 195000 },
      ],
      hr: [{ id: 203, name: "Frank", role: "HR Manager", salary: 95000 }],
    },
  },
];

// Write a function named getTopEarnerInDepartment(networks, departmentName).

// Inputs: * networks: The array of company objects (like the one above).

// departmentName: A string representing the department to search for (e.g., "engineering").

// Output: * An object containing the employee's name, salary, and the company they work for.

// If the department doesn't exist anywhere or has no employees, return null.

// Keep a tracker variable outside your loops (like let topEarner = null;) to compare salaries as you find valid employees.

function getTopEarnerInDepartment(networks, departmentName) {
  if (!departmentName) {
    return "Error: You need text a departament name";
  }

  let topEarner = null;

  const result = networks.reduce((acc, data) => {
    for (const dep in data.departments) {
      if (dep === departmentName) {
        data.departments[dep].map((worker) => {
          if (!topEarner || topEarner.salary < worker.salary) {
            topEarner = worker;
          }
          acc = [
            ...acc,
            {
              name: worker.name,
              salary: worker.salary,
              company: data.companyName,
            },
          ];
        });
      }
    }

    return acc;
  }, []);

  return result && Array.isArray(result) ? { result, topEarner } : null;
}

console.log(
  "Task 1:",
  getTopEarnerInDepartment(corporateNetwork, "engineering"),
);
