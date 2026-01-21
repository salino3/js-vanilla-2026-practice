class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  // A method all employees have
  getDetails() {
    return `${this.name} earns $${this.salary} per year.`;
  }
}

//
class Manager extends Employee {
  constructor(name, salary, department) {
    // 'super' calls the constructor of the Parent (Employee)
    super(name, salary);
    this.department = department;
  }

  // A specific method only for Managers
  giveBonus(amount) {
    this.salary += amount;
    return `${this.name} received a bonus! New salary: $${this.salary}`;
  }

  // Overriding: We can redefine a parent method to be more specific
  getDetails() {
    return `${super.getDetails()} They manage the ${this.department} department.`;
  }
}

//
const alex = new Employee("Alex", 50000);
console.log(alex.getDetails());

const sarah = new Manager("Sarah", 90000, "Engineering");
console.log(sarah.getDetails());

console.log(sarah.giveBonus(5000));

console.log(sarah.getDetails()); // $95000

//------------------------
console.log("-------------------------------");

//
class Vehicle {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }

  move() {
    return `The ${this.brand} is moving at  ${this.speed} km/h`;
  }
}

//
class ElectricCar extends Vehicle {
  // 1. Declare the private field at the top
  #batteryLevel;

  constructor(brand, speed, batteryLevel) {
    super(brand, speed);
    this.#batteryLevel =
      batteryLevel > 100 ? 100 : batteryLevel < 0 ? 0 : batteryLevel;
  }

  charge() {
    this.#batteryLevel = 100;
    return (
      "Battery recharged! The current battery level is " +
      this.#batteryLevel +
      "%"
    );
  }

  move() {
    return `${super.move()} and his battery level is ${this.#batteryLevel}`;
  }
}

let punto = new Vehicle("Fiat", 160);

console.log(punto.move());

let cinquencento = new ElectricCar("Fiat 500", 150, 80);
let R8 = new ElectricCar("Audi", 340, 180);

console.log(R8.move());

console.log(cinquencento.move());

console.log(cinquencento.charge());
// cinquencento.#batteryLevel = 88; // no possible. ex-12.js:96 Uncaught SyntaxError:
// Private field '#batteryLevel' must be declared in an enclosing class
//
// console.log(cinquencento.move());

//------------------------
console.log("-------------------------------");

class BankAccount {
  #balance = 0; // Private field

  // GETTER: Allows reading the balance, but adds a "$" for formatting
  get balance() {
    return `$${this.#balance}`;
  }

  // SETTER: Validates the input before updating the private field
  set deposit(amount) {
    if (amount <= 0) {
      console.error("You must deposit a positive amount!");
      return;
    }
    this.#balance += amount;
    console.log(`Deposited: $${amount}`);
  }
}

const myAccount = new BankAccount();

// Using the SETTER (looks like an assignment, but runs the 'set' function)
myAccount.deposit = 100; // Logs: Deposited: $100
myAccount.deposit = -50; // Logs: You must deposit a positive amount!

// Using the GETTER (looks like a property, but runs the 'get' function)
console.log(myAccount.balance); // Output: "$100"
myAccount.balance = -190; // with 'get' we protect for external modification or directly modification
console.log(myAccount.balance); // Output: "$100"

class User {
  // 1. STORAGE (Private - Hidden away)
  #internalName;

  constructor(inputName) {
    // 2. We trigger the SETTER by using its name
    this.name = inputName;
  }

  // 3. THE GATEKEEPER (Getter & Setter share the name 'name')
  get getName() {
    return this.#internalName ? this.#internalName.toUpperCase() : "NO NAME";
  }

  set setName(newName) {
    if (newName.length < 3) {
      console.error(`Error: "${newName}" is too short!`);
      return;
    }
    this.#internalName = newName;
  }

  // 4. THE ACTION
  displayInfo() {
    return `The user's name is: ${this.name}`; // Calls the getter
  }
}

const user1 = new User("Al"); // Logs: "Name too short!"
const user2 = new User("Alex"); // Works

// Calling the 'setter'
user2.setName = "Bo"; // Logs: "Name too short!" (Validation works even after creation)
console.log("clog1", user1);
console.log("clog2", user2);
console.log("clog3", user2.name);
console.log("clog4", user2.displayInfo());
