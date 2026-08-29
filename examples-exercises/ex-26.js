// Problem Statement
// Write a function called twoSum that takes an array of integers (nums) and an integer (target). The function should return the indices of the two numbers in the array such that they add up to the target.

// Rules
// You may assume that each input would have exactly one solution.

// You cannot use the same element twice (i.e., you can't add the number at index 0 to itself).

// You can return the answer in any order.

function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      console.log("clog2", i, nums[i], j, nums[j]);

      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}

console.log("Task 1", twoSum([0, 8, 2, 11, 7, 15], 9));
// console.log("Task 1", twoSum([3, 2, 4], 6)); // [1, 2]
