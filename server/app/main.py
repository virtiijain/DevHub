from fastapi import FastAPI
from .db import db

app = FastAPI()

@app.get("/")
async def home():
    return {"msg": "hello"}

@app.get("/collections")  # optional, just for testing
async def get_collections():
    collections = await db.list_collection_names()
    return {"collections": collections}