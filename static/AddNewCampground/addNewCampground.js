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


let form = document.body.querySelector("[name=addNewCampgroundForm]");
let imageOptions = form.querySelector('[name=imageOptions]');
let imageUploadType;
imageOptions.addEventListener('change', (event) => {
    form.querySelectorAll("[name=uploadImage]").forEach((element) => { element.remove(); });
    form.querySelectorAll("[name=uploadURL]").forEach((element) => { element.remove(); });
    let imageInput = document.createElement("input");
    let property;
    imageUploadType = event.target.value;
    if (event.target.value == "uploadImage") {
        property = {
            class: "imageLink",
            name: "uploadImage",
            type: "file",
            accept: "image/*",
            placeholder: "Choose Image to upload"
        }
    }

    if (event.target.value == "uploadURL") {
        property = {
            class: "imageLink",
            type: "url",
            name: "uploadURL",
            placeholder: "www.thepinoytraveler.com/2018/01/mt-ulap-diy-dayhike.html"
        };
        imageOptions.after(imageInput);
    }

    Object.keys(property).forEach((key) => {
        imageInput.setAttribute(key, property[key]);
    });

    imageOptions.after(imageInput);
});


form.addEventListener('submit', async(event) => {
    event.preventDefault();
    form.querySelector("button").disabled = true;
    let campImage;
    if (imageUploadType == "uploadImage") {
        campImage = await base64(form.querySelector('[name=uploadImage]').files[0]);
    } else {
        campImage = form.querySelector('[name=uploadURL]').value;
    }
    let campgroundInfo = {
        "campgroundName": form.querySelector('.campgroundName').value,
        "price": form.querySelector('.price').value,
        "image": campImage,
        "description": form.querySelector('.description').value,
    };

    fetch("http://127.0.0.1:3000/api/addCampground", {
        method: "POST",
        body: JSON.stringify(campgroundInfo),
        headers: { "Content-Type": "application/json" }
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    form.querySelector("button").disabled = false;
});

function base64(file) {
    return new Promise((resolve) => {
        var reader = new FileReader();
        // Read file content on file loaded event
        reader.onload = function (event) {
            resolve(event.target.result);
        };

        // Convert data to base64 
        reader.readAsDataURL(file)
    });
}

function sendFile(file) {
    const uri = "/index.php";
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    xhr.open("POST", uri, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.responseText); // handle response.
        }
    };
    fd.append('myFile', file);
    // Initiate a multipart/form-data upload
    xhr.send(fd);
}


