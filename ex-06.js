// Task 1
// Write a function that takes an array of numbers and returns a new array containing
// only the numbers that appear an odd number of times in the original list.

function oddUniqueFrequencyFilter(arr = []) {
  arr.reduce((acc, num) => {
    acc[num] = acc[num] ? acc[num] + 1 : 1;
    return acc;
  }, {});

  const result = new Set();
  for (let key in arr) {
    if (arr[key] % 2 !== 0) {
      result.add(arr[key]);
    }
  }

  return Array.from(result);
}

console.log(
  "Task 1: ",
  oddUniqueFrequencyFilter([1, 2, 2, 3, 3, 3, 4, 4, 4, 4])
);
