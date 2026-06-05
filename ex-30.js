// The Challenge: Fleet Logistics Analytics
// You have been given an array of Sector objects. Each sector contains an array of Starships.
// Each starship contains a nested array of Cargo Holds, and each cargo hold contains an array of Manifest Items.

const sectorData = [
  {
    sectorName: "Alpha Centauri",
    riskLevel: "low",
    fleet: [
      {
        shipId: "SS-Vanguard",
        class: "Heavy Freighter",
        operational: true,
        cargoHolds: [
          {
            holdId: "H1",
            capacityTons: 500,
            contents: [
              { item: "Titanium", weight: 400, value: 12000 },
              { item: "Food Packs", weight: 80, value: 2000 },
            ],
          },
          {
            holdId: "H2",
            capacityTons: 300,
            contents: [{ item: "Medical Supplies", weight: 150, value: 45000 }],
          },
        ],
      },
      {
        shipId: "SS-Reliant",
        class: "Light Hauler",
        operational: false, // Note: This ship is grounded!
        cargoHolds: [
          {
            holdId: "R1",
            capacityTons: 150,
            contents: [{ item: "Water Crates", weight: 120, value: 1500 }],
          },
        ],
      },
    ],
  },
  {
    sectorName: "Omega Quadrant",
    riskLevel: "high",
    fleet: [
      {
        shipId: "SS-Horizon",
        class: "Heavy Freighter",
        operational: true,
        cargoHolds: [
          {
            holdId: "HZ1",
            capacityTons: 600,
            contents: [
              { item: "Unrefined Uranium", weight: 550, value: 95000 },
            ],
          },
        ],
      },
      {
        shipId: "SS-Shadow",
        class: "Stealth Transport",
        operational: true,
        cargoHolds: [
          {
            holdId: "S1",
            capacityTons: 100,
            contents: [{ item: "Quantum Chips", weight: 20, value: 250000 }],
          },
          {
            holdId: "S2",
            capacityTons: 100,
            contents: [{ item: "Cybernetic Parts", weight: 70, value: 85000 }],
          },
        ],
      },
    ],
  },
];

// Your Objectives
// Write a JavaScript program (ideally using chainable array methods) to generate a Financial and
// Risk Report object that answers the following questions:

// Total Active Value: What is the total financial value of all cargo currently in transit?
// (Crucial: Do not include cargo from ships where operational is false).

// High-Risk Cargo: Create a flat array of all item names (item) being transported through
// sectors where the riskLevel is "high".

// Heavy Hitters: Create an array of ship IDs (shipId) that are carrying any single item worth
// more than $50,000.

function riskReport(data) {
  let highRiskCargo = [];
  let heavyHitters = [];

  const totalActiveValue = data
    .map(({ fleet }) =>
      fleet.map((ship) => ({
        ...ship,
        cargoHolds: ship.operational
          ? ship.cargoHolds.reduce((acc, el) => {
              const value =
                el.contents && el.contents.length > 0
                  ? el.contents.reduce((sum, item) => (sum += item.value), 0)
                  : 0;
              return acc + value;
            }, 0)
          : 0,
      })),
    )
    .flat(1)
    .reduce((acc, item) => (acc += item.cargoHolds), 0);

  // // Second version 'totalActiveValue'
  // const totalActiveValue = data
  //   .flatMap((sector) => sector.fleet) // 1. Get all ships
  //   .filter((ship) => ship.operational) // 2. Drop non-working ships
  //   .flatMap((ship) => ship.cargoHolds) // 3. Get all cargo holds
  //   .flatMap((hold) => hold.contents) // 4. Get all items
  //   .reduce((sum, item) => sum + item.value, 0); // 5. Sum them up

  //
  data
    // .filter((item) => item.riskLevel === "high")
    .map((item) => ({
      ...item,
      fleet: item.fleet.map((ship) => ({
        ...ship,
        cargoHolds: ship.cargoHolds.map((el) => ({
          ...el,
          contents: el.contents.reduce((acc, el2) => {
            if (el2.value > 50000) {
              heavyHitters = heavyHitters.concat(ship.shipId);
            }

            if (item.riskLevel === "high") {
              highRiskCargo = highRiskCargo.concat(el2.item);
            }
            return acc;
          }, []),
        })),
      })),
    }));

  return { totalActiveValue, highRiskCargo, heavyHitters };
}

console.log("Task 1:", riskReport(sectorData));

//
// Create a 16-byte buffer (a transferable object)
const originalBuffer = new ArrayBuffer(16);

// It is good to transfer massive data between main-thread and web worker thread.
// Clone the whole object, but explicitly TRANSFER the buffer
const clone = structuredClone(
  { data: originalBuffer },
  { transfer: [originalBuffer] },
);

// Checking the results:
console.log(clone.data.byteLength); // 16 (The clone successfully got it!)
console.log(originalBuffer.byteLength); // 0 (The original is now empty/detached!)

// Inside the RAM, the data is not recreated. The clone takes over the exact same memory reference
// (the pointer), while the original completely loses it.

////*
// React Summary Checklist for immutability object/array data:

// 1. What is it? Immutability means never modifying an existing object/array, but creating a
// new copy with the changes instead.

// 2. Why React? React uses memory address comparison during React create the new Virtual DOM,
//  to know when to update the UI.
//  If you mutate data, the memory address stays the same, React misses the change, and the UI won't update.

// 3. Why not Vanilla? Vanilla JS doesn't automatically watch your data; you update the
//  DOM manually, so it doesn't rely on memory tracking to render.
