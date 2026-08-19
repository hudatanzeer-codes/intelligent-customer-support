from pydantic import BaseModel


class ConversationResponse(BaseModel):
    id: int
    customer_id: int
    status: str

    class Config:
        from_attributes = True