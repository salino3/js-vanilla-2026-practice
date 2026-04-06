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
  if (Object.entries(data).length === 0) {
    return data;
  }

  let price = 0;

  for (item in data) {
    if (data[item] && data[item].price) {
      price += data[item].price;
    } else {
      if (Object.entries(data[item]).length === 0) {
        return data[item];
      }
      return totalPrice(data[item]);
    }
    console.log("clog1", data[item]);
  }

  // return data;
}

console.log("Task 1:", totalPrice(storeData));

//
