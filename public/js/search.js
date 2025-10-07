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

    const video = await request.json()
    console.log(video);

    let result = document.createElement("div");
    result.classList.add("search-result")
    result.textContent = video.title;
    result.dataset.title = video.title;
    result.dataset.url = video.url;

    searchResults.appendChild(result);
});

searchResults.addEventListener("click", async (event) => {
    if(event.target.classList.contains("search-result")){
        const request = await fetch("http://localhost:1922/watch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: event.target.dataset.title,
                url: event.target.dataset.url
            })
        });

        const source = await request.json();
        console.log(source);
        videoSource.src = source.src;
        playerVideo.load();

        playerInfo.textContent = event.target.dataset.title;
    }
});