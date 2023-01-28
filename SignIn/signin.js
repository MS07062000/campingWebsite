function signInSignUp(){
   document.querySelector(".createAccountButton").textContent="Login";
   document.querySelector(".blueButton").textContent="Create an account";
   document.querySelectorAll(".label").forEach((element)=>{
   if(element.textContent=="Already a user? ")
   {
    element.textContent="Not a user yet? "
   }});
   //change link also of blue button
}