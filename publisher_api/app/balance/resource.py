from http import HTTPStatus
import logging
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, HTTPException
from fastapi.params import Query
from app.balance.service import BalanceService

from app.client.event.model import Event


ROUTER = APIRouter(prefix="/balance")
LOGGER = logging.getLogger(__name__)


@ROUTER.post("/operation-was-made", response_model=Event, status_code=HTTPStatus.ACCEPTED)
async def operation_was_made(
        origin_id: UUID = Query(...),
        destination_id: Optional[UUID] = Query(None),
        own_titularity: bool = Query(...),
        amount_in_cents: int = Query(...)
):
    try:
        event = BalanceService().operation_was_made(
            origin_id,
            amount_in_cents,
            own_titularity,
            destination_id,
        )
        return event

    except Exception as err:
        raise HTTPException(HTTPStatus.INTERNAL_SERVER_ERROR, detail={
            'reason': str(err)
        }) from err
