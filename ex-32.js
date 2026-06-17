// Write a function called lengthOfLongestSubstring that takes a string 's' and returns
// the length of the longest substring that contains no duplicate characters.

//  Rules & Assumptions
// A "substring" must be contiguous (connected). For example, in "abcabcbb", "abc"
// is a substring, but "acb" is a subsequence, not a substring.

// The input string can contain letters, digits, symbols, and spaces.

// If the string is empty, the return value should be 0.

function lengthOfLongestSubstring(s) {
  let charSet = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }

    charSet.add(s[right]);

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

console.log("Task 1:", lengthOfLongestSubstring("abcgangolb"));

//
// Write a recursive function called countdown that takes a positive integer n. The function should
//  log the numbers from n down to 1 to the console, and then log "Liftoff!" at the very end.

// 1. Base Case: If n is 0, print "Liftoff!" and exit the function

// 2. Action: Print the current number n

// 3. Recursive Step: Call countdown again with n - 1

function countdown(n) {
  if (n <= 0) {
    console.log("Liftoff!");
    return;
  }
  console.log("N:", n);

  countdown(n - 1);
}

console.log("Task 2:");
countdown(5);

//
// Write a recursive function called sumArray that takes an array of numbers and returns
//  the total sum of all the numbers in the array.

// Rules
// You cannot use for or while loops.

// You cannot use the built-in .reduce() method.

// You must use recursion.

// Base case: If empty, return 0

function sumArray(arr) {
  if (arr.length === 0) {
    return 0;
  }

  if (arr.length === 1) {
    return arr[0];
  }

  return arr[0] + sumArray(arr.slice(1));
}

console.log("Task 3:", sumArray([1, 2, 3, 4]));

//
// Write a recursive function called reverseString that takes a string and returns
// a new string with the characters in reverse order.

// 1. Base Case: If the string is empty, return ""

// 2. Recursive Step: How can you take the first character
//    and put it at the END of the remaining reversed string?

function reverseString(str) {
  if (!str || str.length === 0) {
    return "";
  }

  if (str.length === 1) {
    return str[0];
  }

  return reverseString(str.slice(1)) + str.charAt(0);
}

console.log("Task 4:", reverseString("hello"));

//
// Your task is to write a generator function that loops through a paginated data structure and
// yields individual items.

// The Mock Data
// Here is the data structure your generator will walk through:

const userData = [
  { page: 1, items: ["Alice", "Bob", "Charlie"] },
  { page: 2, items: ["David", "Eve", "Frank"] },
  { page: 3, items: ["Grace", "Heidi", "Ivan"] },
];

// Your Instructions
// Write a generator function named streamUsers(pages).

// It should accept the userData array as an argument.

// It should loop through each page, and then loop through each item in that page's items array.

// It must yield each individual name one by one.

function* streamUsers(pages) {
  for (let i = 0; i < pages.length; i++) {
    yield pages[i];
  }
}

const userGen = streamUsers(userData);

console.log("Task 5:", userGen.next().value);
console.log("Task 5:", userGen.next().value);
console.log("Task 5:", userGen.next().value);
console.log("Task 5:", userGen.next().done);

//
function* scoreTracker() {
  let score = 0;

  while (true) {
    // 1. Yield the current score and pause.
    // 2. When next(val) is called, the passed value is assigned to 'bonus'.
    let bonus = yield score;

    // If a bonus was passed, add it. Otherwise, add 1.
    if (bonus !== undefined) {
      score += bonus;
    } else {
      score += 1;
    }
  }
}

const game = scoreTracker();

console.log(game.next().value); // 0  (Starts generator, pauses at 'yield score')
console.log(game.next().value); // 1  (No bonus, adds 1)
console.log(game.next().value); // 2  (No bonus, adds 1)
console.log(game.next(10).value); // 12 (bonus is 10, adds 10 to 2)
console.log(game.next().value); // 13 (No bonus, adds 1)
