// Task 1
// check if the string is palindrome.

function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] != s[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

console.log("Task 1: ", isPalindrome("hello"));

// Task 2
// Given an array of numbers, move all 0's to the end of it while maintaining the relative
// order of the non-zero elements.

function moveZerosToEnds(arr) {
  let len = arr.filter((x) => x == 0).length;

  for (let x = 0; x < len; x++) {
    arr.push(0);
  }
  return arr.filter((n, i) => n != 0 || i > arr.length - len - 1);
}

console.log("Task 2: ", moveZerosToEnds([0, 1, 0, 0, 0, 0, 3, 12, 0]));

function moveZerosToEnds02(arr) {
  let lastNonZeroFoundAt = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      console.log(arr[lastNonZeroFoundAt], arr[i]);
      arr[lastNonZeroFoundAt] = arr[i];
      lastNonZeroFoundAt++;
    }
  }

  for (let i = lastNonZeroFoundAt; i < arr.length; i++) {
    arr[i] = 0;
  }

  return arr;
}

console.log("Task 2 V2: ", moveZerosToEnds02([0, 1, 0, 0, 0, 0, 3, 12, 0]));

// Task 3
// Imagine you have an array of strings representing "votes" for different candidates.
// You need to return an Object where the key is the candidate's name and the value is
// the total number of votes they received.

const votes = ["Alice", "Bob", "Alice", "Charlie", "Alice", "Bob"];

const tally = votes.reduce((acc, candidate) => {
  acc[candidate] ? acc[candidate]++ : (acc[candidate] = 1);

  return acc;
}, {});

console.log("Task 3: ", tally);

//
const fruits = ["Manzana", "Pera", "Plátano", "Fresa", "Cacao"];

fruits.sort((a, b) => {
  if (a === "Plátano") return -1;
  if (b === "Plátano") return 1;
  return a.localeCompare(b);
});

console.log(fruits); // ['Plátano', 'Cacao', 'Fresa', 'Manzana', 'Pera']

//
const weights = {
  "admin": 1,
  "editor": 2,
  "user": 3,
};

const users = ["user", "admin", "editor"];

users.sort((a, b) => (weights[a] || 99) - (weights[b] || 99)); // or 'Infinity'

console.log(users); // ["admin", "editor", "usuario"]
