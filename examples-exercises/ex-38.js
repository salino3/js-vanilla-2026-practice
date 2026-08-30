// Write a function countWords(str) that takes a string of text and returns
//  an object containing the frequency count of each word.

// Words should be compared case-insensitively (e.g., "The" and "the" count as the same word).

// Ignore common punctuation marks attached to words (like periods, commas, or exclamation points).

// Ignore whitespace.

function countWords(str) {
  if (!str.trim()) return null;

  const regex = /[^\w\s]/gi;

  const stringsNormalized = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(regex, "")
    .toLowerCase()
    .split(/\s+/);

  const reducedStrings = stringsNormalized.reduce((acc, word) => {
    acc[word] = (acc[word] ?? 0) + 1;

    return acc;
  }, {});

  return reducedStrings;
}

const string = "The quick brown fox      fóx jumps over the lazy dog!";

console.log("Task 1:", countWords(string));

// Write a function groupAnagrams(words) that takes an array of strings and groups all words that are
//  anagrams of each other together into sub-arrays.

// An anagram is a word formed by rearranging the letters of another word (e.g., "listen" and "silent").

// The order of the output groups or the words within each group does not matter.

// Case sensitivity should be ignored for matching, but preserve standard lowercase output.

// If given an empty array, return an empty array [].

function groupAnagrams(words) {
  if (words.length === 0) return [];

  const reducedWords = words.reduce((acc, word) => {
    const keyWord = word.toLowerCase().split("").sort().join("");

    if (acc[keyWord]) {
      acc[keyWord].push(word);
    } else {
      acc[keyWord] = [];
      acc[keyWord].push(word);
    }

    return acc;
  }, {});

  return Object.values(reducedWords);
}

const input = ["eat", "tea", "tan", "ate", "nat", "bat"];

console.log("Task 2:", groupAnagrams(input));

// Write a function flattenArray(arr) that takes a nested array of arbitrary depth
// and flattens it into a single one-dimensional array.

// Requirements
// Do not use JavaScript's built-in Array.prototype.flat() or Array.prototype.flatMap().

// The input array can contain numbers, strings, or other deeply nested arrays.

// The original order of elements must be preserved.

// If given an empty array or non-nested array, return the expected flattened
//  result without mutating the original input.

const input_02 = [1, [2, [3, 4], "hola", 5], null, false, 6, "joe", [7]];

function flattenArray(arr) {
  if (!Array.isArray(arr)) return [];

  return arr.reduce((acc, item) => {
    if (Array.isArray(item)) {
      return acc.concat(flattenArray(item));
    }
    return acc.concat(item);
  }, []);
}

console.log("Task 3:", flattenArray(input_02));

// Write a function isPalindrome(str) that checks whether a given string
// is a palindrome (reads the same forward and backward).

// Ignore letter casing, punctuation, symbols, and whitespace.

// Return true if the processed string is a palindrome, and false if it is not.

// An empty string or a single-character string should return true.

function isPalindrome(str) {
  if (typeof str !== "string") return false;
  if (!str.trim() || str.trim().length === 1) return true;

  const cleanedStr = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();

  if (cleanedStr.length <= 1) return true;

  return cleanedStr === cleanedStr.split("").reverse().join("");
}

console.log("Task 4:", isPalindrome("No 'x' in Nixon"));

// Write a function twoSum(nums, target) that finds two numbers in an array that add up to a specific target number and returns their indices.
// RequirementsReturn an array containing the indices of the two numbers, e.g., [index1, index2].
// Each input will have exactly one solution, and you may not use the same element twice.
// You can return the answer in any order.
// Aim for an optimal solution using a hash map or object ($O(n)$ time complexity) rather than nested loops ($O(n^2)$).

function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let x = 1; x < nums.length; x++) {
      let a = nums[i];
      let b = nums[x];

      if (a + b === target && i !== x) {
        return [i, x];
      }
    }
  }

  return false;
}

console.log("Task 5:", twoSum([1, 2, 7, 11, 2, 15, 1], 9));
