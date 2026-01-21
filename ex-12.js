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
  constructor(brand, speed, batteryLevel) {
    super(brand, speed);
    this.batteryLevel =
      batteryLevel > 100 ? 100 : batteryLevel < 0 ? 0 : batteryLevel;
  }

  charge() {
    this.batteryLevel = 100;
    return (
      "Battery recharged! The current battery level is " +
      this.batteryLevel +
      "%"
    );
  }

  move() {
    return `${super.move()} and his battery level is ${this.batteryLevel}`;
  }
}

let punto = new Vehicle("Fiat", 160);

console.log(punto.move());

let cinquencento = new ElectricCar("Fiat 500", 150, 80);
let R8 = new ElectricCar("Audi", 340, 180);

console.log(R8.move());

console.log(cinquencento.move());

console.log(cinquencento.charge());
