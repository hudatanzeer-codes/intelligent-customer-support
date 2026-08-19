from fastapi import FastAPI

from app.database.connection import engine
from app.database.base import Base
from app.models import User
from app.routes.auth import router as auth_router
from app.routes.tickets import router as ticket_router
from app.routes.chat import router as chat_router

app = FastAPI(title="Intelligent Customer Support API")

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(ticket_router)
app.include_router(chat_router)


@app.get("/")
def root():
    return {
        "message": "Intelligent Customer Support API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }