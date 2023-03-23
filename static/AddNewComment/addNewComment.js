let form = document.body.querySelector("[name=addCommentForm]");


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    form.querySelector(".postComment").disabled = true;
    let commentInfo = {
        "campgroundName": campgroundName,
        "comment": form.querySelector(".comment").value
    };

    fetch("http://127.0.0.1:3000/api/addComment", {
        method: "POST",
        body:JSON.stringify(commentInfo),
        headers: { "Content-Type": "application/json" }
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });

    form.querySelector(".postComment").disabled = false;
});
