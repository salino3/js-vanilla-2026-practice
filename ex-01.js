document.addEventListener("DOMContentLoaded", () => {
  let input = ""; // prompt("What's your name?");
  //   alert(`Your name is ${input}`);
  if (!input) {
    input = "Joe";
  }

  if (input) {
    document.getElementById("spanName").textContent = input;
  }
  console.log(input);
});
