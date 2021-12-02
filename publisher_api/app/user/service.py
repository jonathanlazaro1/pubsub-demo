from app.user.model import UserCreated
from app.client.event.client import EventClient
from app.client.event.model import Event, EventType


class UserService:
    def user_was_created(self, name: str) -> Event:
        user = UserCreated(name=name)
        return EventClient().process(EventType.USER_CREATED, user)
