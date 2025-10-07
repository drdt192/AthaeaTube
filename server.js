import { spawn } from "child_process";
import express from "express";

const ytwatch = spawn("uvicorn", ["ytwatch:app", "--port", "1923"]);
ytwatch.on("close", () => {
    console.log("ytwatch.py closed!");
});
ytwatch.stdout.on("data", (chunk) => {
    console.log("YTWATCH:", chunk.toString());
});

const ytsearch = spawn("node", ["ytsearch.js"]);
ytsearch.on("close", () => {
    console.log("ytsearch.js closed!");
});
ytsearch.on("data", (chunk) => {
    console.log("YTSEARCH:", chunk.toString());
});

const app = express();
app.use(express.static("public"));

app.listen(1921, () => {
    console.log("Online at http://127.0.0.1:1921/");
});