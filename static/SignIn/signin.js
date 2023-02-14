function signInSignUp(){
   let signUpContainer=document.querySelector(".signUpContainer");
   let flag=0;
   if(signUpContainer==null){
      flag=1;
      signUpContainer=document.createElement("signUp");
   }

   signUpContainer.querySelector(".createAccountButton").textContent="Login";
   signUpContainer.querySelector(".blueButton").textContent="Create an account";
   signUpContainer.querySelectorAll(".label").forEach((element)=>{
   if(element.textContent=="Already a user? ")
   {
    element.textContent="Not a user yet? "
   }});
   //change link also of blue button
   if(flag==1){
      document.querySelector();
   }
}