function openAutoCompleteSearch(){
    let searchElement=document.body.querySelector(".search");
    searchElement.addEventListener("input",(event)=>{
        let valueByUser=searchElement.value;
        if(searchElement.value==""){
            return;
        }else{
            // fetch(`/api/${searchElement.value}`,);
        }
    })
    


    //get value from user
    //push to backend and obtain result
    //from result create div for each response
    //and append that div with search div
    //if user hover over any value highlight it 
    // if user selects any value show that campgroundcard below
    //call close function



}

function closeAutoCompleteSearch(){
    
}