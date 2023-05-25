var verificationStatus=<%= JSON.stringify(data) %>;
if(verificationStatus){
    document.querySelector('[name="failedVerifcation"]').classList.add("hide");
    document.querySelector('[name="successVerifcation"]').classList.remove("hide");
}else{
    document.querySelector('[name="successVerifcation"]').classList.add("hide");
    document.querySelector('[name="failedVerifcation"]').classList.remove("hide");
}