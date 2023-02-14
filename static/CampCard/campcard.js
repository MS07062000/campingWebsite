const campCardTemplate=document.createElement('template');

campCardTemplate.innerHTML=
`<link rel="stylesheet" href="../CampCard/style.css">
<div class="campContainer">
<img class="campImage"></img>
<p class="campName"></p>
<p class="campDescription"></p>
<div class="viewCampgroundButton">View Campground</div>
</div>`;

class CampCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(campCardTemplate.content.cloneNode(true));
        this.shadowRoot.querySelector('.campImage').setAttribute('src',this.hasAttribute("img")?this.getAttribute("img"):"");
        this.shadowRoot.querySelector('.campName').textContent=this.hasAttribute("campName")?this.getAttribute("campName"):"";
        this.shadowRoot.querySelector('.campDescription').textContent=this.hasAttribute("campDescription")?this.getAttribute("campDescription"):"";
       
    }
}

window.customElements.define("camp-card",CampCard);