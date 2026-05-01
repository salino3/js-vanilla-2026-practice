import { Header } from "../components/header/header.js"; // Import class even is used in another file

window.render = (componentName = "header") => {
  const container = document.getElementById("app");
  if (!container) return console.error("Container #app not found!");

  if (componentName === "header") {
    container.innerHTML = "<header-component></header-component>";
  } else {
    container.innerHTML = "<h1>Home</h1>";
  }
};

// 4. Wait for the DOM and elements to be ready before the first render
window.addEventListener("DOMContentLoaded", () => {
  window.render();
});
