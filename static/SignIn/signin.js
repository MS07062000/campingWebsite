document.querySelector('[name="signInForm"]').addEventListener("submit", (e) => {
   console.log("signIn");
   e.preventDefault();
   let form = document.querySelector('[name="signInForm"]');
   let userName = form.querySelector("[name='username']").value;
   let password = form.querySelector("[name='password']").value;

   // if (validateEmail(email)) {

   // } else {
   //    let snackbar = document.createElement("my-snackbar");
   //    snackbar.setAttribute("message", "email");
   // }
   
   form.querySelector('button').disabled = true;
   console.log(userName + " " + password);
   document.querySelector("my-spinner").style.display = "block";
   fetch("http://127.0.0.1:3000/api/signIn", {
      method: "POST",
      body: JSON.stringify({ "userName": userName, "password": password }),
      headers: { "Content-Type": "application/json" }
   }).then((result) => {
      document.querySelector("my-spinner").style.display = "none";
      console.log(result);
      if(result.status!=200){
         throw new Error(result.statusText);
      }else{
         location.href = "/search";// if status code 200
      }
   }).catch((err) => {
      document.querySelector("my-spinner").style.display = "none";
      document.querySelector("my-modal").setAttribute("error-message", err);
      modalRedirectURL = "/signIn";
      document.querySelector("my-modal").style.display = "block";
      console.log(err);
   });
});


function validateEmail(email) {
   if (email.contains("@")) {
      return true;
   } else {
      return false;
   }

}