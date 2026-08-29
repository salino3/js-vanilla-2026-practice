function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;

  const charMap = {};

  for (let char of str1) {
    charMap[char] = (charMap[char] || 0) + 1;
  }
  for (let char of str2) {
    if (!charMap[char]) return false;
    charMap[char]--;
  }

  return true;
}

console.log("Task 1:", isAnagram("holaa", "olaha")); // true

//
/**
 * Finds two indices such that the numbers at these indices sum up to the target.
 * @param {number[]} nums
 * @param {number} target
 * @returns {number[]}
 */
function twoSum(nums, target) {
  // We use a Map to store: key = the number, value = its index
  const storage = new Map();

  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    // Calculate the value needed to reach the target
    const complement = target - currentNum;

    // Check if the complement is already in our Map
    if (storage.has(complement)) {
      // If found, return the index of the complement and the current index
      return [storage.get(complement), i];
    }
    // If not found, store the current number and its index for future reference
    storage.set(currentNum, i);
  }

  // Return an empty array if no solution is found
  return [];
}

console.log("Task 2:", twoSum([8, 40, 2, 91, 7, 3], 47));

//
// Problem Description:
// Given a string s, find the first non-repeating character in it and
// return its index. If it does not exist, return -1.

function firstUniqChar(s) {
  const charCount = new Map();

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  for (let i = 0; i < s.length; i++) {
    if (charCount.get(s[i]) === 1) {
      return i;
    }
  }

  return -1;
}

console.log("Task 3:", firstUniqChar("loveleetcode"));

//
// Problem Description:
// Given an integer array nums, move all 0's to the end of it while maintaining the
// relative order of the non-zero elements.

function moveZeroes(nums) {
  const zeros = [];
  const firstNums = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      zeros.push(nums[i]);
    } else {
      firstNums.push(nums[i]);
    }
  }
  return [...firstNums, ...zeros];
}

console.log("Task 4:", moveZeroes([0, 1, 0, 3, 12]));

//
// Problem: "Group Anagrams"
// Given an array of strings 'strs', group the anagrams together.
// You can return the answer in any order.

// Input: strs = ["eat","tea","tan","ate","nat","bat"]

// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

function groupAnagrams(strs) {
  const groups = new Map();

  for (const word of strs) {
    // 1. Create a key by sorting the characters of the word
    // We split into array, sort, and join back to string
    const key = word.split("").sort().join("");
    // 2. Get the existing group or an empty array
    const group = groups.get(key) || [];

    // 3. Add the current word to the group
    group.push(word);
    // 4. Update the Map
    groups.set(key, group);
  }

  // 5. Convert the Map values into the required array of arrays format
  return Array.from(groups.values());
}

console.log(
  "Task 5:",
  groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]),
);
