from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.models.conversation import Conversation
from app.models.message import Message
from app.models.user import User

from app.schemas.chat import (
    ConversationResponse,
    MessageCreate,
    MessageResponse
)

from app.routes.auth import get_current_user
from app.rag.rag_pipeline import answer_query


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


# -----------------------------------
# Create Conversation
# -----------------------------------

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


# -----------------------------------
# Send Message
# -----------------------------------

@router.post(
    "/message",
    response_model=MessageResponse
)
def send_message(
    message_data: MessageCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Check conversation belongs to current user
    conversation = db.query(Conversation).filter(
    Conversation.id == message_data.conversation_id,
    Conversation.customer_id == current_user.id
    ).first()

    if not conversation:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found"
        )

    # Save customer message
    customer_message = Message(
        conversation_id=conversation.id,
        sender_id=current_user.id,
        sender_type="CUSTOMER",
        content=message_data.content
    )

    db.add(customer_message)
    db.commit()
    db.refresh(customer_message)

    # Generate AI response using RAG
    try:
        result = answer_query(message_data.content)

        ai_answer = result["answer"]

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate AI response: {str(e)}"
        )

    # Save AI response
    ai_message = Message(
        conversation_id=conversation.id,
        sender_id=current_user.id,
        sender_type="AI",
        content=ai_answer
    )

    db.add(ai_message)
    db.commit()
    db.refresh(ai_message)

    return ai_message