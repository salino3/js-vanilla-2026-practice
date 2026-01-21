class SmartThermostat {
  // 1. Storage (Private)
  #internalValue = "[Unsafe temperature]"; // default value

  constructor(
    startingTemp = 0, // in case you don't insert value
  ) {
    // 2. We use the SETTER name here to trigger the check
    this.validateAndSet = startingTemp;
  }

  // 3. The Window (Getter)
  get viewTemperature() {
    return `${this.#internalValue}°C`;
  }

  // 4. The Gatekeeper (Setter)
  set validateAndSet(newDegrees) {
    if (newDegrees < 0 || newDegrees > 40) {
      console.error(`Alert: ${newDegrees} is an unsafe temperature!`);
      return this.validateAndSet;
    }
    this.#internalValue = newDegrees;
  }

  // 5. The Method (Action)
  checkCurrentStatus() {
    return `The device is currently set to ${this.viewTemperature}`;
  }
}

// --- TESTING ---
const bedRoom = new SmartThermostat();
console.log("clog1", bedRoom.viewTemperature); // Output: "undefined°C"

const livingRoom = new SmartThermostat(22);
const kitchen = new SmartThermostat(99); // Logs: Alert: 99 is an unsafe temperature!

console.log("clog2", kitchen.viewTemperature); // Output: "[Unsafe temperature]°C"
console.log("clog3", kitchen.checkCurrentStatus()); // "The device is currently set to [Unsafe temperature]°C"
console.log("clog4", livingRoom.viewTemperature); // Output: "22°C"
console.log("clog5", livingRoom.checkCurrentStatus()); // Output: "The device is currently set to 22°C"

// Trying to bypass the gatekeeper:
livingRoom.validateAndSet = -10; // Logs: Alert: -10 is an unsafe temperature!
console.log("clog6", livingRoom.checkCurrentStatus()); // Output: "22°C"
