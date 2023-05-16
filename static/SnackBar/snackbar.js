const snackBarTemplate = document.createElement("template");
snackBarTemplate.innerHTML = `
<link rel="stylesheet"  href="/static/SnackBar/style.css">
<div class="snackbar"></div>
`;

class SnackBar extends HTMLElement {
    constructor() {
        super();
        this.appendChild(snackBarTemplate.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['message'];
    }

    attributeChangedCallback() {
        console.log(this);
        if (this.hasAttribute("message")) {
            let snackBar = this.querySelector(".snackbar");
            snackBar.textContent = this.getAttribute("message");
            snackBar.classList.add("show");
            setTimeout(() => { snackBar.classList.remove("show"); }, 3000);
        }

    }
}

window.customElements.define("my-snackbar", SnackBar);