// Write a function LetterCount(str) that takes a string and returns the first word
//  with the greatest number of repeated letters.

// If a word has more than one letter that repeats, count the one that repeats the most.

// If there are no words with repeating letters, return -1.

function letterCount(str) {
  const strings = str.split(" ");
  let counting = 0;
  let finalResult = "";

  const result = strings.reduce((acc, currentWord) => {
    let wordMax = 0;
    for (let i = 0; i < currentWord.length; i++) {
      let found =
        currentWord.split("").filter((letter) => letter === currentWord[i])
          .length ?? 0;
      if (found > wordMax) {
        wordMax = found;
      }
      acc[currentWord] = wordMax;
    }
    return acc;
  }, {});

  for (value in result) {
    if (result[value] > counting) {
      counting = result[value];
      finalResult = value;
    }
  }

  if (counting > 1) {
    return finalResult;
  } else {
    return -1;
  }
}

console.log("Task 1:", letterCount("Today is the greatest day ever!"));
