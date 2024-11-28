from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
import os
# global
from llama_index.core.node_parser import SentenceSplitter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your documents
documents = SimpleDirectoryReader("data").load_data()


text_splitter = SentenceSplitter(chunk_size=512, chunk_overlap=10)

Settings.text_splitter = text_splitter

# per-index
index = VectorStoreIndex.from_documents(documents, transformations=[text_splitter])

query_engine = index.as_query_engine()


@app.post("/api/query")
async def query_documents(query: str):
    response = query_engine.query(query)
    return {"response": str(response)}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0:0:0:0", port=8000)
