const searchText = document.getElementById("search-text");
const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log(searchText.value);
    searchText.value = "";
});