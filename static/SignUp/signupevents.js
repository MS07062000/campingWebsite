
document.querySelector('[name="signUpForm"]').addEventListener("submit", (e) => {
   e.preventDefault();
   //disable button
   //start spinner
   //fetch
   //stop spinner
   //enable button not rquired for multipage
   let form = document.querySelector('[name="signUpForm"]');
   let userName = form.querySelector("[name='username']").value;
   let password = form.querySelector("[name='password']").value;
   form.querySelector('button').disabled = true;
   console.log(userName + " " + password);
   fetch("http://127.0.0.1:3000/api/signUp", {
      method: "POST",
      body: JSON.stringify({ "userName": userName, "password": password }),
      headers: { "Content-Type": "application/json" }
   }).then((result) => {
      console.log(result);
   }).catch((err) => {
      console.log(err);
   });


});


