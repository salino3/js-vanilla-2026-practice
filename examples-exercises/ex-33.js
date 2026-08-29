// The Challenge: "The Word Spinner"
// Write a function called spinWords that takes in a string of one or more words and
//  returns the same string, but with all five or more letter words reversed.

// Strings passed in will consist of only letters and spaces. Spaces will be included
//  only when more than one word is present.

const reveredString = (s) => s.split("").reverse().join("");

function spinWords(text) {
  const words = text
    .replace("", "")
    .split(/\s/g)
    .reduce(
      (acc, word) =>
        (acc += ` ${word.length > 4 ? reveredString(word) : word}`),
      "",
    );

  return words;
}

console.log("Task 1:", spinWords("Hey fellow warriors"));
