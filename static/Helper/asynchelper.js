

export async function getUserName(){
    let response = await fetch("/api/userName", { method: "GET" });
    let userName = (await response.json())["userName"];
    return userName;
}

export async function headerInitialization() {
    let loggedState;
    let userName=await getUserName();

    if (userName == undefined) {
        loggedState = false;
    } else {
        loggedState = true;
        document.body.querySelector(".userName").textContent = userName;
    }

    // console.log(loggedState);

    document.body.querySelector(".logout").addEventListener("click", (event) => {
        fetch("/api/logout").then((result) => {
            console.log(result);
            changeWindowLocation();
        });
    });

    if (window.innerWidth >= 1024) {
        logged(loggedState);
    }else{
        document.body.querySelector(".loggedIn").style.display = "none";
        document.body.querySelector(".loggedOut").style.display = "none";
    }
    
    let hamburgermenu = document.body.querySelector('.hamburger');
    let crossSign = document.body.querySelector('.crossSign');
    hamburgermenu.addEventListener('click', (event) => {
        hamburgermenu.style.display = "none";
        crossSign.style.display = "block";
        logged(loggedState);
      
    });

    crossSign.addEventListener('click', (event) => {
        hamburgermenu.style.display = "block";
        crossSign.style.display = "none";
        document.body.querySelector(".loggedIn").style.display = "none";
        document.body.querySelector(".loggedOut").style.display = "none";
    });
}

function logged(loggedState){
    if (loggedState) {
        document.body.querySelector(".loggedIn").style.display = "flex";
        document.body.querySelector(".loggedOut").style.display = "none";
    } else {
        document.body.querySelector(".loggedIn").style.display = "none";
        document.body.querySelector(".loggedOut").style.display = "flex";
    }
}


function changeWindowLocation() {
    let currentLocation = window.location.pathname;
    console.log(currentLocation);
    let pagelocation = ["/addCampground", "/addComment"];
    // addComment doubt 
    if (pagelocation.indexOf(currentLocation) == -1) {
        // location.reload(); // looping is happening don't know how
    } else {
        location.href = "/signIn";
    }
}



