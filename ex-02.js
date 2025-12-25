// let array = [];

// array.reduce((accumulator, currentValue, index, array) => {
//   // return new accumulator
// }, initialValue);

// const scores = [80, 90, 100];
// let count = 0;
// const sum = scores.reduce((acc, score) => {
//   count++;
//   console.log("clog" + count, acc);
//   return acc + score;
// }, 1);
// console.log("SUM", sum);

// let max = [].reduce((best, n) => (n > best ? n : best), -Infinity);
// console.log("max".toUpperCase(), max);
// max = [-7].reduce((best, n) => (n > best ? n : best), -Infinity);
// console.log("MAX", max);

// Task 1
// 1. Keep only products that are in stock
// 2. Return a new array with objects:

const products = [
  { id: 1, name: "Laptop", price: 1200, inStock: true },
  { id: 2, name: "Mouse", price: 25, inStock: false },
  { id: 3, name: "Keyboard", price: 75, inStock: true },
  { id: 4, name: "Monitor", price: 300, inStock: true },
];

const productsStockPlusIVA = products
  .filter((p) => !!p.inStock)
  .map((p) => ({
    name: p.name,
    priceWithTax: (p.price / 100) * 21 + p.price,
  }));

console.log("productsStockPlusIVA", productsStockPlusIVA);

//#
// Task 2
// Calculate the total revenue from completed orders only.

const orders = [
  { id: 1, total: 120, status: "completed" },
  { id: 2, total: 75, status: "pending" },
  { id: 3, total: 200, status: "completed" },
  { id: 4, total: 50, status: "completed" },
];

const completedRevenue = orders
  .filter((order) => order?.status === "completed")
  .reduce((acc, order) => {
    return (acc += order?.total);
  }, 0);

console.log("completedRevenue", completedRevenue);

// Task 2 - Version 2 no filter()

const completedRevenue02 = orders.reduce((acc, order) => {
  return (acc += order?.status === "completed" ? order?.total : 0);
}, 0);

console.log("completedRevenue02", completedRevenue02);

//#
// Task 2
// Find the student with the highest average grade.

const students = [
  { name: "Ana", grades: [90, 80, 85] },
  { name: "Luis", grades: [70, 75, 72] },
  { name: "Maria", grades: [95, 90, 93] },
];

const highestAverageGrade = students.map((student) => {
  let sum = 0;
  student.grades.forEach((num = 0) => {
    sum += num;
  });
  return {
    name: student.name,
    average: sum / student.grades?.length || 0,
  };
});

const betterStudent = highestAverageGrade.reduce((acc, student) => {
  return acc?.average >= student.average ? acc : student;
});

console.log("betterStudent", {
  ...betterStudent,
  average: betterStudent?.average.toFixed(2),
});

// Task 4
// Group people by country.

const people = [
  { name: "Alice", country: "Spain" },
  { name: "Bob", country: "USA" },
  { name: "Carlos", country: "Spain" },
  { name: "Diana", country: "USA" },
  { name: "Eva", country: "France" },
];

const groupsByCountry = Object.groupBy(people, ({ country }) => country);
console.log("groupsByCountry", groupsByCountry);

let resultGroupsByCountry = {};
for (x in groupsByCountry) {
  resultGroupsByCountry[x] = groupsByCountry[x].reduce((acc, people) => {
    acc.push(people.name);
    return acc;
  }, []);
}

console.log("resultGroupsByCountry", resultGroupsByCountry);

// Task 5
// Return the userId with the highest total duration.

const sessions = [
  { userId: 1, duration: 30 },
  { userId: 2, duration: 59 },
  { userId: 2, duration: 59 },
  { userId: 3, duration: 60 },
  { userId: 1, duration: 15 },
];

const groupByUserId = Object.values(
  Object.groupBy(sessions, ({ userId }) => userId)
);

const usersMapped = groupByUserId.map((item) => {
  return {
    [item[0].userId]: item.reduce((acc, session) => {
      acc += session?.duration;
      console.log("ACC", acc, session);
      return acc;
    }, 0),
  };
});

let higherValue = 0;
let usersMapped2 = Object.keys(
  usersMapped
    .map((item, index) => {
      higherValue =
        higherValue < item[index + 1] ? item[index + 1] : higherValue;
      return item;
    })
    .find((x, index) => x[index + 1] == higherValue)
)[0];

console.log("groupByUserId02", usersMapped2);

// Better result Task 5
const result = sessions.reduce((acc, s) => {
  console.log("Check01", acc);
  acc[s.userId] = (acc[s.userId] || 0) + s.duration;
  return acc;
}, {});

console.log("Check02", Object.entries(result));

const userWithMax = Object.entries(result).reduce(
  (best, [userId, total]) => (total > best.total ? { userId, total } : best),
  { userId: null, total: -Infinity }
);

console.log("Better result Task 5: ", userWithMax.userId);
