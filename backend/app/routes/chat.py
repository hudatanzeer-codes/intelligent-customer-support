from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.models.conversation import Conversation
from app.models.user import User
from app.schemas.chat import ConversationResponse
from app.routes.auth import get_current_user


router = APIRouter(
    prefix="/api/chat",
    tags=["Chat"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post(
    "/conversation",
    response_model=ConversationResponse
)
def create_conversation(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    conversation = Conversation(
        customer_id=current_user.id,
        status="ACTIVE"
    )

    db.add(conversation)
    db.commit()
    db.refresh(conversation)

    return conversation