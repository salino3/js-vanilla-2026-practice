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

function getCategoryRevenue(products, sales) {}

console.log("Task 2:", getCategoryRevenue(products, sales));
