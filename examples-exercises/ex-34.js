// 🏋️ Exercise: "First Non-Repeating Character"
// Write a function named firstNonRepeatingChar that takes a string as input and
// scan the string from left to right, and return the very FIRST letter that does
// not appear anywhere else in the string

// If every character repeats, return null.

// Case sensitivity matters (e.g., 'a' and 'A' are considered different characters).

function firstNonRepeatingChar(str) {
  const charCounts = {};

  for (const char of str) {
    charCounts[char] = (charCounts[char] || 0) + 1;
  }

  // Loop through 'str' in its original left-to-right order
  for (const char of str) {
    if (charCounts[char] === 1) {
      return char;
    }
  }

  return null;
}

// Version 2
function firstNonRepeatingChar02(str) {
  for (const char of str) {
    if (str.indexOf(char) === str.lastIndexOf(char)) {
      return char;
    }
  }
  return null;
}

// Tests
console.log(firstNonRepeatingChar("leetcode")); // Expected: "l"
console.log(firstNonRepeatingChar02("loveleetcode")); // Expected: "v"
console.log(firstNonRepeatingChar("aabbcc")); // Expected: null
console.log(firstNonRepeatingChar("abcdefg")); // Expected: "a"
