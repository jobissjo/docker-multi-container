from beanie import Document
from pydantic import Field
from datetime import datetime


class Goal(Document):
    title: str
    description: str | None = None
    is_completed: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "goals"   # MongoDB collection name
