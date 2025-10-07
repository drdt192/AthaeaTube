import express from "express";

const app = express();

app.use(express.static("public"));

app.listen(1921, () => {
    console.log("Online at http://localhost:1921/")
});