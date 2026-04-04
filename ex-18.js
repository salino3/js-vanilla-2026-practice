const number = 20;

// The Goal: Write a function countdown(n) that prints numbers from n down

//  to 1 and then prints "Liftoff!".

// Constraint: You cannot use for or while loops.

// Hint: Your base case is when n reaches 0.

function countdown(n) {
  if (n > 0) {
    console.log(n);
    n--;
  } else {
    return "Liftoff!";
  }
  return countdown(n);
}

console.log("Task 1:", countdown(number));

// better version respecting immutability
function countdownV2(n) {
  if (n <= 0) {
    console.log("Liftoff!");
    return "Liftoff!";
  }

  console.log(n);

  return countdown(n - 1);
}

console.log("Task 1 V2:", countdownV2(number));
