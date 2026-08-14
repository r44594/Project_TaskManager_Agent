from fastapi import FastAPI
from pydantic import BaseModel
from agent_service import agent
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# קודם כל הגדרות ה-CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    reply = agent(request.message)
    return {"reply": reply}

# בסוף הכל - ההרצה
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)