// he Goal: Write a function called slugify(str) that takes a string and converts
// it into a URL-friendly "slug".

// Lowercase: Convert all characters to lowercase.

// Trim: Remove whitespace from the beginning and end of the string.

// Special Characters: Replace spaces and non-alphanumeric characters (excluding hyphens) with a single hyphen (-).

// Clean up: Ensure there are no consecutive hyphens (--) or leading/trailing hyphens in the final output.

//
function slugify(str) {
  const result = str
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/[\s-]+/g, "-") // Replace spaces and multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Trim leading and trailing hyphens

  return result;
}

console.log("Task 1: ", slugify(" JavaScript & CSS: The Ultimate Guide!     "));
