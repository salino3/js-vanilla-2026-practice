//
// The Smart Home Manager
// You are building a dashboard for a smart home. You have an array of "Room" objects.
// Your task is to perform three specific data transformations without mutating the
// original array or the original objects.

// Toggle a Switch: Create a new array where the Kitchen (id: 2) has lightsOn set to true.

// Add a Room: Add a new room object: { id: 4, room: "Bathroom", lightsOn: false, temperature: 19 } to the end of the list.

// Climate Control: Create a new array where every room's temperature is increased by 2 degrees.

const homeState = [
  { id: 1, room: "Living Room", lightsOn: true, temperature: 22 },
  { id: 2, room: "Kitchen", lightsOn: false, temperature: 20 },
  { id: 3, room: "Bedroom", lightsOn: true, temperature: 21 },
];

function toggleLight(state, id) {
  return state.map((room) =>
    room.id === id ? { ...room, lightsOn: !room.lightsOn } : room,
  );
}

function addNewRoom(state, obj) {
  return [...state, ...[obj]];
}

function controlTemperature(state, degrees = 2) {
  return state.map((room) => ({
    ...room,
    temperature: room.temperature + degrees,
  }));
}

function dashboardSmartHome(homeState) {
  let transformedDataHome = toggleLight(homeState, 2);

  transformedDataHome = addNewRoom(transformedDataHome, {
    id: 4,
    room: "Bathroom",
    lightsOn: false,
    temperature: 19,
  });

  transformedDataHome = controlTemperature(transformedDataHome);

  return transformedDataHome;
}

console.log("Task 1:", dashboardSmartHome(homeState));
