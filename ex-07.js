// Task 1
// Filter even numbers.

function filterEvenNumber(arr) {
  return arr.filter((n) => n % 2 === 0);
}

console.log("Task 1: ", filterEvenNumber([10, 15, 20, 25, 30]));

// Task 2
// Return an array with only the names.

function extraNames(users) {
  return users.map((user) => user.name);
}

console.log(
  "Task 2: ",
  extraNames([
    { id: 1, name: "Ana", age: 25 },
    { id: 2, name: "Luis", age: 32 },
    { id: 3, name: "Marta", age: 28 },
  ])
);

// Task 3
// Return how many properties the object has.

function countPropertiesObject(obj) {
  return Object.entries(obj).length;
}

console.log(
  "Task 3: ",
  countPropertiesObject({
    name: "Carlos",
    age: 35,
    country: "Spain",
  })
);

// Task 4
// Return a new object where all values are UPPERCASE.

function uppercaseObjectValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([itemKey, itemValue]) => [
      itemKey,
      itemValue.toUpperCase(),
    ])
  );
}

console.log(
  "Task 4: ",
  uppercaseObjectValues({
    admin: "full access",
    editor: "edit content",
    viewer: "read only",
  })
);

// Task 5
// Return a new object with only subjects >= 80.

function filterObjectByValue(obj) {
  for (item in obj) {
    if (obj[item] < 80) {
      delete obj[item];
    }
  }
  return obj;
}

console.log(
  "Task 5: ",
  filterObjectByValue({
    math: 90,
    english: 70,
    physics: 85,
    history: 60,
  })
);
