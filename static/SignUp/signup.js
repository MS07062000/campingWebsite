const signUpTemplate=document.createElement("template");
signUpTemplate.innerHTML=`
<link rel="stylesheet" type="text/css" href="../SignUp/style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script src="../SignUp/heightwidth.js" type="text/javascript"></script>
<div class="container">
        <div class="signupContainer">
            <div class="logowithBackButton">
                <img src="/Assets/Logo.svg" class="logoimg">
                <p class="backtocamp">&larr; Back to campgrounds</p>
            </div>
            <div class="introduction">
                Start exploring camps from all around the world.
            </div>
            <div>
                <label for="username" class="label">Username</label>
                <input for="username" placeholder="johndoe_91">
            </div>
            <div>
                <label for="password" class="label">Password</label>
                <input for="password" placeholder="Choose password">
            </div>
            <div class="createAccountButton">
                Create an account
            </div>
            <p class="label">Already a user? <span class="blueButton">Sign in</span></p>
        </div>

        <div class="review">
            <div class="commentSection">
                <p class="comment">
                    "YelpCamp has honestly saved me hours of research time, and the camps on here are definitely well
                    picked and added."
                </p>
                <div class="user">
                    <img src="/Assets/User Testimonial.svg">
                    <p class="name">May Andrews<br> <span class="designation">Professional Hiker</span></p>
                </div>
            </div>
        </div>
    </div>
`;

class SignUp extends HTMLElement {
    constructor(){
        super();
        this.shadowRoot({mode:"open"});
        this.shadowRoot.appendChild(signUpTemplate.cloneNode(true));
    }
}

window.customElements.define("sign-up",SignUp);