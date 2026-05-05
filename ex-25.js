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
