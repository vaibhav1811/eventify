from fastapi import FastAPI

app = FastAPI(title="Eventify Cards API")

@app.get("/")
async def root():
    return {"message": "Welcome to Eventify Cards API"}
