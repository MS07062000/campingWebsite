document.querySelector('[name="signInForm"]').addEventListener("submit",(e)=>{
   console.log("signIn");
   e.preventDefault();
   let form=document.querySelector('[name="signInForm"]');
   let userName=form.querySelector("[name='username']").value;
   let password=form.querySelector("[name='password']").value;
   form.querySelector('button').disabled=true;
   console.log(userName+" "+password);
   document.querySelector("my-spinner").style.display="block";
   fetch("http://127.0.0.1:3000/api/signIn",{
      method:"POST",
      body:JSON.stringify({"userName":userName,"password":password}),
      headers:{"Content-Type":"application/json"}
   })
   .then((result)=>{
      document.querySelector("my-spinner").style.display="none";
      console.log(result);
      location.href="/search";
   }).catch((err)=>{
      document.querySelector("my-spinner").style.display="none";
      document.querySelector("my-modal").setAttribute("error-message","Invalid Details");
      modalRedirectURL="/signIn";
      document.querySelector("my-modal").style.display="block";
      console.log(err);
   });
});
