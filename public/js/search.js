const searchResults = document.getElementById("search-results");
const searchText = document.getElementById("search-text");
const searchForm = document.getElementById("search-form");
const videoSource = document.getElementById("video-source")
const playerVideo = document.getElementById("player-video")
const playerInfo = document.getElementById("info-div")

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = searchText.value;
    searchText.value = "";
    console.log(query);

    const request = await fetch("http://localhost:1922/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    });
    const videos = await request.json()

    for(let i = 0; i < videos.length; i++){
        let result = document.createElement("div");
        result.classList.add("search-result");
        result.dataset.title = videos[i].title;
        result.dataset.url = videos[i].url;
        
        let thumbnail = document.createElement("img");
        thumbnail.classList.add("search-thumbnail");
        thumbnail.src = videos[i].thumbnail;
        result.appendChild(thumbnail);

        let title = document.createElement("p");
        title.textContent = videos[i].title;
        title.classList.add("search-title");
        result.appendChild(title);

        searchResults.appendChild(result);
    }
});



searchResults.addEventListener("click", async (event) => {
    const element = event.target.closest(".search-result");
    console.log(element);
    console.log(element.dataset.title);
    console.log(element.dataset.url);
    if(element){
        const request = await fetch("http://localhost:1923/watch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: element.dataset.title,
                url: element.dataset.url
            })
        });

        const source = await request.json();
        videoSource.src = `${source.src}?t=${Date.now()}`; //to avoid caching
        playerVideo.load();
        playerVideo.play();

        playerInfo.textContent = element.dataset.title;
    }
});