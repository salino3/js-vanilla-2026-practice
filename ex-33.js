// The Challenge: "The Word Spinner"
// Write a function called spinWords that takes in a string of one or more words and
//  returns the same string, but with all five or more letter words reversed.

// Strings passed in will consist of only letters and spaces. Spaces will be included
//  only when more than one word is present.

function spinWords(text) {
  const words = text
    .replace("", "")
    .split(/\s/g)
    .reduce((acc, word) => {
      if (word.length > 4) {
        acc += " " + word.split("").reverse().join("");
      } else {
        acc += " " + word;
      }

      return acc;
    }, "");

  return words;
}

console.log("Task 1:", spinWords("Hey fellow warriors"));
