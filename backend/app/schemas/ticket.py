from pydantic import BaseModel


class TicketCreate(BaseModel):
    conversation_id: int
    subject: str
    description: str
    category: str
    priority: str = "MEDIUM"


class TicketUpdate(BaseModel):
    subject: str | None = None
    description: str | None = None
    category: str | None = None
    priority: str | None = None
    status: str | None = None


class TicketResponse(BaseModel):
    id: int
    subject: str
    description: str
    category: str
    priority: str
    status: str

    class Config:
        from_attributes = True