from datetime import datetime
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class UserCreated(BaseModel):
    user_id: UUID = Field(default_factory=uuid4, alias="id")
    name: str = Field(..., min_length=3, max_length=60)
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        validate_assignment = True
