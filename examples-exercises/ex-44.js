// Imagine you are building a personal finance dashboard. You need to write a JavaScript function
// named analyzeExpenses that processes an array of transaction objects,
// filters them, groups them by category, and returns a sorted summary.

// Function Signature & Requirements
// Write a function analyzeExpenses(transactions, minAmount) that takes:

// transactions: An array of objects, where each object has { id, category, amount, date }.

// minAmount: A number representing the minimum threshold. Only transactions with an amount
//  greater than or equal to minAmount should be included.

// Expected Output
// The function should return an array of objects representing each category's total spending,
//  sorted from highest total spending to lowest.
// Each object in the resulting array should look like this:
// { category: "String", total: Number, count: Number }

const transactions = [
  { id: 1, category: "Food", amount: 45, date: "2026-06-01" },
  { id: 2, category: "Transport", amount: 15, date: "2026-06-02" },
  { id: 3, category: "Food", amount: 120, date: "2026-06-03" },
  { id: 4, category: "Entertainment", amount: 60, date: "2026-06-04" },
  { id: 5, category: "Transport", amount: 5, date: "2026-06-05" },
  { id: 6, category: "Food", amount: 30, date: "2026-06-06" },
];

function analyzeExpenses(transactions, minAmount) {
  const result = transactions.reduce((acc, item) => {
    if (item.amount >= minAmount) {
      if (acc[item.category]) {
        acc[item.category] = {
          category: item.category,
          amount: (acc[item.category].amount += item.amount),
          count: (acc[item.category].count += 1),
        };
      } else {
        acc[item.category] = {
          category: item.category,
          amount: item.amount,
          count: 1,
        };
      }
    }

    return acc;
  }, []);

  return Object.values(result);
}

console.log("Task 1", analyzeExpenses(transactions, 20));
