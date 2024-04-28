from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set this to the appropriate origin(s) of your React app
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE"],  # Add "POST" and "DELETE" methods
    allow_headers=["*"],
)

class ListData(BaseModel):
    data: list[str]
class Item(BaseModel):
    name: str

todolist = []
@app.get("/")
def read_root():
    return {"Goodbye": "World"}


@app.get("/items")
def get_items():
    return todolist

# need ways to add and remove items from to do list
@app.post("/items/add")
def add_item(item: Item):
    todolist.append(item.name)
    return {"message": "Item added successfully"}
    
@app.delete("/items/remove")
def remove_item(item: Item):
    if len(todolist) == 0:
        return {"message": "List is empty"}
    
    todolist.remove(item.name)
    return {"message": "Item removed successfully"}
