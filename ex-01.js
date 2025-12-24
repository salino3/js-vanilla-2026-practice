document.addEventListener("DOMContentLoaded", () => {
  const input = prompt("What's your name?");
  //   alert(`Your name is ${input}`);

  if (input) {
    document.getElementById("spanName").textContent = input;
  }
  console.log(input);
});
