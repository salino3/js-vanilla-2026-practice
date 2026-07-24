// 🏋️ Exercise: "First Non-Repeating Character"
// Write a function named firstNonRepeatingChar that takes a string as input and
// returns the first character that does not repeat consecutively anywhere in the string.

// If every character repeats, return null.

// Case sensitivity matters (e.g., 'a' and 'A' are considered different characters).

function firstNonRepeatingChar(str) {
  const words = str.split("");
  const strReduced = words.reduce((acc, word) => {
    console.log("clog1", word);
    return acc;
  });
  return strReduced;
}

// Tests
console.log(firstNonRepeatingChar("leetcode")); // Expected: "l"
console.log(firstNonRepeatingChar("loveleetcode")); // Expected: "v"
console.log(firstNonRepeatingChar("aabbcc")); // Expected: null
