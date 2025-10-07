//import { spawn } from "child_process";
import express from "express";

/*
const youtube = spawn("uvicorn", ["youtube:app", "--port", "1922"]);
youtube.on("close", () => {
    console.log("youtube.py closed!");
});
*/

const app = express();
app.use(express.static("public"));

app.listen(1921, () => {
    console.log("Online at http://localhost:1921/");
});