// 🏋️ Exercise: "First Non-Repeating Character"
// Write a function named firstNonRepeatingChar that takes a string as input and
// returns the first character that does not repeat consecutively anywhere in the string.

// If every character repeats, return null.

// Case sensitivity matters (e.g., 'a' and 'A' are considered different characters).

function firstNonRepeatingChar(str) {
  const charCounts = {};

  for (const char of str) {
    charCounts[char] = (charCounts[char] || 0) + 1;
  }

  // Loop through 'str' in its original left-to-right order
  for (const char of str) {
    console.log(charCounts);

    if (charCounts[char] === 1) {
      console.log(char);

      return char;
    }
  }

  return null;
}

// Tests
console.log(firstNonRepeatingChar("leetcode")); // Expected: "l"
console.log(firstNonRepeatingChar("loveleetcode")); // Expected: "v"
console.log(firstNonRepeatingChar("aabbcc")); // Expected: null
console.log(firstNonRepeatingChar("abcdefg")); // Expected: "g"
