from http import HTTPStatus
import logging

from fastapi import APIRouter, HTTPException
from fastapi.params import Query
from app.user.model import UserCreated


ROUTER = APIRouter(prefix="/datetime")
LOGGER = logging.getLogger(__name__)


@ROUTER.get("", response_model=UserCreated, status_code=HTTPStatus.OK)
async def user_was_created(name: str = Query(..., min_length=3, max_length=60)):
    try:
        user = UserCreated(name=name)
        return user.dict()

    except Exception as err:
        raise HTTPException(HTTPStatus.INTERNAL_SERVER_ERROR, detail={
            'reason': str(err)
        }) from err
