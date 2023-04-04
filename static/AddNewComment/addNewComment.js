function addComment(campName) {
    let form = document.body.querySelector("[name=addCommentForm]");

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        form.querySelector(".postComment").disabled = true;
        document.querySelector("my-spinner").style.display = "block";
        let commentInfo = {
            "campgroundName": campName,
            "comment": form.querySelector(".comment").value,
            "name": document.body.querySelector(".userName").textContent,
            "time": Date.now()
        };

        fetch(`/api/addComment/${campName}`, {
            method: "POST",
            body: JSON.stringify(commentInfo),
            headers: { "Content-Type": "application/json" }
        }).then((result) => {
            document.querySelector("my-spinner").style.display = "none";
            document.querySelector("my-modal").setAttribute("correct-message", "Thank you for sharing your thoughts about the camp. Your feedback is valuable to us and helps us improve our services.");
            document.querySelector("my-modal").style.display = "block";
            console.log(result);
            modalRedirectURL="/search";
        }).catch((err) => {
            document.querySelector("my-spinner").style.display = "none";
            document.querySelector("my-modal").setAttribute("error-message", "We're sorry, but we encountered an error and couldn't add your feedback at this time. Please try again later or contact our support team for assistance.");
            document.querySelector("my-modal").style.display = "block";
            modalRedirectURL="/search";
            console.log(err);
        });

        form.querySelector(".postComment").disabled = false;
    });
}

addComment(location.href.split("/addComment/")[1].split("?")[0]);