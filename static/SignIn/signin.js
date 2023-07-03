document.querySelector('[name="signInForm"]').addEventListener("submit", (e) => {
   // console.log("signIn");
   e.preventDefault();
   let form = document.querySelector('[name="signInForm"]');
   let email = form.querySelector("[name='email']").value;
   let password = form.querySelector("[name='password']").value;
   let snackBar = document.querySelector("custom-snackbar");
   if (!validateEmail(email)){
      snackBar.setAttribute("message", "Invalid email");
      return;
   }
   
   form.querySelector('button').disabled = true;
   // console.log(email + " " + password);
   document.querySelector("my-spinner").style.display = "block";
   fetch("/api/signIn", {
      method: "POST",
      body: JSON.stringify({ "email": email, "password": password }),
      headers: { "Content-Type": "application/json" }
   }).then((response) => {
      document.querySelector("my-spinner").style.display = "none";
      // console.log(response);
      if(response.status!=200){
         snackBar.setAttribute("message",response.statusText);
      }else{
         location.href = "/search";// if status code 200
      }
   }).catch((err) => {
      document.querySelector("my-spinner").style.display = "none";
      document.querySelector("my-modal").setAttribute("error-message", err);
      modalRedirectURL = "/signIn";
      document.querySelector("my-modal").style.display = "block";
      // console.log(err);
   });
});


function validateEmail(email) {
   if (email.includes("@")) {
      return true;
   } else {
      return false;
   }
}