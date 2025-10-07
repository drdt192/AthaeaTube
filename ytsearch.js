import express from "express";
import cors from "cors";
import yts from "yt-search";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/search", async (req, res) => {
    const rawSearchResults = await yts(req.body.query);
    const searchResults = rawSearchResults.all.map((video) => ({title: video.title, url: video.url}));
    res.json(searchResults);
});

/*
app.post("/watch", async (req, res) => {
    console.log(req.body.url);

    res.json({src});
}); 
*/

app.listen(1922, () => {
    console.log("online at http://127.0.0.1:1922/");
}); 


