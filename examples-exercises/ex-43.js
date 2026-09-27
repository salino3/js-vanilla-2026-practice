// Write an asynchronous function named fetchWithRetry that attempts to execute an
// asynchronous task (a function returning a Promise). If the task fails (rejects),
//  it should automatically retry up to a specified number of times before finally
//   throwing an error.

// Requirements:

// fetchWithRetry accepts two parameters:

// taskFn (a function that returns a Promise)

// retries (number of total attempts allowed, e.g., 3 means 1 initial attempt + 2 retries)

// Use async/await and try...catch blocks.

// Behavior:

// If taskFn() resolves successfully, return its resolved value immediately.

// If taskFn() rejects, log or decrement the remaining retry count and try again.

// If all retries attempts fail, throw/reject with the final error:
//  "Operation failed after maximum retries".

// A mock unstable API call function
let attempts = 0;
const unstableFetch = () => {
  return new Promise((resolve, reject) => {
    attempts++;
    console.log(`Attempt #${attempts}`);
    if (attempts < 3) {
      reject("Network Error");
    } else {
      resolve({ status: 200, data: "Success!" });
    }
  });
};

async function fetchWithRetry(taskFn, retries) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await taskFn();
      return result;
    } catch (error) {
      console.warn(`Attempt ${i + 1} failed: ${error}`);
    }
  }

  // 3. If the loop finishes without returning, all attempts failed:
  throw new Error("Operation failed after maximum retries");
}

// Test Case 1: Succeeds on 3rd attempt with max 3 retries
await fetchWithRetry(unstableFetch, 3)
  .then((data) => console.log("Result:", data))
  .catch((err) => console.error("Error:", err));
// Expected logs:
// Attempt #1
// Attempt #2
// Attempt #3
// Result: { status: 200, data: 'Success!' }

// Test Case 2: Fails when max retries is set lower than needed
attempts = 0; // reset counter
await fetchWithRetry(unstableFetch, 2)
  .then((data) => console.log("Result:", data))
  .catch((err) => console.error("Error:", err));
// Expected logs:
// Attempt #1
// Attempt #2
// Error: Operation failed after maximum retries
// --------------------

class BankAccount {
  _accountHolder = "";
  _initialBalance = 0;
  #balance = 0;
  constructor(initAccountHolder, initInitialBalance) {
    this._accountHolder = initAccountHolder;
    this._initialBalance = initInitialBalance;
  }

  get accountHolder() {
    return this.accountHolder;
  }

  get initialBalance() {
    return this.initialBalance;
  }

  getBalance() {
    return this.#balance;
  }

  deposit(amount) {
    this.#balance += amount;
    return amount > 0;
  }

  withdraw(amount) {
    return amount > 0 && amount <= this.#balance;
  }
}
