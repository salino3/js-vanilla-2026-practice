// let array = [];

// array.reduce((accumulator, currentValue, index, array) => {
//   // return new accumulator
// }, initialValue);

const scores = [80, 90, 100];
let count = 0;
const sum = scores.reduce((acc, score) => {
  count++;
  console.log("clog" + count, acc);
  return acc + score;
}, 1);
console.log("SUM", sum);

let max = [].reduce((best, n) => (n > best ? n : best), -Infinity);
console.log("max".toUpperCase(), max);
max = [-7].reduce((best, n) => (n > best ? n : best), -Infinity);
console.log("max".toUpperCase(), max);
