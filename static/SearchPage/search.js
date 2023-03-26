var response=await fetch("/api/allCampgrounds",{method:"GET"});
var data= await response.json();
console.log(data);

data.forEach((campground) => {
    let campcard=document.createElement("camp-card");
    campcard.setAttribute("campName",campground.campgroundName);
    campcard.setAttribute("campDescription",campground.description);
    console.log(campground.description.substring(0,Math.min(50,campground.description.length-1))+"...")
    campcard.setAttribute("img",campground.image);
    document.querySelector(".campGrounds").appendChild(campcard);
});