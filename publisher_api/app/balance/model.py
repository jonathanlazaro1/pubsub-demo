from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class OperationMade(BaseModel):
    operation_id: UUID = Field(default_factory=uuid4, alias="id")
    origin_id: UUID = Field(..., alias="originId")
    destination_id: Optional[UUID] = Field(None, alias="destinationId")
    own_titularity: bool = Field(..., alias="ownTitularity")
    amount_in_cents: int = Field(alias="amountInCents")
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        validate_assignment = True
