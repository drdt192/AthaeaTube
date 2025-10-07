import os

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from yt_dlp import YoutubeDL

app = FastAPI()

origins = ["http://localhost:1921"]

app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"]
)

@app.post("/search")
async def ytsearch(req: Request):
    data = await req.json()
    query = data.get("query")

    yt_opts = {
        "n_threads": 16,
        "no_part": True,
        "noplaylist": True,
        "no_mtime": True,
        "skip_download": True,
        "youtube_skip_dash_manifest": True,
}

    with YoutubeDL(yt_opts) as yt:
        info = yt.extract_info(f"ytsearch5:{query}", download=False)
        videos = [{ "title": v["title"], "url": v["webpage_url"]} for v in info["entries"]]

    return videos




@app.post("/watch")
async def ytplay(req: Request):
    data = await req.json()
    url = data.get("url")

    yt_opts = {
        "n_threads": 16,
        "outtmpl": "public/videos/%(title)s.%(ext)s",
        "format": "bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4",
        "merge_output_format": "mp4"
    }

    filename = ""
    with YoutubeDL(yt_opts) as yt:
        info = yt.extract_info(url, download=False)
        filename = os.path.basename(yt.prepare_filename(info))
        print(filename)
        yt.download([url])
        
    return {"src": f"videos/{filename}"}
    


