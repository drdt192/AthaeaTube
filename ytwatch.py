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

@app.post("/watch")
async def ytplay(req: Request):
    data = await req.json()
    url = data.get("url")

    yt_opts = {
        "n_threads": 16,
        "outtmpl": "public/videos/current.mp4",
        "format": "bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4",
        "merge_output_format": "mp4",
        "overwrites": True,
        "noplaylist": True
    }

    with YoutubeDL(yt_opts) as yt:
        yt.download([url])
        
    return {"src": "videos/current.mp4"}
    


