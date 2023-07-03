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
        // console.log(this);
        if (this.hasAttribute("message")) {
            let snackBar = this.querySelector(".snackbar");
            snackBar.textContent = this.getAttribute("message");
            snackBar.classList.add("show");
            snackBar.addEventListener('animationend',()=>{
                snackBar.classList.remove("show");snackBar.removeAttribute("message");
            });
            
        }

    }
}

window.customElements.define("custom-snackbar", SnackBar);