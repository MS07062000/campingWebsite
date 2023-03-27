async function getCampInfo(campName){
    document.title=campName;
    let campData=await(await fetch(`/api/campInfo/${campName}`)).json();
    console.log(campData);
    //campInfo=await campInfo.json();

    let campDetails=campData["campDetails"];
    let campComments=campData["campComments"];
    
    
    //remaining to add is map info keep in mind

    document.body.querySelector(".campImage").setAttribute("src",campDetails["image"]);
    document.body.querySelector(".campName").textContent=campDetails["campgroundName"];
    document.body.querySelector(".price").textContent=campDetails["price"];
    document.body.querySelector(".campgroundInformation").textContent=campDetails["description"];
    document.body.querySelector(".campgroundDefinedByUser").textContent="Submitted by "+campDetails["submittedBy"];
    campComments.forEach((commentByUserInfo) => {
        let commentContainer=document.createElement("div");
        commentContainer.setAttribute("class","userNameandComment");

        let userName=document.createElement("p");
        userName.setAttribute("class","userName");
        userName.textContent=commentByUserInfo["name"];

        let commentTime=document.querySelector("span");
        commentTime.setAttribute("class","time");
        commentTime.textContent=commentTime(commentByUserInfo["time"])+"ago";

        userName.appendChild(commentTime);
        
        let commentByUser=document.createElement("p");
        commentByUser.setAttribute("class","userCommentForCampground");
        commentByUser.textContent=commentByUserInfo["comment"];

        commentContainer.appendChild(userName);
        commentContainer.appendChild(commentByUser);
        document.body.querySelector(".commentZone").appendChild(commentContainer);

    });

}

function commentTime(time){
    const date1 = new Date(time);
    const date2 = Date.now();
    const diff = date2 - date1;

    const diffInDays = diff / (1000 * 60 * 60 * 24);
    console.log(diffInDays);

    const diffInHours = diff / (1000 * 60 * 60);
    console.log(diffInHours);

    const diffInMinutes = diff / (1000 * 60);
    console.log(diffInMinutes);
    if(diffInDays>1){
        return diffInDays+" days ";;
    }else if(diffInHours>1){
        return diffInHours+" hrs ";
    }else{
        return diffInMinutes+" minutes ";;
    }
}


getCampInfo(location.href.split("/campground/")[1].split("?")[0]);