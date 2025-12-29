// Task 1

const brackets = "[[{[()]}]]";

function isValid(s) {
  const stack = [];
  const map = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (let char of s) {
    if (["(", "{", "["].includes(char)) {
      stack.push(char); // push opening brackets
    } else if ([")", "}", "]"].includes(char)) {
      if (stack.pop() !== map[char]) {
        return false; // mismatch
      }
    }
  }

  return stack.length === 0; // true if all matched
}

console.log("Task 1: ", isValid(brackets));

// Task 2
// Remove Duplicates from Sorted Array

const nums = [1, 1, 2];
const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];

function removeDuplicatesNums(arr = []) {
  return arr.reduce((acc, num, index) => {
    const newNums = acc.some((n) => n == num);
    if (!newNums) {
      acc.push(num);
    }
    return acc;
  }, []);
}

console.log("Task 2: ", removeDuplicatesNums(nums));
console.log("Task 2-1: ", removeDuplicatesNums(nums2));

console.log("#----------------------------");
// Task 3
// Given a string s, find the length of the longest substring without repeating characters.

let s = "abcabcbb";

function lengthOfLongestSubstring(s) {
  var longestSubstring = "";
  var currentWord = "";
  for (var i = 0; i < s.length; i++) {
    var foundIndex = currentWord.indexOf(s[i]);
    if (foundIndex > -1) {
      if (longestSubstring.length < currentWord.length)
        longestSubstring = currentWord;
      currentWord = currentWord.slice(foundIndex + 1);
    }
    currentWord += s[i];
  }
  return longestSubstring.length < currentWord.length
    ? currentWord.length
    : longestSubstring.length;
}

console.log("Task 3: ", lengthOfLongestSubstring(s));

// Task 4
// Given an array of integers nums and an integer target,
// return indices of the two numbers such that they add up to target.

let arrayNums = [2, 3, 7, 11],
  target = 9;

function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}

console.log("Task 4: ", twoSum(arrayNums, target));

// Task 5
// Given two strings s and t, return true if t is an anagram of s, and false otherwise.

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = (s, t) =>
  s.toLowerCase().split("").sort().join("") ===
  t.toLowerCase().split("").sort().join("");

console.log("Task 5: ", isAnagram("aNagraM", "naGaram"));

// Better solution
var isAnagram2 = function (s, t) {
  if (s.length !== t.length) return false;

  const count = {};

  for (let char of s.toLowerCase()) {
    console.log("S1", count);
    count[char] = (count[char] || 0) + 1;
    console.log("S2", count[char]);
  }
  console.log("S3", count); // {a: 3, n: 1, " ": 1, g: 1, r: 1, m: 1}

  for (let char of t.toLowerCase()) {
    if (!count[char]) return false;
    count[char]--;
  }

  return true;
};

console.log("Task 5 V2: ", isAnagram2("ana graM", "nagAr am"));

// Task 6
// Given an integer array nums, move all 0s to the end of it
// while maintaining the relative order of the non-zero elements.

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place.
 */
var moveZeroes = function (nums) {
  const arrayStart = [];
  const arrayEnd = [];

  for (let values of nums) {
    if (values === 0) {
      arrayEnd.push(values);
    } else {
      arrayStart.push(values);
    }
  }

  const result = [...arrayStart, ...arrayEnd];

  for (let i = 0; i < nums.length; i++) {
    nums[i] = result[i];
  }
  return nums;
};

console.log("Task 6: ", moveZeroes([0, 1, 0, 3, 12]));

// Task 7
// You are given an array prices where prices[i] is the price of a given stock on day i.
// You want to maximize your profit by choosing:
// one day to buy
// one later day to sell
// If you cannot achieve any profit, return 0..

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const copyPrices = [...prices].sort();
  const lowerIndex = prices.indexOf(copyPrices[0]);

  const copyPrices2 = prices.slice(lowerIndex);
  const lower = copyPrices2[0];
  const major = copyPrices2[copyPrices2.length - 1];

  if (lowerIndex && major) {
    return `Buy on day ${lowerIndex} (price = ${lower}) and sell on day ${prices.indexOf(
      copyPrices.length - 1
    )} (price = ${major})`;
  } else {
    ("Not convenient to buy");
  }
};

console.log("Task 7: ", maxProfit([7, 3, 1, 5, 3, 6, 4]));

// Better correct version

var maxProfitWithDays = function (prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  let buyDay = 0;
  let sellDay = 0;
  let tempBuyDay = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
      tempBuyDay = i; // candidate buy day
    }
    const profit = prices[i] - minPrice;
    if (profit > maxProfit) {
      maxProfit = profit;
      buyDay = tempBuyDay;
      sellDay = i;
    }
  }

  if (maxProfit > 0) {
    return `Buy on day ${buyDay} (price = ${prices[buyDay]}) and sell on day ${sellDay} (price = ${prices[sellDay]})`;
  } else {
    return "No profitable transaction";
  }
};

console.log("Task 7 V2: ", maxProfitWithDays([7, 3, 1, 5, 3, 6, 4]));
