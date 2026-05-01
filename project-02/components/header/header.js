export class Header extends HTMLElement {
  async connectedCallback() {
    console.log("Header component connected to DOM"); // Debug log
    try {
      const response = await fetch("./components/header/header.html");
      if (!response.ok) throw new Error("File not found");
      this.innerHTML = await response.text();
    } catch (err) {
      console.error(err);
    }
  }
}

customElements.define("header-component", Header);
