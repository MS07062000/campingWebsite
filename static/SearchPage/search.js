async function search() {
    var response = await fetch("/api/allCampgrounds", { method: "GET" });
    var data = await response.json();
    // console.log(data);
    Array.from(document.querySelector(".campGrounds").children).forEach((childElement) => { childElement.remove(); });
    if (data.length != 0) {
        data.forEach((campground) => {
            let campcard = document.createElement("camp-card");
            campcard.setAttribute("campName", campground.campgroundName);
            campcard.setAttribute("campDescription", campground.description);
            campcard.setAttribute("img", campground.image);
            document.querySelector(".campGrounds").appendChild(campcard);
        });
    } else {
        let note = document.createElement("p");
        note.textContent = "No campground available.";
        note.setAttribute("name", "note");
        document.querySelector(".campGrounds").appendChild(note);

    }


    var timerId;
    var searchText = document.body.querySelector('input[class=search]');
    searchText.addEventListener("input", (event) => {
        // console.log(searchText.value);
        clearTimeout(timerId);
        // timerId  =  setTimeout(async ()=>{
        //     if(searchText.value.trim().length!=0){
        //         response=await fetch(`/api/search/${searchText.value}`,{method:"GET"});
        //     }else{
        //         response=await fetch("/api/allCampgrounds",{method:"GET"});
        //     }
        //     data= await response.json();
        //     Array.from(document.querySelector(".campGrounds").children).forEach((childElement)=>{childElement.remove();});
        //     if(data.length!=0){
        //         data.forEach((campground) => {
        //             let campcard=document.createElement("camp-card");
        //             campcard.setAttribute("campName",campground.campgroundName);
        //             campcard.setAttribute("campDescription",campground.description);
        //             campcard.setAttribute("img",campground.image);
        //             document.querySelector(".campGrounds").appendChild(campcard);
        //         });
        //     }else{
        //         let note=document.createElement("p");
        //         note.textContent="No campground available as per your input";
        //         note.setAttribute("name","note");
        //         document.querySelector(".campGrounds").appendChild(note);
        //     }
        // }, 200);

        timerId = setTimeout(async () => {
            if (searchText.value.trim().length != 0) {
                response = await fetch(`/api/search/${searchText.value}`, { method: "GET" });
                data= await response.json();
            }else{
                data=[];
            }

            displaySearchResults(data);
        });
    });
}
search();




function displaySearchResults(results) {
    let resultsContainer = document.body.querySelector(".search-results");
    Array.from(resultsContainer.children).forEach((childElement)=>{childElement.remove();});
    if (results.length === 0) {
        if(!resultsContainer.classList.contains('hide-search-results')){
            resultsContainer.classList.add('hide-search-results');
        }
        return;
    }

    let ul = document.createElement("ul");
    ul.classList.add("search-results-list");


    results.forEach(function (result) {
        let li = document.createElement("li");
        li.textContent = result.campgroundName;
        li.classList.add("search-results-item");
        li.addEventListener("click",(event)=>{
            location.href=`/campground/${encodeURIComponent(result.campgroundName)}`;
        });
        ul.appendChild(li);
    });

    resultsContainer.appendChild(ul);

    if(resultsContainer.classList.contains('hide-search-results')){
        resultsContainer.classList.remove('hide-search-results');
    }

}