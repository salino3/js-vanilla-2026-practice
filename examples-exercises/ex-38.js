// Write a function countWords(str) that takes a string of text and returns
//  an object containing the frequency count of each word.

// Words should be compared case-insensitively (e.g., "The" and "the" count as the same word).

// Ignore common punctuation marks attached to words (like periods, commas, or exclamation points).

// Ignore whitespace.

function countWords(str) {
  const strings = str.split(" ");

  return strings;
}

const string = "The quick brown fox jumps over the lazy dog!";

console.log("Task 1:", countWords(string));
