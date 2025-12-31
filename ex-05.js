// Task 1
// Given an integer array nums, return true if any value appears at least twice in the array,
//  if not return false

/**
 * @param {number[]} nums
 * @return {boolean}
 */

var containsDuplicate = function (nums) {
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
