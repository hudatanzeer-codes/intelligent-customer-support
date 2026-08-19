from datetime import datetime, timezone

from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    conversation_id = Column(
        Integer,
        ForeignKey("conversations.id"),
        nullable=False
    )

    customer_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    assigned_agent_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )

    subject = Column(
        String,
        nullable=False
    )

    description = Column(
        Text,
        nullable=False
    )

    category = Column(
        String,
        nullable=False
    )

    priority = Column(
        String,
        nullable=False,
        default="MEDIUM"
    )

    status = Column(
        String,
        nullable=False,
        default="OPEN"
    )

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc)
    )

    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    conversation = relationship("Conversation")

    customer = relationship(
        "User",
        foreign_keys=[customer_id]
    )

    assigned_agent = relationship(
        "User",
        foreign_keys=[assigned_agent_id]
    )