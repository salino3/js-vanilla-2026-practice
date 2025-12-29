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
  return [...arrayStart, ...arrayEnd];
};

console.log("Task 6: ", moveZeroes([0, 1, 0, 3, 12]));
