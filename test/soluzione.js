const fs = require("fs");
const path = require("path");

function solveProblem(fileName) {
  const filePath = path.join(__dirname, fileName);

  // Read the file and split the content into rows
  const content = fs.readFileSync(filePath, "utf-8");
  const grid = content.split(/\r?\n/).filter((row) => row.length > 0);

  if (grid.length === 0) return 0;

  // 1. Find the column index where 'S' is located in the first row
  const startCol = grid[0].indexOf("S");
  if (startCol === -1) {
    console.error("Error: 'S' not found in the first row.");
    return 0;
  }

  // Use a Set to track active column indices without duplicates
  let activeCols = new Set([startCol]);
  let totalSplits = 0;

  // 2. Iterate through the grid row by row (starting from the second row, r = 1)
  for (let r = 1; r < grid.length; r++) {
    const nextCols = new Set();
    const currentRow = grid[r];

    for (const col of activeCols) {
      // Ensure we remain within grid boundaries
      if (col < 0 || col >= currentRow.length) continue;

      if (currentRow[col] === "^") {
        // Splitter found: increment total split counter
        totalSplits++;
        // Generate two new beams immediately to the left and right
        nextCols.add(col - 1);
        nextCols.add(col + 1);
      } else {
        // Empty space (or other character): beam continues straight down
        nextCols.add(col);
      }
    }

    activeCols = nextCols;
  }

  return totalSplits;
}

// Get file name from command line argument or default to 'input_example.txt'
const fileToRead = process.argv[2] || "input_example.txt";
const result = solveProblem(fileToRead);

console.log(`Result for ${fileToRead}: ${result}`);
