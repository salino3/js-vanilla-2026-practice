// Task 1
// Write a function that takes an array of numbers and returns a new array containing
// only the numbers that appear an odd number of times in the original list.
// "odd number" impar number

function oddUniqueFrequencyFilter(arr = []) {
  const counts = arr.reduce((acc, num) => {
    acc[num] = acc[num] ? acc[num] + 1 : 1;
    return acc;
  }, {});

  const result = [];

  for (let num in counts) {
    if (counts[num] % 2 !== 0) {
      result.push(Number(num));
    }
  }

  return Array.from(result);
}

console.log(
  "Task 1: ",
  oddUniqueFrequencyFilter([1, 2, 2, 3, 3, 3, 4, 4, 4, 4])
);

// Task 2
// to take all unique numbers and calculate the length of the unique array.

const uniqueNumbersLength = (arr = []) => Array.from(new Set(arr)).length;

console.log(
  "Task 2: ",
  uniqueNumbersLength([1, 2, 2, 3, 3, 3, 4, 0, 4, 4, 0, 5, 4])
);

//

function removeUnsortedInPlace(arr) {
  let i = 0;
  const seen = new Set(); // We use a Set to remember values

  for (let j = 0; j < arr.length; j++) {
    if (!seen.has(arr[j])) {
      seen.add(arr[j]);
      i++;
    }
  }
  return i; // New length
}

console.log(
  "Task 2 V2: ",
  removeUnsortedInPlace([1, 2, 2, 3, 3, 3, 4, 0, 4, 4, 3, 0, 5, 1, 3, 4])
);

// Task 3
// Given an array of numbers and a target number,
// return the indices (the positions) of the two numbers that add up to that target.

// Other version 'twoSum', less calculation, little bit more storage memory
function twoSum(nums = [], target = 0) {
  const seen = {};

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    // Check if the number we need exists in our memory
    if (complement in seen) {
      // We found it! Return the index from memory and current index
      return [seen[complement], i];
    }

    // If not found, store the current number and its index
    seen[nums[i]] = i;
  }

  return [];
}

console.log("Task 3: ", twoSum([1, 2, 2, 3, 11, -2, 1], 9));
