document.querySelector('[name="signInForm"]').addEventListener("submit",(e)=>{
   console.log("signIn");
   e.preventDefault();
   let form=document.querySelector('[name="signInForm"]');
   let userName=form.querySelector("[name='username']").value;
   let password=form.querySelector("[name='password']").value;
   form.querySelector('button').disabled=true;
   console.log(userName+" "+password);
   fetch("http://127.0.0.1:3000/api/signIn",{
      method:"POST",
      body:JSON.stringify({"userName":userName,"password":password}),
      headers:{"Content-Type":"application/json"}
   })
   .then((result)=>{
      console.log(result);
      location.href="/static/SearchPage/search.html"
   }).catch((err)=>{
      console.log(err);
   });
});
