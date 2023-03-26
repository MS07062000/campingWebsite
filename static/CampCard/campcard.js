const campCardTemplate = document.createElement('template');

campCardTemplate.innerHTML =
    `<link rel="stylesheet" href="../CampCard/style.css">
    <div class="campContainer">
    <img class="campImage"></img>
    <p class="campName"></p>
    <p class="campDescription"></p>
    <button class="viewCampgroundButton">View Campground</button>
    </div>`;

class CampCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(campCardTemplate.content.cloneNode(true));
    }
    static get observedAttributes() { return ['img', 'campName','campDescription']; }

    attributeChangedCallback() {
        console.log(this);
        this.shadowRoot.querySelector('.campImage').setAttribute('src', this.hasAttribute("img") ? this.getAttribute("img") : "");
        this.shadowRoot.querySelector('.campName').textContent = this.hasAttribute("campName") ? this.getAttribute("campName") : "";
        this.shadowRoot.querySelector('.campDescription').textContent = this.hasAttribute("campDescription") ? this.getAttribute("campDescription") : "";
        this.shadowRoot.querySelector(".viewCampgroundButton").addEventListener("click",(event)=>{
            sessionStorage.setItem("campName",this.hasAttribute("campName"));
            location.href="/static/individualCampgroundPage/individualcampground.html";
        });
    }

}

window.customElements.define("camp-card", CampCard);