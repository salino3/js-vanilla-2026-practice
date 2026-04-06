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
