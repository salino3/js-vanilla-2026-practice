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
            topEarner = { ...worker };
          }
          acc.push({
            name: worker.name,
            salary: worker.salary,
            company: data.companyName,
          });
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

//
// Your job is to write a function called analyzeCarts(carts) that processes this data and
// returns a summary.

// Requirements:
// Calculate the grand total of all items across all carts combined.

// Find the most expensive single item in any cart. (Be sure to copy this object immutably
//     so it doesn't reference the original array!).

// Generate a combined list of all items being purchased across all carts, but each item in
// this list needs a new property added to it: belongsTo, which should equal the user's username.

// Keep it Immutable: Do not modify the original carts array or any of the objects inside it.

const userCarts = [
  {
    username: "alice99",
    items: [
      { name: "Laptop", price: 1200 },
      { name: "Mouse", price: 25 },
    ],
  },
  {
    username: "bob_builder",
    items: [
      { name: "Smart Watch", price: 300 },
      { name: "Headphones", price: 150 },
    ],
  },
  {
    username: "charlie_green",
    items: [
      { name: "Desk Lamp", price: 45 },
      { name: "Premium Chair", price: 450 },
    ],
  },
];

function analyzeCarts(carts) {
  const result = carts.reduce(
    (acc, cart) => {
      acc.grandTotal += cart.items.reduce((sum, item) => {
        if (
          Object.keys(acc.mostExpensive).length === 0 ||
          acc.mostExpensive.price < item.price
        ) {
          acc.mostExpensive = { ...item };
        }

        const value = {
          ...item,
          belongsTo: cart.username,
        };

        acc.list.push(value);

        return sum + item.price;
      }, 0);

      return acc;
    },
    { grandTotal: 0, mostExpensive: {}, list: [] },
  );

  return result;
}

console.log("Task 2:", analyzeCarts(userCarts));

//
const students = [
  {
    id: 1,
    name: "Alice",
    courses: [
      { name: "Math", grade: 85 },
      { name: "Biology", grade: 92 },
      { name: "History", grade: 78 },
    ],
  },
  {
    id: 2,
    name: "Bob",
    courses: [
      { name: "Math", grade: 58 },
      { name: "Biology", grade: 64 },
      { name: "History", grade: 72 },
    ],
  },
  {
    id: 3,
    name: "Charlie",
    courses: [
      { name: "Math", grade: 95 },
      { name: "Biology", grade: 88 },
      { name: "History", grade: 91 },
    ],
  },
  {
    id: 4,
    name: "Diana",
    courses: [
      { name: "Math", grade: 70 },
      { name: "Biology", grade: 45 },
      { name: "History", grade: 60 },
    ],
  },
];

// passedStudents
// An array containing the names of students whose average grade is at least 70.

// topStudent
// The name of the student with the highest average grade.

// averageGrade
// The average grade considering all grades from all students and all courses.

// courseAverages
// An object containing the average grade for each course.

function generateReport(students) {
  const reducedStudents = students.reduce(
    (acc, student) => {
      //
      let valuesStudent = new Set(
        student.courses.reduce((accStudents, course, i, arr) => {
          if (course.grade > acc.topStudent.grade) {
            acc.topStudent = {
              name: student.name,
              grade: course.grade,
            };
          }

          accStudents.push(course.grade);

          if (!acc.courseAverages[course.name]) {
            acc.courseAverages[course.name] = [];
          }
          acc.courseAverages[course.name].push(course.grade);

          if (arr.length - 1 === i) {
            let value =
              accStudents.reduce((sum, num) => sum + num, 0) /
              accStudents.length;

            acc.averageGrade.push(value);

            return value >= 70 ? [student.name] : [];
          } else {
            return accStudents;
          }
        }, []),
      );

      acc.passedStudents = [...acc.passedStudents, ...(valuesStudent ?? [])];

      return acc;
    },
    {
      passedStudents: [],
      topStudent: { name: "", grade: 0 },
      averageGrade: [],
      courseAverages: {},
    },
  );

  for (const item in reducedStudents.courseAverages) {
    let average =
      reducedStudents.courseAverages[item].reduce((sum, num) => sum + num, 0) /
      reducedStudents.courseAverages[item].length;

    reducedStudents.courseAverages[item] = Number(average.toFixed(2));
  }

  return {
    ...reducedStudents,
    passedStudents: Array.from(reducedStudents.passedStudents),
    topStudent: reducedStudents.topStudent.name,
    averageGrade: Number(
      (
        reducedStudents.averageGrade.reduce((sum, num) => sum + num, 0) /
        reducedStudents.averageGrade.length
      ).toFixed(2),
    ),
  };
}

console.log("Task 3:", generateReport(students));
