const footerTemplate = document.createElement("div");

footerTemplate.innerHTML =
    `<link rel="stylesheet" href="/static/Footer/style.css"> 
    <div class="footer">
        <img src="/Assets/Logo.svg">
    </div>
    `;

class Footer extends HTMLElement {
    constructor() {
        super();
        this.appendChild(footerTemplate.cloneNode(true));
    }
}

customElements.define("my-footer", Footer);