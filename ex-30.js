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
  const highRiskCargo = [];
  const heavyHitters = [];

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
              heavyHitters.push(ship.shipId);
            }

            if (item.riskLevel === "high") {
              highRiskCargo.push(el2.item);
            }
          }, []),
        })),
      })),
    }));

  return { totalActiveValue, highRiskCargo, heavyHitters };
}

console.log("Task 1:", riskReport(sectorData));
