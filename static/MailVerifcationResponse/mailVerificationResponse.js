function showVerificationMessage(verificationStatus){
    if(verificationStatus){
        document.querySelector('[name="failedVerifcation"]').classList.add("hide");
        document.querySelector('[name="successVerifcation"]').classList.remove("hide");
    }else{
        document.querySelector('[name="successVerifcation"]').classList.add("hide");
        document.querySelector('[name="failedVerifcation"]').classList.remove("hide");
    }
}
showVerificationMessage(location.href.split("/confirmation/")[1]);