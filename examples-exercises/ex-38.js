// Write a function countWords(str) that takes a string of text and returns
//  an object containing the frequency count of each word.

// Words should be compared case-insensitively (e.g., "The" and "the" count as the same word).

// Ignore common punctuation marks attached to words (like periods, commas, or exclamation points).

// Ignore whitespace.

function countWords(str) {
  const strings = str.split(" ");

  const reducedStrings = strings.reduce((acc, word) => {
    const normalizedWord = word.toLowerCase();

    if (acc[normalizedWord]) {
      acc[normalizedWord] = acc[normalizedWord] + 1;
    } else {
      acc[normalizedWord] = 1;
    }

    return acc;
  }, {});

  return reducedStrings;
}

const string = "The quick brown fox jumps over the lazy dog!";

console.log("Task 1:", countWords(string));
