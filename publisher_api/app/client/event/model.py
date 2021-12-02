from datetime import datetime
from enum import Enum
from typing import Mapping, Optional

from pydantic import BaseModel, Field


class EventType(Enum):
    USER_CREATED = "UserWasCreated"
    OPERATION_MADE = "OperationWasMade"


class Event(BaseModel):
    event_id: Optional[str] = Field(None, alias="eventId")
    type: EventType = Field(...)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    message: BaseModel = Field(...)

    class Config:
        allow_population_by_field_name = True
        validate_assignment = True
        use_enum_values = True

    def get_attributes(self) -> Mapping[str, str]:
        event_attrs = self.dict(exclude={"message"})
        return {key: str(value) for key, value in event_attrs.items()}
