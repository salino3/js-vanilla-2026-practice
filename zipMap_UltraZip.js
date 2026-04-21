// ---
console.log("------------------------");
const zipMap = (arr1, arr2, callback) => {
  const maxLength = Math.max(arr1.length, arr2.length);

  return Array.from({ length: maxLength }).map((_, index) => {
    return callback(arr1[index], arr2[index], index, arr1, arr2);
  });
};

console.log("------------------------");

// This function takes many arrays, then the callback at the end
const ultraZip = (...args) => {
  const callback = args.pop(); // The last argument is the function
  const arrays = args; // The rest are all our arrays

  const maxLength = Math.max(...arrays.map((a) => a.length));

  return Array.from({ length: maxLength }).map((_, i) => {
    // We pass an array of all items at index 'i' to the callback
    const currentItems = arrays.map((a) => a[i]);
    return callback(...currentItems, i, arrays);
  });
};

///
const products = ["Wireless Mouse", "USB-C Cable", "Gaming Monitor", "Webcam"];
const quantities = [2, 5, 1];
const prices = [50, 15, 400, 80];

// --- USAGE ---
console.log(
  "Test UltraZip function: ",
  ultraZip(products, quantities, prices, (prod, qty, price, i, allData) => {
    // allData[0] is products
    // allData[1] is quantities
    // allData[2] is prices

    console.log(
      `Total items in ${[price]} list: ${allData[i ?? 0].length}`,
      allData,
    );
    return { prod, total: (qty ?? 0) * price };
  }),
);
