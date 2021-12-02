from http import HTTPStatus
import logging

from fastapi import APIRouter, HTTPException
from fastapi.params import Query
from app.user.service import UserService

from app.client.event.model import Event


ROUTER = APIRouter(prefix="/users")
LOGGER = logging.getLogger(__name__)


@ROUTER.post("/user-was-created", response_model=Event, status_code=HTTPStatus.ACCEPTED)
async def user_was_created(name: str = Query(..., min_length=3, max_length=60)):
    try:
        event = UserService().user_was_created(name)
        return event

    except Exception as err:
        raise HTTPException(HTTPStatus.INTERNAL_SERVER_ERROR, detail={
            'reason': str(err)
        }) from err
