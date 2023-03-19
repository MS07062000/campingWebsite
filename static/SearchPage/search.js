var response=await fetch("/api/allCampgrounds",{method:"GET"});
var data= await response.json();
console.log(data);

data.forEach((campground) => {
    let campcard=document.createElement("camp-card");
    campcard.setAttribute("campName",campground.campgroundName);
    campcard.setAttribute("campDescription",campground.description);
    campcard.setAttribute("img",campground.image);
    document.querySelector(".campGrounds").appendChild(campcard);
});

document.body.querySelector(".loggedIn").addEventListener('click',(event)=>{

});

document.body.querySelector(".loggedOut").addEventListener('click',(event)=>{

});