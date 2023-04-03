function openModal(message){
    let parentModal=document.querySelector(".overlayModal");
    if(message["correct-message"]){
        parentModal.querySelector(".errorSign").style.display="none";
        parentModal.querySelector(".correctSign").style.display="block"; 
        parentModal.querySelector(".message").textContent = message["correct-message"];  
    }else if(message["error-message"]){
        parentModal.querySelector(".correctSign").style.display="none";
        parentModal.querySelector(".errorSign").style.display="block"; 
        parentModal.querySelector(".message").textContent=message["error-message"];  
    }
    
    parentModal.querySelector(".crossButton").addEventListener("click", (event) => {
        closeModal(parentModal);
    });

    parentModal.querySelector(".crossButton").addEventListener("click", (event) => {
        closeModal(parentModal);
    });
}

function closeModal(parentModal){
    parentModal.querySelector(".overlayModal").style.display = "none";
}

openModal(message);