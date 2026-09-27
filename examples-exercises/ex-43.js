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
    this.#balance = initInitialBalance;
  }

  get accountHolder() {
    return this._accountHolder;
  }

  get initialBalance() {
    return this._initialBalance;
  }

  getBalance() {
    return this.#balance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return true;
    }
    return false;
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      return true;
    }
    return false;
  }
}

class SavingsAccount extends BankAccount {
  _interestRate = 0.05;

  constructor(accountHolder, initialBalance, initInterestRate = 0.05) {
    super(accountHolder, initialBalance);
    this._interestRate = initInterestRate;
  }

  get interestRate() {
    return this._interestRate;
  }

  applyInterest() {
    const amount = this.getBalance() * this._interestRate;
    this.deposit(amount);
    return this.getBalance();
  }
}

// Test Base Class
const acc = new BankAccount("Alice", 100);
console.log("clog1", acc.getBalance()); // 100
acc.deposit(50);
console.log("clog2", acc.getBalance()); // 150
acc.withdraw(200); // Fails: insufficient funds
console.log("clog3", acc.getBalance()); // 150

// Direct access to private field should fail:
// console.log(acc.#balance);  // SyntaxError: Private field '#balance' must be declared in an enclosing class

// Test Derived Class
const savings = new SavingsAccount("Bob", 1000); // 5% interest for default
console.log("clog4", savings.interestRate); // 0.05
console.log("clog5", savings.getBalance()); // 1000

const interestEarned = savings.applyInterest();
console.log("Earned:", interestEarned); // Earned: 50
console.log("clog6", savings.getBalance()); // 1050

const savingsLuigi = new SavingsAccount("Luigi", 1000, 0.1); // 10%
console.log("clog7", savingsLuigi.interestRate); // 0.1
