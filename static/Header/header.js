async function headerInitialization() {
    var response = await fetch("/api/userName", { method: "GET" });
    let userName = (await response.json())["userName"];
    console.log("UserName : " + userName);
    var loggedState;
    if (userName == undefined) {
        loggedState = false;
        if (screen.width > 1024) {
            document.body.querySelector(".loggedIn").style.display = "none";
            document.body.querySelector(".loggedOut").style.display = "flex";
        };
        changeWindowLocation();
    } else {
        loggedState = true;
        document.body.querySelector(".userName").textContent = userName;

        document.body.querySelector(".logout").addEventListener("click", (event) => {
            fetch("/api/logout").then((result) => {
                console.log(result);
                changeWindowLocation();
            });
        });
        if (screen.width > 1024) {
            document.body.querySelector(".loggedIn").style.display = "flex";
            document.body.querySelector(".loggedOut").style.display = "none";
        } else {


            let hamburgermenu = document.body.querySelector('.hamburger');
            let crossSign = document.body.querySelector('.crossSign');
            hamburgermenu.addEventListener('click', (event) => {
                hamburgermenu.style.display = "none";
                crossSign.style.display = "block";
                if (loggedState) {
                    document.body.querySelector(".loggedIn").style.display = "flex";
                } else {
                    document.body.querySelector(".loggedOut").style.display = "none";
                }
            });

            crossSign.addEventListener('click', (event) => {
                hamburgermenu.style.display = "block";
                crossSign.style.display = "none";
                document.body.querySelector(".loggedIn").style.display = "none";
                document.body.querySelector(".loggedOut").style.display = "none";
            });
        }

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

headerInitialization();
