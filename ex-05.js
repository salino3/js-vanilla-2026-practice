// Task 1
// Given an integer array nums, return true if every value appears at least twice in the array,
// if not return false

/**
 * @param {number[]} nums
 * @return {boolean}
 */

const containsDuplicate = function (nums) {
  const nums2 = [...nums].reduce((acc, num) => {
    acc[num] = !acc[num] ? 1 : acc[num] + 1;
    return acc;
  }, {});

  let isDuplicate = true;

  for (key in nums2) {
    if (nums2[key] < 2) {
      isDuplicate = false;
    }
  }

  return isDuplicate;
};

console.log(
  "Task 1: ",
  containsDuplicate([1, 3, 3, 4, 3, 2, 4, 2, 1, 0, 0, -2, -2])
);

// Task 2
// Given an integer array nums, return true if at least one value appears twice in the array,
// if not return false

/**
 * @param {number[]} nums
 * @return {boolean}
 */

const searchContainsDuplicate = function (nums) {
  const seen = {};

  for (let num of nums) {
    if (seen[num]) return true;
    seen[num] = true;
  }
  return false;
};

console.log("Task 2: ", searchContainsDuplicate([1, 3, 13, 0, -9, -8, 4, 1]));

// Task 3
// You are given two integer arrays nums1 and nums2, sorted in non-decreasing order,
// The last n elements are 0 placeholders, does not had 0 to result.
// Merge nums2 into nums1 in-place so that nums1 becomes a single sorted array.

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {void}
 */

const mergeNums = function (nums1, nums2) {
  return nums1
    .reduce((acc, num) => {
      if (num != 0) {
        acc.push(num);
      }
      return acc;
    }, nums2)
    .sort();
};

console.log("Task 3: ", mergeNums([1, 2, 3, 0, 0, 0], [2, 5, 6]));
