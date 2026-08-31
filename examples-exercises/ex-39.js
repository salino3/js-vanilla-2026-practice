// Write a function named firstNonRepeatingChar that takes a string as an input and returns
// the first character that does not repeat anywhere in the string.

// If every character repeats, return null.

// The function should be case-sensitive (e.g., 'a' and 'A' are different characters).

function firstNonRepeatingChar(str) {
  if (!str) return null;

  let tempArr = str.split("");
  let start = tempArr[0];
  while (true) {
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
  const cleanStr = (s) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/gi, "")
      .toLowerCase()
      .split("")
      .sort()
      .join("");

  return cleanStr(str1) === cleanStr(str2);
}

console.log("Task 2", isAnagram("Ónnroegn  rgeSwino", "ónn roegnrgewinos"));

// Write a function named compressString that takes a string of repeating characters and
//  returns a run-length compressed version of that string.

// The output string should be formed by each character followed by its count of consecutive repetitions.

// If the compressed string is not shorter than the original string, your function should return the original string.

// The function should be case-sensitive ('a' and 'A' are different characters).

function compressString(str) {
  if (!str) return str;

  let result = "";

  const reducedStr = str.split("").reduce((acc, word) => {
    if (acc.length === 0) {
      acc.push([word]);

      return acc;
    }

    if (acc[acc.length - 1][0] && acc[acc.length - 1][0] === word) {
      acc[acc.length - 1].push(word);
    } else {
      acc.push([word]);
    }

    return acc;
  }, []);

  reducedStr.forEach((arr) => {
    const value = arr[0] + arr.length;

    result += value;
  });

  return result.length < str.length ? result : str;
}

console.log("Task 3", compressString("aaAbcccccaaa"));

// Version 2
function compressStringV02(str) {
  if (!str) return str;

  let compressed = "";
  let count = 1;

  for (let i = 0; i < str.length; i++) {
    // If next character is igual, increment count
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      // Otherwise, append character and count, then reset count
      compressed += str[i] + count;
      count = 1;
    }
  }

  return compressed.length < str.length ? compressed : str;
}

console.log("Task 5 V2:", compressStringV02("abcd"));

// Write a function named findDuplicates that takes an array of items (numbers, strings, etc.) and returns an array
// containing only the elements that appear more than once.

// The returned array should contain each duplicate item only once (no repeated elements in the output).

// The order of items in the output array does not matter.

// If there are no duplicates, return an empty array [].

function findDuplicates(arr) {
  if (arr.length === 0) return arr;
  const controllerArr = new Set();
  const duplacetesItem = new Set();

  arr.forEach((el) =>
    controllerArr.has(el) ? duplacetesItem.add(el) : controllerArr.add(el),
  );

  return [...duplacetesItem];
}

console.log("Task 6:", findDuplicates([1, 2, 2, 2, 1, 1, 3, 2, 4, 3, 5, 1]));

//
function findDuplicatesV02(arr) {
  const counts = new Map();
  const duplicates = [];

  for (const item of arr) {
    counts.set(item, (counts.get(item) || 0) + 1);

    // Add to duplicates list precisely on the second encounter
    if (counts.get(item) === 2) {
      duplicates.push(item);
    }
  }

  return duplicates;
}

console.log(
  "Task 6 V2:",
  findDuplicatesV02([1, 2, 2, 2, 1, 1, 3, 2, 4, 3, 5, 1]),
);

console.log("# ---------------------------------------------------");

const user1 = { id: 1, name: "Alice" };
const user1Copy = { id: 1, name: "Alice" };

const userRoles = new Map();

userRoles.set(user1, "Admin");

console.log(userRoles.get(user1)); // Admin (same memory reference)
console.log(userRoles.get(user1Copy)); // undefined (different memory reference)

userRoles.set(user1Copy, "User");
console.log(userRoles.get(user1Copy)); // User
