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
