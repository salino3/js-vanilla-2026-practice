// export class Media {
//   _title = "";
//   _author = "";
//   #isCheckedOut = false;

//   constructor(initTitle = "", initAuthor = "", initIsCheckedOut = false) {
//     this._title = initTitle;
//     this._author = initAuthor;
//     this.#isCheckedOut = initIsCheckedOut;
//   }

//   get title() {
//     return this._title;
//   }

//   set setTitle(title) {
//     this._title = title;
//   }

//   get author() {
//     return this._author;
//   }

//   set setAuthor(author) {
//     this._author = author;
//   }

//   get isCheckedOut() {
//     return this.#isCheckedOut;
//   }

//   toggleCheckOutStatus() {
//     this.#isCheckedOut = !this.#isCheckedOut;
//   }

//   getDetails() {
//     return `${this._title} by ${this._author}.`;
//   }
// }

// const media1 = new Media("Test Title", "Joe");
// console.log("media1", media1.author);
// console.log("media2", media1.getDetails());

// media1.setAuthor = "Jhonny";
// console.log("media3", media1.author);
// console.log("media4", media1.getDetails());
// console.log("media5", media1.isCheckedOut);
// media1.toggleCheckOutStatus();
// console.log("media7", media1.isCheckedOut);

// export class Book extends Media {
//   _pages = null;

//   constructor(initTitle, initAuthor, initPages, initIsCheckedOut) {
//     super(initTitle, initAuthor, initIsCheckedOut);
//     this._pages = initPages;
//   }

//   get pages() {
//     return this._pages;
//   }

//   getDetails() {
//     return `${this._title} by ${this._author} ( ${this._pages} pages ).`;
//   }
// }

// const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 310);
// console.log("book1", book1.getDetails());

// console.log("book1", book1.isCheckedOut);

// book1.toggleCheckOutStatus();
// console.log("book1", book1.isCheckedOut);

// ------------------------

// Write a function summarizeCustomerPurchases(orders) that takes an array of customer
//  order objects and returns a summary object.

// Each order contains nested details: a customer's information and a list of purchased
// items, where each item has a category, price, and quantity.

// Group by Customer: Aggregate data by customerId.

// Calculate Total Spent: Sum the total cost (price * quantity) across all items they bought (handling multiple orders from the same customer).

// Collect Categories: Store a list of unique categories the customer bought from.

const orders = [
  {
    customerId: "C101",
    customerName: "Alice",
    items: [
      { name: "Laptop", category: "Electronics", price: 1000, quantity: 1 },
      { name: "Mouse", category: "Electronics", price: 25, quantity: 2 },
    ],
  },
  {
    customerId: "C102",
    customerName: "Bob",
    items: [
      { name: "Desk Chair", category: "Furniture", price: 150, quantity: 1 },
      { name: "Notebook", category: "Stationery", price: 5, quantity: 4 },
    ],
  },
  {
    customerId: "C101",
    customerName: "Alice",
    items: [
      { name: "Monitor", category: "Electronics", price: 300, quantity: 1 },
    ],
  },
];

function summarizeCustomerPurchases(orders) {
  const reducedOrders = orders.reduce((acc, el) => {
    Array.isArray(acc[el.customerId])
      ? acc[el.customerId].push(el)
      : (acc[el.customerId] = [el]);

    return acc;
  }, {});
  return reducedOrders;
}

console.log("Task 1:", summarizeCustomerPurchases(orders));
