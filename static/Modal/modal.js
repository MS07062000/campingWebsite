function modal(message){
    // let lottie=document.createElement("lottie-player");


    // document.querySelector(".correctSign").style.display;
    // document.querySelector(".errorSign").style.display;
    document.querySelector(".message").textContent=message;
    document.querySelector(".crossButton").addEventListener("click",(event)=>{
        document.querySelector(".modalParentContainer").style.display="none";
    });

    document.querySelector(".closeButton").addEventListener("click",(event)=>{
        document.querySelector(".modalParentContainer").style.display="none";
    });
}