// Write a function LetterCount(str) that takes a string and returns the first word
//  with the greatest number of repeated letters.

// If a word has more than one letter that repeats, count the one that repeats the most.

// If there are no words with repeating letters, return -1.

function letterCount(str) {
  const strings = str.split(" ");
  let counting = 0;
  let finalResult = "";

  const result = strings.reduce((acc, currentWord) => {
    let wordMax = 0;
    for (let i = 0; i < currentWord.length; i++) {
      let found =
        currentWord.split("").filter((letter) => letter === currentWord[i])
          .length ?? 0;
      if (found > wordMax) {
        wordMax = found;
      }
      acc[currentWord] = wordMax;
    }
    return acc;
  }, {});

  for (value in result) {
    if (result[value] > counting) {
      counting = result[value];
      finalResult = value;
    }
  }

  if (counting > 1) {
    return finalResult;
  } else {
    return -1;
  }
}

console.log("Task 1:", letterCount("Today is the greatest day ever!"));

//
// Write a function ArrayAddition(arr) that takes an array of numbers.

// First, find the largest number in the array.

// Determine if any combination of the other numbers in the array can be added up to equal the largest number.

// Return true if they can, and false if not.

function arrayAddition(arr) {
  const largest = Math.max(...arr);
  const numbers = arr.filter((num) => num !== largest);

  function canSum(target, rest) {
    if (rest.length === 0) return target === 0;

    const first = rest[0];
    const remaining = rest.slice(1);

    // Option 1: Use the first number (subtract it from target)
    // Option 2: Skip the first number (target remains the same)
    return canSum(target - first, remaining) || canSum(target, remaining);
  }

  return canSum(largest, numbers);
}

console.log("Task 2:", arrayAddition([3, 5, -1, 8, 12]));

function SimpleMode(arr) {
  const nums = {};
  let maxCount = 0;
  let mode = -1;

  for (let i = 0; i < arr.length; i++) {
    nums[arr[i]] = (nums[arr[i]] ?? 0) + 1;
  }

  for (let i = 0; i < arr.length; i++) {
    let currentNum = arr[i];
    if (nums[currentNum] > maxCount) {
      maxCount = nums[currentNum];
      mode = currentNum;
    }
  }

  return maxCount > 1 ? mode : -1;
}

// Test cases
console.log(SimpleMode([10, 4, 5, 2, 4]));
console.log(SimpleMode([5, 10, 10, 6, 5]));
console.log(SimpleMode([1, 2, 3, 100]));

//
// Write a function called calculateTotal that:

// Takes an array of items as an argument.

// Calculates the total cost for the entire cart.

// Applies a 10% discount if the total cost is over $100.

// Returns the final total as a number.

const cart = [
  { name: "Laptop Sleeve", price: 25, quantity: 1 },
  { name: "Mechanical Keyboard", price: 80, quantity: 1 },
  { name: "USB-C Cable", price: 15, quantity: 2 },
];

function calculateTotal(cart) {
  const totalCost = cart.reduce((acc, product) => {
    acc += product.price * product.quantity ?? 0;

    return acc;
  }, 0);

  return totalCost > 100 ? totalCost - (totalCost / 100) * 10 : totalCost;
}

console.log("Task 4:", calculateTotal(cart));

//
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const logins = [
  { userId: 1, count: 5 },
  { userId: 2, count: 10 },
  { userId: 1, count: 2 },
  { userId: 3, count: 1 },
];

// Write a function called mergeUserData that takes both arrays and returns a new array of objects. Each object in the new array should contain:

// The id of the user.

// The name of the user.

// The totalLogins (the sum of all login counts for that specific ID).

// If a user has no login records, their totalLogins should be 0.

function mergeUserData(users, logins) {
  const newLoginsData = {};
  for (let i = 0; i < logins.length; i++) {
    newLoginsData[logins[i].userId] =
      (newLoginsData[logins[i].userId] ?? 0) + logins[i].count;
  }
  return users.map((user) => ({
    ...user,
    totalLogins: newLoginsData[user.id] ?? 0,
  }));
}

console.log("Task 5:", mergeUserData(users, logins));

//
// The Challenge: "The Meeting Scheduler"
// You are building a calendar app. You have an array of "booked" time slots, and you need to find out if a new meeting can fit without overlapping.

// The Rules:

// The function canSchedule takes two arguments: existingMeetings (array) and newMeeting (object).

// Each meeting has a start and end time (as integers, e.g., 10 for 10:00 AM).

// A meeting overlaps if the start time is before an existing end time AND the end time is after an existing start time.

// Return true if it can be scheduled, false if there is a conflict.

const existingMeetings = [
  { start: 10, end: 12 },
  { start: 15, end: 17 },
];

const newMeeting = { start: 11, end: 13 };
const anotherMeeting = { start: 13, end: 14 };

function canSchedule(existingMeetings, newMeeting) {
  return "Solve the exercise";
}

console.log("Task 6:", canSchedule(existingMeetings, newMeeting));

//
const person = {
  name: "Alan",
  surname: "Doe",
  email: "doe@gmail.com",
};

let newPerson;

for (data in person) {
  const { [data]: key, ...rest } = person;
  console.log("clog1", rest);
  if (data === "surname") {
    newPerson = { ...rest };
  }
}
console.log("clog2", newPerson);
