const storeData = {
  electronics: {
    laptops: {
      macbook: { price: 1200 },
      thinkpad: { price: 900 },
    },
    phones: {
      iphone: { price: 800 },
      pixel: { price: 700 },
    },
  },
  accessories: {
    cables: { price: 20 },
    cases: { price: 15 },
  },
  sale: true, // A property to ignore
};

function totalPrice(data) {
  let total = 0;

  for (let key in data) {
    const value = data[key];

    if (value && typeof value.price === "number") {
      total += value.price;
    } else if (value && typeof value === "object") {
      total += totalPrice(value);
    }
  }

  return total;
}

console.log("Task 1:", totalPrice(storeData));

//

// Write a recursive function findNameById(tree, targetId) that searches through the entire tree.

// If it finds the person with the matching id, it should return their name.

// If the ID doesn't exist anywhere in the tree, it should return null.

const companyTree = {
  id: 1,
  name: "Alice (CEO)",
  children: [
    {
      id: 2,
      name: "Bob (Manager)",
      children: [
        { id: 3, name: "Charlie (Developer)", children: [] },
        { id: 4, name: "David (Designer)", children: [] },
      ],
    },
    {
      id: 5,
      name: "Eve (Manager)",
      children: [{ id: 6, name: "Frank (Developer)", children: [] }],
    },
  ],
};

function findNameById(tree, targetId) {
  if (tree.id === targetId) {
    return tree.name;
  }

  if (tree.children && tree.children.length > 0) {
    for (let child of tree.children) {
      const foundName = findNameById(child, targetId);

      if (foundName !== null) {
        return foundName;
      }
    }
  }

  return null;
}

console.log("Task 2:", findNameById(companyTree, 4));
console.log("Task 2:", findNameById(companyTree, 99));

//
const commentThread = {
  id: 1,
  author: "Ana",
  text: "Recursion is cool!",
  replies: [
    {
      id: 2,
      author: "Bob",
      text: "I agree!",
      replies: [
        {
          id: 3,
          author: "Charlie",
          text: "It's a bit loopy though.",
          replies: [],
        },
      ],
    },
    {
      id: 4,
      author: "David",
      text: "Can someone explain the base case?",
      replies: [
        {
          id: 5,
          author: "Eve",
          text: "It's the stopping condition!",
          replies: [],
        },
      ],
    },
  ],
};

// Function Signature: function collectAllAuthors(comment) { ... }

// Output: An array of strings, e.g., ["Alice", "Bob", "Charlie", "David", "Eve"].

// Constraint: You must use recursion to handle the replies arrays.

// Note: Keep an eye on how you merge the arrays from different recursive calls!

function collectAllAuthors(comment, authors = []) {
  authors.push(comment.author);

  if (comment.replies && comment.replies.length > 0) {
    comment.replies.forEach((reply) => {
      collectAllAuthors(reply, authors);
    });
  }

  return authors;
}

console.log("Task 3:", collectAllAuthors(commentThread));
