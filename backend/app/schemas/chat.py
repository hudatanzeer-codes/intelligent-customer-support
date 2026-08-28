from pydantic import BaseModel


class ConversationResponse(BaseModel):
    id: int
    customer_id: int
    status: str

    class Config:
        from_attributes = True


class MessageCreate(BaseModel):
    conversation_id: int
    content: str


class MessageResponse(BaseModel):
    id: int
    conversation_id: int
    sender_id: int
    sender_type: str
    content: str

    class Config:
        from_attributes = True