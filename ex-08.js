// Task 1
// check if the string is palindrome.

function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] != s[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

console.log("Task 1: ", isPalindrome("hello"));

// Task 2
// Given an array of numbers, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

function moveZerosToEnds(arr) {
  let len = arr.filter((x) => x == 0).length;
  console.log(len);
  for (let x = 0; x < arr.length; x++) {
    if (arr[x] == 0) {
      arr[x] = null;
    }
  }
  //
  for (let x = 0; x < len; x++) {
    arr.push(0);
  }
  return arr.filter((n) => n != null);
}

console.log("Task 2: ", moveZerosToEnds([0, 1, 0, 3, 12]));
