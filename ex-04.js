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
  s.split("").sort().join("") === t.split("").sort().join("");

console.log("Task 5: ", isAnagram("anagram", "nagaram"));
