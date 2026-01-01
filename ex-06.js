// Task 1
// Write a function that takes an array of numbers and returns a new array containing
// only the numbers that appear an odd number of times in the original list.

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
