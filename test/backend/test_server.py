import json

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:8080"],
                    allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


@app.post('/login')
async def login():
    return { "status": True }

@app.post('/getKey')
async def get_key():
    return { "status": False }

@app.get('/tasks')
async def get_tasks(group_id: str):
    with open("tasks.json", "r", encoding="utf-8") as f:
        content = json.load(f)
    return {"status": True, "tasks": content["tasks"]}

@app.post('/files')
async def receive_file(group_id: str="", user_id: str="", title: str="", file: UploadFile = File(...)):
    file_content = await file.read()
    with open(f"bin\\{file.filename}", "wb") as f:
        f.write(file_content)

def get_valid_ass_content(line: str):
    return line.startswith("Dialogue: ")

def get_useful_ass_info(line: str):
    basic_info = line[11:].split(",")
    start_time = basic_info[1]
    end_time = basic_info[2]
    style = basic_info[3]
    text = basic_info[9].strip()

    return {
        "start_time": start_time,
        "end_time": end_time,
        "style": style,
        "text": text,
        "comment": "123"
    }


@app.get('/files')
async def get_file(filename: str):
    with open(f"bin\\{filename}", "r", encoding="utf-8-sig") as f:
        file_content = list(filter(get_valid_ass_content, f.readlines()))
    
    for i in range(len(file_content)):
        file_content[i] = get_useful_ass_info(file_content[i])

    return {"status": True, "content": file_content}