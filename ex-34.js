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

  console.log(checkRepetedLetter);

  try {
    letters.forEach((el) => {
      console.log("clog1", el);
      if (checkRepetedLetter.includes(el)) {
        console.log("clog2", el);
        throw new Error("Oops! Stopping the loop.");
      } else {
        console.log("clog3", el);

        result = el;
      }
    });
  } catch (error) {
    console.log("Caught an error:", error.message);
  }
  console.log("---------------------------------------------");
  return result;
}

// Tests
console.log(firstNonRepeatingChar("leetcode")); // Expected: "l"
console.log(firstNonRepeatingChar("loveleetcode")); // Expected: "v"
console.log(firstNonRepeatingChar("aabbcc")); // Expected: null
