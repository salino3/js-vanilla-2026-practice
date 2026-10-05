// Write a function extractActiveUserEmails(users) that takes an array of nested user objects and
// returns an array of unique email addresses belonging to active users.

// Iterate through the array of user objects.

// A user is considered active if status.active === true.

// Collect their email address if available (found under contact.email).

// The returned array should contain only lowercase emails with no duplicate values.

const users = [
  {
    id: 1,
    status: { active: true },
    contact: { email: "ALICE@example.com" },
  },
  {
    id: 2,
    status: { active: false },
    contact: { email: "bob@example.com" },
  },
  {
    id: 3,
    status: { active: true },
    contact: { email: "alice@example.com" }, // Duplicate email (different casing)
  },
  {
    id: 4,
    status: { active: true },
    contact: {}, // Missing email
  },
];

function extractActiveUserEmails(users) {
  const reducedUsers = users.reduce((acc, user) => {
    if (user.status.active && user.contact.email) {
      acc.add(user.contact.email.toLowerCase());
    }
    return acc;
  }, new Set());

  return [...reducedUsers];
}

console.log("Task 1:", extractActiveUserEmails(users));
