document.querySelector('[name="signInForm"]').addEventListener("submit",(e)=>{
   console.log("signIn");
   e.preventDefault();
   let form=document.querySelector('[name="signInForm"]');
   let username=form.querySelector("[name='username']").value;
   let password=form.querySelector("[name='password']").value;
   form.querySelector('button').disabled=true;
   console.log(username+" "+password);
   fetch("http://127.0.0.1:3000/SignIn",{
      method:"POST",
      body:JSON.stringify({"username":username,"password":password}),
      headers:{"Content-Type":"application/json"}
   })
   .then((result)=>{
      console.log(result);
   }).catch((err)=>{
      console.log(err);
   });
});
