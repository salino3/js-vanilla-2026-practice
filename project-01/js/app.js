// * V1
// // Example: Creating a simple component-like structure
// const Page1 = `
//   <section class="page-content">
//     <h1>Welcome to Page 1</h1>
//     <p>This was injected by JavaScript!</p>

//   </section>
// `;

// document.getElementById("app").innerHTML = Page1;

// * V2
// const response = await fetch(`../test-pages/page1.html`);
// const page1 = await response.text();

// async function loadPage(html) {
//   document.getElementById("app").innerHTML = html;
// }

// // Call it when needed
// loadPage(page1);

// * V3
class PageOne extends HTMLElement {
  async connectedCallback() {
    // This only runs when <page-one> is added to the DOM
    const response = await fetch("./test-pages/page-one.html");
    this.innerHTML = await response.text();
  }
}

customElements.define("page-one", PageOne);

window.render = (componentName = "home") => {
  const container = document.getElementById("app-viewport");

  if (componentName === "page1") {
    // 1. Container is cleared
    // 2. <page-one> is inserted
    // 3. The class above triggers and fetches the HTML
    container.innerHTML = "<page-one></page-one>";
  } else {
    container.innerHTML = "<h1>Home</h1><p>Back at the start.</p>";
  }
};

window.render();
