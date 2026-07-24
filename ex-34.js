// 🏋️ Exercise: "First Non-Repeating Character"
// Write a function named firstNonRepeatingChar that takes a string as input and
// returns the first character that does not repeat consecutively anywhere in the string.

// If every character repeats, return null.

// Case sensitivity matters (e.g., 'a' and 'A' are considered different characters).

function firstNonRepeatingChar(str) {
  if (str[0] === str[1]) {
    return null;
  }
  let result = "";
  const letters = str.split("");

  const checkRepetedLetter = letters
    .filter((letter, index) => letters.indexOf(letter) !== index)
    .filter((ltr, idx, arr) => arr.indexOf(ltr) != idx);

  try {
    letters.forEach((el) => {
      if (checkRepetedLetter.includes(el)) {
        throw new Error("Stopping the loop.");
      } else {
        result = el;
      }
    });
  } catch (error) {
    console.info("Caughted:", error.message);
  }

  return result;
}

// Tests
console.log(firstNonRepeatingChar("leetcode")); // Expected: "l"
console.log(firstNonRepeatingChar("loveleetcode")); // Expected: "v"
console.log(firstNonRepeatingChar("aabbcc")); // Expected: null
console.log(firstNonRepeatingChar("abcdefg")); // Expected: "g"
