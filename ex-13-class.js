class SmartThermostat {
  // 1. Storage (Private)
  #internalValue = "[Unsafe temperature]"; // default value

  constructor(
    countAlert = 0, // important it first for having his value for 'validateAndSet' method
    startingTemp = 0, // in case you don't insert value
  ) {
    // 2. We use the SETTER name here to trigger the check
    this.validateCountAlert = countAlert;
    this.validateAndSet = startingTemp;
  }

  // 3. The Window (Getter)
  get viewTemperature() {
    return `${this.#internalValue}°C`;
  }

  // 4. The Gatekeeper (Setter)
  set validateAndSet(newDegrees) {
    if (newDegrees < 0 || newDegrees > 40) {
      this.validateCountAlert++;
      console.error(
        `Alert ${this.validateCountAlert}: ${newDegrees} is an unsafe temperature!`,
      );
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

const livingRoom = new SmartThermostat(null, 22);
const kitchen = new SmartThermostat(50, 99); // Logs: Alert 51: 99 is an unsafe temperature!

console.log("clog2", kitchen.viewTemperature); // Output: "[Unsafe temperature]°C"
console.log("clog3", kitchen.checkCurrentStatus()); // "The device is currently set to [Unsafe temperature]°C"
console.log("clog4", livingRoom.viewTemperature); // Output: "22°C"
console.log("clog5", livingRoom.checkCurrentStatus()); // Output: "The device is currently set to 22°C"

// Trying to bypass the gatekeeper:
livingRoom.validateAndSet = -10; // Logs: Alert 1: -10 is an unsafe temperature!
console.log("clog6", livingRoom.checkCurrentStatus()); // Output: "22°C"
livingRoom.validateAndSet = -19; // Logs: Alert 2: -19 is an unsafe temperature!
console.log("clog7", livingRoom.checkCurrentStatus()); // Output: "22°C"
livingRoom.validateCountAlert = 0;
livingRoom.validateAndSet = -19; // Logs: Alert 1: -19 is an unsafe temperature!
console.log("clog8", livingRoom.checkCurrentStatus()); // Output: "The device is currently set to 22°C"
livingRoom.viewTemperature = 12; //#> it doesn't work because the varible is private
console.log("clog9", livingRoom.checkCurrentStatus()); // Output: "The device is currently set to 22°C"

livingRoom.validateAndSet = 30;
console.log("clog10", livingRoom); // Output: SmartThermostat  { validateCountAlert : 1 #internalValue : 30 viewTemperature: "30°C" }
