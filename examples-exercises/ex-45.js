// Write a function runMiddleware(req, middlewares) that executes an array
// of middleware functions sequentially.

// Each middleware function takes two arguments: (req, next).

// When a middleware calls await next(), control passes to the next middleware in the array.

// Once the next middleware finishes, execution returns to the previous middleware
// (like a stack / onion architecture).

// The function runMiddleware should return a Promise that resolves when all middlewares have finished.

/**
 * Runs an array of middleware functions in sequence.
 *
 * @param {Object} req - The request object passed through middlewares
 * @param {Array<Function>} middlewares - Array of (req, next) => Promise<void>
 * @returns {Promise<void>}
 */
async function runMiddleware(req, middlewares) {
  function dispatch(index) {
    // Base case: if we reach the end of the chain, return a resolved promise
    if (index >= middlewares.length) {
      return Promise.resolve();
    }

    const middleware = middlewares[index];

    // Call the current middleware, passing `req` and a `next` function
    // that triggers the dispatch for the next index
    return Promise.resolve(middleware(req, () => dispatch(index + 1)));
  }

  return dispatch(0);
}

// ==========================================
// TEST SUITE
// ==========================================

async function test() {
  const req = { logs: [] };

  const m1 = async (req, next) => {
    req.logs.push("M1 Start");
    await next();
    req.logs.push("M1 End");
  };

  const m2 = async (req, next) => {
    req.logs.push("M2 Start");
    await next();
    req.logs.push("M2 End");
  };

  const m3 = async (req, next) => {
    req.logs.push("M3 Execution");
  };

  await runMiddleware(req, [m1, m2, m3]);

  console.log("Execution Logs:", req.logs);
}

test();

// Write a function countWords(sentence) that takes a string sentence and returns an object
// containing the frequency count of each unique word (case-insensitive).

// Requirements:

// Convert all words to lowercase so "Hello" and "hello" are counted as the same word.

// Ignore empty spaces if multiple spaces occur together.

// Return an object where keys are words and values are their occurrence counts.

/**
 * Counts the occurrences of each word in a string.
 *
 * @param {string} sentence
 * @returns {Object<string, number>}
 */
function countWords(sentence) {
  if (!sentence.trim()) return {};

  const words = sentence
    .toLowerCase()
    .split(" ")
    .reduce((acc, word) => {
      if (word.trim()) {
        acc[word] = (acc[word] ?? 0) + 1;
      }

      return acc;
    }, {});

  console.log("clog1", words);
}

// ==========================================
// TEST SUITE
// ==========================================

function test02() {
  const result1 = countWords("the quick brown fox jumps over the lazy dog the");
  console.log("Test 1 Result:", result1);

  const result2 = countWords("JS is cool and js is   powerful");
  console.log("Test 2 Result:", result2);
}

test02();
