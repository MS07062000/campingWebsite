const modalTemplate = document.createElement("template");
modalTemplate.innerHTML = `
<link rel="stylesheet"  href="/static/Modal/style.css">
<button class="crossButton">&#10006</button>
<lottie-player class="errorSign" src="https://assets9.lottiefiles.com/packages/lf20_tl52xzvn.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay ></lottie-player>
<lottie-player class="correctSign" src="https://assets5.lottiefiles.com/packages/lf20_MR8lm4.json"  background="transparent"  speed="0.5"  style="width: 300px; height: 300px;"  loop  autoplay ></lottie-player>
<p class="message">Test Modal</p>
<button class="closeButton">Close</button>
<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
`;

class Modal extends HTMLElement {
    constructor() {
        super();
        this.appendChild(modalTemplate.content.cloneNode(true));
    }

    static get observedAttributes(){
        return ['correct-message','error-message'];
    }

    attributeChangedCallback(){
        console.log(this);
        if(this.hasAttribute("correct-message")){
            this.querySelector(".errorSign").style.display="none";
            this.querySelector(".correctSign").style.display="block"; 
            this.querySelector(".message").textContent = this.getAttribute("correct-message");  
        }else if(this.hasAttribute("error-message")){
            this.querySelector(".correctSign").style.display="none";
            this.querySelector(".errorSign").style.display="block"; 
            this.querySelector(".message").textContent=this.getAttribute("error-message");  
        }
      
    }

    connectedCallback() {
        this.querySelector(".crossButton").addEventListener("click", (event) => {
            this.querySelector(".modalParentContainer").style.display = "none";
        });

        this.querySelector(".closeButton").addEventListener("click", (event) => {
            this.querySelector(".modalParentContainer").style.display = "none";
        });
    }
}

window.customElements.define("my-modal", Modal);