const campCardTemplate=document.createElement('template');

campCardTemplate.innerHTML=`<div class="campContainer">
<img class="campImage"></img>
<p class="campName"></p>
<p class="campDescription"></p>
<div class="viewCampgroundButton">View Campground</div>
</div>`;

class CampCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: "open" });
    }
}