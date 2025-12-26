const entriesTest0 = [
  ["user1", { name: "Aldo", age: 23 }],
  ["user2", { name: "José", age: 33 }],
];

const resultTest0 = Object.fromEntries(entriesTest0);

console.log(resultTest0);
// {
//   user1: { name: "Aldo", age: 23 },
//   user2: { name: "José", age: 33 }
// }

//#----------------------------------
const usersTest1 = [
  { name: "Aldo", age: 23 },
  { name: "José", age: 33 },
];

const resultTest1 = Object.fromEntries(
  usersTest1.map((user, index) => [index, user])
);

console.log(resultTest1);
// {
//   0: { name: "Aldo", age: 23 },
//   1: { name: "José", age: 33 }
// }
console.log(Object.values(resultTest1));
// [
//   0: {name: 'Aldo', age: 23},
//   1: {name: 'José', age: 33}
// ]

//# Or other option
const resultTest2 = Object.fromEntries(
  usersTest1.map((user) => [user.name, user])
);

console.log(resultTest2);
// {
//   Aldo: { name: "Aldo", age: 23 },
//   José: { name: "José", age: 33 }
// }

console.log(Object.values(resultTest2));
// [
//   0: {name: 'Aldo', age: 23},
//   1: {name: 'José', age: 33}
// ]

//#----------------------
//* Upper case sensitive - check the key
const usersMap = new Map([
  ["Aldo", { name: "Aldo", age: 23 }],
  ["José", { name: "José", age: 33 }],
  ["Jose", { name: "Jasé", age: 33 }],
  ["JosE", { name: "José", age: 393 }],
]);

console.log(usersMap);
console.log(usersMap.get("Aldo")); // { name: "Aldo", age: 23 }

[...usersMap.values()];
// [
//   { name: "Aldo", age: 23 },
//   { name: "José", age: 33 }
// ]
