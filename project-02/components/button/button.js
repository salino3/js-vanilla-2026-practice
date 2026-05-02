import { clickedMessage } from "../../js/app.js";

export class Button extends HTMLElement {
  async connectedCallback() {
    console.log("Button component connected to DOM"); // Debug log
    try {
      const response = await fetch("./components/button/button.html");
      if (!response.ok) throw new Error("File not found");
      this.innerHTML = await response.text();

      const btn = this.querySelector("#btnEvent");

      if (btn) {
        btn.addEventListener("click", () => {
          alert(clickedMessage);
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
}

customElements.define("button-component", Button);
