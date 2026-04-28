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
