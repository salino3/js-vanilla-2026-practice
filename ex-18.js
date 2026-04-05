const number = 20;

// The Goal: Write a function countdown(n) that prints numbers from n down

//  to 1 and then prints "Liftoff!".

// Constraint: You cannot use for or while loops.

// Hint: Your base case is when n reaches 0.

function countdown(n) {
  if (n > 0) {
    console.log(n);
    n--;
  } else {
    return "Liftoff!";
  }
  return countdown(n);
}

// console.log("Task 1:", countdown(number));

// better version respecting immutability
function countdownV2(n) {
  if (n <= 0) {
    console.log("Liftoff!");
    return "Liftoff!";
  }

  console.log(n);

  return countdown(n - 1);
}

// console.log("Task 1 V2:", countdownV2(number));

//
// Write a function sum(arr) that calculates the total of all numbers in an array.

// Example: sum([1, 2, 3, 4])

// Hint: Think of the sum of an array as the first element plus the sum of the rest of the array.

function sum(arr) {
  if (arr.length === 0) {
    return 0;
  }

  return arr[0] + sum(arr.slice(1));
}

console.log(sum([1, 2, 3, 4]));

console.log("Task 2:", sum([1, 2, 3, 4]));

//
// Write a function isPalindrome(str) that returns true if a string reads the same forward and backward, and false otherwise.

// Example: isPalindrome("racecar") → true.

// Hint: Compare the first and last characters. If they match, strip them off and pass the remaining inner string back into the function.

function isPalindrome(str) {
  const normalizedStr = str.toLowerCase();

  const length = normalizedStr.length;

  if (length <= 1) {
    return true;
  }
  if (normalizedStr[0] !== normalizedStr[length - 1]) {
    return false;
  }
  return isPalindrome(normalizedStr.slice(1, length - 1));
}

console.log("Task 3:", isPalindrome("alslA"));
