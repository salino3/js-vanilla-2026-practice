class SmartThermostat {
  // 1. Storage (Private)
  #internalValue;

  constructor(startingTemp) {
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
      return;
    }
    this.#internalValue = newDegrees;
  }

  // 5. The Method (Action)
  checkCurrentStatus() {
    return `The device is currently set to ${this.viewTemperature}`;
  }
}

// --- TESTING ---
const livingRoom = new SmartThermostat(22); // Works!
const kitchen = new SmartThermostat(99); // Logs: Alert: 99 is an unsafe temperature!

console.log(livingRoom.viewTemperature); // Output: "22°C"
console.log(livingRoom.checkCurrentStatus()); // Output: "The device is currently set to 22°C"

// Trying to bypass the gatekeeper:
livingRoom.validateAndSet = -10; // Logs: Alert: -10 is an unsafe temperature!
