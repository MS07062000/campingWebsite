const spinnerTemplate = document.createElement("template");
spinnerTemplate.innerHTML = `
<link rel="stylesheet" href="/static/Spinner/style.css">
<lottie-player class="spinner" src="https://assets7.lottiefiles.com/packages/lf20_03MqnD.json" background="transparent" speed="1"
loop autoplay></lottie-player>
<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
`;

class Spinner extends HTMLElement {
    constructor() {
        super();
        this.appendChild(spinnerTemplate.content.cloneNode(true));
    }
}

window.customElements.define("my-spinner", Spinner);