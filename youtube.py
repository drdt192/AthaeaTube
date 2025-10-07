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

    with YoutubeDL() as yt:
        info = yt.extract_info(f"ytsearch1:{query}", download=False)
        video = info["entries"][0]

    return {"title": video["title"], "url": video["webpage_url"]}

@app.post("/watch")
async def ytplay(req: Request):
    data = await req.json()
    url = data.get("url")

    ytdl_opts = {
        "outtmpl": "public/videos/%(title)s.%(ext)s"
    }

    filename = ""
    with YoutubeDL(ytdl_opts) as yt:
        info = yt.extract_info(url, download=False)
        filename = os.path.basename(yt.prepare_filename(info))
        print(filename)
        yt.download([url])
        
    return {"src": f"videos/{filename}" }
    


