
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
   form.querySelector('button').disabled = true;
   document.querySelector("my-spinner").style.display = "block";
   console.log(userName + " " +" "+email+" "+password);
   fetch('/api/signUp', {
      method: "POST",
      body: JSON.stringify({ "email":email, "userName": userName, "password": password }),
      headers: { "Content-Type": "application/json" }
   }).then((response) => {
      console.log(response); 
      if(response.status!=200){
         document.querySelector("my-spinner").style.display = "none";
         if(response.statusText){
            document.querySelector("my-modal").setAttribute("error-message",response.statusText);
            document.querySelector("my-modal").style.display="block";
            modalRedirectURL="/signUp";
         }
      }else{
         document.querySelector("my-spinner").style.display = "none";
         if(response.statusText){
            console.log(response.statusText);
            document.querySelector("my-modal").setAttribute("correct-message","Please checkout your Email for Verification.");
            document.querySelector("my-modal").style.display="block";
            modalRedirectURL="/signIn";
         }
         // location.href = "/search";// if status code 200
      }
   }).catch((err) => {
      console.log(err);
   });


});
