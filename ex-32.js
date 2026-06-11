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
