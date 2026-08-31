// Write a function named firstNonRepeatingChar that takes a string as an input and returns
// the first character that does not repeat anywhere in the string.

// If every character repeats, return null.

// The function should be case-sensitive (e.g., 'a' and 'A' are different characters).

function firstNonRepeatingChar(str) {
  if (!str) return null;

  let tempArr = str.split("");
  let start = tempArr[0];
  while (true) {
    console.log("clog2");
    tempArr.shift();
    if (!tempArr.includes(start)) {
      if (start) {
        return start;
      } else {
        return null;
      }
    } else {
      tempArr = tempArr.filter((char) => char !== start);
      start = tempArr[0];
    }
  }
}

console.log("Task 1", firstNonRepeatingChar("loveleetcode"));
