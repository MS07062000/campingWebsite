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

        let timeOfComment=document.createElement("span");
        timeOfComment.setAttribute("class","time");
        timeOfComment.textContent=commentTime(commentByUserInfo["time"])+"ago";
        console.log(timeOfComment);

        userName.insertAdjacentElement("beforeend",timeOfComment);
        console.log(userName);

        let commentByUser=document.createElement("p");
        commentByUser.setAttribute("class","userCommentForCampground");
        commentByUser.textContent=commentByUserInfo["comment"];

        commentContainer.appendChild(userName);
        commentContainer.appendChild(commentByUser);
        console.log(commentContainer);
        
        document.body.querySelector(".commentZone").appendChild(commentContainer);

    });
    
    document.body.querySelector(".leaveAReviewButton").addEventListener("click",(event)=>{
        location.href=`/addComment/${encodeURIComponent(campDetails["campgroundName"])}`;
    });

}

function commentTime(time){
    const date1 = new Date(time);
    const date2 = Date.now();
    const diff = date2 - date1;

    const diffInDays = diff / (1000 * 60 * 60 * 24);
    // console.log(diffInDays);

    const diffInHours = diff / (1000 * 60 * 60);
    // console.log(diffInHours);

    const diffInMinutes = diff / (1000 * 60);
    // console.log(diffInMinutes);
    if(diffInDays>1){
        console.log(Math.floor(diffInDays));
        return Math.floor(diffInDays)+" days ";
    }else if(diffInHours>1){
        console.log(Math.floor(diffInHours));
        return Math.floor(diffInHours)+" hrs ";
    }else{
        console.log(Math.floor(diffInMinutes));
        return Math.floor(diffInMinutes)+" minutes ";
    }
}


getCampInfo(location.href.split("/campground/")[1].split("?")[0]);