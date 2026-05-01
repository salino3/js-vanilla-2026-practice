import { Header } from "../components/header/header.js"; // Import class even is used in another file

function renderCustomComponent(componentName, idElement) {
  const container = document.getElementById(idElement);
  if (!container) return console.error(`Container #${idElement} not found!`);

  if (componentName && idElement) {
    return (container.innerHTML = componentName);
  } else {
    return null;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.render = renderCustomComponent(
    "<header-component></header-component>",
    "app",
  );
});
