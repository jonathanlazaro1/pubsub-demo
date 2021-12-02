from fastapi import FastAPI, APIRouter
from fastapi.responses import PlainTextResponse

from app.balance.resource import ROUTER as BALANCE_ROUTER
from app.user.resource import ROUTER as USER_ROUTER

APP = FastAPI()
APIV1 = APIRouter(prefix="/v1")


@APP.get("/", response_class=PlainTextResponse)
def index():
    return 'OK!'


def build_api():
    APIV1.include_router(BALANCE_ROUTER)
    APIV1.include_router(USER_ROUTER)

    APP.include_router(APIV1)

    return APP
