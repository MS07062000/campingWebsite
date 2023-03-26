async function headerInitialization() {
    let userName;
    var response = await fetch("/api/userName", { method: "GET" });
    userName = (await response.json())["userName"];
    console.log(userName);
   
    if (userName == undefined) {
        changeWindowLocation();
    } else {
        document.body.querySelector(".loggedOut").style.display="none";
        document.body.querySelector(".loggedIn").style.display="flex";
        document.body.querySelector(".userName").textContent = userName;

        document.body.querySelector(".logout").addEventListener("click", (event) => {
            fetch("/api/logout").then((result) => {
                console.log(result);
                changeWindowLocation();
            });
        });

        let hamburgermenu = document.body.querySelector('.hamburger');
        let crossSign = document.body.querySelector('.crossSign');
        hamburgermenu.addEventListener('click', (event) => {
            hamburgermenu.style.display = "none";
            crossSign.style.display = "block";
            document.body.querySelector(".loggedIn").style.display = "flex";
        });

        crossSign.addEventListener('click', (event) => {
            hamburgermenu.style.display = "block";
            crossSign.style.display = "none";
            document.body.querySelector(".loggedIn").style.display = "none";
        });
    }
}

function changeWindowLocation(){
    let currentLocation=window.location.pathname;
    console.log(currentLocation);
    let pagelocation=["/static/AddNewComment/addNewComment.html","/static/AddNewCampground/addNewCampground.html"];
    if(pagelocation.indexOf(currentLocation)==-1){
        document.body.querySelector(".loggedIn").style.display="none";
        document.body.querySelector(".loggedOut").style.display="flex";
    }else{
        location.href = "/static/SignIn/signin.html";
    }
}

headerInitialization();
