import express from "express";
import cors from "cors";
import yts from "yt-search";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/search", async (req, res) => {
    const rawSearchResults = await yts(req.body.query);
    res.json(rawSearchResults.all);
});

/*
app.post("/watch", async (req, res) => {
    console.log(req.body.url);

    res.json({src});
}); 
*/

app.listen(1922, () => {
    console.log("online at http://localhost:1922/");
}); 


