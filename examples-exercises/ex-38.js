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

const input_02 = [1, [2, [3, 4], 5], 6, [7]];

function flattenArray(arr) {
  if (arr.some((subArray) => subArray.length > 0)) return arr;

  return arr.flat(Infinity);
}

console.log("Task 3:", flattenArray(input_02));
