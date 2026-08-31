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

// Write a function named isAnagram that takes two strings as inputs and returns true if the
// two strings are anagrams of each other, and false otherwise.

// An anagram is a word formed by rearranging the letters of another word, using all the original letters exactly once.

// The function should ignore spaces, punctuation, and capitalization.

function isAnagram(str1, str2) {
  // Your code here
}

console.log("Task 2", isAnagram("nnroegnrgewino", "nnroegnrgewinos"));
