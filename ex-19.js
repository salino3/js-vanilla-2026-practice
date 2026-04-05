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
  // Solve the problem
}

console.log("Task 1:", totalPrice(storeData));
