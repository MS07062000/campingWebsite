// const newCampgroundTemplate=document.createElement("template");
// newCampgroundTemplate.innerHTML=`
// <link rel="stylesheet" type="text/css" href="../AddNewCampground/style.css">
// <div class="addNewCampgroundBody">
// <p class="addNewCampgroundTitle">Add New Campground</p>
// <p class="campFormSubTitle">Campground Name</p>
// <textarea class="campgroundName" placeholder="Seven Sisters Waterfall" maxlength="50"></textarea>
// <p class="campFormSubTitle">Price</p>
// <textarea class="price" placeholder="$149" maxlength="20"></textarea>
// <p class="campFormSubTitle">Image</p>
// <textarea class="imageLink" maxlength="100"
//     placeholder="www.thepinoytraveler.com/2018/01/mt-ulap-diy-dayhike.html" maxlength="50"></textarea>
// <p class="campFormSubTitle">Description</p>
// <textarea class="description" maxlength="500"
//     placeholder="The Seven Sisters is the 39th tallest waterfall in Norway. The 410-metre tall waterfall consists of seven separate streams, and the tallest of the seven has a free fall that measures 250 metres. The waterfall is located along the Geirangerfjorden in Stranda Municipality in Møre og Romsdal county, Norway.."></textarea>
// <div class="addCampgroundButton">
//     Add Campground
// </div>
// </div>`

// class NewCampground extends HTMLElement{
//     constructor(){
//         super();
//         this.attachShadow({mode:"open"});
//         this.shadowRoot.appendChild(newCampgroundTemplate.cloneNode(true));
//     }
// }

// window.customElements.define("new-campGround",NewCampground);
let imageOptions = document.body.querySelector('[name=imageOptions]');
imageOptions.addEventListener('change', (event) => {
    if (document.body.querySelector(".imageLink") != null) {
        document.body.querySelectorAll(".imageLink").forEach((element) => { element.remove(); });
    }
    let imageInput = document.createElement("input");
    let property;
    if (event.target.value == "uploadImage") {
        property = {
            class: "imageLink",
            type: "file",
            accept: "image/*",
            placeholder: "Choose Image to upload"
        }

    }

    if (event.target.value == "uploadURL") {
        property = {
            class: "imageLink",
            type: "url",
            placeholder: "www.thepinoytraveler.com/2018/01/mt-ulap-diy-dayhike.html"
        };
        imageOptions.after(imageInput);
    }

    Object.keys(property).forEach((key) => {
        imageInput.setAttribute(key, property[key]);
    });

    imageOptions.after(imageInput);
});

// document.body.querySelector('.addCampgroundButton').addEventListener('click',(event) => {

// });

// document.body.querySelector('.hamburger').addEventListener('click',(event) => {

// });