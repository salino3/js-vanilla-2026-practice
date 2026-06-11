// Write a function called lengthOfLongestSubstring that takes a string 's' and returns
// the length of the longest substring that contains no duplicate characters.

//  Rules & Assumptions
// A "substring" must be contiguous (connected). For example, in "abcabcbb", "abc"
// is a substring, but "acb" is a subsequence, not a substring.

// The input string can contain letters, digits, symbols, and spaces.

// If the string is empty, the return value should be 0.

function lengthOfLongestSubstring(s) {
  let charSet = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }

    charSet.add(s[right]);

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

console.log("Task 1:", lengthOfLongestSubstring("abcgangolb"));

//
// Write a recursive function called countdown that takes a positive integer n. The function should
//  log the numbers from n down to 1 to the console, and then log "Liftoff!" at the very end.

// 1. Base Case: If n is 0, print "Liftoff!" and exit the function

// 2. Action: Print the current number n

// 3. Recursive Step: Call countdown again with n - 1

function countdown(n) {
  if (n <= 0) {
    console.log("Liftoff!");
    return;
  }
  console.log("N:", n);

  countdown(n - 1);
}

console.log("Task 2:");
countdown(5);

//
// Write a recursive function called sumArray that takes an array of numbers and returns
//  the total sum of all the numbers in the array.

// Rules
// You cannot use for or while loops.

// You cannot use the built-in .reduce() method.

// You must use recursion.

function sumArray(arr) {
  if (arr.length === 0) {
    return 0;
  }

  if (arr.length === 1) {
    return arr[0];
  }

  return arr[0] + sumArray(arr.slice(1));
}

console.log("Task 3:", sumArray([1, 2, 3, 4]));
