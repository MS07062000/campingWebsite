
document.querySelector('[name="signUpForm"]').addEventListener("submit", (e) => {
   e.preventDefault();
   //disable button
   //start spinner
   //fetch
   //stop spinner
   //enable button not rquired for multipage
   let form = document.querySelector('[name="signUpForm"]');
   let email = form.querySelector("[name='email']").value;
   let userName = form.querySelector("[name='username']").value;
   let password = form.querySelector("[name='password']").value;
   let snackBar = document.querySelector("custom-snackbar");
   if (!validateEmail(email)) {
      snackBar.setAttribute("message", "Invalid email");
      return;
   }


   form.querySelector('button').disabled = true;
   document.querySelector("my-spinner").style.display = "block";
   // console.log(userName + " " +" "+email+" "+password);
   fetch('/api/signUp', {
      method: "POST",
      body: JSON.stringify({ "email": email, "userName": userName, "password": password }),
      headers: { "Content-Type": "application/json" }
   }).then((response) => {
      console.log(response.status);
      if (response.status != 200) {
         document.querySelector("my-spinner").style.display = "none";
         if (response.statusText) {
            document.querySelector("my-modal").setAttribute("error-message", response.statusText);
            document.querySelector("my-modal").style.display = "block";
            modalRedirectURL = "/signUp";
         }
      } else {
         document.querySelector("my-spinner").style.display = "none";
         // if(response.statusText){
         //    console.log(response.statusText);
         document.querySelector("my-modal").setAttribute("correct-message", "Please checkout your Email Inbox for Verification. In case you don't find in Inbox please have a look in spam or junk box.");
         document.querySelector("my-modal").style.display = "block";
         modalRedirectURL = "/signIn";
         // }
         // location.href = "/search";// if status code 200
      }
   }).catch((err) => {
      console.log(err);
   });


});

function validateEmail(email) {
   if (email.includes("@")) {
      return true;
   } else {
      return false;
   }

}
