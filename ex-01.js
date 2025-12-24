document.addEventListener("DOMContentLoaded", () => {
  let input = ""; // prompt("What's your name?");
  //   alert(`Your name is ${input}`);
  if (!input) {
    input = "Joe";
  }

  if (input) {
    document.getElementById("spanName").textContent = input;
  }
  console.log(input);
});

//
const users = [
  { id: 1, name: "Alice", role: "admin", active: true, scores: [80, 90, 100] },
  { id: 2, name: "Bob", role: "user", active: false, scores: [60, 70] },
  { id: 3, name: "Carol", role: "user", active: true, scores: [88, 92] },
  { id: 4, name: "Dave", role: "admin", active: true, scores: [95] },
  { id: 5, name: "Eve", role: "user", active: true, scores: [] },
];

//   Task 1 – Filter

// Get only active users with role "user".
const array01 = users.filter((user) => user?.role === "user" && !!user.active);
console.log("array01", array01);

// Task 2 – Transform

// For each of those users, return a new object with:
// id
// name
// averageScore
// Rules:
// If scores is empty, averageScore should be null
// Do not mutate the original array

function checkAverageScore(arr) {
  let average = 0;
  arr && arr?.length > 0
    ? arr.map((s) => {
        average += s;
      })
    : null;
  return average == 0 ? null : average / arr?.length;
}

const array02 = users.map((user) => ({
  id: user.id,
  name: user.name,
  averageScore: checkAverageScore(user?.scores),
}));
console.log("array02", array02);
