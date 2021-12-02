from typing import Optional
from uuid import UUID

from app.balance.model import OperationMade
from app.client.event.client import EventClient
from app.client.event.model import Event, EventType


class BalanceService:
    def operation_was_made(
            self,
            origin_id: UUID,
            amount_in_cents: int,
            own_titularity: bool,
            destination_id: Optional[UUID] = None
    ) -> Event:
        operation = OperationMade(
            origin_id=origin_id,
            destination_id=destination_id,
            own_titularity=own_titularity,
            amount_in_cents=amount_in_cents
        )
        return EventClient().process(EventType.OPERATION_MADE, operation)
