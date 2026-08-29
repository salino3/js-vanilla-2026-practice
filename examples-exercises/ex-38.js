// Write a function countWords(str) that takes a string of text and returns
//  an object containing the frequency count of each word.

// Words should be compared case-insensitively (e.g., "The" and "the" count as the same word).

// Ignore common punctuation marks attached to words (like periods, commas, or exclamation points).

// Ignore whitespace.

function countWords(str) {
  if (!str) return null;

  const regex = /[^\w\s]/gi;

  const stringsNormalized = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(regex, "")
    .toLowerCase()
    .split(" ");

  const reducedStrings = stringsNormalized.reduce((acc, word) => {
    acc[word] = (acc[word] ?? 0) + 1;

    return acc;
  }, {});

  return reducedStrings;
}

const string = "The quick brown fox fóx jumps over the lazy dog!";

console.log("Task 1:", countWords(string));
