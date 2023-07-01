function showVerificationMessage(verificationStatus) {
    // console.log(typeof decodeURIComponent(location.href.split("/mailVerificationResponse/")[1]));
    if (verificationStatus === 'true') {
        document.querySelector('[name="failedVerifcation"]').classList.add("hide");
        document.querySelector('[name="successVerifcation"]').classList.remove("hide");
    } else {
        document.querySelector('[name="successVerifcation"]').classList.add("hide");
        document.querySelector('[name="failedVerifcation"]').classList.remove("hide");
    }
     
    setTimeout(()=>{window.history.forward(); }, 0);
      
    window.onunload = function () {null;};
}
showVerificationMessage(decodeURIComponent(location.href.split("/mailVerificationResponse/")[1]));